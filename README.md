# Text Sentiment Analyzer

Die **Chrome Extension: Text Sentiment Analyzer** wurde entwickelt, um Menschen mit Autismus oder Schwierigkeiten im Erkennen von Emotionen in geschriebenem Text zu unterstützen. Diese Erweiterung bietet eine intuitive Möglichkeit, emotionale Tonalitäten in Texten schnell und einfach zu analysieren.

## 📋 Features

- **Emotionale Analyse von markiertem Text**:
  Nutzer können Textpassagen markieren und per Klick eine Analyse erhalten, die die emotionale Tonalität (positiv, negativ, neutral) mit emojis liefert und den sentiment score anzeigt.

- **Automatische Analyse auf Social-Media-Plattformen**:
  Die Erweiterung zeigt neben Beiträgen auf Plattformen wie Twitter und Reddit Pop-up-Symbole an, die die vorherrschende Emotion visualisieren.

- **Visuelle Symbole und Erklärungen**:
  Klare und einfache Icons helfen Nutzern, Emotionen auf einen Blick zu erkennen.

## 🚀 Installation

1. **Repository klonen:**

   ```bash
   git clone https://github.com/dein-username/emotion-text-analyzer.git
   ```

2. **Chrome-Extension aktivieren:**

   - Gehe in Chrome zu `chrome://extensions/`.
   - Aktiviere den Entwicklermodus (Schalter oben rechts).
   - Klicke auf **"Entpackte Erweiterung laden"**.
   - Wähle den Ordner `TextSentimentAnalyzer` aus dem heruntergeladenen Repository.
   - Pinne die Extension oben im Menü an
   - Klicke mit Rechtsklick auf das Icon und wähle "Seitenleiste öffnen

3. **Extension verwenden:**
   - Markiere einen Text auf einer Webseite und klicke auf das Extension-Icon, um die Analyse zu starten.
     **Keyboard Shortcut:** Windows: Ctrl +Shift + X / Mac: Command + Shift + X
   - Navigiere zu X oder Reddit und aktiviere den Schalter, um die Analyse von Beiträgen auf der Plattform zu starten.
     **Keyboard Shortcut:** Windows: Ctrl + Shift+ Y / Mac: Command + Shift + Y

## 🛠️ Technologie

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Verwendet die Natural Language API für die emotionale Bewertung von Texten
- **Chrome Extension:** Manifest V3, Content Scripts, Background Scripts
