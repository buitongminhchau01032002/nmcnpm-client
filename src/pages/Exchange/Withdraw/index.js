import * as Yup from 'yup';
import { useEffect } from 'react';
import { faBackspace, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import moment from 'moment';
import Button from '~/components/Button';

import styles from './Withdraw.module.scss';
const cx = classNames.bind(styles);

const validationSchema = Yup.object({
    id: Yup.string().required('Trường này bắt buộc'),
});

const listSaving = [
    {
        id: '1',
        typeSaving: {
            id: 1,
            name: 'Không kì hạn',
        },
        customer: {
            id: 1,
            name: 'Nguyễn Văn B',
        },
        money: 256000,
    },
    {
        id: '2',
        typeSaving: {
            id: 1,
            name: 'Không kì hạn',
        },
        customer: {
            id: 1,
            name: 'Nguyễn Văn C',
        },
        money: 256000,
    },
    {
        id: '3',
        typeSaving: {
            id: 1,
            name: 'Không kì hạn',
        },
        customer: {
            id: 1,
            name: 'Nguyễn Văn D',
        },
        money: 256000,
    },
    {
        id: '4',
        typeSaving: {
            id: 1,
            name: 'Không kì hạn',
        },
        customer: {
            id: 1,
            name: 'Nguyễn Văn E',
        },
        money: 256000,
    },
    {
        id: '5',
        typeSaving: {
            id: 1,
            name: 'Không kì hạn',
        },
        customer: {
            id: 1,
            name: 'Nguyễn Văn F',
        },
        money: 256000,
    },

    {
        id: '6',
        typeSaving: {
            id: 1,
            name: 'Không kì hạn',
        },
        customer: {
            id: 1,
            name: 'Nguyễn Văn G',
        },
        money: 256000,
    },
    {
        id: '7',
        typeSaving: {
            id: 1,
            name: 'Không kì hạn',
        },
        customer: {
            id: 1,
            name: 'Nguyễn Văn H',
        },
        money: 256000,
    },
    {
        id: '8',
        typeSaving: {
            id: 1,
            name: 'Không kì hạn',
        },
        customer: {
            id: 1,
            name: 'Nguyễn Văn I',
        },
        money: 256000,
    },
    {
        id: '9',
        typeSaving: {
            id: 1,
            name: 'Không kì hạn',
        },
        customer: {
            id: 1,
            name: 'Nguyễn Văn J',
        },
        money: 256000,
    },
    {
        id: '10',
        typeSaving: {
            id: 1,
            name: 'Không kì hạn',
        },
        customer: {
            id: 1,
            name: 'Nguyễn Văn K',
        },
        money: 256000,
    },
    {
        id: '11',
        typeSaving: {
            id: 1,
            name: 'Không kì hạn',
        },
        customer: {
            id: 1,
            name: 'Nguyễn Văn L',
        },
        money: 256000,
    },

    {
        id: '12',
        typeSaving: {
            id: 1,
            name: 'Không kì hạn',
        },
        customer: {
            id: 1,
            name: 'Nguyễn Văn M',
        },
        money: 256000,
    },
];

function Withdraw() {
    const formik = useFormik({
        initialValues: {
            id: '',
            customerName: 'Không xác định',
            dateWithdraw: moment().format('YYYY-MM-DD'),
            moneyWithdraw: '',
        },
        validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const getCustomerName = (id) => {
        let customerName = 'Không xác định';
        console.log(id);
        listSaving.forEach((saving) => {
            console.log('saving', saving);
            if (saving.id === id) {
                customerName = saving.customer.name;
            }
        });
        return customerName;
    };

    useEffect(() => {
        // Call api
        formik.setFieldValue('customerName', getCustomerName(formik.values.id));
    }, [formik.values.id]);

    return (
        <div className={cx('wrapper')}>
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
                                />
                                <div className={cx('error-message')}>{formik.errors.moneyWithdraw}</div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('btn-group')}>
                        <Button to="/sotietkiem/danhsach" yellow leftIcon={<FontAwesomeIcon icon={faBackspace} />}>
                            Quay lại
                        </Button>
                        <Button
                            disabled={!(formik.isValid && formik.dirty)}
                            primary
                            leftIcon={<FontAwesomeIcon icon={faRightFromBracket} />}
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
