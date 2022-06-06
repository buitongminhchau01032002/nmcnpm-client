import { faCirclePlus, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import ReloadBtn from '~/components/ReloadBtn';

import styles from './List.module.scss';
const cx = classNames.bind(styles);

function List() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('top-bar')}>
                <div className={cx('left')}>
                    <p className="heading-list">Danh sách sổ</p>
                    <ReloadBtn />
                </div>
                <div className={cx('right')}>
                    <Button gray leftIcon={<FontAwesomeIcon icon={faFilter} />}>
                        Lọc
                    </Button>
                    <Button primary leftIcon={<FontAwesomeIcon icon={faCirclePlus} />}>
                        Mở sổ
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default List;
