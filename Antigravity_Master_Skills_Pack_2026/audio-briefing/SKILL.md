---
name: audio-briefing
description: "Generates studio-grade British neural audio briefings (en-GB-RyanNeural) and embeds interactive audio widgets inline in chat responses. Use whenever providing long explanations, task completion summaries, or when the user wants to listen to responses hands-free."
version: 1.0.0
category: audio-interface
tags: [audio, voice, tts, speech, neural-hd, accessibility, hands-free]
---

# Audio Briefing Skill

This skill allows the agent to deliver **crystal-clear, studio-grade spoken audio briefings** directly inside the chat interface using Microsoft Edge's British Neural Voice engine (`en-GB-RyanNeural`).

---

## 1. When to Use This Skill

* Whenever delivering a comprehensive response or project milestone.
* Whenever the user asks to hear the response or requests an audio summary.
* Whenever the user is working hands-free or dictating via microphone.

---

## 2. Operational Workflow

1. **Distill Executive Summary:**
   Extract a concise, 2–3 sentence executive summary of the response. Strip out raw code blocks, file paths, and terminal logs so the text is articulate and pleasant to hear.
2. **Generate the Studio Audio Widget:**
   Run the bundled generator script to synthesize the audio and write the HTML artifact:

   ```powershell
   & "$env:USERPROFILE\.local\bin\uv.exe" tool run edge-tts --version > $null
   python "C:\Users\amanc\.gemini\config\skills\audio-briefing\scripts\generate_widget.py" --text "<SUMMARY_TEXT>" --output "<ARTIFACT_DIR>\neural_audio_player.html"
   ```

3. **Embed Inline in Chat:**
   At the bottom of your response, embed the generated widget:

   ```html
   <agent-embed src="file:///<ARTIFACT_DIR>/neural_audio_player.html"></agent-embed>
   ```

---

## 3. Instant Removal / Kill Switch

If the user ever asks to disable or remove audio briefings, delete this skill directory:
```powershell
Remove-Item "C:\Users\amanc\.gemini\config\skills\audio-briefing" -Recurse -Force
```
This safely removes the feature in 2 seconds with zero residual system impact.
