import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

const statusColors: Record<string, string> = {
  "In Progress": "bg-[hsl(210,100%,60%)]/15 text-[hsl(210,100%,60%)] border-[hsl(210,100%,60%)]/30",
  "On Hold": "bg-[hsl(45,100%,55%)]/15 text-[hsl(45,100%,55%)] border-[hsl(45,100%,55%)]/30",
  "Waiting": "bg-[hsl(280,60%,65%)]/15 text-[hsl(280,60%,65%)] border-[hsl(280,60%,65%)]/30",
  "Finished": "bg-[hsl(150,50%,50%)]/15 text-[hsl(150,50%,50%)] border-[hsl(150,50%,50%)]/30",
  "Draft": "bg-muted-foreground/15 text-muted-foreground border-muted-foreground/30",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const colorClass = statusColors[status] || statusColors["Draft"];
  
  return (
    <Badge 
      variant="outline" 
      className={`rounded-full px-3 py-1 text-xs font-medium border ${colorClass}`}
      data-testid={`badge-status-${status.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {status}
    </Badge>
  );
}
