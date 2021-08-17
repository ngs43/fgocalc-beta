function keisan() {
    var ATK, NPmu, card, CARDbuff, class1, class2, elemental, ATKbuff, DEFdebuff, sATKbuff, sDEFdebuff, NPbuff, sNPbuff1, sNPbuff2, DMGbuff, DMGdebuff, total1, total2, total3,
        CARDdebuff;

    ATK = parseFloat(document.NP.ATK.value); NPmu = parseFloat(document.NP.NPmu.value); card = parseFloat(document.NP.card.value);
    CARDbuff = parseFloat(document.NP.CARDbuff.value); class1 = parseFloat(document.NP.class1.value); class2 = parseFloat(document.NP.class2.value);
    elemental = parseFloat(document.NP.elemental.value); ATKbuff = parseFloat(document.NP.ATKbuff.value); DEFdebuff = parseFloat(document.NP.DEFdebuff.value);
    sATKbuff = parseFloat(document.NP.sATKbuff.value); sDEFdebuff = parseFloat(document.NP.sDEFdebuff.value); NPbuff = parseFloat(document.NP.NPbuff.value);
    sNPbuff1 = parseFloat(document.NP.sNPbuff1.value); sNPbuff2 = parseFloat(document.NP.sNPbuff2.value); DMGbuff = parseFloat(document.NP.DMGbuff.value);
    DMGdebuff = parseFloat(document.NP.DMGdebuff.value); CARDdebuff = parseFloat(document.NP.CARDdebuff.value);

    if (ATKbuff > 400) { ATKbuff = 400 };
    if (DEFdebuff > 100) { DEFdebuff = 100 };
    if (CARDbuff > 400) { CARDbuff = 400 };
    if (sATKbuff > 1000) { sATKbuff = 1000 };
    if (sDEFdebuff > 500) { sDEFdebuff = 500 };
    if (NPbuff > 500) { NPbuff = 500 };
    // if (CARDdebuff > 100) { CARDdebuff = 100 };

    total1 = Math.round(100 * (ATK * NPmu / 100
        * 0.23 * card
        * (100 + CARDbuff + CARDdebuff) / 100
        * class1
        * class2
        * elemental
        * (100 + ATKbuff + DEFdebuff) / 100
        * Math.max((100 + sATKbuff + sDEFdebuff + NPbuff), 0.1) / 100
        * sNPbuff1 / 100 * sNPbuff2 / 100));

    document.NP.total1.value = Math.floor(total1 / 100) + DMGbuff + DMGdebuff;

    total2 = total1 * 9;
    total2 = Math.floor(total2 / 1000);

    total3 = total1 * 1099;
    total3 = Math.floor(total3 / 100000);
    document.NP.total2.value = total2 + DMGbuff + DMGdebuff;
    document.NP.total3.value = total3 + DMGbuff + DMGdebuff;
};

function keisan_NP(hit, N_A, Abonus, card_buff, Abonus_all, card_NP, enemy_rate, getNP_buff, Cri, OK, card_debuff) {
    var NP;
    NP = 100 * (N_A * (Abonus / 100 * (100 + card_buff + card_debuff) / 100 + Abonus_all * card_NP / 100) * enemy_rate / 100 * (100 + getNP_buff) / 100 * Cri * OK);
    NP = Math.round(NP * 10);
    NP = Math.floor(NP / 10);
    NP = hit * NP / 100;
    if (Cri == 2 && card_NP == 0) { NP = "" };
    return NP;
};

function keisan_Star(hit, Star_rate, Qbonus, card_buff, Qbonus_all, card_NP, getStar_buff, Cri, OK, card_debuff) {
    var Star, Star_num;
    Star = 100 * (Star_rate / 100 + Qbonus / 100 * (100 + card_buff + card_debuff) / 100 + Qbonus_all * card_NP / 100 + getStar_buff / 100 + Cri / 100 + OK / 100);
    Star = Math.round(Star * 100);
    Star = Math.floor(Star / 10);
    if (Star > 3000) { Star = 3000 };
    Star_num = Math.floor(Star / 1000);
    Star = Star_num * hit + "個" + "+" + "(" + ((Star - 1000 * Star_num) / 10) + "％)×" + (hit);
    if (Cri == 20 && card_NP == 0) { Star = "" };
    return Star;
};

