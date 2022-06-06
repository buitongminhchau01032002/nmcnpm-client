import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames/bind';

import styles from './ReloadBtn.module.scss';
const cx = classNames.bind(styles);

function ReloadBtn({ onClick, reloading }) {
    return (
        <div className={cx('wrapper')} onClick={onClick}>
            <div className={cx('icon', { reload: reloading })}>
                <FontAwesomeIcon icon={faArrowsRotate} />
            </div>
            <div className={cx('text')}>Tải lại</div>
        </div>
    );
}

export default ReloadBtn;
