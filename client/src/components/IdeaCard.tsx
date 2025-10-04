import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";
import ColorPicker from "./ColorPicker";
import type { Idea } from "@shared/schema";

interface IdeaCardProps {
  idea: Idea;
  onEdit: (idea: Idea) => void;
  onDelete: (id: string) => void;
  onColorChange: (id: string, color: string) => void;
  dragHandleProps?: any;
}

export default function IdeaCard({ 
  idea, 
  onEdit, 
  onDelete, 
  onColorChange,
  dragHandleProps 
}: IdeaCardProps) {
  return (
    <Card 
      className="p-4 hover-elevate transition-colors border-l-4 group" 
      style={{ borderLeftColor: idea.color }}
      data-testid={`card-idea-${idea.id}`}
    >
      <div className="flex items-start gap-3">
        <button
          {...dragHandleProps}
          className="mt-1 text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing transition-colors"
          data-testid="button-drag-handle"
        >
          <GripVertical className="w-5 h-5" />
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-medium text-base text-foreground line-clamp-2" data-testid="text-idea-title">
              {idea.title}
            </h3>
            <StatusBadge status={idea.status} />
          </div>
          
          {idea.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3" data-testid="text-idea-description">
              {idea.description}
            </p>
          )}
          
          <div className="flex items-center gap-2">
            <ColorPicker 
              value={idea.color} 
              onChange={(color) => onColorChange(idea.id, color)} 
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(idea)}
              className="h-9"
              data-testid="button-edit-idea"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(idea.id)}
              className="h-9 text-destructive hover:text-destructive"
              data-testid="button-delete-idea"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
