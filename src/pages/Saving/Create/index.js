import * as Yup from 'yup';
import { faCircleXmark, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import moment from 'moment';
import Button from '~/components/Button';

import styles from './Create.module.scss';
const cx = classNames.bind(styles);

const typeSavings = [
    {
        id: 1,
        name: 'Không kì hạn',
    },
    {
        id: 2,
        name: '3 tháng',
    },
    {
        id: 3,
        name: '6 tháng',
    },
];

const minMoney = 100000;

const validationSchema = Yup.object({
    identityNumber: Yup.string()
        .matches(/^[0-9]+$/, 'Chứng minh nhân dân phải là số')
        .max(12, 'Chứng minh nhân dân phải không quá 12 số')
        .min(9, 'Chứng minh nhân dân phải từ 9 số')
        .required('Trường này bắt buộc'),
    customerName: Yup.string().max(50, 'Tên không được quá 50 kí tự').required('Trường này bắt buộc'),
    customerAddress: Yup.string().max(250, 'Địa chỉ không được quá 250 kí tự').required('Trường này bắt buộc'),
    money: Yup.number()
        .typeError('Tiền gởi phải là số')
        .min(minMoney, `Tiền gửi tối thiểu là ${minMoney}`)
        .required('Trường này bắt buộc'),
});

function Create() {
    const formik = useFormik({
        initialValues: {
            identityNumber: '',
            typeSavingId: typeSavings[0].id,
            customerName: '',
            customerAddress: '',
            dateCreate: moment().format('YYYY-MM-DD'),
            money: '',
        },
        validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    console.log(formik.errors);
    return (
        <div className={cx('wrapper')}>
            <form onSubmit={formik.handleSubmit}>
                <div className={cx('body')}>
                    <div className={cx('input-group')}>
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
                                    error: formik.touched.customerName && formik.errors.customerName,
                                })}
                            >
                                <label>Tên khách hàng</label>
                                <input
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.customerName}
                                    name="customerName"
                                />
                                <div className={cx('error-message')}>{formik.errors.customerName}</div>
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
                                    error: formik.touched.customerAddress && formik.errors.customerAddress,
                                })}
                            >
                                <label>Địa chỉ</label>
                                <input
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.customerAddress}
                                    name="customerAddress"
                                />
                                <div className={cx('error-message')}>{formik.errors.customerAddress}</div>
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
                        <Button to="/sotietkiem/danhsach" red leftIcon={<FontAwesomeIcon icon={faCircleXmark} />}>
                            Huỷ
                        </Button>
                        <Button
                            disabled={!(formik.isValid && formik.dirty)}
                            primary
                            leftIcon={<FontAwesomeIcon icon={faCirclePlus} />}
                        >
                            Mở sổ
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Create;
