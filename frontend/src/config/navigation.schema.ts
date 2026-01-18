export interface NavItem {
    id: string;
    label: string;
    route: string;
    modeAvailability: 'gallery' | 'laboratory' | 'both';
    iconKey?: string;
    order: number;
    defaultForMode?: boolean;
}

export const NAVIGATION_SCHEMA: NavItem[] = [
    {
        id: 'landing',
        label: 'Reception',
        route: '/gallery',
        modeAvailability: 'gallery',
        order: 10,
        defaultForMode: true
    },
    {
        id: 'dashboard',
        label: 'Dashboard',
        route: '/gallery?view=DASHBOARD',
        modeAvailability: 'gallery',
        order: 20
    },
    {
        id: 'feed',
        label: 'Feed',
        route: '/gallery?view=FEED',
        modeAvailability: 'gallery',
        order: 30
    },
    {
        id: 'kanban',
        label: 'Kanban',
        route: '/gallery?view=KANBAN',
        modeAvailability: 'gallery',
        order: 40
    },
    {
        id: 'analysis',
        label: 'Resume Analysis',
        route: '/lab?tool=analysis',
        modeAvailability: 'laboratory',
        order: 10,
        defaultForMode: true
    },
    {
        id: 'documents',
        label: 'Document Stack',
        route: '/lab?tool=documents',
        modeAvailability: 'laboratory',
        order: 20
    }
];
