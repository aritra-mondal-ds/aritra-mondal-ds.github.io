"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-lg border border-border bg-card/50 flex items-center justify-center text-muted-foreground" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative h-9 w-9 rounded-lg border border-border bg-card/60 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors shadow-sm"
      aria-label="Toggle theme"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-amber-400 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-indigo-600 transition-transform hover:-rotate-12" />
      )}
    </button>
  );
}
