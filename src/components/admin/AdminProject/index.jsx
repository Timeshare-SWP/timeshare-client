import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { useDispatch } from 'react-redux';
import { confirmTimeshareByAdmin, getTimeshareForGuest } from '../../../redux/features/timeshareSlice';
import { convertToVNDFormat, convertToVnTime } from '../../../utils/handleFunction';
import toast from 'react-hot-toast';
import SpinnerLoading from "../../shared/SpinnerLoading"
import ModalConfirm from '../../shared/ModalConfirm';
import { createNotification } from '../../../redux/features/notificationSlice';

const App = () => {
    const [timeshareList, setTimeshareList] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [openModalReject, setOpenModalReject] = useState(false);
    const [noteRejected, setNoteRejected] = useState("")
    const [errorNoteRejected, setErrorNoteRejected] = useState("");
    const [recordSelected, setRecordSelected] = useState();

    const dispatch = useDispatch();

    const data = []

    const columns = [
        {
            title: 'Timeshare name',
            width: 150,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Address',
            width: 90,
            dataIndex: 'address',
            key: 'address',
            fixed: 'left',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'timeshare_status',
            key: 'timeshare_status',
            width: 85,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 80,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            width: 75,
        },
        {
            title: 'Xác nhận',
            dataIndex: 'confirm',
            key: 'confirm',
            width: 100,
            render: (text, record) => {
                let className = '';
                let content = '';

                switch (record.confirm) {
                    case 'Pending':
                        className = 'text-warning';
                        content = 'Chờ phê duyệt';
                        break;
                    case 'Accepted':
                        className = 'text-success';
                        content = 'Đã chấp thuận';
                        break;
                    case 'Rejected':
                        className = 'text-danger';
                        content = 'Đã từ chối';
                        break;
                    default:
                        className = 'text-success';
                        content = 'Đã chấp thuận';
                        break;
                }

                return <p className={className}>{content}</p>;
            }
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 20,
            //render: () => <a>Delete</a>
            render: (text, record) => (
                record.confirm === "Pending" && (
                    <Popconfirm
                        title="Bạn có chắc muốn đăng bán timeshare này?"
                        onConfirm={() => handleConfirm(record)}
                        okText="Có"
                        cancelText="Không"
                        onCancel={() => handleBeforeOpenModalRejected(record)}
                    >
                        <Button type="primary" style={{ backgroundColor: "#41C9E2", color: "white" }}>Xác nhận</Button>
                    </Popconfirm>
                )
            ),
        },
    ];

    const handleConfirm = (record) => {
        setLoadingData(true)

        dispatch(confirmTimeshareByAdmin({ timeshare_id: record.key, confirm_status: 'Accepted', reason_rejected: "" })).then((res) => {

            if (confirmTimeshareByAdmin.fulfilled.match(res)) {
                const updatedTimeshareList = timeshareList.map(timeshare => {
                    if (timeshare._id === record.key) {
                        return { ...timeshare, confirm_status: 'Accepted ' };
                    }
                    return timeshare;
                });

                const dataBodyNoti = {
                    user_id: "65ae4a156c28b26cd393f64b", //invester
                    notification_content: `ADMIN đã phê duyệt cho timeshare của bạn!`,
                    notification_title: `ADMIN_ACCEPT_TIMESHARE_TO_CUSTOMER`,
                    notification_type: `ADMIN_ACCEPT_TIMESHARE_TO_CUSTOMER`,
                };

                dispatch(createNotification(dataBodyNoti)).then((resNoti) => {
                    console.log("resNoti", resNoti)
                })
                
                setTimeshareList(updatedTimeshareList);
                toast.success('Đăng bán thành công!')
            } else {
                toast.error(`${res.payload}`)
            }
            console.log('res', res)
            setLoadingData(false)
        })
    }

    const handleBeforeOpenModalRejected = (record) => {
        setRecordSelected(record);
        setOpenModalReject(true);
    }

    const handleCallApiRejected = () => {
        setLoadingData(true)

        if (noteRejected === "") {
            setErrorNoteRejected("Vui lòng nhập lý do từ chối!");
            return;
        }

        dispatch(confirmTimeshareByAdmin({ timeshare_id: recordSelected.key, confirm_status: 'Rejected', reason_rejected: noteRejected })).then((res) => {

            if (confirmTimeshareByAdmin.fulfilled.match(res)) {
                const updatedTimeshareList = timeshareList.map(timeshare => {
                    if (timeshare._id === recordSelected.key) {
                        return { ...timeshare, confirm_status: 'Rejected' };
                    }
                    return timeshare;
                });

                const dataBodyNoti = {
                    user_id: "65ae4a156c28b26cd393f64b", //invester
                    notification_content: `ADMIN đã từ chối đăng bán cho timeshare của bạn!`,
                    notification_title: `ADMIN_REJECT_TIMESHARE_TO_CUSTOMER`,
                    notification_type: `ADMIN_REJECT_TIMESHARE_TO_CUSTOMER`,
                };

                dispatch(createNotification(dataBodyNoti)).then((resNoti) => {
                    console.log("resNoti", resNoti)
                })

                setTimeshareList(updatedTimeshareList);
                toast.success('Phản hồi thành công!')
            } else {
                toast.error(`${res.payload}`)
            }
            setOpenModalReject(false);
            setLoadingData(false)
        })
    }

    useEffect(() => {
        dispatch(getTimeshareForGuest()).then((res) => {
            if (getTimeshareForGuest.fulfilled.match(res)) {
                const timeshareCopy = [...res.payload];
                const sortedTimeshareList = timeshareCopy.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                console.log("res", sortedTimeshareList);
                setTimeshareList(sortedTimeshareList);
            }
        });
    }, []);


    return (
        <div>
            {
                timeshareList.map((timeshare) => {
                    const timeshareListData = {
                        key: `${timeshare._id}`,
                        address: `${timeshare.timeshare_address}`,
                        name: `${timeshare.timeshare_name}`,
                        timeshare_status: `${timeshare.timeshare_status}`,
                        createdAt: `${convertToVnTime(timeshare.createdAt)}`,
                        price: `${convertToVNDFormat(timeshare.price)}`,
                        confirm: `${timeshare.confirm_status}`
                    };
                    data.push(timeshareListData);
                    return null;
                })
            }
            <h2 className='mb-4'>Trang dự án</h2>
            <Table
                columns={columns}
                dataSource={data}
            />

            {openModalReject
                &&
                <ModalConfirm
                    show={openModalReject}
                    handleClose={() => {
                        setOpenModalReject(false);
                        setNoteRejected("");
                    }}
                    handleAccept={handleCallApiRejected}
                    body={
                        <>
                            <div className="form-group-material">
                                <textarea
                                    rows="3"
                                    required="required"
                                    className="form-control"
                                    spellCheck="false"
                                    value={noteRejected}
                                    onChange={(e) => {
                                        setNoteRejected(e.target.value);
                                        setErrorNoteRejected("")
                                    }}
                                    placeholder='Vui lòng nhập lý do từ chối!'
                                />
                                <label>Lý do từ chối <span className="text-danger">*</span></label>
                            </div>
                            {errorNoteRejected && <span className="error-message">{errorNoteRejected}</span>}
                        </>
                    }
                />
            }

            {loadingData && <SpinnerLoading />}
        </div>
    )
}

export default App;