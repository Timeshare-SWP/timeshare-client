import React, { useContext, useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { CiBellOn } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { createNotification, markAllNotifications, markSelectedNotification, viewAllNotifications } from '../../../../redux/features/notificationSlice';
import { generateFallbackAvatar, getDateTimeDifference } from '../../../../utils/handleFunction';
import ThreeDotDropdown from '../ThreeDotDropdown';
import { replyToJoinTimeshare } from '../../../../redux/features/transactionSlice';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/authContext';

const Notification = () => {

    const dispatch = useDispatch();
    const [dataNoti, setDataNoti] = useState([]);
    const [readCount, setReadCount] = useState(0);
    const [showUnread, setShowUnread] = useState(false);

    const { userDecode } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleMarkSelectedNoti = (item) => {
        if (item?.is_read === false) {
            dispatch(markSelectedNotification(item?._id)).then((result) => {

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
        }

        switch (item?.notification_type) {
            case "ACCEPT_JOIN_TIMESHARE_TO_CUSTOMER":
            case "REJECT_JOIN_TIMESHARE_TO_CUSTOMER":
            case "NOTI_CAN_BUY_TIMESHARE_TO_CUSTOMER":
                navigate("/reserved-place-list");
                break;
            case "NOTI_RESERVER_PLACE_TO_INVESTOR":
            case "NOTI_PAYMENT_BY_PHASE_TO_INVESTOR":
            case "NOTI_PAYMENT_BY_RESERVING_TO_INVESTOR":
            case "ADMIN_ACCEPT_TIMESHARE_TO_CUSTOMER":
            case "ADMIN_REJECT_TIMESHARE_TO_CUSTOMER":
                navigate("/personal-projects");
                break;
            case "REQUEST_CONFIRM_BUY_TIMESHARE_TO_INVESTOR":
                navigate("/management-request");
                break;
            case "ACCEPT_CONTRACT_TO_INVESTOR":
                navigate("/management-transaction")
                break;
            case "ACCEPT_BUY_TIMESHARE_TO_CUSTOMER":
            case "REJECT_BUY_TIMESHARE_TO_CUSTOMER":
            case "REQUEST_CONFIRM_CONTRACT_TO_CUSTOMER":
            case "CHANGE_CONTRACT_TO_CUSTOMER":
                navigate("/customer-transaction")
                break;
            default:
            // Không làm gì cả
        }

    }

    const handleMarkAllNoti = () => {
        dispatch(markAllNotifications()).then((result) => {
            const updatedDataNoti = dataNoti.map(dataItem => ({
                ...dataItem,
                is_read: true
            }));

            setDataNoti(updatedDataNoti);
            setReadCount(0)
        })
    }

    const handleReplyTimeshareInvite = (item, answer) => {

        const related_object = JSON.parse(item?.related_object);

        const dataReply = {
            transaction_invite_id: related_object.transaction_invite_id,
            transaction_invite_status: answer
        }

        dispatch(replyToJoinTimeshare(dataReply)).then((result) => {
            if (replyToJoinTimeshare.rejected.match(result)) {
                toast.error(`${result.payload}`)
            } else {
                toast.success(`Phản hồi thành công!`)

                navigate("/reserved-place-list");

                const dataBodyNoti = {
                    user_id: related_object?.sender_id,
                    notification_content: `${userDecode?.fullName} đã ${answer === 'Accepted' ? 'chấp thuận' : 'từ chối'} lời mời tham gia ${related_object?.timeshare_name}`,
                    notification_title: `${answer === 'Accepted' ? 'ACCEPT_JOIN_TIMESHARE_TO_CUSTOMER' : 'REJECT_JOIN_TIMESHARE_TO_CUSTOMER'}`,
                    notification_type: `${answer === 'Accepted' ? 'ACCEPT_JOIN_TIMESHARE_TO_CUSTOMER' : 'REJECT_JOIN_TIMESHARE_TO_CUSTOMER'}`,
                };

                dispatch(createNotification(dataBodyNoti)).then(
                    (resNoti) => {
                        // console.log(resNoti)
                    }
                );
            }
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
                                    src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg" alt="ava" />
                                <div className="w-80">
                                    <p className={`text-sm ${!item?.is_read ? 'text-black' : 'text-gray-500'}`}>{item?.notification_content}</p>
                                    <p className={`text-xs ${!item?.is_read ? 'text-black' : 'text-gray-500'}`}>{getDateTimeDifference(item?.createdAt)} trước</p>

                                    {item?.notification_type === "INVITE_JOIN_TIMESHARE_TO_CUSTOMER"
                                        &&
                                        (
                                            <div className='d-flex gap-2 mt-2'>
                                                <div style={{ fontSize: '12px' }} className='btn btn-outline-danger' onClick={() => handleReplyTimeshareInvite(item, 'Accepted')}>Đồng ý</div>
                                                <div style={{ fontSize: '12px' }} className='btn' onClick={() => handleReplyTimeshareInvite(item, 'Rejected')}>Từ chối</div>
                                            </div>
                                        )
                                    }
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