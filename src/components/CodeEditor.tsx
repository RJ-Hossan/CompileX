
import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeEditorProps {
  defaultValue?: string;
  language?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  className?: string;
}

export const CodeEditor = ({
  defaultValue = "",
  language = "javascript",
  placeholder = "// Type your code here...",
  onChange,
  onSubmit,
  className,
}: CodeEditorProps) => {
  const [code, setCode] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (defaultValue !== code) {
      setCode(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setCode(newValue);
    onChange?.(newValue);
  };

  const handleSubmit = () => {
    onSubmit?.(code);
  };

  // Handle tab key for indentation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      // Set textarea value to: text before caret + tab + text after caret
      const newValue = `${code.substring(0, start)}\t${code.substring(end)}`;

      // Update state
      setCode(newValue);
      onChange?.(newValue);

      // Move caret position after inserted tab
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 1;
      }, 0);
    }
  };

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden border border-border transition-all duration-300 editor-shadow",
        isFocused ? "border-primary/50 ring-2 ring-primary/10" : "",
        className
      )}
    >
      <div className="flex items-center justify-between py-2 px-4 bg-secondary/50">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="text-xs text-muted-foreground">{language}</div>
      </div>
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full p-4 font-mono text-sm bg-card resize-none focus:outline-none min-h-[200px] max-h-[600px] scrollbar-hide"
          spellCheck="false"
          style={{ whiteSpace: "pre", tabSize: 2 }}
        />
        <button
          onClick={handleSubmit}
          className="absolute bottom-4 right-4 p-2.5 rounded-lg bg-primary text-primary-foreground shadow-lg transition-all duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 hover:scale-105"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
