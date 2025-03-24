
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for user preference in localStorage or system preference
    const storedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (storedTheme === "dark" || (!storedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-full transition-all duration-300 no-tap-highlight",
        "hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/20",
        className
      )}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <Sun
          className={cn(
            "absolute w-5 h-5 transition-all duration-300",
            isDarkMode 
              ? "opacity-0 rotate-90 scale-0" 
              : "opacity-100 rotate-0 scale-100 text-amber-500"
          )}
        />
        <Moon
          className={cn(
            "absolute w-5 h-5 transition-all duration-300",
            isDarkMode 
              ? "opacity-100 rotate-0 scale-100 text-indigo-400" 
              : "opacity-0 -rotate-90 scale-0"
          )}
        />
      </div>
    </button>
  );
};
