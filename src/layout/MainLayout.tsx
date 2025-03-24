
import { PropsWithChildren } from "react";
import { Navbar } from "@/components/Navbar";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 md:py-12">
        {children}
      </main>
      <footer className="border-t border-border py-6 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-sm text-muted-foreground">
                Compiler Explorer & Visualizer
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} • Built with precision and care
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
