import { useMemo } from 'react';

export type ApplicationStatus = 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Rejected';

export interface KanbanApplication {
  id: string;
  role: string;
  company: string;
  location: string;
  updatedAt: string;
  status: ApplicationStatus;
}

const mockApplications: KanbanApplication[] = [
  {
    id: 'app-1',
    role: 'Senior Product Strategist',
    company: 'Harborline Labs',
    location: 'Melbourne, VIC',
    updatedAt: '2d ago',
    status: 'Interview',
  },
  {
    id: 'app-2',
    role: 'Policy Advisor',
    company: 'NSW Treasury',
    location: 'Sydney, NSW',
    updatedAt: '4d ago',
    status: 'Screening',
  },
  {
    id: 'app-3',
    role: 'People Ops Lead',
    company: 'Eucalyptus Works',
    location: 'Remote',
    updatedAt: '6d ago',
    status: 'Applied',
  },
  {
    id: 'app-4',
    role: 'Program Director',
    company: 'Coastal Health',
    location: 'Brisbane, QLD',
    updatedAt: '1d ago',
    status: 'Offer',
  },
];

export const useKanban = () => {
  const columns = useMemo<ApplicationStatus[]>(
    () => ['Applied', 'Screening', 'Interview', 'Offer', 'Rejected'],
    []
  );

  return { applications: mockApplications, columns };
};
