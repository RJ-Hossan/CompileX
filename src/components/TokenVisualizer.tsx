
import { useState, useEffect } from "react";
import { tokenize, TokenType } from "@/utils/compiler";
import { cn } from "@/lib/utils";

interface TokenVisualizerProps {
  code: string;
  className?: string;
}

export const TokenVisualizer = ({ code, className }: TokenVisualizerProps) => {
  const [tokens, setTokens] = useState<{ type: TokenType; value: string }[]>([]);
  const [animateIndex, setAnimateIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!code) {
      setTokens([]);
      return;
    }
    
    const newTokens = tokenize(code)
      .filter(token => token.type !== TokenType.WHITESPACE)
      .map(token => ({ type: token.type, value: token.value }));
    
    setTokens([]);
    
    // Animate tokens appearing one by one
    newTokens.forEach((_, index) => {
      setTimeout(() => {
        setTokens(newTokens.slice(0, index + 1));
        setAnimateIndex(index);
      }, index * 100);
    });
    
    setTimeout(() => {
      setAnimateIndex(null);
    }, newTokens.length * 100 + 500);
  }, [code]);

  const getTokenColor = (type: TokenType): string => {
    switch (type) {
      case TokenType.KEYWORD:
        return "bg-blue-100 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800";
      case TokenType.IDENTIFIER:
        return "bg-purple-100 border-purple-200 dark:bg-purple-900/30 dark:border-purple-800";
      case TokenType.NUMBER:
        return "bg-amber-100 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800";
      case TokenType.STRING:
        return "bg-green-100 border-green-200 dark:bg-green-900/30 dark:border-green-800";
      case TokenType.OPERATOR:
        return "bg-red-100 border-red-200 dark:bg-red-900/30 dark:border-red-800";
      case TokenType.PUNCTUATION:
        return "bg-gray-100 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700";
      case TokenType.COMMENT:
        return "bg-slate-100 border-slate-200 dark:bg-slate-800/50 dark:border-slate-700";
      default:
        return "bg-card border-border";
    }
  };

  if (tokens.length === 0) {
    return (
      <div className={cn("p-6 text-center text-muted-foreground", className)}>
        Enter code in the editor to see tokens
      </div>
    );
  }

  return (
    <div className={cn("p-4", className)}>
      <h3 className="text-lg font-medium mb-3">Tokens</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-2 text-left">Token</th>
              <th className="px-4 py-2 text-left">Type</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, index) => (
              <tr 
                key={index}
                className={cn(
                  "border-b border-border/50 transition-opacity duration-300",
                  animateIndex === index ? "animate-fade-in" : ""
                )}
              >
                <td className="px-4 py-2 font-mono">{token.value}</td>
                <td className="px-4 py-2">
                  <span 
                    className={cn(
                      "px-2 py-0.5 rounded text-xs font-medium border",
                      getTokenColor(token.type)
                    )}
                  >
                    {token.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
