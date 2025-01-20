document
  .getElementById("analyzeButton")
  .addEventListener("click", async function () {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: () => window.getSelection().toString(),
      },
      (injectionResults) => {
        const selectedText = injectionResults[0]?.result;

        const initialMessage = document.getElementById("initialMessage");
        const resultContainer = document.getElementById("result");
        const selectedTextElement = document.getElementById("selectedText");
        const moodElement = document.getElementById("mood");
        const scoreElement = document.getElementById("sentimentScore");
        const errorMessage = document.getElementById("errorMessage");

        selectedTextElement.textContent = "";
        moodElement.textContent = "";
        scoreElement.textContent = "";
        errorMessage.textContent = "";

        if (!selectedText) {
          errorMessage.textContent = "No text selected.";
          resultContainer.classList.add("hidden");
          initialMessage.style.display = "none";
          return;
        }

        errorMessage.textContent = "";
        initialMessage.style.display = "none";
        resultContainer.classList.remove("hidden");
        selectedTextElement.textContent = selectedText;

        chrome.runtime.sendMessage(
          { action: "analyzeText", text: selectedText },
          (response) => {
            if (response?.score !== undefined) {
              let sentimentLabel = "Neutral 🙂";
              if (response.score > 0.0) sentimentLabel = "Positive 😄";
              else if (response.score < 0.0) sentimentLabel = "Negative 😠";

              moodElement.textContent = sentimentLabel;
              scoreElement.textContent = response.score;
            } else {
              errorMessage.textContent = "Error analyzing text.";
              resultContainer.classList.add("hidden");
              initialMessage.style.display = "block";
            }
          }
        );
      }
    );
  });
document.getElementById("analyzeSM").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"],
  });
});
