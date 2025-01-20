function addContainersToPosts() {
  const posts = document.querySelectorAll(
    'article[role="article"], a[data-ks-id][slot="full-post-link"]'
  );

  posts.forEach((post) => {
    if (post.parentElement.querySelector(".custom-container")) return;

    const container = document.createElement("div");
    container.className = "custom-container";
    container.style.cssText = `
          width: 50px;
          height: 50px;
          background-color: white;
          position: absolute;
          right: -60px;
          top: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          z-index: 9999;`;

    post.parentElement.style.position = "relative";
    post.parentElement.appendChild(container);

    const textContent = post.innerText || post.getAttribute("href");

    chrome.runtime.sendMessage(
      { action: "analyzeText", text: textContent },
      (response) => {
        if (response?.score !== undefined) {
          let sentimentEmoji = "🙂";
          if (response.score > 0.0) sentimentEmoji = "😄";
          else if (response.score < 0.0) sentimentEmoji = "😠";

          container.textContent = sentimentEmoji;
        } else {
          container.textContent = "❌";
        }
      }
    );
  });
}

// Beobachtung von DOM-Änderungen mit MutationObserver
if (typeof observer === "undefined") {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.addedNodes &&
        [...mutation.addedNodes].some(
          (node) =>
            node.nodeType === 1 &&
            node.matches(
              'article[role="article"], a[data-ks-id][slot="full-post-link"]'
            )
        )
      ) {
        addContainersToPosts();
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Initialen Aufruf sicherstellen
addContainersToPosts();
// Überprüfen, ob content.js bereits aktiv ist
if (!window.isContentActive) {
  window.isContentActive = true;

  // Beispiel: Hinzufügen eines dynamischen Elements
  const dynamicElement = document.createElement("div");
  dynamicElement.className = "dynamic-element";
  dynamicElement.textContent = "Injected content by content.js";
  document.body.appendChild(dynamicElement);

  // Beispiel: Hinzufügen einer Klasse
  document.body.classList.add("custom-class");

  // Cleanup-Funktion definieren
  window.cleanUpContent = () => {
    // Entferne dynamisch hinzugefügte Elemente
    document.querySelectorAll(".dynamic-element").forEach((el) => el.remove());
    document.body.classList.remove("custom-class");
    window.isContentActive = false;
    console.log("Cleanup abgeschlossen: Änderungen von content.js entfernt.");
  };

  console.log("content.js aktiviert: Elemente hinzugefügt.");
} else {
  console.log(
    "content.js ist bereits aktiv, keine weiteren Änderungen vorgenommen."
  );
}
