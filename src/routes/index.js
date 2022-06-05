import Home from '~/pages/Home';
import Saving from '~/pages/Saving';
import Customers from '~/pages/Customers';
import Login from '~/pages/Login';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/sotietkiem', component: Saving },
    { path: '/khachhang', component: Customers },
    { path: '/login', component: Login, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
