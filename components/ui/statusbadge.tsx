// components/StatusBadge.tsx
type Status = 'IN_TRANSIT' | 'DELIVERED' | 'PROCESSING' | 'DELAYED';

interface StatusProps {
  status: Status;
}

const statusConfig = {
  IN_TRANSIT: { color: 'bg-blue-500', text: 'In Transit', pulse: true },
  DELIVERED: { color: 'bg-green-500', text: 'Delivered', pulse: false },
  DELAYED: { color: 'bg-red-500', text: 'Delayed', pulse: true },
  PROCESSING: { color: 'bg-zinc-500', text: 'Processing', pulse: false },
};

export const StatusBadge = ({ status }: StatusProps) => {
  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 w-fit">
      <span className="relative flex h-2 w-2">
        {config.pulse && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.color} opacity-75`}></span>
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.color}`}></span>
      </span>
      <span className="text-xs font-medium text-zinc-300">{config.text}</span>
    </div>
  );
};