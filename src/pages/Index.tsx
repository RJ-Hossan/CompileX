
import { MainLayout } from "@/layout/MainLayout";
import { Visualizer } from "@/components/Visualizer";
import { ArrowRight, Code, Split, Calculator, FileTerminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  className,
  style
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  className?: string;
  style?: CSSProperties;
}) => (
  <div 
    className={cn(
      "glass-card p-6 transition-all duration-300 hover:scale-[1.02]",
      className
    )}
    style={style}
  >
    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            Powerful Compiler Tools
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight animate-fade-in" style={{ animationDelay: "100ms" }}>
            Compiler Explorer <span className="text-gradient">&</span> Visualizer
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
            Explore, analyze, and understand compiler principles with interactive visualizations. From lexical analysis to parsing, see how your code transforms at each stage.
          </p>
          <a 
            href="#explore" 
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground flex items-center justify-center space-x-2 w-fit mx-auto transition-all duration-300 hover:bg-primary/90 hover:scale-105 animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            <span>Start Exploring</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 animate-fade-in" style={{ animationDelay: "400ms" }}>
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={Code}
              title="Lexical Analysis"
              description="Visualize how your code is broken down into lexemes and tokens, the fundamental building blocks."
              className="animate-fade-in"
              style={{ animationDelay: "500ms" }}
            />
            <FeatureCard 
              icon={Calculator}
              title="Expression Evaluation"
              description="See how mathematical and logical expressions are parsed and evaluated step by step."
              className="animate-fade-in"
              style={{ animationDelay: "600ms" }}
            />
            <FeatureCard 
              icon={FileTerminal}
              title="CFG Validation"
              description="Test strings against context-free grammars to understand language acceptance."
              className="animate-fade-in"
              style={{ animationDelay: "700ms" }}
            />
            <FeatureCard 
              icon={Split}
              title="LL(1) Parsing"
              description="Visualize the predictive parsing process with dynamic updates to the parsing table and stack."
              className="animate-fade-in"
              style={{ animationDelay: "800ms" }}
            />
          </div>
        </div>
      </section>

      {/* Main Tool Section */}
      <section id="explore" className="py-16 animate-fade-in" style={{ animationDelay: "900ms" }}>
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Interactive Explorer</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            Type your code, expressions, or grammars and see the results in real-time.
          </p>
          
          <div className="glass p-6 rounded-xl">
            <Visualizer />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
