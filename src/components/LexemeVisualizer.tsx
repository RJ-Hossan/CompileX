
import { useState, useEffect } from "react";
import { generateLexemes } from "@/utils/compiler";
import { cn } from "@/lib/utils";

interface LexemeVisualizerProps {
  code: string;
  className?: string;
}

export const LexemeVisualizer = ({ code, className }: LexemeVisualizerProps) => {
  const [lexemes, setLexemes] = useState<string[]>([]);
  const [animateIndex, setAnimateIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!code) {
      setLexemes([]);
      return;
    }
    
    const newLexemes = generateLexemes(code);
    setLexemes([]);
    
    // Animate lexemes appearing one by one
    newLexemes.forEach((_, index) => {
      setTimeout(() => {
        setLexemes(newLexemes.slice(0, index + 1));
        setAnimateIndex(index);
      }, index * 100);
    });
    
    setTimeout(() => {
      setAnimateIndex(null);
    }, newLexemes.length * 100 + 500);
    
  }, [code]);

  if (lexemes.length === 0) {
    return (
      <div className={cn("p-6 text-center text-muted-foreground", className)}>
        Enter code in the editor to see lexemes
      </div>
    );
  }

  return (
    <div className={cn("p-4", className)}>
      <h3 className="text-lg font-medium mb-3">Lexemes</h3>
      <div className="flex flex-wrap gap-2">
        {lexemes.map((lexeme, index) => (
          <div
            key={index}
            className={cn(
              "px-2.5 py-1.5 rounded-md font-mono text-sm transition-all duration-300",
              "border border-border bg-card",
              animateIndex === index ? "animate-scale-in" : "",
            )}
          >
            {lexeme}
          </div>
        ))}
      </div>
    </div>
  );
};
