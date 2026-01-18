import { useEffect, useState } from 'react';

export interface GalleryFeedItem {
  id: string;
  type: 'opportunity' | 'insight' | 'alert';
  title: string;
  description: string;
  timestamp: string;
  meta?: {
    company?: string;
    matchScore?: number;
  };
}

const mockFeed: GalleryFeedItem[] = [
  {
    id: 'feed-1',
    type: 'opportunity',
    title: 'Senior Policy Analyst',
    description: 'New APS role aligned with your compliance expertise and stakeholder management strengths.',
    timestamp: '2m ago',
    meta: { company: 'Department of Health', matchScore: 91 },
  },
  {
    id: 'feed-2',
    type: 'insight',
    title: 'Resume Impact Boost',
    description: 'Quantified outcomes increased ATS readability by 7% in your latest draft.',
    timestamp: '18m ago',
  },
  {
    id: 'feed-3',
    type: 'alert',
    title: 'Application Follow-up Due',
    description: 'Two pending applications have been idle for 10+ days. Consider sending a follow-up.',
    timestamp: '1h ago',
    meta: { company: 'Urban Futures Lab' },
  },
];

export const useGalleryData = () => {
  const [feed, setFeed] = useState<GalleryFeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFeed(mockFeed);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return { feed, isLoading };
};
