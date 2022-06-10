import { useEffect, useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import ReloadBtn from '~/components/ReloadBtn';

import styles from './Customers.module.scss';
const cx = classNames.bind(styles);

function Customers() {
    const [listCustomer, setListCustomer] = useState([]);
    useEffect(() => {
        // Call api
        fetch(`${process.env.REACT_APP_API_URL}/customer`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setListCustomer(data.customers);
                } else {
                    setListCustomer([]);
                }
            })
            .catch((error) => {
                setListCustomer([]);
            });
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('top-bar')}>
                <div className={cx('left')}>
                    <p className="heading-list">Danh sách khách hàng</p>
                    <ReloadBtn />
                </div>
                <div className={cx('right')}>
                    <div className={cx('search')}>
                        <input type="search" placeholder="Tra cứu" />
                        <Button square gray leftIcon={<FontAwesomeIcon icon={faSearch} />}></Button>
                    </div>
                </div>
            </div>
            <div className={cx('list')}>
                <table className={cx('table')}>
                    <thead className="table-header">
                        <tr>
                            <th>STT</th>
                            <th>Mã khách hàng</th>
                            <th>Tên khách hàng</th>
                            <th>CMNN</th>
                            <th>Địa chỉ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listCustomer.map((customer, index) => (
                            <tr key={customer.id}>
                                <td>{index + 1}</td>
                                <td>{customer.id}</td>
                                <td>{customer.name}</td>
                                <td>{customer.identityNumber}</td>
                                <td>{customer.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Customers;