function keisan_rate() {
    var card_1st, card_2nd, card_3rd, N_A, Q_hit, A_hit, B_hit, EX_hit, Qbonus_1st, Abonus_1st, Bbonus_1st, Q_CARDbuff, A_CARDbuff, B_CARDbuff, NPcard, NP_hit,
        Qbonus_all, Abonus_all, Qbonus_2nd, Abonus_2nd, Bbonus_2nd, Qbonus_3rd, Abonus_3rd, Bbonus_3rd, EXbonus,
        buff_1st, buff_2nd, buff_3rd, getNP_buff, hit_1st, hit_2nd, hit_3rd, NPcard_1st, NPcard_2nd, NPcard_3rd, card1st_NP, card2nd_NP, card3rd_NP,
        Star_rate, getStar_buff, enemy_rate, Q_CARDdebuff, A_CARDdebuff, B_CARDdebuff, debuff_1st, debuff_2nd, debuff_3rd;
    N_A = parseFloat(document.rate.N_A.value);
    card_1st = document.rate.card_1st.value;
    card_2nd = document.rate.card_2nd.value;
    card_3rd = document.rate.card_3rd.value;
    Qbonus_all = 0; Abonus_all = 0;
    Q_hit = parseFloat(document.rate.Q_hit.value);
    A_hit = parseFloat(document.rate.A_hit.value);
    B_hit = parseFloat(document.rate.B_hit.value);
    EX_hit = parseFloat(document.rate.EX_hit.value);
    NP_hit = parseFloat(document.rate.NP_hit.value);
    Q_CARDbuff = parseFloat(document.rate.Q_CARDbuff.value);
    A_CARDbuff = parseFloat(document.rate.A_CARDbuff.value);
    B_CARDbuff = parseFloat(document.rate.B_CARDbuff.value);
    getNP_buff = parseFloat(document.rate.getNP_buff.value);
    NPcard = document.rate.NPcard.value;
    Star_rate = parseFloat(document.rate.Star_rate.value);
    getStar_buff = parseFloat(document.rate.getStar_buff.value);
    enemy_rate = parseFloat(document.rate.enemy_rate.value);
    Q_CARDdebuff = parseFloat(document.rate.Q_CARDdebuff.value);
    A_CARDdebuff = parseFloat(document.rate.A_CARDdebuff.value);
    B_CARDdebuff = parseFloat(document.rate.B_CARDdebuff.value);
    card1st_NP = 1;
    card2nd_NP = 1;
    card3rd_NP = 1;

    if (Q_CARDbuff > 400) { Q_CARDbuff = 400 };
    if (A_CARDbuff > 400) { A_CARDbuff = 400 };
    if (B_CARDbuff > 400) { B_CARDbuff = 400 };
    if (getNP_buff > 400) { getNP_buff = 400 };
    if (getStar_buff > 500) { getStar_buff = 500 };
    // if (Q_CARDdebuff > 100) { Q_CARDdebuff = 100 };
    // if (A_CARDdebuff > 100) { A_CARDdebuff = 100 };
    // if (B_CARDdebuff > 100) { B_CARDdebuff = 100 };

    if (card_1st == "T") { card_1st = NPcard; card1st_NP = 0; };
    if (card_2nd == "T") { card_2nd = NPcard; card2nd_NP = 0; };
    if (card_3rd == "T") { card_3rd = NPcard; card3rd_NP = 0; };

    if (card_1st == "Q") { Qbonus_all = 20; Qbonus_1st = 80; Abonus_1st = 100; buff_1st = Q_CARDbuff; hit_1st = Q_hit; debuff_1st = Q_CARDdebuff; };
    if (card_1st == "A") { Abonus_all = 100; Qbonus_1st = 0; Abonus_1st = 300; buff_1st = A_CARDbuff; hit_1st = A_hit; debuff_1st = A_CARDdebuff; };
    if (card_1st == "B") { Qbonus_1st = 10; Abonus_1st = 0; buff_1st = B_CARDbuff; hit_1st = B_hit; debuff_1st = B_CARDdebuff; };

    if (card_2nd == "Q") { Qbonus_2nd = 130; Abonus_2nd = 150; buff_2nd = Q_CARDbuff; hit_2nd = Q_hit; debuff_2nd = Q_CARDdebuff; };
    if (card_2nd == "A") { Qbonus_2nd = 0; Abonus_2nd = 450; buff_2nd = A_CARDbuff; hit_2nd = A_hit; debuff_2nd = A_CARDdebuff; };
    if (card_2nd == "B") { Qbonus_2nd = 15; Abonus_2nd = 0; buff_2nd = B_CARDbuff; hit_2nd = B_hit; debuff_2nd = B_CARDdebuff; };

    if (card_3rd == "Q") { Qbonus_3rd = 180; Abonus_3rd = 200; buff_3rd = Q_CARDbuff; hit_3rd = Q_hit; debuff_3rd = Q_CARDdebuff; };
    if (card_3rd == "A") { Qbonus_3rd = 0; Abonus_3rd = 600; buff_3rd = A_CARDbuff; hit_3rd = A_hit; debuff_3rd = A_CARDdebuff; };
    if (card_3rd == "B") { Qbonus_3rd = 20; Abonus_3rd = 0; buff_3rd = B_CARDbuff; hit_3rd = B_hit; debuff_3rd = B_CARDdebuff; };

    if (card1st_NP == 0 && card_1st == "Q") { Qbonus_1st = 80; Abonus_1st = 100; };
    if (card1st_NP == 0 && card_1st == "A") { Qbonus_1st = 0; Abonus_1st = 300; };
    if (card1st_NP == 0 && card_1st == "B") { Qbonus_1st = 10; Abonus_1st = 0; };

    if (card2nd_NP == 0 && card_2nd == "Q") { Qbonus_2nd = 80; Abonus_2nd = 100; };
    if (card2nd_NP == 0 && card_2nd == "A") { Qbonus_2nd = 0; Abonus_2nd = 300; };
    if (card2nd_NP == 0 && card_2nd == "B") { Qbonus_2nd = 10; Abonus_2nd = 0; };

    if (card3rd_NP == 0 && card_3rd == "Q") { Qbonus_3rd = 80; Abonus_3rd = 100; };
    if (card3rd_NP == 0 && card_3rd == "A") { Qbonus_3rd = 0; Abonus_3rd = 300; };
    if (card3rd_NP == 0 && card_3rd == "B") { Qbonus_3rd = 10; Abonus_3rd = 0; };

    if (card1st_NP == 0) { hit_1st = NP_hit };
    if (card2nd_NP == 0) { hit_2nd = NP_hit };
    if (card3rd_NP == 0) { hit_3rd = NP_hit };

    document.rate.NP_1st.value = keisan_NP(hit_1st, N_A, Abonus_1st, buff_1st, Abonus_all, card1st_NP, enemy_rate, getNP_buff, 1, 1, debuff_1st);
    document.rate.NP_2nd.value = keisan_NP(hit_2nd, N_A, Abonus_2nd, buff_2nd, Abonus_all, card2nd_NP, enemy_rate, getNP_buff, 1, 1, debuff_2nd);
    document.rate.NP_3rd.value = keisan_NP(hit_3rd, N_A, Abonus_3rd, buff_3rd, Abonus_all, card3rd_NP, enemy_rate, getNP_buff, 1, 1, debuff_3rd);
    document.rate.NP_EX.value = keisan_NP(EX_hit, N_A, 100, 0, Abonus_all, 1, enemy_rate, getNP_buff, 1, 1, 0);

    document.rate.NP_1st_Cri.value = keisan_NP(hit_1st, N_A, Abonus_1st, buff_1st, Abonus_all, card1st_NP, enemy_rate, getNP_buff, 2, 1, debuff_1st);
    document.rate.NP_2nd_Cri.value = keisan_NP(hit_2nd, N_A, Abonus_2nd, buff_2nd, Abonus_all, card2nd_NP, enemy_rate, getNP_buff, 2, 1, debuff_2nd);
    document.rate.NP_3rd_Cri.value = keisan_NP(hit_3rd, N_A, Abonus_3rd, buff_3rd, Abonus_all, card3rd_NP, enemy_rate, getNP_buff, 2, 1, debuff_3rd);

    document.rate.NP_1st_OK.value = keisan_NP(hit_1st, N_A, Abonus_1st, buff_1st, Abonus_all, card1st_NP, enemy_rate, getNP_buff, 1, 1.5, debuff_1st);
    document.rate.NP_2nd_OK.value = keisan_NP(hit_2nd, N_A, Abonus_2nd, buff_2nd, Abonus_all, card2nd_NP, enemy_rate, getNP_buff, 1, 1.5, debuff_2nd);
    document.rate.NP_3rd_OK.value = keisan_NP(hit_3rd, N_A, Abonus_3rd, buff_3rd, Abonus_all, card3rd_NP, enemy_rate, getNP_buff, 1, 1.5, debuff_3rd);
    document.rate.NP_EX_OK.value = keisan_NP(EX_hit, N_A, 100, 0, Abonus_all, 1, enemy_rate, getNP_buff, 1, 1.5, 0);

    document.rate.NP_1st_CO.value = keisan_NP(hit_1st, N_A, Abonus_1st, buff_1st, Abonus_all, card1st_NP, enemy_rate, getNP_buff, 2, 1.5, debuff_1st);
    document.rate.NP_2nd_CO.value = keisan_NP(hit_2nd, N_A, Abonus_2nd, buff_2nd, Abonus_all, card2nd_NP, enemy_rate, getNP_buff, 2, 1.5, debuff_2nd);
    document.rate.NP_3rd_CO.value = keisan_NP(hit_3rd, N_A, Abonus_3rd, buff_3rd, Abonus_all, card3rd_NP, enemy_rate, getNP_buff, 2, 1.5, debuff_3rd);

    document.rate.Star_1st.value = keisan_Star(hit_1st, Star_rate, Qbonus_1st, buff_1st, Qbonus_all, card1st_NP, getStar_buff, 0, 0, debuff_1st);
    document.rate.Star_2nd.value = keisan_Star(hit_2nd, Star_rate, Qbonus_2nd, buff_2nd, Qbonus_all, card2nd_NP, getStar_buff, 0, 0, debuff_2nd);
    document.rate.Star_3rd.value = keisan_Star(hit_3rd, Star_rate, Qbonus_3rd, buff_3rd, Qbonus_all, card3rd_NP, getStar_buff, 0, 0, debuff_3rd);
    document.rate.Star_EX.value = keisan_Star(EX_hit, Star_rate, 100, 0, Qbonus_all, 1, getStar_buff, 0, 0, 0);

    document.rate.Star_1st_Cri.value = keisan_Star(hit_1st, Star_rate, Qbonus_1st, buff_1st, Qbonus_all, card1st_NP, getStar_buff, 20, 0, debuff_1st);
    document.rate.Star_2nd_Cri.value = keisan_Star(hit_2nd, Star_rate, Qbonus_2nd, buff_2nd, Qbonus_all, card2nd_NP, getStar_buff, 20, 0, debuff_2nd);
    document.rate.Star_3rd_Cri.value = keisan_Star(hit_3rd, Star_rate, Qbonus_3rd, buff_3rd, Qbonus_all, card3rd_NP, getStar_buff, 20, 0, debuff_3rd);

    document.rate.Star_1st_OK.value = keisan_Star(hit_1st, Star_rate, Qbonus_1st, buff_1st, Qbonus_all, card1st_NP, getStar_buff, 0, 30, debuff_1st);
    document.rate.Star_2nd_OK.value = keisan_Star(hit_2nd, Star_rate, Qbonus_2nd, buff_2nd, Qbonus_all, card2nd_NP, getStar_buff, 0, 30, debuff_2nd);
    document.rate.Star_3rd_OK.value = keisan_Star(hit_3rd, Star_rate, Qbonus_3rd, buff_3rd, Qbonus_all, card3rd_NP, getStar_buff, 0, 30, debuff_3rd);
    document.rate.Star_EX_OK.value = keisan_Star(EX_hit, Star_rate, 100, 0, Qbonus_all, 1, getStar_buff, 0, 30, 0);

    document.rate.Star_1st_CO.value = keisan_Star(hit_1st, Star_rate, Qbonus_1st, buff_1st, Qbonus_all, card1st_NP, getStar_buff, 20, 30, debuff_1st);
    document.rate.Star_2nd_CO.value = keisan_Star(hit_2nd, Star_rate, Qbonus_2nd, buff_2nd, Qbonus_all, card2nd_NP, getStar_buff, 20, 30, debuff_2nd);
    document.rate.Star_3rd_CO.value = keisan_Star(hit_3rd, Star_rate, Qbonus_3rd, buff_3rd, Qbonus_all, card3rd_NP, getStar_buff, 20, 30, debuff_3rd);
};

