chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action !== "analyzeText") return;

  const apiKey = "AIzaSyCnorFFJMrZWeZFdkcf5wrP9tkD6AXVzrM";
  const apiUrl = `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${apiKey}`;

  //Postanfrage an API
  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      document: { type: "PLAIN_TEXT", content: message.text },
      encodingType: "UTF8",
    }),
  })
    .then((response) => response.json()) //JSON zu JavaScript
    //Data wird zurückgegeben
    .then((data) =>
      sendResponse(data.documentSentiment || { error: "Invalid API response" })
    )
    .catch(() => sendResponse({ error: "API request failed" }));

  return true;
});
