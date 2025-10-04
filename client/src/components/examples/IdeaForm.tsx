import { useState } from 'react';
import IdeaForm from '../IdeaForm';
import { Button } from '@/components/ui/button';

export default function IdeaFormExample() {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Open Form</Button>
      <IdeaForm
        open={open}
        onOpenChange={setOpen}
        onSubmit={(data) => {
          console.log('Form submitted:', data);
          setOpen(false);
        }}
      />
    </div>
  );
}
