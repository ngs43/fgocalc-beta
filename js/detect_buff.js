/**
 * base_damageとfixed_damageから，与えられたactual_damageを実現する乱数が存在するか調べる．
 * @param {number} base_damage 
 * @param {number} fixed_damage 
 * @param {number} actual_damage 
 * @returns {number} 乱数があれば乱数を，無ければ NaN を返す．
 */
function detect_randnum(base_damage, fixed_damage, actual_damage) {
    // 乱数の候補の作成
    var rand = new Array(200);
    for (let i = 0; i < 200; i++) {
        rand[i] = 0.9 + 0.001 * i;
    }
    var is_integer = (base_damage - Math.floor(base_damage) <= 0.00001);
    // console.log(is_integer);
    // 乱数の候補の中から，実際のダメージを再現出来るものを探す
    if (!is_integer) {
        // 小数点以下まで与えられているなら，実際にダメージを再現するか確かめるだけで良い
        for (let idx = 0; idx < rand.length; idx++) {
            var randnum = rand[idx];
            if (actual_damage == Math.floor((base_damage - fixed_damage) * randnum + fixed_damage)) {
                return [0, randnum];
            } else if (Math.abs(actual_damage - (Math.floor((base_damage - fixed_damage) * randnum + fixed_damage))) < actual_damage * 0.00001) {
                return [Math.abs(actual_damage - (Math.floor((base_damage - fixed_damage) * randnum + fixed_damage))), randnum];
            }
        }
    } else {
        // 整数で与えられたときは，最大から最小まで調べる
        const MIN_base_damage = Math.floor(base_damage);
        const MAX_base_damage = base_damage + 0.9999;
        for (let idx = 0; idx < rand.length; idx++) {
            var randnum = rand[idx];
            if (Math.floor((MIN_base_damage - fixed_damage) * randnum) + fixed_damage <= actual_damage
                && actual_damage <= Math.floor((MAX_base_damage - fixed_damage) * randnum) + fixed_damage) {
                return [0, randnum];
            }
        }
    }
    return [0, NaN];
}


/**
 * base_damageと実際のダメージから，バフ値を推測します．乱数特定器としても使えます．
 *     基本的には**宝具での仕様を想定**しています．コマンドの際は順番，色によってCARD_buffが変わることに注意．
 * @param {number} base_damage バフの無いダメージです．原則として小数まで入れてください
 * @param {number} fixed_damage 固定ダメージです．
 * @param {number} actual_damage 実機で出たダメージです．
 * @param {number} CARD_bonus コマンドが何枚目かによって変動する値です．
 * @param {number} CARD_bonus_all B始動なら50，それ以外なら0です．
 * 以下の部分が探索するパラメータです．分からないところに NaN を，確定しているところは数値を入力してください．
 * @param {number} ATK_buff 攻防バフの合計
 * @param {number} CARD_buff 色バフのまとめ
 * @param {number} s_buff 特攻バフ，特防デバフのまとめ（宝具バフもここ）
 * @param {number} sDEF 敵特殊耐性（×特防デバフ）
 * @param {number} detected_randnum 乱数が特定されている場合は，その乱数を実現するバフのみを探します．
 * @returns {Array<Map<String,number>>} 検索結果
 * 
 * @example 
 * detect_buff(54917.5140, 0, 726677, 20, 50, NaN, NaN, NaN);
 * @example 乱数が特定出来ているとき
 * detect_buff(2640.8646, 0, 3197, 0, 82, NaN, NaN, 1.008);
 * @example 乱数のみの特定も可能です
 * detect_buff(54917.5140, 0, 129187, 20, 0, 140, 20, NaN);
 * @example 1刻みでの探索がしたいとき
 * detect_buff(63102.6045, 0, 1376756, 100, 46, NaN, NaN, NaN, [false, false, true, false])
 */
