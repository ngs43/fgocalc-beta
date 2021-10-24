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
            if (actual_damage == Math.floor((base_damage - fixed_damage) * randnum) + fixed_damage) {
                return randnum;
            }
        }
    } else {
        // 整数で与えられたときは，最大から最小まで調べる
        const MIN_base_damage = base_damage;
        const MAX_base_damage = base_damage + 0.999;
        for (let idx = 0; idx < rand.length; idx++) {
            var randnum = rand[idx];
            if (Math.floor((MIN_base_damage - fixed_damage) * randnum) + fixed_damage <= actual_damage
                && actual_damage <= Math.floor((MAX_base_damage - fixed_damage) * randnum) + fixed_damage) {
                return randnum;
            }
        }
    }
    return NaN;
}


/**
 * base_damageと実際のダメージから，バフ値を推測します．乱数特定器としても使えます．
 *     基本的には**宝具での仕様を想定**しています．コマンドの際は順番，色によってCARD_buffが変わることに注意．
 * @param {number} base_damage バフの無いダメージです．原則として小数まで入れてください
 * @param {number} fixed_damage 固定ダメージです．
 * @param {number} actual_damage 実機で出たダメージです．
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
 */
function detect_buff(base_damage, fixed_damage, actual_damage, ATK_buff = NaN, CARD_buff = NaN, s_buff = NaN, sDEF = NaN, detected_randnum = NaN) {
    var DMG;
    var cnt = 1;
    var ATK_buff, CARD_buff_array, s_buff_array, sDEF_array;
    var result = new Array();
    if (isNaN(ATK_buff)) { ATK_buff_array = Array(50).fill().map((_, i) => 10 * i - 100) } else { ATK_buff_array = [ATK_buff] };
    if (isNaN(CARD_buff)) { CARD_buff_array = Array(500).fill().map((_, i) => i - 100) } else { CARD_buff_array = [CARD_buff] };
    if (isNaN(s_buff)) { s_buff_array = Array(150).fill().map((_, i) => 10 * i - 500) } else { s_buff_array = [s_buff] };
    if (isNaN(sDEF)) { sDEF_array = Array(10).fill().map((_, i) => 10 * i) } else { sDEF_array = [sDEF] };
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
            return (randnum == detected_randnum);
        }
    }

    for (const ATK_buff of ATK_buff_array) {
        for (const CARD_buff of CARD_buff_array) {
            for (const s_buff of s_buff_array) {
                for (const sDEF of sDEF_array) {
                    DMG = base_damage
                        * (100 + CARD_buff) / 100 // 色バフデバフ
                        * (100 + ATK_buff) / 100 // 攻撃バフ防御デバフ
                        * Math.max((100 + s_buff), 0.1) / 100
                        * Math.max(0, 1.0 - Math.min(5.0, Math.max(0, 1.0 + sDEF / 100) - 1.0)) // 特殊耐性
                        ;
                    if (randnum_OK(detect_randnum(DMG, fixed_damage, actual_damage), detected_randnum)) {
                        result.push({ '攻防バフ': ATK_buff, 'カードバフデバフ': CARD_buff, '特攻バフ': s_buff, '特殊耐性': sDEF, '乱数': detect_randnum(DMG, fixed_damage, actual_damage) });
                        // console.log(CARD_buff, ATK_buff, s_buff, sDEF, detect_randnum(DMG, fixed_damage, actual_damage));
                        cnt += 1;
                    }
                    if (cnt > 100) {
                        return result;
                    }
                }
            }
        }
    }
    return result;
};

function detect_buff_main() {
    var result = detect_buff(parseFloat(document.detect_buff.base_damage.value),
        parseFloat(document.detect_buff.fixed_damage.value),
        parseFloat(document.detect_buff.actual_damage.value),
        parseFloat(document.detect_buff.ATK_buff.value),
        parseFloat(document.detect_buff.CARD_buff.value),
        parseFloat(document.detect_buff.s_buff.value),
        parseFloat(document.detect_buff.sDEF.value),
        parseFloat(document.detect_buff.randnum.value)
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
        print_result += '100件までしか表示されません'
    }
    document.detect_buff.detect_result.value = print_result;
}

// detect_buff_main();
// detect_buff(2640.8646, 0, 3197, 0, 82, NaN, NaN, 1.008);
// detect_buff(54917.5140, 0, 726677, 20, 50, NaN, NaN, NaN);
// detect_buff(54917.5140, 0, 129187, 20, 0, 140, 20, NaN);