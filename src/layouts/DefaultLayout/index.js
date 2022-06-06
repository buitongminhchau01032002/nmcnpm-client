import classNames from 'classnames/bind';
import Sidebar from '~/layouts/components/Sidebar';
import Title from '~/layouts/components/Title';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <div className={cx('container')}>
                <Title />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
