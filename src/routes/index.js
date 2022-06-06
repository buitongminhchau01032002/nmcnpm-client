import Home from '~/pages/Home';
import { ListSaving } from '~/pages/Saving';
import Customers from '~/pages/Customers';
import Login from '~/pages/Login';
import { Fragment } from 'react';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/sotietkiem/danhsach', component: ListSaving },
    { path: '/khachhang', component: Customers },
    { path: '/login', component: Login, layout: null },
    { path: '*', component: Fragment },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
