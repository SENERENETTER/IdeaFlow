import IdeaCard from '../IdeaCard';
import type { Idea } from '@shared/schema';

export default function IdeaCardExample() {
  const exampleIdea: Idea = {
    id: '1',
    title: 'Build a new feature for the app',
    description: 'Create a dashboard that shows analytics and metrics for user engagement',
    status: 'In Progress',
    color: '#3b82f6',
    order: 0,
  };
  
  return (
    <div className="p-6 max-w-2xl">
      <IdeaCard
        idea={exampleIdea}
        onEdit={(idea) => console.log('Edit idea:', idea)}
        onDelete={(id) => console.log('Delete idea:', id)}
        onColorChange={(id, color) => console.log('Change color:', id, color)}
      />
    </div>
  );
}
