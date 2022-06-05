import { useRoutes } from 'react-router-dom';
import {lazy} from 'react';
import Loadable from 'ui-component/Loadable';

import MainRoutes from './MainRoutes';
import config from 'config';
import MinimalLayout from "../layout/MinimalLayout";

const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([{
        path: '/admin',
        element: <MinimalLayout />,
        children: [
            {
                path: '/',
                element: <AuthLogin3 />
            }
        ]
    }, MainRoutes], config.basename);
}
