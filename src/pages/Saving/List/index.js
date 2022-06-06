import { faCirclePlus, faEye, faRightFromBracket, faRightToBracket, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import ReloadBtn from '~/components/ReloadBtn';

import styles from './List.module.scss';
const cx = classNames.bind(styles);

const listSaving = [
    {
        id: 1,
        typeSaving: {
            id: 1,
            name: 'Không kì hạn',
        },
        customer: {
            id: 1,
            name: 'Nguyễn Văn A',
        },
        money: 256000,
    },
    {
        id: 2,
        typeSaving: {
            id: 1,
            name: 'Không kì hạn',
        },
        customer: {
            id: 1,
            name: 'Nguyễn Văn A',
        },
        money: 256000,
    },
    {
        id: 3,
        typeSaving: {
            id: 1,
            name: 'Không kì hạn',
        },
        customer: {
            id: 1,
            name: 'Nguyễn Văn A',
        },
        money: 256000,
    },
    {
        id: 4,
        typeSaving: {
            id: 1,
            name: 'Không kì hạn',
        },
        customer: {
            id: 1,
            name: 'Nguyễn Văn A',
        },
        money: 256000,
    },
    {
        id: 5,
        typeSaving: {
            id: 1,
            name: 'Không kì hạn',
        },
        customer: {
            id: 1,
            name: 'Nguyễn Văn A',
        },
        money: 256000,
    },

    {
        id: 6,
        typeSaving: {
            id: 1,
            name: 'Không kì hạn',
        },
        customer: {
            id: 1,
            name: 'Nguyễn Văn A',
        },
        money: 256000,
    },
    {
        id: 7,
        typeSaving: {
            id: 1,
            name: 'Không kì hạn',
        },
        customer: {
            id: 1,
            name: 'Nguyễn Văn A',
        },
        money: 256000,
    },
    {
        id: 8,
        typeSaving: {
            id: 1,
            name: 'Không kì hạn',
        },
        customer: {
            id: 1,
            name: 'Nguyễn Văn A',
        },
        money: 256000,
    },
    {
        id: 9,
        typeSaving: {
            id: 1,
            name: 'Không kì hạn',
        },
        customer: {
            id: 1,
            name: 'Nguyễn Văn A',
        },
        money: 256000,
    },
    {
        id: 10,
        typeSaving: {
            id: 1,
            name: 'Không kì hạn',
        },
        customer: {
            id: 1,
            name: 'Nguyễn Văn A',
        },
        money: 256000,
    },
    {
        id: 11,
        typeSaving: {
            id: 1,
            name: 'Không kì hạn',
        },
        customer: {
            id: 1,
            name: 'Nguyễn Văn A',
        },
        money: 256000,
    },

    {
        id: 12,
        typeSaving: {
            id: 1,
            name: 'Không kì hạn',
        },
        customer: {
            id: 1,
            name: 'Nguyễn Văn A',
        },
        money: 256000,
    },
];

function List() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('top-bar')}>
                <div className={cx('left')}>
                    <p className="heading-list">Danh sách sổ</p>
                    <ReloadBtn />
                </div>
                <div className={cx('right')}>
                    <div className={cx('search')}>
                        <input type="search" placeholder="Tra cứu" />
                        <Button square gray leftIcon={<FontAwesomeIcon icon={faSearch} />}></Button>
                    </div>

                    <Button primary leftIcon={<FontAwesomeIcon icon={faCirclePlus} />}>
                        Mở sổ
                    </Button>
                </div>
            </div>
            <div className={cx('list')}>
                <table className={cx('table')}>
                    <thead className="table-header">
                        <tr>
                            <th>STT</th>
                            <th>Mã số</th>
                            <th>Loại tiết kiệm</th>
                            <th>Khách hàng</th>
                            <th>Số dư</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listSaving.map((saving, index) => (
                            <tr key={saving.id}>
                                <td>{index + 1}</td>
                                <td>{saving.id}</td>
                                <td>{saving.typeSaving.name}</td>
                                <td>{saving.customer.name}</td>
                                <td>{saving.money}</td>
                                <td className={cx('td-action')}>
                                    <Button
                                        to={'/sotietkiem/chitiet/' + saving.id}
                                        primary
                                        small
                                        leftIcon={<FontAwesomeIcon icon={faEye} />}
                                    >
                                        Xem
                                    </Button>

                                    <Button
                                        to={'/giaodich/goitien?redirect=' + saving.id}
                                        green
                                        small
                                        leftIcon={<FontAwesomeIcon icon={faRightToBracket} />}
                                    >
                                        Gởi
                                    </Button>

                                    <Button
                                        to={'/giaodich/ruttien?redirect=' + saving.id}
                                        yellow
                                        small
                                        leftIcon={<FontAwesomeIcon icon={faRightFromBracket} />}
                                    >
                                        Rút
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default List;