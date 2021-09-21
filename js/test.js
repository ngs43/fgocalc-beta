function detect_randnum(base_damage, fixed_damage, actual_damage) {
    // 乱数の候補の作成
    var rand = new Array(200);
    for (let i = 0; i < 200; i++) {
        rand[i] = 0.9 + 0.001 * i;
    }
    var is_integer = (base_damage - Math.floor(base_damage) <= 0.00001);
    console.log(is_integer);
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

var randnum = detect_randnum(1453808.2845, 0, 1376756);
console.log(randnum);