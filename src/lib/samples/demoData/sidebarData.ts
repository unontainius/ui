interface NavItem {
    icon: string;
    label: string;
    href: string;
    badge?: string;
    notification?: string;
}

const demoNavItems: NavItem[] = [
    {
        icon: 'home',
        label: 'Dashboard',
        href: '/',
    },
    {
        icon: 'fit_screen',
        label: 'Button',
        href: '/examples/button',
    },
    {
        icon: 'picture_in_picture',
        label: 'Docker',
        href: '/examples/docker',
        badge: 'Pro',
    },
    {
        icon: 'palette',
        label: 'Color Picker',
        href: '/examples/colorpicker',
    },
    {
        icon: 'wysiwyg',
        label: 'Modal',
        href: '/examples/modal',
    },
    {
        icon: 'menu_open',
        label: 'Sidebar',
        href: '/examples/sidebar',
    },
];

export { demoNavItems };