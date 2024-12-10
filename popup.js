document
  .getElementById("analyzeButton")
  .addEventListener("click", async function handleClickAnalyzeButton() {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: () => {
          const selectedText = window.getSelection().toString();
          return selectedText;
        },
      },
      (injectionResults) => {
        const selectedText = injectionResults[0]?.result;

        if (!selectedText) {
          document.getElementById("result").textContent = "No text selected.";
          return;
        }
        document.getElementById(
          "result"
        ).textContent = `Selected text: ${selectedText}`;
        console.log("Selected text:", selectedText);
      }
    );
  });
// chrome.scripting.executeScript(
//     {
//         code: "window.getSelection().toString();",
//     },
//     (selection) => {
//         const selectedText = selection[0];
//         if (!selectedText) {
//             document.getElementById("result").textContent = selectedText;
//             console.log("selcted text", selectedText);
//             return;
//         }
//     }
// );
