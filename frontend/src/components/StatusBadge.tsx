import { Badge } from '@/components/ui/badge';
import { StatusBadgeProps } from '@/types/common';


const StatusBadge = ({ status }: StatusBadgeProps) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
    case "upcoming":
      return (
        <Badge variant="outline" className="border-blue-500 text-blue-500">
          Upcoming
        </Badge>
      );
    case "ended":
      return (
        <Badge variant="outline" className="border-gray-500 text-gray-500">
          Ended
        </Badge>
      );
    default:
      console.warn(`Unknown status provided to StatusBadge: ${status}`);
      return <Badge variant="destructive">Unknown</Badge>; // Provide a visual cue for unknown statuses
  }
};

export default StatusBadge;