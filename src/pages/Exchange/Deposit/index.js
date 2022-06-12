import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { faRightToBracket, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import moment from 'moment';
import Button from '~/components/Button';

import styles from './Deposit.module.scss';
import Modall from '~/components/Modall';

const cx = classNames.bind(styles);

function Deposit() {
    const [pendingCreate, setPendingCreate] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [minMoney, setMinMoney] = useState(0);

    const handleCreateDeposit = (values) => {
        setPendingCreate(true);
        // Call api
        fetch(`${process.env.REACT_APP_API_URL}/deposit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                savingId: values.id,
                dateDeposit: values.dateDeposit,
                money: values.moneyDeposit,
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
        moneyDeposit: Yup.number()
            .typeError('Tiền gởi phải là số')
            .min(minMoney, `Tiền gởi tối thiểu là ${minMoney}`)
            .required('Trường này bắt buộc'),
    });

    const formik = useFormik({
        initialValues: {
            id: '',
            customerName: 'Không xác định',
            dateDeposit: moment().format('YYYY-MM-DD'),
            moneyDeposit: '',
        },
        validationSchema,
        onSubmit: handleCreateDeposit,
    });

    useEffect(() => {
        // Call api one saving
        fetch(`${process.env.REACT_APP_API_URL}/saving/${formik.values.id}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    formik.setFieldValue('customerName', data.saving.customer.name);
                } else {
                    formik.setFieldValue('customerName', 'Không xác định');
                }
            })
            .catch((error) => {
                formik.setFieldValue('customerName', 'Không xác định');
            });
    }, [formik.values.id]);

    useEffect(() => {
        // Call api min money
        fetch(`${process.env.REACT_APP_API_URL}/rule/minMoneyDeposit`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setMinMoney(data.rule.value);
                } else {
                    setMinMoney();
                }
            })
            .catch((error) => {
                setMinMoney();
            });
    }, []);
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
                {isSuccess ? 'Gởi tiền thành công' : 'Gởi tiền không thành công'}
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
                                    error: formik.touched.dateDeposit && formik.errors.dateDeposit,
                                })}
                            >
                                <label>Ngày gởi</label>
                                <input
                                    type="date"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.dateDeposit}
                                    name="dateDeposit"
                                />
                                <div className={cx('error-message')}>{formik.errors.dateDeposit}</div>
                            </div>
                            <div
                                className={cx('input', {
                                    error: formik.touched.moneyDeposit && formik.errors.moneyDeposit,
                                })}
                            >
                                <label>Số tiền gởi</label>
                                <input
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.moneyDeposit}
                                    name="moneyDeposit"
                                />
                                <div className={cx('error-message')}>{formik.errors.moneyDeposit}</div>
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
                            type="submit"
                            leftIcon={<FontAwesomeIcon icon={faRightToBracket} />}
                        >
                            Gởi tiền
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Deposit;
