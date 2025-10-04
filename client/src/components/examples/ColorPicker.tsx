import { useState } from 'react';
import ColorPicker from '../ColorPicker';

export default function ColorPickerExample() {
  const [color, setColor] = useState('#3b82f6');
  
  return (
    <div className="flex items-center gap-4 p-6">
      <ColorPicker value={color} onChange={setColor} />
      <p className="text-sm text-muted-foreground">Selected: {color}</p>
    </div>
  );
}
