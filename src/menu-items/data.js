// assets
import { IconCertificate } from '@tabler/icons';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const data = {
    id: 'data',
    title: 'Data',
    type: 'group',
    children: [
        {
            id: 'state',
            title: 'State',
            type: 'item',
            url: '/admin/data/state',
            icon: IconCertificate,
            breadcrumbs: false
        },
        {
            id: 'city',
            title: 'City',
            type: 'item',
            url: '/admin/data/city',
            icon: IconCertificate,
            breadcrumbs: false
        },
        {
            id: 'course',
            title: 'Course',
            type: 'item',
            url: '/admin/data/course',
            icon: IconCertificate,
            breadcrumbs: false
        },
        {
            id: 'entrance-exam',
            title: 'Entrance Exam',
            type: 'item',
            url: '/admin/data/entrance-exam',
            icon: IconCertificate,
            breadcrumbs: false
        },
        {
            id: 'affiliated',
            title: 'Affiliated',
            type: 'item',
            url: '/admin/data/affiliated',
            icon: IconCertificate,
            breadcrumbs: false
        },
        {
            id: 'stream',
            title: 'Stream',
            type: 'item',
            url: '/admin/data/stream',
            icon: IconCertificate,
            breadcrumbs: false
        },
        {
            id: 'program-type',
            title: 'Program Type',
            type: 'item',
            url: '/admin/data/program-type',
            icon: IconCertificate,
            breadcrumbs: false
        },
        {
            id: 'college-type',
            title: 'College Type',
            type: 'item',
            url: '/admin/data/college-type',
            icon: IconCertificate,
            breadcrumbs: false
        },
        {
            id: 'course-type',
            title: 'Course Type',
            type: 'item',
            url: '/admin/data/course-type',
            icon: IconCertificate,
            breadcrumbs: false
        },
    ]
};

export default data;
