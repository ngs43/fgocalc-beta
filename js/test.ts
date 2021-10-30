function split_damage_list(hit_num: number) {
    let sum: number = (1 + hit_num) * hit_num / 2;
    let hit_array = new Array(hit_num);
    for (let idx = 1; idx <= hit_num; idx++) {
        hit_array[idx - 1] = Math.floor((100 / sum) * idx);
    }
    hit_array[hit_num - 1] = NaN;
    return hit_array;
}

function split_damage(damage: number, hit_array: Array<number>) {
    let damage_array = new Array(hit_array.length);
    for (let idx = 1; idx < hit_array.length; idx++) {
        damage_array[idx - 1] = Math.floor(damage * hit_array[idx - 1] / 100);
    }
    for (let idx = 1; idx <= hit_array.length - 1; idx++) {
        damage_array[idx] += damage_array[idx - 1];
    }
    damage_array[hit_array.length - 1] = damage;
    return damage_array;
}
