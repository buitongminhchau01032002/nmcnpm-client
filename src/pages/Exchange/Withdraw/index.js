import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { faBackspace, faCircleArrowLeft, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import moment from 'moment';
import Button from '~/components/Button';
import Modall from '~/components/Modall';

import styles from './Withdraw.module.scss';
const cx = classNames.bind(styles);

const validationSchema = Yup.object({
    id: Yup.string().required('Trường này bắt buộc'),
});

function Withdraw() {
    const [pendingCreate, setPendingCreate] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [maxMoney, setMaxMoney] = useState(0);
    const [existMoney, setExistsMoney] = useState(false);

    const handleCreateWithdraw = (values) => {
        setPendingCreate(true);
        // Call api
        fetch(`${process.env.REACT_APP_API_URL}/withdraw`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                savingId: values.id,
                dateWithdraw: values.dateWithdraw,
                money: values.moneyWithdraw,
            }),
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
    const validationSchema = Yup.object({
        id: Yup.string().required('Trường này bắt buộc'),
        moneyWithdraw: Yup.number()
            .typeError('Tiền rút phải là số')
            .max(maxMoney, `Tiền rút tối đa là ${maxMoney}`)
            .required('Trường này bắt buộc'),
    });
    const formik = useFormik({
        initialValues: {
            id: '',
            customerName: 'Không xác định',
            dateWithdraw: moment().format('YYYY-MM-DD'),
            moneyWithdraw: '',
            totalMoney: '',
        },
        validationSchema,
        onSubmit: handleCreateWithdraw,
    });

    useEffect(() => {
        // Call api one saving
        fetch(`${process.env.REACT_APP_API_URL}/saving/${formik.values.id}?currentDay=${formik.values.dateWithdraw}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    formik.setFieldValue('customerName', data.saving.customer.name);
                    formik.setFieldValue('totalMoney', data.saving.totalMoney);
                    setMaxMoney(data.saving.totalMoney);
                    if (data.saving.typeSaving.termMonth !== 0) {
                        setExistsMoney(true);
                        formik.setFieldValue('moneyWithdraw', data.saving.totalMoney);
                    } else {
                        setExistsMoney(false);
                    }
                } else {
                    formik.setFieldValue('customerName', 'Không xác định');
                }
            })
            .catch((error) => {
                formik.setFieldValue('customerName', 'Không xác định');
            });
    }, [formik.values.id, formik.values.dateWithdraw]);

    return (
        <div className={cx('wrapper')}>
            <Modall
                isOpen={modalIsOpen}
                buttons={
                    <>
                        <Button yellow onClick={() => setModalIsOpen(false)}>
                            Đóng
                        </Button>
                    </>
                }
                heading="Thông báo"
            >
                {isSuccess ? 'Rút tiền thành công' : 'Rút tiền không thành công'}
            </Modall>
            <form onSubmit={formik.handleSubmit}>
                <div className={cx('body')}>
                    <div className={cx('input-group')}>
                        <div className={cx('row')}>
                            <div
                                className={cx('input', {
                                    error: formik.touched.id && formik.errors.id,
                                })}
                            >
                                <label>Mã số</label>
                                <input
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.id}
                                    name="id"
                                />
                                <div className={cx('error-message')}>{formik.errors.id}</div>
                            </div>
                            <div className={cx('input')}>
                                <label>Tên khách hàng</label>
                                <input
                                    type="text"
                                    disabled
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.customerName}
                                    name="customerName"
                                />
                                <div className={cx('error-message')}></div>
                            </div>
                        </div>
                        <div className={cx('row')}>
                            <div
                                className={cx('input', {
                                    error: formik.touched.dateWithdraw && formik.errors.dateWithdraw,
                                })}
                            >
                                <label>Ngày rút</label>
                                <input
                                    type="date"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.dateWithdraw}
                                    name="dateWithdraw"
                                />
                                <div className={cx('error-message')}>{formik.errors.dateWithdraw}</div>
                            </div>
                            <div
                                className={cx('input', {
                                    error: formik.touched.moneyWithdraw && formik.errors.moneyWithdraw,
                                })}
                            >
                                <label>Số tiền rút</label>
                                <input
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.moneyWithdraw}
                                    name="moneyWithdraw"
                                    disabled={existMoney}
                                />
                                <div className={cx('error-message')}>{formik.errors.moneyWithdraw}</div>
                            </div>
                        </div>
                        <div className={cx('row')}>
                            <div className={cx('input')}>
                                <label>Số dư</label>
                                <input
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.totalMoney}
                                    name="totalMoney"
                                    disabled
                                />
                                <div className={cx('error-message')}>{}</div>
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
                            disabled={!(formik.isValid && formik.dirty) || pendingCreate}
                            primary
                            leftIcon={<FontAwesomeIcon icon={faRightFromBracket} />}
                            type="submit"
                        >
                            Rút tiền
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Withdraw;
