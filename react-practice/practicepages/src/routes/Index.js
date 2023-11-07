import * as React from 'react';
import {  useRoutes } from 'react-router-dom';
import { DASHBOARD, CUSTOMERLIST, SIGNUPPATH, LOGINPATH } from '../config';
import { Dashboard } from '../pages/Dashboard/Index';
import CustomerList from '../pages/CustomerList/Index';
import { Signup } from '../pages/Signup/Index';
import { Login } from '../pages/Login/Index';
import Settings from '../pages/Settings/Index';
import { UpdatePassword } from '../pages/Settings/Password/Index';
import { UpdateSettings } from '../pages/Settings/Settings/Index';
import { UpdateProfile } from '../pages/Settings/Profile/Index';

const routes = [
    {
        path: DASHBOARD,
        element: <Dashboard />,
    },
    {
        path: CUSTOMERLIST,
        element: <CustomerList />,
    },
    {
        path: SIGNUPPATH,
        element: <Signup />,
    },
    {
        path: LOGINPATH,
        element: <Login />,
    },
    // {
    //   path: "/settings",
    //   element: <Settings />,
    // },
    {
        path: '/settings',
        element: (
            <>
                <Settings />
                {/* <Outlet/> */}
            </>
        ),
        children: [
            { path: 'personal', element: <UpdateProfile /> },
            { path: 'password', element: <UpdatePassword /> },
            { path: 'settings', element: <UpdateSettings /> },
        ],
    },
];

export default function AppRoutes() {
    return useRoutes(routes);
}
