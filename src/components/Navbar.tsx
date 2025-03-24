
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { MenuIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-semibold text-lg">&lt;/&gt;</span>
              </div>
              <h1 className="text-xl font-semibold">
                <span className="text-gradient">Compiler</span> Explorer
              </h1>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#lexeme-tokenizer" 
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Lexeme & Tokenizer
            </a>
            <a 
              href="#expression-evaluator" 
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Expression Evaluator
            </a>
            <a 
              href="#cfg-checker" 
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              CFG Checker
            </a>
            <a 
              href="#parsing-visualizer" 
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Parsing Visualizer
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle className="mr-2" />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-secondary focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-md transition-transform duration-300 ease-in-out transform",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="pt-20 px-6 flex flex-col space-y-6">
          <a 
            href="#lexeme-tokenizer" 
            className="text-lg py-2 border-b border-border"
            onClick={() => setIsMenuOpen(false)}
          >
            Lexeme & Tokenizer
          </a>
          <a 
            href="#expression-evaluator" 
            className="text-lg py-2 border-b border-border"
            onClick={() => setIsMenuOpen(false)}
          >
            Expression Evaluator
          </a>
          <a 
            href="#cfg-checker" 
            className="text-lg py-2 border-b border-border"
            onClick={() => setIsMenuOpen(false)}
          >
            CFG Checker
          </a>
          <a 
            href="#parsing-visualizer" 
            className="text-lg py-2 border-b border-border"
            onClick={() => setIsMenuOpen(false)}
          >
            Parsing Visualizer
          </a>
        </div>
      </div>
    </nav>
  );
};
