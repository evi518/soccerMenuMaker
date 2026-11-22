// IDの紐づけ
const timeSelect = document.getElementById("time-select"); // 時間
const themeSelect = document.getElementById("theme-select"); // テーマ
const generateBtn = document.getElementById("generate-btn"); // 作成ボタン
const menuResult = document.getElementById("menu-result"); // 結果

// イベントハンドラ(ボタンクリックイベント)
generateBtn.addEventListener("click", () => {
    // 時間を取得
    const maxMinutes = Number(timeSelect.value);
    // テーマを取得
    const theme = themeSelect.value;
    // メニュー絞り込み
    const picked = pickMenus(maxMinutes, theme);
    // メニュー表示
    renderMenus(picked);
});

// メニュー絞り込み
// maxMinutes 時間
// theme テーマ
function pickMenus(maxMinutes, theme) {
    // テーマで絞り込む
    let pool = theme === "all" ? // allかどうか
        [...menus] : // allの場合
        menus.filter((d) => d.theme === theme); // テーマで絞る
    // 絞り込んだメニューをシャッフルする
    const shuffled = pool.sort(() => Math.random() - 0.5);
    // 選択したメニュー格納用の配列
    const selected = [];
    // 合計時間
    let total = 0;

    // シャッフルしたメニューを最大時間内に絞り込む
    for (const item of shuffled) {
        // 合計時間が最大時間以下の場合
        if (total + item.minutes <= maxMinutes) {
            // メニューを追加
            selected.push(item);
            // 合計時間に加算
            total += item.minutes;
        }
    }

    // すべて以外で、合計時間が余っている場合
    if (theme !== "all" && total < maxMinutes) {
        // ほかテーマのメニューをシャッフルして取得
        const others = menus
            .filter((d) => d.theme !== theme)
            .sort(() => Math.random() - 0.5);
        // 絞り込んだメニューでループする
        for (const item of others) {
            // 合計時間が最大時間以下の場合
            if (total + item.minutes <= maxMinutes) {
                // メニューを追加
                selected.push(item);
                // 合計時間に加算
                total += item.minutes;
            }
        }
    }

    // 絞り込んだ結果を返却
    return selected;    
}

// メニュー表示
function renderMenus(items) {
    // メニュー表示を空にする
    menuResult.innerHTML = "";
    // メニューを一つずつ追加する
    items.forEach((item) => {
        const card = document.createElement("article");
        card.className = "menu-card";
        card.innerHTML = `
            <div class="menu-header">
            <strong>${item.name}</strong>
            <span>${item.minutes}分</span>
            </div>
            <p class="menu-point">${item.point}</p>
        `;
        menuResult.appendChild(card);
    });
}

const menus = [
    // ボールタッチ（touch）
    { name: "インサイド・アウトサイドタッチ", theme: "touch", minutes: 5, point: "足首を固定してテンポよく" },
    { name: "リフティング（イン・アウト交互）", theme: "touch", minutes: 5, point: "膝下だけでなく体全体でリズムを取る" },
    { name: "ソールロール＆タップ", theme: "touch", minutes: 5, point: "足裏でボールを転がしながら目線は前へ" },
    { name: "片足交互タッチ（左右リズム）", theme: "touch", minutes: 10, point: "力まず軽いステップで一定のテンポを刻む" },
    { name: "インステップリフティング（高さ制限）", theme: "touch", minutes: 10, point: "腰〜胸の高さをキープしてコントロール" },

    // ドリブル（dribble）
    { name: "コーンドリブル（小刻み）", theme: "dribble", minutes: 10, point: "重心低く、顔を上げて前を見る" },
    { name: "シザース＆フェイント反復", theme: "dribble", minutes: 10, point: "踏み込みの速さと体の傾きを意識" },
    { name: "方向転換ドリブル（切り返し）", theme: "dribble", minutes: 15, point: "軸足をしっかり踏み込んで加速" },
    { name: "アウトサイド突破ドリブル", theme: "dribble", minutes: 5, point: "相手の逆を取る角度でボールを押し出す" },
    { name: "ストップ＆ゴー（緩急）", theme: "dribble", minutes: 10, point: "ピタッと止まってからの一歩目を素早く" },

    // トラップ（trap）
    { name: "浮き球インステップトラップ", theme: "trap", minutes: 10, point: "ボールの勢いを殺して足元に置く" },
    { name: "壁当て＆ワンタッチコントロール", theme: "trap", minutes: 15, point: "次のプレーが出しやすい位置へ" },
    { name: "アウトサイドトラップ（進行方向へ）", theme: "trap", minutes: 5, point: "受けた瞬間に次の方向へ運べる位置へ" },
    { name: "インサイドトラップ＆ターン", theme: "trap", minutes: 10, point: "ボールを隠すように体を入れて反転" },
    { name: "バウンドボールの足裏コントロール", theme: "trap", minutes: 5, point: "着地のタイミングに合わせて柔らかく押さえる" },

    // シュート（shoot）
    { name: "インサイドシュート（コース狙い）", theme: "shoot", minutes: 10, point: "軸足の向きとフォロースルーを意識" },
    { name: "インステップシュート（ミート重視）", theme: "shoot", minutes: 10, point: "つま先を伸ばし、ボールの中心を捉える" },
    { name: "トラップからのシュート一連動作", theme: "shoot", minutes: 15, point: "置く位置を半歩前にしてすぐ打つ" },
    { name: "ニア・ファー打ち分け練習", theme: "shoot", minutes: 5, point: "打つ直前までコースを悟られないように" },
    { name: "反転からのクイックシュート", theme: "shoot", minutes: 10, point: "ターンと振り抜きの流れを止めない" }
];