function detect_buff(base_damage, fixed_damage, actual_damage, CARD_bonus = 100, CARD_bonus_all = 0,
    ATK_buff = NaN, CARD_buff = NaN, s_buff = NaN, sDEF = NaN, detected_randnum = NaN,
    small_steps = [false, false, false, false]) {
    var DMG;
    var cnt = 0;
    var ATK_buff, CARD_buff_array, s_buff_array, sDEF_array;
    var ATK_buff_smallsteps = small_steps[0],
        CARD_buff_smallsteps = small_steps[1],
        s_buff_smallsteps = small_steps[2],
        sDEF_smallsteps = small_steps[3];
    var result = new Array();
    /**
     * 基本は10刻みに探索，1刻みの指示の有無で場合分けする
     */
    if (isNaN(ATK_buff)) {
        if (ATK_buff_smallsteps) {
            ATK_buff_array = Array(501).fill().map((_, i) => -i + 400);
        } else {
            ATK_buff_array = Array(51).fill().map((_, i) => -10 * i + 400);
        }
    } else {
        ATK_buff_array = [ATK_buff];
    };
    if (isNaN(CARD_buff)) {
        if (CARD_buff_smallsteps) {
            CARD_buff_array = Array(501).fill().map((_, i) => -i + 400);
        } else {
            CARD_buff_array = Array(51).fill().map((_, i) => -10 * i + 400);
        }
    } else {
        CARD_buff_array = [CARD_buff]
    };
    if (isNaN(s_buff)) {
        if (s_buff_smallsteps) {
            s_buff_array = Array(1501).fill().map((_, i) => -i + 1000);
        } else {
            s_buff_array = Array(151).fill().map((_, i) => -10 * i + 1000);
        }
    } else {
        s_buff_array = [s_buff]
    };
    if (isNaN(sDEF)) {
        if (sDEF_smallsteps) {
            sDEF_array = Array(201).fill().map((_, i) => i - 100);
        } else {
            sDEF_array = Array(21).fill().map((_, i) => 10 * i - 100);
        }
    } else {
        sDEF_array = [sDEF]
    };
    if (ATK_buff_array.length * CARD_buff_array.length * s_buff_array.length * sDEF_array.length > 1500 * 500 && isNaN(detected_randnum)) {
        alert("空欄が多すぎます！空欄は2個までにするか，1刻みでの探索を消してください．");
        return;
    }
    /**
     * 指定された乱数があればそれに一致するかどうか，なければNaNでないかどうか
     * @param {number} 乱数 or NaN 
     * @param {number} 指定された乱数 or NaN
     * @returns {Boolean}
     */
    function randnum_OK(randnum, detected_randnum = detected_randnum) {
        if (isNaN(detected_randnum)) {
            return !isNaN(randnum);
        } else {
            return (Math.abs(randnum - detected_randnum) < 0.0001);
        }
    }
    // base_damageにはfixed_damageが足されていることを前提にする
    base_damage = ((base_damage - fixed_damage) / ((CARD_bonus_all + CARD_bonus) / 100));
    console.log(base_damage);
    for (const sDEF of sDEF_array) {
        for (const ATK_buff of ATK_buff_array) {
            for (const CARD_buff of CARD_buff_array) {
                for (const s_buff of s_buff_array) {
                    DMG = base_damage
                        * ((CARD_bonus / 100) * ((100 + CARD_buff) / 100) + CARD_bonus_all / 100)
                        * (100 + ATK_buff) / 100 // 攻撃バフ防御デバフ
                        * Math.max((100 + s_buff), 0.1) / 100
                        * Math.max(0, 1.0 - Math.min(5.0, Math.max(0, 1.0 + sDEF / 100) - 1.0)) // 特殊耐性
                        + fixed_damage;
                    var temp = detect_randnum(DMG, fixed_damage, actual_damage);
                    var temp_randnum = temp[1];
                    var temp_gosa = temp[0];
                    if (randnum_OK(temp_randnum, detected_randnum)) {
                        result.push({ '攻防バフ': ATK_buff, 'カードバフデバフ': CARD_buff, '特攻バフ': s_buff, '特殊耐性': sDEF, '乱数': rounddown(temp_randnum, 3), error: temp_gosa });
                        cnt += 1;
                    }
                    if (cnt > 100) {
                        break;
                    }
                }
                if (cnt > 100) {
                    break;
                }
            }
            if (cnt > 100) {
                break;
            }
        }
        if (cnt > 100) {
            break;
        }
    }
    result.sort(function (a, b) {
        if (a.error < b.error) return -1;
        if (a.error > b.error) return 1;
        return 0;
    });
    console.log(result);
    return result;
};

