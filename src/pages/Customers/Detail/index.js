import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { faCircleArrowLeft, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '~/components/Button';

import styles from './Detail.module.scss';
import Modall from '~/components/Modall';
const cx = classNames.bind(styles);

const validationSchema = Yup.object({
    identityNumber: Yup.string()
        .matches(/^[0-9]+$/, 'Chứng minh nhân dân phải là số')
        .max(12, 'Chứng minh nhân dân phải không quá 12 số')
        .min(9, 'Chứng minh nhân dân phải từ 9 số')
        .required('Trường này bắt buộc'),
    name: Yup.string().max(50, 'Tên không được quá 50 kí tự').required('Trường này bắt buộc'),
    address: Yup.string().max(250, 'Địa chỉ không được quá 250 kí tự').required('Trường này bắt buộc'),
});

function Detail() {
    const [customer, setCustomer] = useState({ id: '' });
    const [existedCustomer, setExistedCustomer] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [pendingUpdate, setPendingUpdate] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const handleUpdateCustomer = (values) => {
        setPendingUpdate(true);
        // Call api
        fetch(`${process.env.REACT_APP_API_URL}/customer/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(values),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setModalIsOpen(true);
                    setIsSuccess(true);
                } else {
                    setIsSuccess(false);
                    setModalIsOpen(true);
                }
                setPendingUpdate(false);
            })
            .catch((error) => {
                setIsSuccess(false);
                setModalIsOpen(true);
                setPendingUpdate(false);
            });
    };

    const formik = useFormik({
        initialValues: {
            identityNumber: '',
            name: '',
            address: '',
        },
        validationSchema,
        onSubmit: handleUpdateCustomer,
    });

    useEffect(() => {
        // Call api customer
        fetch(`${process.env.REACT_APP_API_URL}/customer/${id}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setCustomer(data.customer);
                    formik.setValues({
                        identityNumber: data.customer.identityNumber || '',
                        name: data.customer.name || '',
                        address: data.customer.address || '',
                    });
                } else {
                    setCustomer({});
                }
            })
            .catch((error) => {
                setCustomer({});
            });
    }, []);

    useEffect(() => {
        // Call api customer
        fetch(`${process.env.REACT_APP_API_URL}/customer/find/identity/${formik.values.identityNumber}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success && data.customer.id !== customer.id) {
                    console.log('set value');
                    const customer = data.customer;
                    setExistedCustomer(true);
                    formik.setFieldValue('name', customer.name);
                    formik.setFieldValue('address', customer.address);
                } else {
                    setExistedCustomer(false);
                }
            })
            .catch((error) => {
                console.log('Failed call api customer');
            });
    }, [formik.values.identityNumber]);

    return (
        <div className={cx('wrapper')}>
            <Modall
                isOpen={modalIsOpen}
                buttons={
                    <>
                        {isSuccess && (
                            <Button primary to="/khachhang/danhsach">
                                Danh sách
                            </Button>
                        )}

                        <Button yellow onClick={() => setModalIsOpen(false)}>
                            Đóng
                        </Button>
                    </>
                }
                heading="Thông báo"
            >
                {isSuccess ? 'Cập nhật khách hàng thành công' : 'Cập nhật khách hàng không thành công'}
            </Modall>
            <form onSubmit={formik.handleSubmit}>
                <div className={cx('body')}>
                    <div className={cx('input-group')}>
                        <div className={cx('id-label')}>
                            <label>Mã khách hàng:</label>
                            <div className={cx('id')}>{customer.id}</div>
                        </div>
                        <div className={cx('row')}>
                            <div
                                className={cx('input', {
                                    error: formik.touched.identityNumber && formik.errors.identityNumber,
                                })}
                            >
                                <label>CMNN</label>
                                <input
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.identityNumber}
                                    name="identityNumber"
                                />
                                <div className={cx('error-message')}>{formik.errors.identityNumber}</div>
                            </div>
                            <div
                                className={cx('input', {
                                    error: formik.touched.name && formik.errors.name,
                                })}
                            >
                                <label>Tên khách hàng</label>
                                <input
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    disabled={existedCustomer}
                                    name="name"
                                />
                                <div className={cx('error-message')}>{formik.errors.name}</div>
                            </div>
                        </div>

                        <div className={cx('row')}>
                            <div
                                className={cx('input', 'full-width', {
                                    error: formik.touched.address && formik.errors.address,
                                })}
                            >
                                <label>Địa chỉ</label>
                                <input
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address}
                                    disabled={existedCustomer}
                                    name="address"
                                />
                                <div className={cx('error-message')}>{formik.errors.address}</div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('btn-group')}>
                        <Button
                            onClick={() => navigate(-1)}
                            yellow
                            leftIcon={<FontAwesomeIcon icon={faCircleArrowLeft} />}
                        >
                            Quay lại
                        </Button>
                        <Button
                            disabled={!(formik.isValid && formik.dirty) || pendingUpdate || existedCustomer}
                            primary
                            type="submit"
                            leftIcon={<FontAwesomeIcon icon={faCircleCheck} />}
                        >
                            Cập nhật
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Detail;
