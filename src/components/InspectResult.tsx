import { ScrollArea } from "@/components/ui/scroll-area";
import { Scroll, AlertCircle } from "lucide-react";
import { AffordanceCard } from "./AffordanceCard";

interface InspectResultProps {
  data: Record<string, unknown> | null;
  error: string | null;
  query: {
    obj: string;
    perspective: string;
    context: string;
  } | null;
}

export function InspectResult({ data, error, query }: InspectResultProps) {
  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
        <div className="flex items-center gap-3 text-destructive">
          <AlertCircle className="w-5 h-5" />
          <h3 className="font-display text-lg">Divination Failed</h3>
        </div>
        <p className="mt-2 font-body text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (!data || !query) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <Scroll className="w-16 h-16 mb-4 opacity-30" />
        <p className="font-body text-lg italic">
          The oracle awaits your query...
        </p>
        <p className="font-body text-sm mt-2 opacity-70">
          Enter an object name and invoke the inspection ritual
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h3 className="font-display text-2xl text-primary capitalize">
          {query.obj}
        </h3>
        <p className="font-body text-muted-foreground mt-1">
          Viewed as <span className="text-accent">{query.perspective}</span> in{" "}
          <span className="text-accent capitalize">{query.context}</span> context
        </p>
      </div>

      {/* Result Content */}
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4 font-body">
          {typeof data === "object" && data !== null ? (
            <RenderObject data={data} />
          ) : (
            <p className="text-foreground">{String(data)}</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

function RenderObject({ data, depth = 0 }: { data: Record<string, unknown>; depth?: number }) {
  return (
    <div className={depth > 0 ? "ml-4 pl-4 border-l border-border/50" : ""}>
      {Object.entries(data).map(([key, value]) => {
        // Special handling for affordances array
        if (key === "affordances" && Array.isArray(value) && value.length > 0 && value[0]?.action) {
          return (
            <div key={key} className="py-2">
              <span className="font-display text-sm text-primary/80 uppercase tracking-wider">
                {key.replace(/_/g, " ")}
              </span>
              <div className="mt-3 space-y-3">
                {value.map((affordance, i) => (
                  <AffordanceCard key={i} affordance={affordance} />
                ))}
              </div>
            </div>
          );
        }

        return (
          <div key={key} className="py-2">
            <span className="font-display text-sm text-primary/80 uppercase tracking-wider">
              {key.replace(/_/g, " ")}
            </span>
            <div className="mt-1">
              {typeof value === "object" && value !== null ? (
                Array.isArray(value) ? (
                  <ul className="list-disc list-inside space-y-1">
                    {value.map((item, i) => (
                      <li key={i} className="text-foreground">
                        {typeof item === "object" ? (
                          <RenderObject data={item as Record<string, unknown>} depth={depth + 1} />
                        ) : (
                          String(item)
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <RenderObject data={value as Record<string, unknown>} depth={depth + 1} />
                )
              ) : (
                <p className="text-foreground leading-relaxed">{String(value)}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
