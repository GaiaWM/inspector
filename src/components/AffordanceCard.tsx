import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Target,
  Zap,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronDown,
  Shield,
} from "lucide-react";
import { useState } from "react";

interface Affordance {
  action: string;
  target: string;
  required_capabilities: string[];
  preconditions: string[];
  constraints: string[];
  expected_outcome: string;
  possible_failure_modes: string[];
  confidence_level: string;
}

interface AffordanceCardProps {
  affordance: Affordance;
}

const confidenceColors: Record<string, string> = {
  high: "bg-primary/20 text-primary border-primary/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  low: "bg-destructive/20 text-destructive border-destructive/30",
};

const confidenceIcons: Record<string, typeof Shield> = {
  high: CheckCircle2,
  medium: AlertTriangle,
  low: XCircle,
};

export function AffordanceCard({ affordance }: AffordanceCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ConfidenceIcon = confidenceIcons[affordance.confidence_level] || Shield;

  return (
    <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-colors">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer pb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg font-display">
                    {affordance.action}
                  </CardTitle>
                  <div className="flex items-center gap-1.5 mt-1 text-muted-foreground text-sm">
                    <Target className="w-3.5 h-3.5" />
                    <span>{affordance.target}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={`${confidenceColors[affordance.confidence_level]} capitalize`}
                >
                  <ConfidenceIcon className="w-3 h-3 mr-1" />
                  {affordance.confidence_level}
                </Badge>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4">
            {/* Expected Outcome */}
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm text-foreground">
                <span className="text-primary font-medium">Outcome:</span>{" "}
                {affordance.expected_outcome}
              </p>
            </div>

            {/* Required Capabilities */}
            <Section title="Required Capabilities">
              <div className="flex flex-wrap gap-1.5">
                {affordance.required_capabilities.map((cap, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {cap}
                  </Badge>
                ))}
              </div>
            </Section>

            {/* Preconditions */}
            <Section title="Preconditions">
              <ul className="space-y-1">
                {affordance.preconditions.map((pre, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                    {pre}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Constraints */}
            <Section title="Constraints">
              <ul className="space-y-1">
                {affordance.constraints.map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className="w-3.5 h-3.5 mt-0.5 text-yellow-500 shrink-0" />
                    {con}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Failure Modes */}
            <Section title="Possible Failure Modes">
              <ul className="space-y-1">
                {affordance.possible_failure_modes.map((fail, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <XCircle className="w-3.5 h-3.5 mt-0.5 text-destructive shrink-0" />
                    {fail}
                  </li>
                ))}
              </ul>
            </Section>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
        {title}
      </h4>
      {children}
    </div>
  );
}
