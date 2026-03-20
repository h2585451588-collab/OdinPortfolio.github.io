// =====================
// Visitor counter (+1~5)
// =====================
(function counter() {
  const el = document.getElementById("counter");
  const inline = document.getElementById("counterInline");
  if (!el || !inline) return;

  const raw = (el.textContent || "").trim();
  const n = parseInt(raw, 10);
  if (Number.isNaN(n)) return;

  const next = n + (Math.floor(Math.random() * 5) + 1);
  const padded = String(next).padStart(raw.length || 6, "0");
  el.textContent = padded;
  inline.textContent = padded;
})();


// =====================
// Win95 draggable window
// =====================
(function draggablePlayer() {
  const win = document.getElementById("playerWin");
  const drag = document.getElementById("playerDrag");
  if (!win || !drag) return;

  let dragging = false;
  let startX = 0, startY = 0;
  let winX = 0, winY = 0;

  drag.addEventListener("mousedown", (e) => {
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;

    const rect = win.getBoundingClientRect();
    winX = rect.left;
    winY = rect.top;

    e.preventDefault();
  });

  window.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    win.style.left = `${Math.max(0, winX + dx)}px`;
    win.style.top  = `${Math.max(0, winY + dy)}px`;
  });

  window.addEventListener("mouseup", () => { dragging = false; });
})();


// =====================
// Click-to-play YouTube
// =====================
(function clickToPlayYouTube() {
  const embeds = document.querySelectorAll(".yt-embed[data-video-id]");
  if (!embeds.length) return;

  embeds.forEach((wrap) => {
    const vid = wrap.getAttribute("data-video-id");
    if (!vid) return;

    const overlay = wrap.querySelector(".yt-overlay");
    const thumb = wrap.querySelector(".yt-thumb");

    function play() {
      const iframe = document.createElement("iframe");
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.style.border = "0";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;

      // autoplay=1: 点击后立即播放
      iframe.src = `https://www.youtube.com/embed/${vid}?autoplay=1&rel=0`;

      wrap.innerHTML = "";
      wrap.appendChild(iframe);
    }

    // overlay 存在就绑定
    if (overlay) {
      overlay.addEventListener("click", play);
      overlay.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") play();
      });
    }

    // 缩略图也可点击播放（更稳）
    if (thumb) {
      thumb.style.cursor = "pointer";
      thumb.addEventListener("click", play);
    }
  });
})();