function keisan_DMG(ATK_normal, Bbonus_normal, CARDbuff_normal, Bbonus_all_normal, class1_normal, class2_normal, elemental_normal, random, ATKbuff_normal, DEFdebuff_normal, Cri_normal,
    EXbonus_normal, sATKbuff_normal, sDEFdebuff_normal, Cribuff_normal, Cri_is, DMGbuff_normal, DMGdebuff_normal, Bchain_bonus_normal, CARDdebuff_normal) {
    var DMG;
    DMG = 10 * (ATK_normal * 0.23 *
        (Bbonus_normal / 100 * (100 + CARDbuff_normal + CARDdebuff_normal) / 100 + Bbonus_all_normal / 100)
        * class1_normal // クラス相性
        * class2_normal // クラス補正
        * elemental_normal // Attri相性
        * random // 乱数
        * (100 + ATKbuff_normal + DEFdebuff_normal) / 100 // 攻撃バフ防御デバフ
        * Cri_normal // クリティカルの有無
        * EXbonus_normal / 100
        * Math.max((100 + sATKbuff_normal + sDEFdebuff_normal + Cribuff_normal * Cri_is), 0.1) / 100
        + ATK_normal * Bchain_bonus_normal / 100
    );
    DMG = Math.floor(DMG / 10) + DMGbuff_normal + DMGdebuff_normal;
    return DMG;
};

