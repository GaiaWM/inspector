import { useState, useEffect } from "react";
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

interface World {
  name: string;
  slug: string;
  inspection_presets?: string[];
}

const defaultPerspectives = [
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
  const [worlds, setWorlds] = useState<World[]>([]);
  const [worldsLoading, setWorldsLoading] = useState(true);
  const [world, setWorld] = useState("");
  const [obj, setObj] = useState("");
  const [perspective, setPerspective] = useState("Human adult");
  const [context, setContext] = useState("generic");

  const selectedWorld = worlds.find((w) => w.slug === world);
  const perspectives = selectedWorld?.inspection_presets ?? defaultPerspectives;

  useEffect(() => {
    async function fetchWorlds() {
      try {
        const response = await fetch("https://api.gaia.fantasymaps.org/worlds");
        const data = await response.json();
        setWorlds(data);
        if (data.length > 0 && !world) {
          setWorld(data[0].slug);
        }
      } catch (error) {
        console.error("Failed to fetch worlds:", error);
      } finally {
        setWorldsLoading(false);
      }
    }
    fetchWorlds();
  }, []);

  // Reset perspective when world changes if current perspective isn't available
  useEffect(() => {
    if (perspectives.length > 0 && !perspectives.includes(perspective)) {
      setPerspective(perspectives[0]);
    }
  }, [world, perspectives, perspective]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (world.trim() && obj.trim()) {
      onSubmit({ world: world.trim(), obj: obj.trim(), perspective, context });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* World Select */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 font-display text-sm tracking-wide">
          <Compass className="w-4 h-4 text-primary" />
          World
        </Label>
        <Select value={world} onValueChange={setWorld} disabled={worldsLoading}>
          <SelectTrigger className="font-body">
            <SelectValue placeholder={worldsLoading ? "Loading worlds..." : "Select a world"} />
          </SelectTrigger>
          <SelectContent>
            {worlds.map((w) => (
              <SelectItem key={w.slug} value={w.slug} className="font-body">
                {w.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
