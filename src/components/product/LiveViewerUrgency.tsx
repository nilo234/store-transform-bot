import { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';

export function LiveViewerUrgency() {
  const [count, setCount] = useState(() => Math.floor(Math.random() * 17) + 8);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(Math.floor(Math.random() * 17) + 8);
    }, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 text-sm font-medium text-accent bg-accent/10 border border-accent/20 rounded-full px-4 py-2">
      <Flame className="h-4 w-4" aria-hidden="true" />
      <span>
        <strong>{count}</strong> people are viewing this right now
      </span>
    </div>
  );
}
