import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import {
    faCirclePlus,
    faEye,
    faRightFromBracket,
    faRightToBracket,
    faSearch,
    faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import ReloadBtn from '~/components/ReloadBtn';

import styles from './List.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function List() {
    const [typeSavings, setTypeSavings] = useState([]);

    useEffect(() => {
        // Call api type typeSaving
        fetch(`${process.env.REACT_APP_API_URL}/typeSaving`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setTypeSavings(data.typeSavings);
                } else {
                    setTypeSavings([]);
                }
            })
            .catch((error) => {
                setTypeSavings([]);
            });
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('top-bar')}>
                <div className={cx('left')}>
                    <p className="heading-list">Danh sách loại tiết kiệm</p>
                    <ReloadBtn />
                </div>
                <div className={cx('right')}>
                    <Button to="/loaitietkiem/tao" primary leftIcon={<FontAwesomeIcon icon={faCirclePlus} />}>
                        Tạo mới
                    </Button>
                </div>
            </div>
            <div className={cx('list')}>
                <table className={cx('table')}>
                    <thead className="table-header">
                        <tr>
                            <th>STT</th>
                            <th>Mã LTK</th>
                            <th>Tên loại tiết kiệm</th>
                            <th>{'Kì hạn (tháng)'}</th>
                            <th>{'Lãi suất (%)'}</th>
                            <th>{'Hạn rút (ngày)'}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {typeSavings ? (
                            typeSavings.map((typeSaving, index) => (
                                <tr key={typeSaving.id}>
                                    <td>{index + 1}</td>
                                    <td>{typeSaving.id}</td>
                                    <td>{typeSaving.name}</td>
                                    <td>{typeSaving.termMonth}</td>
                                    <td>{typeSaving.interestRate}</td>
                                    <td>{typeSaving.numDayCanWithdraw}</td>

                                    <td className={cx('td-action')}>
                                        <Button
                                            to={'/loaitietkiem/chitiet/' + typeSaving.id}
                                            primary
                                            small
                                            leftIcon={<FontAwesomeIcon icon={faEye} />}
                                        >
                                            Xem
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <div>Không có sổ tiết kiệm</div>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default List;
