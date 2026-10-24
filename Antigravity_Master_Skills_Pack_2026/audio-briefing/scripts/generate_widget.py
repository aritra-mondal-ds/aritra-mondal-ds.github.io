"""
Audio Briefing Generator
Synthesizes studio-grade British neural speech (en-GB-RyanNeural)
and packages it into a self-contained HTML5 Generative UI player widget.
"""

import os
import sys
import argparse
import asyncio
import tempfile
import base64
from pathlib import Path

DEFAULT_VOICE = "en-GB-RyanNeural"

HTML_TEMPLATE = """<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script src="https://www.gstatic.com/antigravity/web/dev/tailwindcss.min.js"></script>
</head>
<body class="bg-transparent text-[var(--foreground)] antialiased p-2 font-sans select-none">
  <div class="bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] rounded-xl p-3 shadow-sm flex items-center justify-between gap-4 max-w-lg">
    <div class="flex items-center gap-3 flex-1 min-w-0">
      <button id="playBtn" onclick="togglePlay()" class="w-10 h-10 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shadow-sm flex-shrink-0 cursor-pointer">
        <svg id="playIcon" class="w-5 h-5 ml-0.5 fill-current" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
        <svg id="pauseIcon" class="w-5 h-5 fill-current hidden" viewBox="0 0 24 24">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
      </button>
      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-2">
          <span class="text-xs font-semibold text-[var(--foreground)] tracking-tight truncate">Executive Audio Briefing</span>
          <span class="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-medium bg-[var(--accent)] text-[var(--foreground)] opacity-90 flex-shrink-0">
            Studio Neural HD
          </span>
        </div>
        <div id="statusText" class="text-xs text-[var(--muted-foreground)] mt-0.5">Click to listen (British Ryan Neural)</div>
        <div class="w-full bg-[var(--border)] h-1 rounded-full mt-2 overflow-hidden">
          <div id="progressBar" class="bg-[var(--primary)] h-full w-0 transition-all duration-100"></div>
        </div>
      </div>
    </div>
    <span id="timeText" class="text-xs font-mono text-[var(--muted-foreground)] flex-shrink-0">--:--</span>
  </div>

  <audio id="audioElement" src="data:audio/mp3;base64,{BASE64_AUDIO}"></audio>

  <script>
    const audio = document.getElementById("audioElement");
    const playIcon = document.getElementById("playIcon");
    const pauseIcon = document.getElementById("pauseIcon");
    const statusText = document.getElementById("statusText");
    const progressBar = document.getElementById("progressBar");
    const timeText = document.getElementById("timeText");

    function formatTime(sec) {
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return m + ":" + (s < 10 ? "0" : "") + s;
    }

    audio.onloadedmetadata = () => {
      timeText.textContent = formatTime(audio.duration);
    };

    function togglePlay() {
      if (audio.paused) {
        audio.play();
        playIcon.classList.add("hidden");
        pauseIcon.classList.remove("hidden");
        statusText.textContent = "Playing neural briefing...";
      } else {
        audio.pause();
        playIcon.classList.remove("hidden");
        pauseIcon.classList.add("hidden");
        statusText.textContent = "Paused";
      }
    }

    audio.ontimeupdate = () => {
      if (audio.duration) {
        const pct = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = pct + "%";
        const rem = Math.ceil(audio.duration - audio.currentTime);
        timeText.textContent = formatTime(rem);
      }
    };

    audio.onended = () => {
      playIcon.classList.remove("hidden");
      pauseIcon.classList.add("hidden");
      statusText.textContent = "Playback completed";
      progressBar.style.width = "0%";
      timeText.textContent = formatTime(audio.duration);
    };
  </script>
</body>
</html>
"""

async def generate_audio_base64(text: str, voice: str = DEFAULT_VOICE) -> str:
    """Synthesizes speech via edge-tts and returns base64-encoded audio string."""
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as tmp:
        tmp_path = tmp.name

    try:
        cmd = [
            "edge-tts",
            "--voice", voice,
            "--rate", "+0%",
            "--pitch", "-1Hz",
            "--text", text,
            "--write-media", tmp_path
        ]
        
        proc = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        stdout, stderr = await proc.communicate()
        if proc.returncode != 0:
            raise RuntimeError(f"edge-tts failed: {stderr.decode('utf-8', errors='ignore')}")

        with open(tmp_path, "rb") as f:
            audio_bytes = f.read()

        return base64.b64encode(audio_bytes).decode("utf-8")
    finally:
        if os.path.exists(tmp_path):
            try:
                os.remove(tmp_path)
            except Exception:
                pass

def build_widget(text: str, output_file: str, voice: str = DEFAULT_VOICE):
    """Generates the audio and writes the complete HTML artifact."""
    b64_audio = asyncio.run(generate_audio_base64(text, voice=voice))
    html_content = HTML_TEMPLATE.replace("{BASE64_AUDIO}", b64_audio)
    
    out_path = Path(output_file)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html_content)

    print(f"[Success] Widget generated: {out_path.resolve()}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate Neural Audio Player Widget")
    parser.add_argument("--text", required=True, help="Text to speak in the audio briefing")
    parser.add_argument("--output", required=True, help="Target HTML file path")
    parser.add_argument("--voice", default=DEFAULT_VOICE, help="Voice identifier (default: en-GB-RyanNeural)")
    args = parser.parse_args()

    build_widget(args.text, args.output, voice=args.voice)
