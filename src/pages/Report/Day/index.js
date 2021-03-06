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

import styles from './Day.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Day() {
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [reports, setReports] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [pendingCreate, setPendingCreate] = useState(false);

    useEffect(() => {
        // Call api report
        fetch(`${process.env.REACT_APP_API_URL}/reportday/${date}`)
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
    }, [date]);

    const handleCreateReport = () => {
        setPendingCreate(true);
        // Call api create report
        fetch(`${process.env.REACT_APP_API_URL}/reportday`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ date }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setReports(data.reports);
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
                            ????ng
                        </Button>
                    </>
                }
                heading="Th??ng b??o"
            >
                {isSuccess ? 'T???o b??o c??o th??nh c??ng' : 'T???o b??o c??o kh??ng th??nh c??ng'}
            </Modall>
            <div className={cx('top-bar')}>
                <div className={cx('left')}>
                    <p className="heading-list">Danh s??ch b??o c??o doanh thu</p>
                    <ReloadBtn />
                </div>
                <div className={cx('input')}>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} name="dateCreate" />
                </div>
                <Button
                    disabled={pendingCreate}
                    onClick={handleCreateReport}
                    primary
                    leftIcon={<FontAwesomeIcon icon={faCirclePlus} />}
                >
                    T???o b??o c??o
                </Button>
            </div>
            <div className={cx('list')}>
                <table className={cx('table')}>
                    <thead className="table-header">
                        <tr>
                            <th>STT</th>
                            <th>Lo???i ti???t ki???m</th>
                            <th>T???ng thu</th>
                            <th>T???ng chi</th>
                            <th>Ch??nh l???ch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.length > 0 ? (
                            reports.map((report, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{report.typeSaving.name}</td>
                                    <td>{report.tongThu}</td>
                                    <td>{report.tongChi}</td>
                                    <td>{report.chenhLech}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className={cx('no-report')}>
                                    Ch??a c?? b??o c??o
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div>
                    {reports.length > 0 ? (
                        <div>
                            <div>
                                T???ng thu:
                                {reports.reduce((prev, report) => prev + report.tongThu, 0)}
                            </div>
                            <div>
                                T???ng chi:
                                {reports.reduce((prev, report) => prev + report.tongChi, 0)}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Day;
