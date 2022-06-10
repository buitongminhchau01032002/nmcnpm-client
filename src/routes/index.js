import Home from '~/pages/Home';
import { ListSaving, CreateSaving, DetailSaving } from '~/pages/Saving';
import { ListCustomer, DetailCustomer } from '~/pages/Customers';
import { Withdraw, Deposit } from '~/pages/Exchange';
import Login from '~/pages/Login';
import NotFound from '~/pages/NotFound';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/sotietkiem/danhsach', component: ListSaving },
    { path: '/sotietkiem/moso', component: CreateSaving },
    { path: '/sotietkiem/chitiet/:id', component: DetailSaving },
    { path: '/khachhang/danhsach', component: ListCustomer },
    { path: '/khachhang/chitiet/:id', component: DetailCustomer },
    { path: '/giaodich/ruttien', component: Withdraw },
    { path: '/giaodich/goitien', component: Deposit },
    { path: '/login', component: Login, layout: null },
    { path: '*', component: NotFound, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
