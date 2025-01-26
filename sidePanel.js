document
  .getElementById("analyzeButton")
  .addEventListener("click", async function () {
    const [tab] = await chrome.tabs.query({
      //Tab info werden gelesen bzw gespeichert
      active: true,
      currentWindow: true,
    });

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        //Funktion um markierten Text zu lesen
        func: () => window.getSelection().toString(),
      },
      (injectionResults) => {
        const selectedText = injectionResults[0]?.result;

        //Referenzen auf HTML Elemente
        const initialMessage = document.getElementById("initialMessage");
        const resultContainer = document.getElementById("result");
        const selectedTextElement = document.getElementById("selectedText");
        const moodElement = document.getElementById("mood");
        const scoreElement = document.getElementById("sentimentScore");
        const errorMessage = document.getElementById("errorMessage");

        //Zurücksetzen
        selectedTextElement.textContent = "";
        moodElement.textContent = "";
        scoreElement.textContent = "";
        errorMessage.textContent = "";

        //Überprüfung, ob Text markiert wurde
        if (!selectedText) {
          errorMessage.textContent = "No text selected.";
          resultContainer.classList.add("hidden");
          initialMessage.style.display = "none";
          return;
        }

        errorMessage.textContent = "";
        initialMessage.style.display = "none";
        resultContainer.classList.remove("hidden");
        selectedTextElement.textContent = selectedText; //Text wird Angezeigt

        //An Background gesendet
        chrome.runtime.sendMessage(
          { action: "analyzeText", text: selectedText },
          (response) => {
            if (response?.score !== undefined) {
              let sentimentLabel = "Neutral 😐";
              if (response.score > 0.0) sentimentLabel = "Positive 😄";
              else if (response.score < 0.0) sentimentLabel = "Negative 😠";

              //Ergebnis Anzeige
              moodElement.textContent = sentimentLabel;
              scoreElement.textContent = response.score;
            } else {
              //Fehler Anzeige
              errorMessage.textContent = "Error analyzing text.";
              resultContainer.classList.add("hidden");
              initialMessage.style.display = "block";
            }
          }
        );
      }
    );
  });

document
  .getElementById("checkboxAnalyzeSM")
  .addEventListener("change", function (event) {
    const isEnabled = event.target.checked; //Prüft welcher stand Checkbox ist

    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      //sendet Nachricht an content script, um zu schauen ob Funktion enabled ist oder nicht
      chrome.tabs.sendMessage(tab.id, {
        action: "toggleSwitch",
        enabled: isEnabled,
      });
    });
  });

//Überprüft die aktion und führt das jeweilige Button aus
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "simulate_click_switch") {
    const switchButton = document.querySelector("#checkboxAnalyzeSM");
    if (switchButton) {
      switchButton.click();
    } else {
      console.error("Switch-Button (#checkboxAnalyzeSM) nicht gefunden");
    }
  } else if (message.action === "simulate_click_analyze") {
    const analyzeButton = document.querySelector("#analyzeButton");
    if (analyzeButton) {
      analyzeButton.click();
    } else {
      console.error("Analyze-Button (#analyzeButton) nicht gefunden");
    }
  }
});
