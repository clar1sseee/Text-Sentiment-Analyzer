function updateEmojiAriaLabel(container) {
  //aria label für emojis
  const emoji = container.textContent.trim();

  let ariaLabel;
  if (emoji === "😐") {
    ariaLabel = "neutral emotion";
  } else if (emoji === "😄") {
    ariaLabel = "positive emotion";
  } else if (emoji === "😠") {
    ariaLabel = "negative emotion";
  } else {
    ariaLabel = "unknown emotion";
  }

  container.setAttribute("aria-label", ariaLabel);
}

let isSwitchEnabled = false; // Switch ist Deaktiviert

function addContainersToPosts() {
  //Container Funktion
  if (!isSwitchEnabled) return;

  const posts = document.querySelectorAll(
    //Container werden rausgesucht
    'article[role="article"], a[data-ks-id][slot="full-post-link"]'
  );

  posts.forEach((post) => {
    //Überspringen von Posts die schon Container haben
    if (post.parentElement.querySelector(".custom-container")) return;

    //Container
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
          font-size: 20px;
          z-index: 9999;
          font-size: 40px;
        `;
    container.setAttribute("tabindex", "0"); //mit Tab lesbar
    container.setAttribute("role", "status"); //status element mit dynamischen
    container.addEventListener("focus", () => {
      container.style.outline = "2px solid black"; //Fokus
    });
    container.addEventListener("blur", () => {
      container.style.outline = "none"; // Fokus entfernen
    });

    post.parentElement.style.position = "relative";
    post.parentElement.appendChild(container);

    //Inhalt bzw URL wird genommen
    const textContent = post.innerText || post.getAttribute("href");

    //Sendet Text zur Analysis
    chrome.runtime.sendMessage(
      { action: "analyzeText", text: textContent },
      (response) => {
        if (response?.score !== undefined) {
          let sentimentEmoji = "😐";
          if (response.score > 0.0) sentimentEmoji = "😄";
          else if (response.score < 0.0) sentimentEmoji = "😠";

          container.textContent = sentimentEmoji;
          updateEmojiAriaLabel(container);
        } else {
          container.textContent = "❌";
          updateEmojiAriaLabel(container);
        }
      }
    );
  });
}

//DOM Änderungen und Funktions aufruf
const observer = new MutationObserver(addContainersToPosts);
observer.observe(document.body, { childList: true, subtree: true });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleSwitch") {
    isSwitchEnabled = message.enabled; //Switch aktualisieren
    if (!isSwitchEnabled) {
      //Switch OFF
      document.querySelectorAll(".custom-container").forEach((container) => {
        container.remove();
      });
    } else {
      addContainersToPosts(); //Switch ON
    }
  }
});
