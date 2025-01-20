function addContainersToPosts() {
  const posts = document.querySelectorAll(
    "a[data-ks-id][slot='full-post-link']"
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
          font-size: 20px;
          z-index: 9999;
          font-size: 40px;
        `;
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
const observer = new MutationObserver(addContainersToPosts);
observer.observe(document.body, { childList: true, subtree: true });
addContainersToPosts();
