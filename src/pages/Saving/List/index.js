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
    const [listSaving, setListSaving] = useState([]);
    const [activeFilter, setActiveFilter] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const handleFilter = (values) => {
        const filterObject = {};
        if (values.id) {
            filterObject.id = values.id;
        }
        if (values.typeSavingId) {
            filterObject.typeSavingId = values.typeSavingId;
        }
        if (values.nameCustomer) {
            filterObject.nameCustomer = values.nameCustomer;
        }
        if (values.currentMoney) {
            filterObject.currentMoney = values.currentMoney;
        }
        if (values.currentMoney) {
            filterObject.currentMoney = values.currentMoney;
        }
        setActiveFilter(Object.keys(filterObject).length === 0 ? false : true);
        // Call api saving
        fetch(
            `${process.env.REACT_APP_API_URL}/saving/filter?` +
                new URLSearchParams({ ...filterObject, currentDay: moment().format('YYYY-MM-DD') }),
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setListSaving(data.savings);
                } else {
                    setListSaving([]);
                }
            })
            .catch((error) => {
                setListSaving([]);
            });
        setShowFilter(false);
    };
    const formikFilter = useFormik({
        initialValues: {
            id: '',
            nameCustomer: '',
            typeSavingId: '',
            totalMoney: '',
        },
        onSubmit: handleFilter,
    });

    useEffect(() => {
        // Call api type saving
        fetch(`${process.env.REACT_APP_API_URL}/typesaving`)
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

    useEffect(() => {
        // Call api saving
        fetch(`${process.env.REACT_APP_API_URL}/saving?currentDay=${moment().format('YYYY-MM-DD')}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setListSaving(data.savings);
                } else {
                    setListSaving([]);
                }
            })
            .catch((error) => {
                setListSaving([]);
            });
    }, []);

    const handleResetFilter = (e) => {
        e.preventDefault();
        formikFilter.setValues({
            id: '',
            nameCustomer: '',
            typeSavingId: '',
            totalMoney: '',
        });
        setActiveFilter(false);

        // Call api saving
        fetch(`${process.env.REACT_APP_API_URL}/saving`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setListSaving(data.savings);
                } else {
                    setListSaving([]);
                }
            })
            .catch((error) => {
                setListSaving([]);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('top-bar')}>
                <div className={cx('left')}>
                    <p className="heading-list">Danh s??ch s???</p>
                    <ReloadBtn />
                </div>
                <div className={cx('right')}>
                    <div>
                        <HeadlessTippy
                            interactive
                            visible={showFilter}
                            render={(attrs) => (
                                <div className={cx('filter-panel')} {...attrs}>
                                    <div className={cx('header')}>Tra c???u s??? ti???t ki???m</div>
                                    <form onSubmit={formikFilter.handleSubmit}>
                                        <div className={cx('content')}>
                                            <div className={cx('input')}>
                                                <label>M?? s???:</label>
                                                <input
                                                    type="text"
                                                    onChange={formikFilter.handleChange}
                                                    value={formikFilter.values.id}
                                                    name="id"
                                                    placeholder="M?? s???"
                                                />
                                            </div>
                                            <div className={cx('input')}>
                                                <label>Lo???i ti???t ki???m:</label>
                                                <select
                                                    onChange={formikFilter.handleChange}
                                                    value={formikFilter.values.typeSavingId}
                                                    name="typeSavingId"
                                                >
                                                    <option value="">T???t c???</option>
                                                    {typeSavings.map((typeSaving) => (
                                                        <option key={typeSaving.id} value={typeSaving.id}>
                                                            {typeSaving.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className={cx('input')}>
                                                <label>Kh??ch h??ng:</label>
                                                <input
                                                    type="text"
                                                    onChange={formikFilter.handleChange}
                                                    value={formikFilter.values.nameCustomer}
                                                    name="nameCustomer"
                                                    placeholder="T??n kh??ch h??ng"
                                                />
                                            </div>
                                            <div className={cx('input')} style={{ display: 'none' }}>
                                                <label>S??? d??:</label>
                                                <input
                                                    type="text"
                                                    onChange={formikFilter.handleChange}
                                                    value={formikFilter.values.totalMoney}
                                                    name="totalMoney"
                                                    placeholder="S??? d??"
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('footer')}>
                                            <Button
                                                yellow
                                                leftIcon={<FontAwesomeIcon icon={faTrashCan} />}
                                                onClick={handleResetFilter}
                                            >
                                                ?????t l???i
                                            </Button>
                                            <Button
                                                primary
                                                type="submit"
                                                leftIcon={<FontAwesomeIcon icon={faSearch} />}
                                            >
                                                Tra c???u
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            )}
                            onClickOutside={() => setShowFilter(false)}
                            placement="bottom-end"
                        >
                            <button
                                className={cx('filter-btn', { active: activeFilter })}
                                onClick={() => setShowFilter(!showFilter)}
                            >
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={faSearch} />
                                </span>
                                Tra c???u
                            </button>
                        </HeadlessTippy>
                    </div>

                    <Button to="/sotietkiem/moso" primary leftIcon={<FontAwesomeIcon icon={faCirclePlus} />}>
                        M??? s???
                    </Button>
                </div>
            </div>
            <div className={cx('list')}>
                <table className={cx('table')}>
                    <thead className="table-header">
                        <tr>
                            <th>STT</th>
                            <th>M?? s???</th>
                            <th>Lo???i ti???t ki???m</th>
                            <th>Kh??ch h??ng</th>
                            <th>S??? d??</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listSaving ? (
                            listSaving.map((saving, index) => (
                                <tr key={saving.id}>
                                    <td>{index + 1}</td>
                                    <td>{saving.id}</td>
                                    <td>{saving.typeSaving.name}</td>
                                    <td>
                                        <Link
                                            className={cx('customer-link')}
                                            to={'/khachhang/chitiet/' + saving.customer.id}
                                        >
                                            {saving.customer.name}
                                        </Link>
                                    </td>
                                    <td>{saving.totalMoney}</td>
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
                                            G???i
                                        </Button>

                                        <Button
                                            to={'/giaodich/ruttien?redirect=' + saving.id}
                                            yellow
                                            small
                                            leftIcon={<FontAwesomeIcon icon={faRightFromBracket} />}
                                        >
                                            R??t
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <div>Kh??ng c?? s??? ti???t ki???m</div>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default List;
