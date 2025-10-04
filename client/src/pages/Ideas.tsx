import { useState } from "react";
import { Plus, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import IdeaCard from "@/components/IdeaCard";
import IdeaForm from "@/components/IdeaForm";
import ThemeToggle from "@/components/ThemeToggle";
import type { Idea, InsertIdea } from "@shared/schema";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableIdeaCard({ 
  idea, 
  onEdit, 
  onDelete, 
  onColorChange 
}: { 
  idea: Idea; 
  onEdit: (idea: Idea) => void; 
  onDelete: (id: string) => void; 
  onColorChange: (id: string, color: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: idea.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <IdeaCard
        idea={idea}
        onEdit={onEdit}
        onDelete={onDelete}
        onColorChange={onColorChange}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}

export default function Ideas() {
  const [ideas, setIdeas] = useState<Idea[]>([
    {
      id: "1",
      title: "Redesign the mobile app interface",
      description: "Create a more modern and intuitive user interface for our mobile application with improved navigation",
      status: "In Progress",
      color: "#3b82f6",
      order: 0,
    },
    {
      id: "2",
      title: "Implement dark mode across all platforms",
      description: "Add dark mode support to improve user experience during nighttime usage",
      status: "Waiting",
      color: "#8b5cf6",
      order: 1,
    },
    {
      id: "3",
      title: "Launch new marketing campaign",
      description: "Plan and execute a comprehensive marketing strategy for Q2 targeting new customer segments",
      status: "On Hold",
      color: "#f97316",
      order: 2,
    },
  ]);
  
  const [formOpen, setFormOpen] = useState(false);
  const [editingIdea, setEditingIdea] = useState<Idea | undefined>();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setIdeas((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        const newItems = arrayMove(items, oldIndex, newIndex);
        return newItems.map((item, index) => ({ ...item, order: index }));
      });
    }
  };

  const handleCreateIdea = (data: InsertIdea) => {
    const newIdea: Idea = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      order: ideas.length,
    };
    setIdeas([...ideas, newIdea]);
  };

  const handleUpdateIdea = (data: InsertIdea) => {
    if (!editingIdea) return;
    
    setIdeas(ideas.map(idea => 
      idea.id === editingIdea.id 
        ? { ...idea, ...data }
        : idea
    ));
    setEditingIdea(undefined);
  };

  const handleDeleteIdea = (id: string) => {
    setIdeas(ideas.filter(idea => idea.id !== id));
  };

  const handleColorChange = (id: string, color: string) => {
    setIdeas(ideas.map(idea => 
      idea.id === id ? { ...idea, color } : idea
    ));
  };

  const handleEdit = (idea: Idea) => {
    setEditingIdea(idea);
    setFormOpen(true);
  };

  const handleFormClose = (open: boolean) => {
    setFormOpen(open);
    if (!open) {
      setEditingIdea(undefined);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">Ideas</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => setFormOpen(true)}
              data-testid="button-new-idea"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Idea
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {ideas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Lightbulb className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-lg font-medium text-foreground mb-2">No ideas yet</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Get started by creating your first idea
            </p>
            <Button onClick={() => setFormOpen(true)} data-testid="button-create-first-idea">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Idea
            </Button>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={ideas.map(i => i.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {ideas.map((idea) => (
                  <SortableIdeaCard
                    key={idea.id}
                    idea={idea}
                    onEdit={handleEdit}
                    onDelete={handleDeleteIdea}
                    onColorChange={handleColorChange}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </main>

      <IdeaForm
        open={formOpen}
        onOpenChange={handleFormClose}
        onSubmit={editingIdea ? handleUpdateIdea : handleCreateIdea}
        idea={editingIdea}
      />
    </div>
  );
}
