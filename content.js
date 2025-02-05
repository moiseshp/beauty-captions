// 1️⃣ Inyectar la hoja de estilos global (evita el flicker inicial)
const styleElement = document.createElement("link");
styleElement.rel = "stylesheet";
styleElement.href = chrome.runtime.getURL("style.css");
document.head.appendChild(styleElement);

// 2️⃣ Aplicar estilos personalizados en los subtítulos (MutationObserver)
function applySubtitleStyles({ textColor, textSize, bgColor }) {
    const subtitles = document.querySelectorAll(".ytp-caption-segment");
    subtitles.forEach(sub => {
        sub.style.color = textColor;
        sub.style.fontSize = textSize + "px";
        sub.style.backgroundColor = bgColor;
    });
}

// 3️⃣ Detectar cuando YouTube cambia los subtítulos y forzar los estilos
const observer = new MutationObserver(() => {
    chrome.storage.sync.get(["textColor", "textSize", "bgColor"], (data) => {
        applySubtitleStyles(data);
    });
});

// 4️⃣ Observar el contenedor de subtítulos en YouTube
const observeSubtitles = () => {
    const subtitleContainer = document.querySelector(".ytp-caption-window-container");
    if (subtitleContainer) {
        observer.observe(subtitleContainer, { childList: true, subtree: true });
    }
};

// 5️⃣ Esperar a que el contenedor de subtítulos aparezca y aplicar la observación
const interval = setInterval(() => {
    if (document.querySelector(".ytp-caption-window-container")) {
        observeSubtitles();
        clearInterval(interval);
    }
}, 1000);
