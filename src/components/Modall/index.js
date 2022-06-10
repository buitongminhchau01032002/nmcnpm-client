import Modal from 'react-modal';
import classNames from 'classnames/bind';

import styles from './Modall.module.scss';

const cx = classNames.bind(styles);

function Modall({ children, buttons, heading, ...props }) {
    return (
        <Modal {...props} className={cx('Modal')} overlayClassName={cx('Overlay')} ariaHideApp={false}>
            <div className={cx('header')}>
                <div>{heading}</div>
            </div>
            <div className={cx('content')}>{children}</div>
            <div className={cx('buttons')}>{buttons}</div>
        </Modal>
    );
}

export default Modall;
