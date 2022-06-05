// assets
import {
    IconUsers,
    IconCertificate,
    IconMessageReport,
    IconMessage,
    IconFileLike,
    IconUser,
    IconMail
} from '@tabler/icons';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'managment',
    title: 'Managment',
    type: 'group',
    children: [
        {
            id: 'users',
            title: 'Users',
            type: 'item',
            url: '/admin/users',
            icon: IconUsers,
            breadcrumbs: false
        },
        {
            id: 'roles',
            title: 'Roles',
            type: 'item',
            url: '/admin/roles',
            icon: IconCertificate,
            breadcrumbs: false
        },
        {
            id: 'comments',
            title: 'Comments',
            type: 'item',
            url: '/admin/comments',
            icon: IconMessage,
            breadcrumbs: false
        },
        {
            id: 'faqs',
            title: 'Faqs',
            type: 'item',
            url: '/admin/faqs',
            icon: IconMessageReport,
            breadcrumbs: false
        },
        {
            id: 'reviews',
            title: 'Reviews',
            type: 'item',
            url: '/admin/reviews',
            icon: IconFileLike,
            breadcrumbs: false
        },
        {
            id: 'account',
            title: 'Users Profiles',
            type: 'item',
            url: '/admin/account',
            icon: IconUser,
            breadcrumbs: false
        },
        {
            id: 'applications',
            title: 'Users Applications',
            type: 'item',
            url: '/admin/applications',
            icon: IconMail,
            breadcrumbs: false
        },
    ]
};

export default dashboard;
