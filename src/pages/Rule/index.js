import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { faRightToBracket, faCircleArrowLeft, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import moment from 'moment';
import Button from '~/components/Button';

import styles from './Rule.module.scss';
import Modall from '~/components/Modall';

const cx = classNames.bind(styles);

function Rule() {
    const [pendingUpdate, setPendingUpdate] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleUpdateRule = (values) => {
        setPendingUpdate(true);
        // Call api
        fetch(`${process.env.REACT_APP_API_URL}/rule`, {
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
                    console.log('api error message', data.message);
                }
                setPendingUpdate(false);
            })
            .catch((error) => {
                setIsSuccess(false);
                setModalIsOpen(true);
                setPendingUpdate(false);
            });
    };

    const validationSchema = Yup.object({
        minMoneyBegin: Yup.number().typeError('Trường này phải là số').required('Trường này bắt buộc'),
        minMoneyDeposit: Yup.number().typeError('Trường này phải là số').required('Trường này bắt buộc'),
    });

    const formik = useFormik({
        initialValues: {
            minMoneyBegin: 0,
            minMoneyDeposit: 0,
        },
        validationSchema,
        onSubmit: handleUpdateRule,
    });

    useEffect(() => {
        // Call api rule
        fetch(`${process.env.REACT_APP_API_URL}/rule`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    formik.setFieldValue('minMoneyBegin', data.rules[0].value);
                    formik.setFieldValue('minMoneyDeposit', data.rules[1].value);
                } else {
                    formik.setFieldValue('minMoneyBegin', 'Không xác định');
                    formik.setFieldValue('minMoneyDeposit', 'Không xác định');
                }
            })
            .catch((error) => {
                formik.setFieldValue('minMoneyBegin', 'Không xác định');
                formik.setFieldValue('minMoneyDeposit', 'Không xác định');
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
                {isSuccess ? 'Cập nhật thành công' : 'Cập nhật không thành công'}
            </Modall>
            <form onSubmit={formik.handleSubmit}>
                <div className={cx('body')}>
                    <div className={cx('input-group')}>
                        <div className={cx('row')}>
                            <div
                                className={cx('input', {
                                    error: formik.touched.minMoneyBegin && formik.errors.minMoneyBegin,
                                })}
                            >
                                <label>Số tiền gởi ban đầu tối thiểu </label>
                                <input
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.minMoneyBegin}
                                    name="minMoneyBegin"
                                />
                                <div className={cx('error-message')}>{formik.errors.minMoneyBegin}</div>
                            </div>

                            <div
                                className={cx('input', {
                                    error: formik.touched.minMoneyDeposit && formik.errors.minMoneyDeposit,
                                })}
                            >
                                <label>Số tiền gởi thêm tối thiểu </label>
                                <input
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.minMoneyDeposit}
                                    name="minMoneyDeposit"
                                />
                                <div className={cx('error-message')}>{formik.errors.minMoneyDeposit}</div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('btn-group')}>
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

export default Rule;