function keisan_DMG_normal() {
    var ATK_normal, card_1st_normal, card_2nd_normal, card_3rd_normal, Q_CARDbuff_normal, A_CARDbuff_normal, B_CARDbuff_normal, class1_normal, class2_normal,
        elemental_normal, ATKbuff_normal, DEFdebuff_normal, sATKbuff_normal, sDEFdebuff_normal, DMGbuff_normal, DMGdebuff_normal, total1, total2, total3,
        Bbonus_1st_normal, Bbonus_2nd_normal, Bbonus_3rd_normal, Bbonus_EX_normal, EXbonus_normal, Bbonus_all_normal, Bchain_bonus_normal,
        CARDbuff_1st_normal, CARDbuff_2nd_normal, CARDbuff_3rd_normal, Cribuff_normal, Q_CARDdebuff_normal, A_CARDdebuff_normal, B_CARDdebuff_normal,
        CARDdebuff_1st_normal, CARDdebuff_2nd_normal, CARDdebuff_3rd_normal,
        is_card_1st_Cri, is_card_2nd_Cri, is_card_3rd_Cri,
        DMG_ave_1st, DMG_ave_2nd, DMG_ave_3rd, DMG_ave_EX,
        DMG_high_1st, DMG_high_2nd, DMG_high_3rd, DMG_high_EX,
        DMG_low_1st, DMG_low_2nd, DMG_low_3rd, DMG_low_EX,
        DMG_Cri_ave_1st, DMG_Cri_ave_2nd, DMG_Cri_ave_3rd,
        DMG_Cri_high_1st, DMG_Cri_high_2nd, DMG_Cri_high_3rd,
        DMG_Cri_low_1st, DMG_Cri_low_2nd, DMG_Cri_low_3rd;

    ATK_normal = parseFloat(document.DMG_normal.ATK_normal.value);
    card_1st_normal = document.DMG_normal.card_1st_normal.value;
    card_2nd_normal = document.DMG_normal.card_2nd_normal.value;
    card_3rd_normal = document.DMG_normal.card_3rd_normal.value;
    is_card_1st_Cri = document.DMG_normal.is_card_1st_Cri.value;
    is_card_2nd_Cri = document.DMG_normal.is_card_2nd_Cri.value;
    is_card_3rd_Cri = document.DMG_normal.is_card_3rd_Cri.value;
    Cribuff_normal = parseFloat(document.DMG_normal.Cribuff_normal.value);
    Q_CARDbuff_normal = parseFloat(document.DMG_normal.Q_CARDbuff_normal.value);
    A_CARDbuff_normal = parseFloat(document.DMG_normal.A_CARDbuff_normal.value);
    B_CARDbuff_normal = parseFloat(document.DMG_normal.B_CARDbuff_normal.value);
    class1_normal = parseFloat(document.DMG_normal.class1_normal.value); class2_normal = parseFloat(document.DMG_normal.class2_normal.value);
    elemental_normal = parseFloat(document.DMG_normal.elemental_normal.value); ATKbuff_normal = parseFloat(document.DMG_normal.ATKbuff_normal.value);
    DEFdebuff_normal = parseFloat(document.DMG_normal.DEFdebuff_normal.value);
    sATKbuff_normal = parseFloat(document.DMG_normal.sATKbuff_normal.value); sDEFdebuff_normal = parseFloat(document.DMG_normal.sDEFdebuff_normal.value);
    DMGbuff_normal = parseFloat(document.DMG_normal.DMGbuff_normal.value); DMGdebuff_normal = parseFloat(document.DMG_normal.DMGdebuff_normal.value);
    Q_CARDdebuff_normal = parseFloat(document.DMG_normal.Q_CARDdebuff_normal.value);
    A_CARDdebuff_normal = parseFloat(document.DMG_normal.A_CARDdebuff_normal.value);
    B_CARDdebuff_normal = parseFloat(document.DMG_normal.B_CARDdebuff_normal.value);


    if (Q_CARDbuff_normal > 400) { Q_CARDbuff_normal = 400 };
    if (A_CARDbuff_normal > 400) { A_CARDbuff_normal = 400 };
    if (B_CARDbuff_normal > 400) { B_CARDbuff_normal = 400 };
    if (ATKbuff_normal > 400) { ATKbuff_normal = 400 };
    if (DEFdebuff_normal > 100) { DEFdebuff_normal = 100 };
    if (sATKbuff_normal > 1000) { sATKbuff_normal = 1000 };
    if (sDEFdebuff_normal > 500) { sDEFdebuff_normal = 500 };
    if (Cribuff_normal > 500) { Cribuff_normal = 500 };
    // if (Q_CARDdebuff_normal > 100) { Q_CARDdebuff_normal = 100 };
    // if (A_CARDdebuff_normal > 100) { A_CARDdebuff_normal = 100 };
    // if (B_CARDdebuff_normal > 100) { B_CARDdebuff_normal = 100 };

    Bbonus_all_normal = 0; Bchain_bonus_normal = 0; EXbonus_normal = 200;

    if (card_1st_normal == "Q") { Bbonus_1st_normal = 80; CARDbuff_1st_normal = Q_CARDbuff_normal; CARDdebuff_1st_normal = Q_CARDdebuff_normal; };
    if (card_1st_normal == "A") { Bbonus_1st_normal = 100; CARDbuff_1st_normal = A_CARDbuff_normal; CARDdebuff_1st_normal = A_CARDdebuff_normal; };
    if (card_1st_normal == "B") { Bbonus_all_normal = 50; Bbonus_1st_normal = 150; CARDbuff_1st_normal = B_CARDbuff_normal; CARDdebuff_1st_normal = B_CARDdebuff_normal; };
    if (card_2nd_normal == "Q") { Bbonus_2nd_normal = 96; CARDbuff_2nd_normal = Q_CARDbuff_normal; CARDdebuff_2nd_normal = Q_CARDdebuff_normal; };
    if (card_2nd_normal == "A") { Bbonus_2nd_normal = 120; CARDbuff_2nd_normal = A_CARDbuff_normal; CARDdebuff_2nd_normal = A_CARDdebuff_normal; };
    if (card_2nd_normal == "B") { Bbonus_2nd_normal = 180; CARDbuff_2nd_normal = B_CARDbuff_normal; CARDdebuff_2nd_normal = B_CARDdebuff_normal; };
    if (card_3rd_normal == "Q") { Bbonus_3rd_normal = 112; CARDbuff_3rd_normal = Q_CARDbuff_normal; CARDdebuff_3rd_normal = Q_CARDdebuff_normal; };
    if (card_3rd_normal == "A") { Bbonus_3rd_normal = 140; CARDbuff_3rd_normal = A_CARDbuff_normal; CARDdebuff_3rd_normal = A_CARDdebuff_normal; };
    if (card_3rd_normal == "B") { Bbonus_3rd_normal = 210; CARDbuff_3rd_normal = B_CARDbuff_normal; CARDdebuff_3rd_normal = B_CARDdebuff_normal; };

    if (card_1st_normal == card_2nd_normal && card_2nd_normal == card_3rd_normal && card_1st_normal == "B") { EXbonus_normal = 350; Bchain_bonus_normal = 20; }
    if (card_1st_normal == card_2nd_normal && card_2nd_normal == card_3rd_normal) { EXbonus_normal = 350; };

    DMG_ave_1st = keisan_DMG(ATK_normal, Bbonus_1st_normal, CARDbuff_1st_normal, Bbonus_all_normal, class1_normal, class2_normal, elemental_normal,
        1, ATKbuff_normal, DEFdebuff_normal, 1, 100, sATKbuff_normal,
        sDEFdebuff_normal, Cribuff_normal, 0, DMGbuff_normal, DMGdebuff_normal, Bchain_bonus_normal, CARDdebuff_1st_normal);
    // document.DMG_normal.DMG_ave_1st.value = DMG_ave_1st;
    DMG_low_1st = keisan_DMG(ATK_normal, Bbonus_1st_normal, CARDbuff_1st_normal, Bbonus_all_normal, class1_normal, class2_normal, elemental_normal,
        0.9, ATKbuff_normal, DEFdebuff_normal, 1, 100, sATKbuff_normal,
        sDEFdebuff_normal, Cribuff_normal, 0, DMGbuff_normal, DMGdebuff_normal, Bchain_bonus_normal, CARDdebuff_1st_normal);
    // document.DMG_normal.DMG_low_1st.value = DMG_low_1st;
    DMG_high_1st = keisan_DMG(ATK_normal, Bbonus_1st_normal, CARDbuff_1st_normal, Bbonus_all_normal, class1_normal, class2_normal, elemental_normal,
        1.099, ATKbuff_normal, DEFdebuff_normal, 1, 100, sATKbuff_normal,
        sDEFdebuff_normal, Cribuff_normal, 0, DMGbuff_normal, DMGdebuff_normal, Bchain_bonus_normal, CARDdebuff_1st_normal);
    // document.DMG_normal.DMG_high_1st.value = DMG_high_1st;
    DMG_ave_2nd = keisan_DMG(ATK_normal, Bbonus_2nd_normal, CARDbuff_2nd_normal, Bbonus_all_normal, class1_normal, class2_normal, elemental_normal,
        1, ATKbuff_normal, DEFdebuff_normal, 1, 100, sATKbuff_normal,
        sDEFdebuff_normal, Cribuff_normal, 0, DMGbuff_normal, DMGdebuff_normal, Bchain_bonus_normal, CARDdebuff_2nd_normal);
    // document.DMG_normal.DMG_ave_2nd.value = DMG_ave_2nd;
    DMG_low_2nd = keisan_DMG(ATK_normal, Bbonus_2nd_normal, CARDbuff_2nd_normal, Bbonus_all_normal, class1_normal, class2_normal, elemental_normal,
        0.9, ATKbuff_normal, DEFdebuff_normal, 1, 100, sATKbuff_normal,
        sDEFdebuff_normal, Cribuff_normal, 0, DMGbuff_normal, DMGdebuff_normal, Bchain_bonus_normal, CARDdebuff_2nd_normal);
    // document.DMG_normal.DMG_low_2nd.value = DMG_low_2nd;
    DMG_high_2nd = keisan_DMG(ATK_normal, Bbonus_2nd_normal, CARDbuff_2nd_normal, Bbonus_all_normal, class1_normal, class2_normal, elemental_normal,
        1.099, ATKbuff_normal, DEFdebuff_normal, 1, 100, sATKbuff_normal,
        sDEFdebuff_normal, Cribuff_normal, 0, DMGbuff_normal, DMGdebuff_normal, Bchain_bonus_normal, CARDdebuff_2nd_normal);
    // document.DMG_normal.DMG_high_2nd.value = DMG_high_2nd;
    DMG_ave_3rd = keisan_DMG(ATK_normal, Bbonus_3rd_normal, CARDbuff_3rd_normal, Bbonus_all_normal, class1_normal, class2_normal, elemental_normal,
        1, ATKbuff_normal, DEFdebuff_normal, 1, 100, sATKbuff_normal,
        sDEFdebuff_normal, Cribuff_normal, 0, DMGbuff_normal, DMGdebuff_normal, Bchain_bonus_normal, CARDdebuff_3rd_normal);
    // document.DMG_normal.DMG_ave_3rd.value = DMG_ave_3rd;
    DMG_low_3rd = keisan_DMG(ATK_normal, Bbonus_3rd_normal, CARDbuff_3rd_normal, Bbonus_all_normal, class1_normal, class2_normal, elemental_normal,
        0.9, ATKbuff_normal, DEFdebuff_normal, 1, 100, sATKbuff_normal,
        sDEFdebuff_normal, Cribuff_normal, 0, DMGbuff_normal, DMGdebuff_normal, Bchain_bonus_normal, CARDdebuff_3rd_normal);
    // document.DMG_normal.DMG_low_3rd.value = DMG_low_3rd;
    DMG_high_3rd = keisan_DMG(ATK_normal, Bbonus_3rd_normal, CARDbuff_3rd_normal, Bbonus_all_normal, class1_normal, class2_normal, elemental_normal,
        1.099, ATKbuff_normal, DEFdebuff_normal, 1, 100, sATKbuff_normal,
        sDEFdebuff_normal, Cribuff_normal, 0, DMGbuff_normal, DMGdebuff_normal, Bchain_bonus_normal, CARDdebuff_3rd_normal);
    // document.DMG_normal.DMG_high_3rd.value = DMG_high_3rd;
    DMG_ave_EX = keisan_DMG(ATK_normal, 100, 0, Bbonus_all_normal, class1_normal, class2_normal, elemental_normal,
        1, ATKbuff_normal, DEFdebuff_normal, 1, EXbonus_normal, sATKbuff_normal,
        sDEFdebuff_normal, Cribuff_normal, 0, DMGbuff_normal, DMGdebuff_normal, 0, 0);
    // document.DMG_normal.DMG_ave_EX.value = DMG_ave_EX;
    DMG_low_EX = keisan_DMG(ATK_normal, 100, 0, Bbonus_all_normal, class1_normal, class2_normal, elemental_normal,
        0.9, ATKbuff_normal, DEFdebuff_normal, 1, EXbonus_normal, sATKbuff_normal,
        sDEFdebuff_normal, Cribuff_normal, 0, DMGbuff_normal, DMGdebuff_normal, 0, 0);
    // document.DMG_normal.DMG_low_EX.value = DMG_low_EX;
    DMG_high_EX = keisan_DMG(ATK_normal, 100, 0, Bbonus_all_normal, class1_normal, class2_normal, elemental_normal,
        1.099, ATKbuff_normal, DEFdebuff_normal, 1, EXbonus_normal, sATKbuff_normal,
        sDEFdebuff_normal, Cribuff_normal, 0, DMGbuff_normal, DMGdebuff_normal, 0, 0);
    // document.DMG_normal.DMG_high_EX.value = DMG_high_EX;
    DMG_Cri_ave_1st = keisan_DMG(ATK_normal, Bbonus_1st_normal, CARDbuff_1st_normal, Bbonus_all_normal, class1_normal, class2_normal, elemental_normal,
        1, ATKbuff_normal, DEFdebuff_normal, 2, 100, sATKbuff_normal,
        sDEFdebuff_normal, Cribuff_normal, 1, DMGbuff_normal, DMGdebuff_normal, Bchain_bonus_normal, CARDdebuff_1st_normal);
    // document.DMG_normal.DMG_Cri_ave_1st.value = DMG_Cri_ave_1st;
    DMG_Cri_low_1st = keisan_DMG(ATK_normal, Bbonus_1st_normal, CARDbuff_1st_normal, Bbonus_all_normal, class1_normal, class2_normal, elemental_normal,
        0.9, ATKbuff_normal, DEFdebuff_normal, 2, 100, sATKbuff_normal,
        sDEFdebuff_normal, Cribuff_normal, 1, DMGbuff_normal, DMGdebuff_normal, Bchain_bonus_normal, CARDdebuff_1st_normal);
    // document.DMG_normal.DMG_Cri_low_1st.value = DMG_Cri_low_1st;
    DMG_Cri_high_1st = keisan_DMG(ATK_normal, Bbonus_1st_normal, CARDbuff_1st_normal, Bbonus_all_normal, class1_normal, class2_normal, elemental_normal,
        1.099, ATKbuff_normal, DEFdebuff_normal, 2, 100, sATKbuff_normal,
        sDEFdebuff_normal, Cribuff_normal, 1, DMGbuff_normal, DMGdebuff_normal, Bchain_bonus_normal, CARDdebuff_1st_normal);
    // document.DMG_normal.DMG_Cri_high_1st.value = DMG_Cri_high_1st;
    DMG_Cri_ave_2nd = keisan_DMG(ATK_normal, Bbonus_2nd_normal, CARDbuff_2nd_normal, Bbonus_all_normal, class1_normal, class2_normal, elemental_normal,
        1, ATKbuff_normal, DEFdebuff_normal, 2, 100, sATKbuff_normal,
        sDEFdebuff_normal, Cribuff_normal, 1, DMGbuff_normal, DMGdebuff_normal, Bchain_bonus_normal, CARDdebuff_2nd_normal);
    // document.DMG_normal.DMG_Cri_ave_2nd.value = DMG_Cri_ave_2nd;
    DMG_Cri_low_2nd = keisan_DMG(ATK_normal, Bbonus_2nd_normal, CARDbuff_2nd_normal, Bbonus_all_normal, class1_normal, class2_normal, elemental_normal,
        0.9, ATKbuff_normal, DEFdebuff_normal, 2, 100, sATKbuff_normal,
        sDEFdebuff_normal, Cribuff_normal, 1, DMGbuff_normal, DMGdebuff_normal, Bchain_bonus_normal, CARDdebuff_2nd_normal);
    // document.DMG_normal.DMG_Cri_low_2nd.value = DMG_Cri_low_2nd;
    DMG_Cri_high_2nd = keisan_DMG(ATK_normal, Bbonus_2nd_normal, CARDbuff_2nd_normal, Bbonus_all_normal, class1_normal, class2_normal, elemental_normal,
        1.099, ATKbuff_normal, DEFdebuff_normal, 2, 100, sATKbuff_normal,
        sDEFdebuff_normal, Cribuff_normal, 1, DMGbuff_normal, DMGdebuff_normal, Bchain_bonus_normal, CARDdebuff_2nd_normal);
    // document.DMG_normal.DMG_Cri_high_2nd.value = DMG_Cri_high_2nd;
    DMG_Cri_ave_3rd = keisan_DMG(ATK_normal, Bbonus_3rd_normal, CARDbuff_3rd_normal, Bbonus_all_normal, class1_normal, class2_normal, elemental_normal,
        1, ATKbuff_normal, DEFdebuff_normal, 2, 100, sATKbuff_normal,
        sDEFdebuff_normal, Cribuff_normal, 1, DMGbuff_normal, DMGdebuff_normal, Bchain_bonus_normal, CARDdebuff_3rd_normal);
    // document.DMG_normal.DMG_Cri_ave_3rd.value = DMG_Cri_ave_3rd;
    DMG_Cri_low_3rd = keisan_DMG(ATK_normal, Bbonus_3rd_normal, CARDbuff_3rd_normal, Bbonus_all_normal, class1_normal, class2_normal, elemental_normal,
        0.9, ATKbuff_normal, DEFdebuff_normal, 2, 100, sATKbuff_normal,
        sDEFdebuff_normal, Cribuff_normal, 1, DMGbuff_normal, DMGdebuff_normal, Bchain_bonus_normal, CARDdebuff_3rd_normal);
    // document.DMG_normal.DMG_Cri_low_3rd.value = DMG_Cri_low_3rd;
    DMG_Cri_high_3rd = keisan_DMG(ATK_normal, Bbonus_3rd_normal, CARDbuff_3rd_normal, Bbonus_all_normal, class1_normal, class2_normal, elemental_normal,
        1.099, ATKbuff_normal, DEFdebuff_normal, 2, 100, sATKbuff_normal,
        sDEFdebuff_normal, Cribuff_normal, 1, DMGbuff_normal, DMGdebuff_normal, Bchain_bonus_normal, CARDdebuff_3rd_normal);
    // document.DMG_normal.DMG_Cri_high_3rd.value = DMG_Cri_high_3rd;

    if (is_card_1st_Cri == "Y") {
        DMG_ave_1st = DMG_Cri_ave_1st;
        DMG_low_1st = DMG_Cri_low_1st;
        DMG_high_1st = DMG_Cri_high_1st;
    };

    if (is_card_2nd_Cri == "Y") {
        DMG_ave_2nd = DMG_Cri_ave_2nd;
        DMG_low_2nd = DMG_Cri_low_2nd;
        DMG_high_2nd = DMG_Cri_high_2nd;
    };

    if (is_card_3rd_Cri == "Y") {
        DMG_ave_3rd = DMG_Cri_ave_3rd;
        DMG_low_3rd = DMG_Cri_low_3rd;
        DMG_high_3rd = DMG_Cri_high_3rd;
    };

    document.DMG_normal.DMG_ave_1st.value = DMG_ave_1st;
    document.DMG_normal.DMG_low_1st.value = DMG_low_1st;
    document.DMG_normal.DMG_high_1st.value = DMG_high_1st;
    document.DMG_normal.DMG_ave_2nd.value = DMG_ave_2nd;
    document.DMG_normal.DMG_low_2nd.value = DMG_low_2nd;
    document.DMG_normal.DMG_high_2nd.value = DMG_high_2nd;
    document.DMG_normal.DMG_ave_3rd.value = DMG_ave_3rd;
    document.DMG_normal.DMG_low_3rd.value = DMG_low_3rd;
    document.DMG_normal.DMG_high_3rd.value = DMG_high_3rd;
    document.DMG_normal.DMG_ave_EX.value = DMG_ave_EX;
    document.DMG_normal.DMG_low_EX.value = DMG_low_EX;
    document.DMG_normal.DMG_high_EX.value = DMG_high_EX;


    document.DMG_normal.DMG_ave_total.value = DMG_ave_1st + DMG_ave_2nd + DMG_ave_3rd + DMG_ave_EX;
    document.DMG_normal.DMG_high_total.value = DMG_high_1st + DMG_high_2nd + DMG_high_3rd + DMG_high_EX;
    document.DMG_normal.DMG_low_total.value = DMG_low_1st + DMG_low_2nd + DMG_low_3rd + DMG_low_EX;

};