function detect_buff_main() {
    console.log('start');
    var CARD_bonus_array = [[150, 180, 210], [100, 120, 140], [80, 96, 112], [100, 100, 100]];
    var CARD_bonus_all = 0;
    var CARD_order = document.detect_buff.CARD_order.value; console.log(CARD_order);
    var CARD_type = document.detect_buff.CARD_type.value; console.log(CARD_type);
    var CARD_bonus = CARD_bonus_array[CARD_type][CARD_order]; console.log(CARD_bonus);
    if (document.detect_buff.Buster_start.checked & CARD_type != 3) { CARD_bonus_all = 50; } console.log(CARD_bonus_all);
    var small_steps = [document.detect_buff.ATK_buff_smallsteps.checked,
    document.detect_buff.CARD_buff_smallsteps.checked,
    document.detect_buff.s_buff_smallsteps.checked,
    document.detect_buff.sDEF_smallsteps.checked
    ];
    var result = detect_buff(parseFloat(document.detect_buff.base_damage.value),
        parseFloat(document.detect_buff.fixed_damage.value),
        parseFloat(document.detect_buff.actual_damage.value),
        CARD_bonus,
        CARD_bonus_all,
        parseFloat(document.detect_buff.ATK_buff.value),
        parseFloat(document.detect_buff.CARD_buff.value),
        parseFloat(document.detect_buff.s_buff.value),
        parseFloat(document.detect_buff.sDEF.value),
        parseFloat(document.detect_buff.randnum.value),
        small_steps
    )
    // var result = detect_buff(54917.5140, 0, 726677, 20, 50, NaN, NaN, NaN);
    var print_result = '';

    result.forEach(function (value) {

        // オブジェクトを配列に変換
        var property = Object.entries(value);

        property.forEach(function (v) {
            print_result += v.join(':');
            print_result += ', ';
        });
        print_result += '\n';
    });
    console.log(result.length);
    if (result.length >= 100) {
        print_result += '100件までしか表示されません';
    } else if (result.length == 0) {
        print_result += '該当する結果が見つかりませんでした';
    }
    document.detect_buff.detect_result.value = print_result;
}

// 切り捨て関数
// [引数] num: 数値, digit: 桁数 (整数値)
function rounddown(num, digit) {
    var digitVal = Math.pow(10, digit);
    return (Math.floor(num * digitVal) / digitVal).toFixed(digit);
}
// detect_buff_main();
// detect_buff(2640.8646, 0, 3197, 100, 0, 0, 82, NaN, NaN, 1.008);
// detect_buff(54917.5140, 0, 726677, 100, 0, 20, 50, NaN, 0, NaN);
// detect_buff(54917.5140, 0, 129187, 100, 0, 20, 0, 140, 20, NaN);
// detect_buff(63102.6045, 0, 1376756, 100, 0, 100, 46, NaN, NaN, NaN, [false, false, true, false])
// detect_buff(64803.4200, 0, 991719, 109.4, NaN, NaN, 0, NaN, [false, false, true, false])
// detect_buff(5017.6427, 0, 3530, 140, 50, 0, 10, NaN, NaN, 0.993);
detect_buff(26988.6932, 2886.8, 381952, 150, 50, 206, 203, 666, 75, NaN, [true, true, true, true]);
detect_buff(30603.9771, 2886.8, 396433, 180, 50, 206, 203, 666, 75, NaN, [true, true, true, true])
detect_buff(34219.2611, 2886.8, 506306, 210, 50, 206, 203, 671, 75, NaN, [true, true, true, true])