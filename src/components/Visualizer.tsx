
import { useState } from "react";
import { CodeEditor } from "./CodeEditor";
import { LexemeVisualizer } from "./LexemeVisualizer";
import { TokenVisualizer } from "./TokenVisualizer";
import { evaluateExpression, checkCFG } from "@/utils/compiler";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Split, Calculator, FileTerminal } from "lucide-react";
import { cn } from "@/lib/utils";

export const Visualizer = () => {
  const [code, setCode] = useState("");
  const [expression, setExpression] = useState("");
  const [grammar, setGrammar] = useState("");
  const [testString, setTestString] = useState("");
  const [evaluationResult, setEvaluationResult] = useState<{ result: string | number, steps: string[] } | null>(null);
  const [cfgResult, setCfgResult] = useState<{ accepted: boolean, steps: string[] } | null>(null);

  const handleCodeSubmit = (value: string) => {
    setCode(value);
  };

  const handleExpressionSubmit = (value: string) => {
    setExpression(value);
    const result = evaluateExpression(value);
    setEvaluationResult(result);
  };

  const handleGrammarSubmit = (value: string) => {
    setGrammar(value);
    if (testString) {
      const result = checkCFG(value, testString);
      setCfgResult(result);
    }
  };

  const handleTestStringSubmit = (value: string) => {
    setTestString(value);
    if (grammar) {
      const result = checkCFG(grammar, value);
      setCfgResult(result);
    }
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="lexer" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="lexer" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            <span className="hidden sm:inline">Lexeme & Tokenizer</span>
            <span className="sm:hidden">Lexer</span>
          </TabsTrigger>
          <TabsTrigger value="evaluator" className="flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            <span className="hidden sm:inline">Expression Evaluator</span>
            <span className="sm:hidden">Evaluator</span>
          </TabsTrigger>
          <TabsTrigger value="cfg" className="flex items-center gap-2">
            <FileTerminal className="w-4 h-4" />
            <span className="hidden sm:inline">CFG Checker</span>
            <span className="sm:hidden">CFG</span>
          </TabsTrigger>
          <TabsTrigger value="parser" className="flex items-center gap-2">
            <Split className="w-4 h-4" />
            <span className="hidden sm:inline">Parsing Visualizer</span>
            <span className="sm:hidden">Parser</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lexer" className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Code Input</h2>
              <CodeEditor
                defaultValue={`// Example code
function calculateSum(a, b) {
  return a + b;
}

// Call the function
let result = calculateSum(5, 10);
console.log("The sum is: " + result);`}
                onChange={setCode}
                onSubmit={handleCodeSubmit}
              />
            </div>
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card">
                <LexemeVisualizer code={code} />
              </div>
              <div className="rounded-xl border border-border bg-card">
                <TokenVisualizer code={code} />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="evaluator" className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Expression Input</h2>
              <CodeEditor
                defaultValue="(2 + 3) * 4 - 5"
                language="expression"
                placeholder="Enter a mathematical expression..."
                onChange={setExpression}
                onSubmit={handleExpressionSubmit}
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Evaluation Result</h2>
              <div className="rounded-xl border border-border bg-card p-4 h-full">
                {evaluationResult ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                      <div className="text-sm text-muted-foreground mb-1">Result:</div>
                      <div className="text-2xl font-mono">{evaluationResult.result}</div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Evaluation Steps</h3>
                      <div className="space-y-2">
                        {evaluationResult.steps.map((step, index) => (
                          <div 
                            key={index} 
                            className={cn(
                              "p-3 rounded-md font-mono text-sm border border-border",
                              "transition-all duration-300 animate-fade-in",
                              "animation-delay-" + (index * 100)
                            )}
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    Enter an expression and submit to see evaluation results
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cfg" className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Grammar Input (BNF)</h2>
                <CodeEditor
                  defaultValue={`S -> aSb | ε`}
                  language="grammar"
                  placeholder="Enter grammar in BNF format..."
                  onChange={setGrammar}
                  onSubmit={handleGrammarSubmit}
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Test String</h2>
                <CodeEditor
                  defaultValue="aabb"
                  language="plain"
                  placeholder="Enter a string to test against the grammar..."
                  onChange={setTestString}
                  onSubmit={handleTestStringSubmit}
                />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Checking Result</h2>
              <div className="rounded-xl border border-border bg-card p-6 h-full">
                {cfgResult ? (
                  <div className="space-y-6">
                    <div className={cn(
                      "p-6 rounded-lg border text-center",
                      cfgResult.accepted 
                        ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900" 
                        : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-900"
                    )}>
                      <div className="text-sm mb-1">Status:</div>
                      <div className={cn(
                        "text-2xl font-medium",
                        cfgResult.accepted ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                      )}>
                        {cfgResult.accepted ? "Accepted" : "Rejected"}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Checking Steps</h3>
                      <div className="space-y-2">
                        {cfgResult.steps.map((step, index) => (
                          <div 
                            key={index} 
                            className="p-3 rounded-md text-sm border border-border animate-fade-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    Enter a grammar and test string to check
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="parser" className="animate-fade-in">
          <div className="p-8 text-center border border-dashed rounded-xl">
            <h2 className="text-xl font-semibold mb-2">Parsing Visualizer Coming Soon</h2>
            <p className="text-muted-foreground">
              The LL(1) parsing visualizer is under development. Check back soon for interactive
              parse table generation and step-by-step parsing visualization.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
