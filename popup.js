document.getElementById("analyzeButton").addEventListener("click", () => {
    chrome.tabs.executeScript(
        {
            code: "window.getSelection().toString();",
        },
        (selection) => {
            const selectedText = selection[0];
            if (!selectedText) {
                document.getElementById("result").textContent = "Bitte Text markieren.";
                return;
            }
        }
    );
});
