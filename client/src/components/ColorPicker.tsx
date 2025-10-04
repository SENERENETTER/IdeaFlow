import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

const PRESET_COLORS = [
  "#3b82f6", // blue
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#f43f5e", // rose
  "#f97316", // orange
  "#eab308", // yellow
  "#22c55e", // green
  "#14b8a6", // teal
  "#06b6d4", // cyan
  "#6366f1", // indigo
  "#a855f7", // violet
  "#64748b", // slate
];

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-9 h-9 p-0 border-2"
          style={{ backgroundColor: value }}
          data-testid="button-color-picker"
        >
          <span className="sr-only">Pick color</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" data-testid="popover-color-picker">
        <div className="grid grid-cols-6 gap-2">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => onChange(color)}
              className="w-9 h-9 rounded-md border-2 hover-elevate active-elevate-2 relative transition-colors"
              style={{ backgroundColor: color }}
              data-testid={`button-color-${color.slice(1)}`}
            >
              {value === color && (
                <Check className="w-4 h-4 text-white absolute inset-0 m-auto drop-shadow-lg" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
