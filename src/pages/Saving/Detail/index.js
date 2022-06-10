import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { faCircleXmark, faCirclePlus, faCircleArrowLeft, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import moment from 'moment';
import Button from '~/components/Button';

import styles from './Detail.module.scss';
import Modall from '~/components/Modall';
import { useParams } from 'react-router-dom';
const cx = classNames.bind(styles);

const minMoney = 100000;

const validationSchema = Yup.object({
    identityNumber: Yup.string()
        .matches(/^[0-9]+$/, 'Chứng minh nhân dân phải là số')
        .max(12, 'Chứng minh nhân dân phải không quá 12 số')
        .min(9, 'Chứng minh nhân dân phải từ 9 số')
        .required('Trường này bắt buộc'),
    nameCustomer: Yup.string().max(50, 'Tên không được quá 50 kí tự').required('Trường này bắt buộc'),
    addressCustomer: Yup.string().max(250, 'Địa chỉ không được quá 250 kí tự').required('Trường này bắt buộc'),
    money: Yup.number()
        .typeError('Tiền gởi phải là số')
        .min(minMoney, `Tiền gửi tối thiểu là ${minMoney}`)
        .required('Trường này bắt buộc'),
});

function Detail() {
    const [saving, setSaving] = useState({ id: '' });
    const [typeSavings, setTypeSavings] = useState([]);
    const [existedCustomer, setExistedCustomer] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [pendingUpdate, setPendingUpdate] = useState(false);
    const { id } = useParams();

    const handleUpdateSaving = (values) => {
        setPendingUpdate(true);
        // Call api
        fetch(`${process.env.REACT_APP_API_URL}/saving/${id}`, {
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
            typeSavingId: '',
            nameCustomer: '',
            addressCustomer: '',
            dateCreate: moment().format('YYYY-MM-DD'),
            money: 0,
        },
        validationSchema,
        onSubmit: handleUpdateSaving,
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
        fetch(`${process.env.REACT_APP_API_URL}/saving/${id}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setSaving(data.saving);
                    console.log(data.saving.typeSavingId);
                    // formik.setFieldValue('identityNumber', data.saving.customer.identityNumber || '');
                    formik.setValues({
                        identityNumber: data.saving.customer.identityNumber || '',
                        typeSavingId: data.saving.typeSavingId || '',
                        nameCustomer: data.saving.customer.name || '',
                        addressCustomer: data.saving.customer.address || '',
                        dateCreate:
                            moment(data.saving.dateCreate).format('YYYY-MM-DD') || moment().format('YYYY-MM-DD'),
                        money: data.saving.currentMoney || 0,
                    });
                } else {
                    setSaving({});
                }
            })
            .catch((error) => {
                setSaving({});
            });
    }, []);

    useEffect(() => {
        // Call api customer
        fetch(`${process.env.REACT_APP_API_URL}/customer/find/identity/${formik.values.identityNumber}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    console.log('set value');
                    const customer = data.customer;
                    setExistedCustomer(true);
                    formik.setFieldValue('nameCustomer', customer.name);
                    formik.setFieldValue('addressCustomer', customer.address);
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
                            <Button primary to="/sotietkiem/danhsach">
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
                {isSuccess ? 'Cập nhật sổ thành công' : 'Cập nhật sổ không thành công'}
            </Modall>
            <form onSubmit={formik.handleSubmit}>
                <div className={cx('body')}>
                    <div className={cx('input-group')}>
                        <div className={cx('id-label')}>
                            <label>Mã sổ:</label>
                            <div className={cx('id')}>{saving.id}</div>
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
                            <div className={cx('input')}>
                                <label>Loại tiết kiệm</label>
                                <select
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.typeSavingId}
                                    name="typeSavingId"
                                >
                                    {typeSavings.map((typeSaving) => (
                                        <option key={typeSaving.id} value={typeSaving.id}>
                                            {typeSaving.name}
                                        </option>
                                    ))}
                                </select>
                                <div className={cx('error-message')}></div>
                            </div>
                        </div>
                        <div className={cx('row')}>
                            <div
                                className={cx('input', {
                                    error: formik.touched.nameCustomer && formik.errors.nameCustomer,
                                })}
                            >
                                <label>Tên khách hàng</label>
                                <input
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.nameCustomer}
                                    disabled={existedCustomer}
                                    name="nameCustomer"
                                />
                                <div className={cx('error-message')}>{formik.errors.nameCustomer}</div>
                            </div>
                            <div
                                className={cx('input', {
                                    error: formik.touched.dateCreate && formik.errors.dateCreate,
                                })}
                            >
                                <label>Ngày mở sổ</label>
                                <input
                                    type="date"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.dateCreate}
                                    name="dateCreate"
                                />
                                <div className={cx('error-message')}>{formik.errors.dateCreate}</div>
                            </div>
                        </div>
                        <div className={cx('row')}>
                            <div
                                className={cx('input', {
                                    error: formik.touched.addressCustomer && formik.errors.addressCustomer,
                                })}
                            >
                                <label>Địa chỉ</label>
                                <input
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.addressCustomer}
                                    disabled={existedCustomer}
                                    name="addressCustomer"
                                />
                                <div className={cx('error-message')}>{formik.errors.addressCustomer}</div>
                            </div>
                            <div
                                className={cx('input', {
                                    error: formik.touched.money && formik.errors.money,
                                })}
                            >
                                <label>Số tiền gởi</label>
                                <input
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.money}
                                    name="money"
                                />
                                <div className={cx('error-message')}>{formik.errors.money}</div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('btn-group')}>
                        <Button
                            to="/sotietkiem/danhsach"
                            yellow
                            leftIcon={<FontAwesomeIcon icon={faCircleArrowLeft} />}
                        >
                            Quay lại
                        </Button>
                        <Button
                            disabled={!(formik.isValid && formik.dirty) || pendingUpdate}
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
