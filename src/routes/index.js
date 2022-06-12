import Home from '~/pages/Home';
import { ListSaving, CreateSaving, DetailSaving } from '~/pages/Saving';
import { ListTypeSaving, CreateTypeSaving, DetailTypeSaving } from '~/pages/TypeSaving';
import { ListCustomer, DetailCustomer } from '~/pages/Customers';
import { Withdraw, Deposit } from '~/pages/Exchange';
import { DayReport, MonthReport } from '~/pages/Report';
import Login from '~/pages/Login';
import NotFound from '~/pages/NotFound';
import Rule from '~/pages/Rule';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/sotietkiem/danhsach', component: ListSaving },
    { path: '/sotietkiem/moso', component: CreateSaving },
    { path: '/sotietkiem/chitiet/:id', component: DetailSaving },
    { path: '/loaitietkiem/danhsach', component: ListTypeSaving },
    { path: '/loaitietkiem/tao', component: CreateTypeSaving },
    { path: '/loaitietkiem/chitiet/:id', component: DetailTypeSaving },
    { path: '/khachhang/danhsach', component: ListCustomer },
    { path: '/khachhang/chitiet/:id', component: DetailCustomer },
    { path: '/giaodich/ruttien', component: Withdraw },
    { path: '/giaodich/goitien', component: Deposit },
    { path: '/baocao/doanhso', component: DayReport },
    { path: '/baocao/dongmo', component: MonthReport },
    { path: '/quydinh', component: Rule },
    { path: '/login', component: Login, layout: null },
    { path: '*', component: NotFound, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