function keisan_prob() {
    var DMG_1st, DMG_2nd, DMG_3rd, DMG_Ex, DMG_total, buff_1st, buff_2nd, buff_3rd, buff_Ex, buff_total, debuff_1st, debuff_2nd, debuff_3rd, debuff_Ex, debuff_total;
    DMG_1st = parseFloat(document.prob_calc.DMG_1st.value);
    DMG_2nd = parseFloat(document.prob_calc.DMG_2nd.value);
    DMG_3rd = parseFloat(document.prob_calc.DMG_3rd.value);
    DMG_Ex = parseFloat(document.prob_calc.DMG_Ex.value);
    document.prob_calc.DMG_total.value = DMG_1st + DMG_2nd + DMG_3rd + DMG_Ex;

    buff_1st = parseFloat(document.prob_calc.buff_1st.value);
    buff_2nd = parseFloat(document.prob_calc.buff_2nd.value);
    buff_3rd = parseFloat(document.prob_calc.buff_3rd.value);
    buff_Ex = parseFloat(document.prob_calc.buff_Ex.value);
    document.prob_calc.buff_total.value = buff_1st + buff_2nd + buff_3rd + buff_Ex;

    debuff_1st = parseFloat(document.prob_calc.debuff_1st.value);
    debuff_2nd = parseFloat(document.prob_calc.debuff_2nd.value);
    debuff_3rd = parseFloat(document.prob_calc.debuff_3rd.value);
    debuff_Ex = parseFloat(document.prob_calc.debuff_Ex.value);
    document.prob_calc.debuff_total.value = debuff_1st + debuff_2nd + debuff_3rd + debuff_Ex;

    var rand = new Array(200);
    for (let i = 0; i < 200; i++) {
        rand[i] = 0.9 + 0.001 * i;
    }
    console.log(rand)

    var first = new Array(40000);
    var second = new Array(40000);
    for (let x = 0; x < 200; x++) {
        for (let y = 0; y < 200; y++) {
            first[200 * x + y] = calc_damage(DMG_1st, buff_1st - debuff_1st, 0, 0, 0, 0, 0, 0, rand[x]) + calc_damage(0, 0, DMG_2nd, buff_2nd - debuff_2nd, 0, 0, 0, 0, rand[y]);
            second[200 * x + y] = calc_damage(0, 0, 0, 0, DMG_3rd, buff_3rd - debuff_3rd, 0, 0, rand[x]) + calc_damage(0, 0, 0, 0, 0, 0, DMG_Ex, buff_Ex - debuff_Ex, rand[y]);
        }
    }
    first.sort((a, b) => a - b);
    second.sort((a, b) => a - b);
    console.log(first);

    var enermy_hp = parseFloat(document.prob_calc.enermy_hp.value);
    var ret = 0;
    for (let x = 0; x < 40000; x++) {
        ret += 40000 - binarySearch(second, enermy_hp - first[x]);
    }
    ret = ret / (40000 * 40000);
    document.prob_calc.prob_result.value = Math.floor(ret * 10000) / 100 + "%";
};

function calc_damage(l1, s1, l2, s2, l3, s3, l4, s4, rand) {
    return Math.floor((l1 - s1) * rand + s1) + Math.floor((l2 - s2) * rand + s2) + Math.floor((l3 - s3) * rand + s3) + Math.floor((l4 - s4) * rand + s4);
};

/**
 * 2分探索
 * @param Array arr ソート済みの探索対象配列
 * @param Int target 探索する値
 * @return Array 探索結果の添字 見つからなかった場合は-1を返す
 */
function binarySearch(arr, target) {
    let idx = -1;
    let iMin = 0;
    let iMax = arr.length - 1;
    while (iMin <= iMax) {
        let iMid = Math.floor((iMin + iMax) / 2);
        if (arr[iMid] === target) {
            idx = iMid;
            break;
        } else if (arr[iMid] < target) {
            iMin = iMid + 1;
        } else {
            iMax = iMid - 1;
        }
    }
    return iMin;
}
