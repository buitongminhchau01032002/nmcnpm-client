import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { faCircleXmark, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import moment from 'moment';
import Button from '~/components/Button';

import styles from './Create.module.scss';
import Modall from '~/components/Modall';
const cx = classNames.bind(styles);

function Create() {
    const [typeSavings, setTypeSavings] = useState([]);
    const [existedCustomer, setExistedCustomer] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [pendingCreate, setPendingCreate] = useState(false);
    const [minMoney, setMinMoney] = useState(0);

    // name: '',
    // termMonth: 0,
    // interestRate: 0,
    // numDayCanWithdraw: 0,

    const validationSchema = Yup.object({
        name: Yup.string().required('Trường này bắt buộc'),
        termMonth: Yup.number()
            .typeError('Trường này phải là số')
            .min(0, `Tối thiểu là 0`)
            .required('Trường này bắt buộc'),
        interestRate: Yup.number()
            .typeError('Trường này phải là số')
            .min(0, `Tối thiểu là 0`)
            .required('Trường này bắt buộc'),
        numDayCanWithdraw: Yup.number()
            .typeError('Trường này phải là số')
            .min(0, `Tối thiểu là 0`)
            .required('Trường này bắt buộc'),
    });

    const handleCreateTypeSaving = (values) => {
        setPendingCreate(true);
        // Call api
        fetch(`${process.env.REACT_APP_API_URL}/typesaving`, {
            method: 'POST',
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
                setPendingCreate(false);
            })
            .catch((error) => {
                setIsSuccess(false);
                setModalIsOpen(true);
                setPendingCreate(false);
            });
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            termMonth: 0,
            interestRate: 0,
            numDayCanWithdraw: 0,
        },
        validationSchema,
        onSubmit: handleCreateTypeSaving,
    });

    return (
        <div className={cx('wrapper')}>
            <Modall
                isOpen={modalIsOpen}
                buttons={
                    <>
                        {isSuccess && (
                            <Button primary to="/loaitietkiem/danhsach">
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
                {isSuccess ? 'Tạo mới thành công' : 'Tạo mới không thành công'}
            </Modall>
            <form onSubmit={formik.handleSubmit}>
                <div className={cx('body')}>
                    <div className={cx('input-group')}>
                        <div className={cx('row')}>
                            <div
                                className={cx('input', {
                                    error: formik.touched.name && formik.errors.name,
                                })}
                            >
                                <label>Tên loại tiết kiệm</label>
                                <input
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    name="name"
                                />
                                <div className={cx('error-message')}>{formik.errors.name}</div>
                            </div>
                            <div
                                className={cx('input', {
                                    error: formik.touched.termMonth && formik.errors.termMonth,
                                })}
                            >
                                <label>{'Kì hạn (tháng)'}</label>
                                <input
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.termMonth}
                                    name="termMonth"
                                />
                                <div className={cx('error-message')}>{formik.errors.termMonth}</div>
                            </div>
                        </div>
                        <div className={cx('row')}>
                            <div
                                className={cx('input', {
                                    error: formik.touched.interestRate && formik.errors.interestRate,
                                })}
                            >
                                <label>{'Lãi suất (%)'}</label>
                                <input
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.interestRate}
                                    name="interestRate"
                                />
                                <div className={cx('error-message')}>{formik.errors.interestRate}</div>
                            </div>
                            <div
                                className={cx('input', {
                                    error: formik.touched.numDayCanWithdraw && formik.errors.numDayCanWithdraw,
                                })}
                            >
                                <label>{'Hạn rút (ngày)'}</label>
                                <input
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.numDayCanWithdraw}
                                    name="numDayCanWithdraw"
                                />
                                <div className={cx('error-message')}>{formik.errors.numDayCanWithdraw}</div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('btn-group')}>
                        <Button to="/loaitietkiem/danhsach" red leftIcon={<FontAwesomeIcon icon={faCircleXmark} />}>
                            Huỷ
                        </Button>
                        <Button
                            disabled={!(formik.isValid && formik.dirty) || pendingCreate}
                            primary
                            type="submit"
                            leftIcon={<FontAwesomeIcon icon={faCirclePlus} />}
                        >
                            Tạo mới
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Create;
