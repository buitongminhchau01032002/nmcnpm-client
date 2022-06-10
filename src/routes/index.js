import Home from '~/pages/Home';
import { ListSaving, CreateSaving, DetailSaving } from '~/pages/Saving';
import Customers from '~/pages/Customers';
import { Withdraw, Deposit } from '~/pages/Exchange';
import Login from '~/pages/Login';
import { Fragment } from 'react';
import NotFound from '~/pages/NotFound';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/sotietkiem/danhsach', component: ListSaving },
    { path: '/sotietkiem/moso', component: CreateSaving },
    { path: '/sotietkiem/chitiet/:id', component: DetailSaving },
    { path: '/khachhang', component: Customers },
    { path: '/giaodich/ruttien', component: Withdraw },
    { path: '/giaodich/goitien', component: Deposit },
    { path: '/login', component: Login, layout: null },
    { path: '*', component: NotFound, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
