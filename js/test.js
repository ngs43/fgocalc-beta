function split_damage_list(hit_num) {
    var sum = (1 + hit_num) * hit_num / 2;
    var hit_array = new Array(hit_num);
    for (var idx = 1; idx <= hit_num; idx++) {
        hit_array[idx - 1] = Math.floor((100 / sum) * idx);
    }
    hit_array[hit_num - 1] = NaN;
    return hit_array;
}
function split_damage(damage, hit_array) {
    var damage_array = new Array(hit_array.length);
    for (var idx = 1; idx < hit_array.length; idx++) {
        damage_array[idx - 1] = Math.floor(damage * hit_array[idx - 1] / 100);
    }
    for (var idx = 1; idx <= hit_array.length - 1; idx++) {
        damage_array[idx] += damage_array[idx - 1];
    }
    damage_array[hit_array.length - 1] = damage;
    return damage_array;
}
function split_damage_main() {
    var damage, hit_num;
    damage = parseFloat(document.split_damage.split_damage.value);
    hit_num = parseFloat(document.split_damage.split_hit_num.value);
    var result = split_damage(damage, split_damage_list(hit_num));
    document.split_damage.split_damage_result.value = result;
}
console.log(split_damage(371094, split_damage_list(8)));

const formatDate = (current_datetime) => {
    let formatted_date = current_datetime.getFullYear()
        + (current_datetime.getMonth() + 1).toString().padStart(2, "0")
        + current_datetime.getDate().toString().padStart(2, "0")
        + current_datetime.getHours().toString().padStart(2, "0")
        + current_datetime.getMinutes().toString().padStart(2, "0")
        + current_datetime.getSeconds().toString().padStart(2, "0");
    return formatted_date;
}

console.log(formatDate(date));

function chgImg(html) {
    var date = new Date();
    var capture = document.querySelector(html);
    html2canvas(capture, { useCORS: true }).then(canvas => {
        var base64 = canvas.toDataURL('image/png');
        $('#download').attr('href', base64);
        $('#download').attr('download', html.toString().slice(1) + formatDate(date) + ".png" );
        $('#download')[0].click();             //自動ダウンロード
    });
}
