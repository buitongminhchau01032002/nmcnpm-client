import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBook,
    faChartSimple,
    faChevronRight,
    faCirclePlus,
    faHomeAlt,
    faMoneyBillTransfer,
    faRectangleList,
    faRightFromBracket,
    faRightToBracket,
    faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

import styles from './Sidebar.module.scss';
import SubMenuHeader from '~/components/SubMenuHeader';
const cx = classNames.bind(styles);

const MENU = [
    {
        title: 'Trang chủ',
        icon: faHomeAlt,
        to: '/',
    },
    {
        title: 'Sổ tiết kiệm',
        icon: faBook,
        to: '/sotietkiem',
        sub: [
            {
                title: 'Danh sách',
                icon: faRectangleList,
                to: '/danhsach',
            },
            {
                title: 'Mở sổ',
                icon: faCirclePlus,
                to: '/moso',
            },
        ],
    },
    {
        title: 'Khách hàng',
        icon: faUserGroup,
        to: '/khachhang/danhsach',
    },
    {
        title: 'Giao dịch',
        icon: faMoneyBillTransfer,
        to: '/giaodich',
        sub: [
            {
                title: 'Rút tiền',
                icon: faRightFromBracket,
                to: '/ruttien',
            },
            {
                title: 'Gởi tiền',
                icon: faRightToBracket,
                to: '/goitien',
            },
        ],
    },
    {
        title: 'Báo cáo',
        icon: faChartSimple,
        to: '/baocao',
        sub: [
            {
                title: 'Doanh số',
                icon: faRightFromBracket,
                to: '/doanhso',
            },
            {
                title: 'Đóng/mở sổ',
                icon: faRightToBracket,
                to: '/dongmo',
            },
        ],
    },
    {
        title: 'Quy định',
        icon: faHomeAlt,
        to: '/quydinh',
    },
];

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <img className={cx('logo')} src="" alt="logo" />
            </header>
            <div className={cx('menu-list')}>
                {MENU.map((item, index) =>
                    !item.sub ? (
                        <NavLink
                            key={index}
                            to={item.to}
                            className={({ isActive }) => cx('menu-item', { active: isActive })}
                        >
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={item.icon} />
                            </div>
                            <p className={cx('menu-text')}>{item.title}</p>
                        </NavLink>
                    ) : (
                        <div key={index} className={cx('dropdown')}>
                            <input className={cx('hidden-checkbox')} type="checkbox" id={'sidebar-checkbox-' + index} />
                            <SubMenuHeader
                                to={item.to}
                                className={cx('sub-menu-header', 'menu-item')}
                                htmlFor={'sidebar-checkbox-' + index}
                                activeClass={cx('active')}
                            >
                                <div className={cx('text')}>
                                    <div className={cx('icon')}>
                                        <FontAwesomeIcon icon={item.icon} />
                                    </div>
                                    <p className={cx('menu-text')}>{item.title}</p>
                                </div>
                                <div className={cx('arrow-icon')}>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </div>
                            </SubMenuHeader>
                            <div className={cx('content')}>
                                {item.sub.map((subItem, index) => (
                                    <NavLink
                                        key={index}
                                        to={item.to + subItem.to}
                                        className={({ isActive }) => cx('sub-menu-item', { active: isActive })}
                                    >
                                        <div className={cx('icon')}>
                                            <FontAwesomeIcon icon={subItem.icon} />
                                        </div>
                                        <p className={cx('sub-menu-text')}>{subItem.title}</p>
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    ),
                )}
            </div>
        </div>
    );
}

export default Sidebar;
