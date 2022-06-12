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
import Modall from '~/components/Modall';

import styles from './Month.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Month() {
    const [month, setMonth] = useState(moment().format('YYYY-MM'));
    const [reports, setReports] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [pendingCreate, setPendingCreate] = useState(false);
    const [typeSavings, setTypeSavings] = useState([]);
    const [typeSavingId, setTypeSavingId] = useState(-1);

    useEffect(() => {
        // Call api report
        fetch(`${process.env.REACT_APP_API_URL}/reportmonth/${month}?typeSavingId=${typeSavingId}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setReports(data.reports);
                } else {
                    setReports([]);
                }
            })
            .catch((error) => {
                setReports([]);
            });
    }, [month, typeSavingId]);
    console.log(reports);
    useEffect(() => {
        // Call api type saving
        fetch(`${process.env.REACT_APP_API_URL}/typesaving`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setTypeSavings(data.typeSavings);
                    setTypeSavingId(data.typeSavings[0].id);
                } else {
                    setTypeSavings([]);
                }
            })
            .catch((error) => {
                setTypeSavings([]);
            });
    }, [month]);

    const handleCreateReport = () => {
        setPendingCreate(true);
        // Call api create report
        fetch(`${process.env.REACT_APP_API_URL}/reportmonth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ month }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // Call api report
                    fetch(`${process.env.REACT_APP_API_URL}/reportmonth/${month}?typeSavingId=${typeSavingId}`)
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.success) {
                                setReports(data.reports || []);
                            } else {
                                setReports([]);
                            }
                        })
                        .catch((error) => {
                            setReports([]);
                        });
                    setModalIsOpen(true);
                    setIsSuccess(true);
                } else {
                    setModalIsOpen(true);
                    setIsSuccess(false);
                }
                setPendingCreate(false);
            })
            .catch((error) => {
                setReports([]);
                setModalIsOpen(true);
                setIsSuccess(true);
                setPendingCreate(false);
            });
    };

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
                {isSuccess ? 'Tạo báo cáo thành công' : 'Tạo báo cáo không thành công'}
            </Modall>
            <div className={cx('top-bar')}>
                <div className={cx('left')}>
                    <p className="heading-list">Danh sách báo cáo đóng/mở sổ</p>
                    <ReloadBtn />
                </div>
                <div className={cx('input')}>
                    <select onChange={(e) => setTypeSavingId(e.target.value)} value={typeSavingId} name="typeSavingId">
                        {typeSavings.map((typeSaving) => (
                            <option key={typeSaving.id} value={typeSaving.id}>
                                {typeSaving.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={cx('input')}>
                    <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} name="monthCreate" />
                </div>
                <Button
                    disabled={pendingCreate}
                    onClick={handleCreateReport}
                    primary
                    leftIcon={<FontAwesomeIcon icon={faCirclePlus} />}
                >
                    Tạo báo cáo
                </Button>
            </div>
            <div className={cx('list')}>
                <table className={cx('table')}>
                    <thead className="table-header">
                        <tr>
                            <th>STT</th>
                            <th>Ngày</th>
                            <th>Sổ mở</th>
                            <th>Sổ đóng</th>
                            <th>Chênh lệch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.length > 0 ? (
                            reports.map((report, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{moment(report.date).format('DD/MM/YYYY')}</td>
                                    <td>{report.soMo}</td>
                                    <td>{report.soDong}</td>
                                    <td>{report.chenhLech}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className={cx('no-report')}>
                                    Chưa có báo cáo
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Month;
