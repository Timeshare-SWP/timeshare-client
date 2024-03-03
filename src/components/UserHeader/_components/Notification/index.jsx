import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { CiBellOn } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { markAllNotifications, markSelectedNotification, viewAllNotifications } from '../../../../redux/features/notificationSlice';
import { getDateTimeDifference } from '../../../../utils/handleFunction';
import ThreeDotDropdown from '../ThreeDotDropdown';

const Notification = () => {

    const dispatch = useDispatch();
    const [dataNoti, setDataNoti] = useState([]);
    const [readCount, setReadCount] = useState(0);
    const [showUnread, setShowUnread] = useState(false);

    const handleMarkSelectedNoti = (item) => {
        if (item?.is_read === false) {
            dispatch(markSelectedNotification(item?._id)).then((result) => {
                console.log('read', result.payload)

                const updatedDataNoti = dataNoti.map(dataItem => {
                    if (dataItem._id === item._id) {
                        return {
                            ...dataItem,
                            is_read: true
                        };
                    }
                    return dataItem;
                });
                setDataNoti(updatedDataNoti);
            })
            if (readCount > 0) {
                setReadCount(readCount - 1)
            }
        } else {
            console.log('do something')
        }
    }

    const handleMarkAllNoti = () => {
        dispatch(markAllNotifications()).then((result) => {
            console.log('read all', result.payload)
            const updatedDataNoti = dataNoti.map(dataItem => ({
                ...dataItem,
                is_read: true
            }));

            setDataNoti(updatedDataNoti);
            setReadCount(0)
        })
    }

    const renderMenuItems = () => {
        const filteredDataNoti = showUnread ? dataNoti.filter(item => !item.is_read) : dataNoti;

        if (filteredDataNoti.length === 0) {
            return (
                <div className="empty-state mb-3 d-flex justify-content-center align-items-center flex-column">
                    <img style={{ width: '200px', height: '200px' }}
                        src="https://www.facebook.com/images/comet/empty_states_icons/notifications/null_states_notifications_dark_mode.svg"
                        alt="empty notifications" />
                    <p className='fw-bold'>Bạn không có thông báo nào</p>
                </div>
            );
        } else {
            return (
                <div className='notification-list-container webkit-scrollbar'>
                    {filteredDataNoti.map((item, index) => (
                        <Dropdown.Item key={index} onClick={() => handleMarkSelectedNoti(item)}>
                            <div className={`border rounded-xl card d-flex align-items-center p-3 ${!item?.is_read ? 'border-black' : ''}`}>
                                <img className="object-cover w-12 h-12 rounded-circle border"
                                    src="https://fpt.com/-/media/project/fpt-corporation/fpt/common/images/navigation/logo/fpt-logo-open-graph.png" alt="ava" />
                                <div className="w-80">
                                    <p className={`text-sm ${!item?.is_read ? 'text-black' : 'text-gray-500'}`}>{item?.notification_content}</p>
                                    <p className={`text-xs ${!item?.is_read ? 'text-black' : 'text-gray-500'}`}>{getDateTimeDifference(item?.createdAt)} trước</p>
                                </div>
                            </div>
                            {!item?.is_read && <div className='new-noti-dot'></div>}
                        </Dropdown.Item>
                    ))}
                </div>
            );
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await dispatch(viewAllNotifications());
            if (viewAllNotifications.fulfilled.match(result)) {
                const sortedData = result.payload.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setDataNoti(sortedData);
                setReadCount(result.payload.filter(item => !item.is_read).length);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 3000);

        return () => clearInterval(intervalId);
    }, []);


    return (
        <Dropdown className='notification-container'>
            <Dropdown.Toggle variant="ghost" id="dropdown-basic" className='d-flex justify-content-center align-items-center '>
                <div className='bell-container'>
                    <CiBellOn />
                </div>
            </Dropdown.Toggle>

            {readCount !== 0 && <div className='notification-quantity'>{readCount}</div>}

            <Dropdown.Menu className='notification-content'>
                <div className="d-flex justify-content-between align-items-center mb-2 header-notification">
                    <h2 >Thông báo</h2>
                    <ThreeDotDropdown handleMarkAllNoti={handleMarkAllNoti} />
                </div>

                <div className='option-noti-btn mb-2'>
                    <button onClick={() => setShowUnread(false)} className={`btn ${!showUnread ? 'active' : ''}`}>Tất cả</button>
                    <button onClick={() => setShowUnread(true)} className={`btn ${showUnread ? 'active' : ''}`}>Chưa đọc</button>
                </div>

                {renderMenuItems()}
            </Dropdown.Menu>

        </Dropdown>
    )
}

export default Notification