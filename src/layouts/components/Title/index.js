import { matchPath, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Title.module.scss';
const cx = classNames.bind(styles);

const TITLES = [
    {
        path: '/',
        title: 'Trang chủ',
    },
    {
        path: '/sotietkiem/danhsach',
        title: 'Danh sách sổ tiết kiệm',
    },
    {
        path: '/sotietkiem/moso',
        title: 'Mở sổ',
    },
    {
        path: '/sotietkiem/chitiet/:id',
        title: 'Chi tiết sổ',
    },
    {
        path: '/khachhang/danhsach',
        title: 'Danh sách khách hàng',
    },
    {
        path: '/khachhang/chitiet/:id',
        title: 'Chi tiết khách hàng',
    },
    {
        path: '/giaodich/goitien',
        title: 'Gởi tiền',
    },
    {
        path: '/giaodich/ruttien',
        title: 'Rút tiền',
    },
    {
        path: '/baocao/doanhso',
        title: 'Báo cáo doanh số ngày',
    },
    {
        path: '/baocao/dongmo',
        title: 'Báo cáo đóng/mở tháng',
    },
    {
        path: '/loaitietkiem/danhsach',
        title: 'Danh sách loại tiết kiệm',
    },
    {
        path: '/loaitietkiem/tao',
        title: 'Tạo loại tiết kiệm',
    },
    {
        path: '/loaitietkiem/chitiet/:id',
        title: 'Chi tiết loại tiết kiệm',
    },
    {
        path: '/quydinh',
        title: 'Quy định',
    },
];

function Title() {
    let title = 'Không có tiêu đề';
    const { pathname } = useLocation();
    TITLES.forEach((t) => {
        if (matchPath(t.path, pathname)) {
            title = t.title;
        }
    });
    return <div className={cx('title')}>{title}</div>;
}

export default Title;
