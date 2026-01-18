import { InspectForm } from "@/components/InspectForm";
import { InspectResult } from "@/components/InspectResult";
import { useInspect } from "@/hooks/useInspect";
import { Sparkles } from "lucide-react";

const Index = () => {
  const { data, error, isLoading, query, inspect } = useInspect();

  return (
    <div className="min-h-screen bg-background">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="font-display text-4xl md:text-5xl tracking-wide text-foreground">
              Gaia Object Inspector
            </h1>
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Peer through the veil and discover the secrets of any object within the fantasy realms.
            Choose your perspective to see how different beings perceive the world around them.
          </p>
        </header>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Card */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-inner-glow">
            <h2 className="font-display text-xl mb-6 flex items-center gap-2 text-foreground">
              <span className="w-8 h-[2px] bg-primary/50" />
              Inspection Parameters
              <span className="w-8 h-[2px] bg-primary/50" />
            </h2>
            <InspectForm onSubmit={inspect} isLoading={isLoading} />
          </div>

          {/* Result Card */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-inner-glow">
            <h2 className="font-display text-xl mb-6 flex items-center gap-2 text-foreground">
              <span className="w-8 h-[2px] bg-accent/50" />
              Oracle's Revelation
              <span className="w-8 h-[2px] bg-accent/50" />
            </h2>
            <InspectResult data={data} error={error} query={query} />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 font-body text-sm text-muted-foreground">
          <p>
            Powered by{" "}
            <a
              href="https://api.gaia.fantasymaps.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Gaia World Server API
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
