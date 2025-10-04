import StatusBadge from '../StatusBadge';

export default function StatusBadgeExample() {
  return (
    <div className="flex flex-wrap gap-3 p-6">
      <StatusBadge status="In Progress" />
      <StatusBadge status="On Hold" />
      <StatusBadge status="Waiting" />
      <StatusBadge status="Finished" />
      <StatusBadge status="Draft" />
    </div>
  );
}
