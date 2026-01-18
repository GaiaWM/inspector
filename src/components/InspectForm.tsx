import { useState } from "react";
import { Search, Eye, Compass, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface InspectFormProps {
  onSubmit: (data: {
    world: string;
    obj: string;
    perspective: string;
    context: string;
  }) => void;
  isLoading: boolean;
}

const perspectives = [
  "Human adult",
  "Human child",
  "Elf",
  "Dwarf",
  "Halfling",
  "Orc",
  "Wizard",
  "Scholar",
  "Warrior",
  "Merchant",
];

const contexts = [
  "generic",
  "combat",
  "exploration",
  "trade",
  "research",
  "survival",
  "stealth",
  "social",
];

export function InspectForm({ onSubmit, isLoading }: InspectFormProps) {
  const [world, setWorld] = useState("alaria");
  const [obj, setObj] = useState("");
  const [perspective, setPerspective] = useState("Human adult");
  const [context, setContext] = useState("generic");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (world.trim() && obj.trim()) {
      onSubmit({ world: world.trim(), obj: obj.trim(), perspective, context });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* World Input */}
      <div className="space-y-2">
        <Label htmlFor="world" className="flex items-center gap-2 font-display text-sm tracking-wide">
          <Compass className="w-4 h-4 text-primary" />
          World
        </Label>
        <Input
          id="world"
          value={world}
          onChange={(e) => setWorld(e.target.value)}
          placeholder="Enter world name..."
          className="font-body text-lg"
        />
      </div>

      {/* Object Input */}
      <div className="space-y-2">
        <Label htmlFor="object" className="flex items-center gap-2 font-display text-sm tracking-wide">
          <Search className="w-4 h-4 text-primary" />
          Object to Inspect
        </Label>
        <Input
          id="object"
          value={obj}
          onChange={(e) => setObj(e.target.value)}
          placeholder="Ancient sword, mysterious potion, enchanted tome..."
          className="font-body text-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Perspective Select */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 font-display text-sm tracking-wide">
            <Eye className="w-4 h-4 text-primary" />
            Perspective
          </Label>
          <Select value={perspective} onValueChange={setPerspective}>
            <SelectTrigger className="font-body">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {perspectives.map((p) => (
                <SelectItem key={p} value={p} className="font-body">
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Context Select */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 font-display text-sm tracking-wide">
            <Sparkles className="w-4 h-4 text-primary" />
            Context
          </Label>
          <Select value={context} onValueChange={setContext}>
            <SelectTrigger className="font-body capitalize">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {contexts.map((c) => (
                <SelectItem key={c} value={c} className="font-body capitalize">
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        type="submit"
        disabled={!world.trim() || !obj.trim() || isLoading}
        className="w-full font-display tracking-widest text-lg py-6 transition-all duration-300 hover:shadow-glow disabled:opacity-50"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Divining...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Inspect Object
          </span>
        )}
      </Button>
    </form>
  );
}
