const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const pixelRatio = window.devicePixelRatio || 1;

  canvas.width = Math.round(rect.width * pixelRatio);
  canvas.height = Math.round(rect.height * pixelRatio);
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#a1a1a1';
  ctx.fillRect(0, 0, rect.width, rect.height);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// 2. 描画イベントの登録
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

// スマホ対応 (タッチイベント)
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

function startDrawing(e) {
  isDrawing = true;
  draw(e); // クリックした瞬間も削る
}

function draw(e) {
  if (!isDrawing) return;
  e.preventDefault(); // スクロール防止

  // マウスまたはタッチの座標を取得
  const rect = canvas.getBoundingClientRect();
  const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
  const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

  // ★ここが重要：重なった部分を透明にする設定
  ctx.globalCompositeOperation = 'destination-out';

  // 削る線のスタイル
  ctx.lineWidth = 15; // 削る太さ
  ctx.lineCap = 'square'; // 角を四角に
  ctx.lineJoin = 'square';

  // 線を描画して削る
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function stopDrawing() {
  isDrawing = false;
  ctx.beginPath(); // パスをリセット
}
