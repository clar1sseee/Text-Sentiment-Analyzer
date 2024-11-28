console.log("dummy1");
document
  .getElementById("analyzeButton")
  .addEventListener("click", async function handleClickAnalyzeButton() {
    console.log("dummy2");
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const selectedText = window.getSelection().toString();
        console.log("dummy3", selectedText);
        if (!selectedText) {
          document.getElementById("result").textContent = selectedText;
          console.log("selcted text", selectedText);
          return;
        }
      },
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
  });
