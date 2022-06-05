import {lazy} from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// Main routes
const UsersPage = Loadable(lazy(() => import('views/users')));
const RolesPage = Loadable(lazy(() => import('views/roles')));
const BlogsCategoriesPage = Loadable(lazy(() => import('views/blogs-categories')));
const AddBlogPage = Loadable(lazy(() => import('views/add-blog')));
const BlogsCommentsPage = Loadable(lazy(() => import('views/blog-comments')));
const FaqPage = Loadable(lazy(() => import('views/faq')));
const SeoPage = Loadable(lazy(() => import('views/seo')));
const SettingsPage = Loadable(lazy(() => import('views/settings')));
const CollegePage = Loadable(lazy(() => import('views/colleges')));
const ReviewsPage = Loadable(lazy(() => import('views/reviews')));
const BlogsPage = Loadable(lazy(() => import('views/blogs')));
const AccountPage = Loadable(lazy(() => import('views/account')));
const CollegesLogos = Loadable(lazy(() => import('views/colleges/Logos')));
const Subpages = Loadable(lazy(() => import('views/colleges/Subpages')));
const Applications = Loadable(lazy(() => import('views/applications')));
const Profile = Loadable(lazy(() => import('views/profile')));

// Data Routes
const StatePage = Loadable(lazy(() => import('views/data/state')));
const CityPage = Loadable(lazy(() => import('views/data/city')));
const CoursePage = Loadable(lazy(() => import('views/data/course')));
const ExamPage = Loadable(lazy(() => import('views/data/exam')));
const AffiliatedPage = Loadable(lazy(() => import('views/data/affiliated')));
const StreamPage = Loadable(lazy(() => import('views/data/stream')));
const ProgramTypePage = Loadable(lazy(() => import('views/data/program-type')));
const CollegeTypePage = Loadable(lazy(() => import('views/data/college-type')));
const CourseTypePage = Loadable(lazy(() => import('views/data/course-type')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/admin',
    element: <MainLayout/>,
    children: [
        {
            path: '/profile',
            element: <Profile />
        },
        {
            path: '/users',
            element: <UsersPage/>
        },
        {
            path: '/account',
            element: <AccountPage/>
        },
        {
            path: '/roles',
            element: <RolesPage/>
        },
        {
            path: '/add-blog',
            element: <AddBlogPage/>
        },
        {
            path: '/blogs-categories',
            element: <BlogsCategoriesPage/>
        },
        {
            path: '/comments',
            element: <BlogsCommentsPage/>
        },
        {
            path: '/faqs',
            element: <FaqPage/>
        },
        {
            path: '/seo',
            element: <SeoPage/>
        },
        {
            path: '/settings',
            element: <SettingsPage/>
        },
        {
            path: '/colleges',
            element: <CollegePage/>
        },
        {
            path: '/subpages',
            element: <Subpages />
        },
        {
            path: '/logos',
            element: <CollegesLogos/>
        },
        {
            path: '/reviews',
            element: <ReviewsPage/>
        },
        {
            path: '/blogs',
            element: <BlogsPage/>
        },
        {
            path: '/applications',
            element: <Applications/>
        },
        {
            path: '/data',
            children: [
                {
                    path: '/state',
                    element: <StatePage/>
                },
                {
                    path: '/city',
                    element: <CityPage/>
                },
                {
                    path: '/course',
                    element: <CoursePage/>
                },
                {
                    path: '/entrance-exam',
                    element: <ExamPage/>
                },
                {
                    path: '/affiliated',
                    element: <AffiliatedPage/>
                },
                {
                    path: '/stream',
                    element: <StreamPage/>
                },
                {
                    path: '/program-type',
                    element: <ProgramTypePage/>
                },
                {
                    path: '/college-type',
                    element: <CollegeTypePage/>
                },
                {
                    path: '/course-type',
                    element: <CourseTypePage/>
                }
            ]
        }
    ]
};

export default MainRoutes;
