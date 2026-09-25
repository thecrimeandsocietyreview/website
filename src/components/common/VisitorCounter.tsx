import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

export const VisitorCounter: React.FC = () => {
  const [totalViews, setTotalViews] = useState<number | null>(() => {
    try {
      const cached = localStorage.getItem('thecsr_cloud_views');
      return cached ? parseInt(cached, 10) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    let isMounted = true;

    const syncCloudViews = async () => {
      try {
        const SESSION_HIT_KEY = 'thecsr_counted_session';
        const alreadyCounted = sessionStorage.getItem(SESSION_HIT_KEY);

        // If this session hasn't counted yet, hit the cloud endpoint to increment.
        // Otherwise, simply get the current global count without double-counting.
        const endpoint = alreadyCounted
          ? 'https://countapi.mileshilliard.com/api/v1/get/thecrimeandsocietyreview_prod'
          : 'https://countapi.mileshilliard.com/api/v1/hit/thecrimeandsocietyreview_prod';

        const res = await fetch(endpoint);
        if (!res.ok) throw new Error('Cloud counter response not ok');
        const data = await res.json();

        if (typeof data.value === 'number' && isMounted) {
          setTotalViews(data.value);
          try {
            localStorage.setItem('thecsr_cloud_views', data.value.toString());
            if (!alreadyCounted) {
              sessionStorage.setItem(SESSION_HIT_KEY, 'true');
            }
          } catch {
            // Storage quota or private mode fallback
          }
        }
      } catch (err) {
        console.warn('Cloud counter sync error:', err);
      }
    };

    syncCloudViews();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-xs hover:border-[var(--accent-gold)]/50 transition-colors">
      <Eye className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
      <span className="text-xs font-serif text-[var(--text-secondary)] font-medium">
        Total Views:
      </span>
      <span className="font-mono font-bold text-sm text-[var(--text-primary)] tracking-wide">
        {totalViews !== null ? totalViews.toLocaleString() : '...'}
      </span>
    </div>
  );
};

export default VisitorCounter;
