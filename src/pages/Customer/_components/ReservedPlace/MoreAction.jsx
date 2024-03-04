import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { BsThreeDots } from "react-icons/bs";
import { RESERVED_PLACE_LIST_ACTION } from "../../../../constants/action"
import { useDispatch } from 'react-redux';
import ModalInvite from '../../../../components/shared/ModalInvite';
import ModalConfirm from '../../../../components/shared/ModalConfirm';
import toast from 'react-hot-toast';
import { inviteToJoinTimeshare } from '../../../../redux/features/transactionSlice';
import { createNotification } from '../../../../redux/features/notificationSlice';
import SpinnerLoading from '../../../../components/shared/SpinnerLoading'

const MoreAction = ({ transactionSelected, userDecode }) => {

    const [openModalInvite, setOpenModalInvite] = useState(false)
    const [openModalConfirm, setOpenModalConfirm] = useState(false)
    const [loadingHandleEvent, setLoadingHandleEvent] = useState(false)

    const [memberList, setMemberList] = React.useState([]);

    const dispatch = useDispatch();

    const handleCancelInviteModal = () => {
        setOpenModalInvite(false)
        setMemberList([])
    }

    const handleOpenModalConfirmAfterInviteModal = () => {
        setOpenModalInvite(false);
        setOpenModalConfirm(true);
    }

    const handleCancelModalConfirmAfterInviteModal = () => {
        setOpenModalConfirm(false);
        setOpenModalInvite(true);
    }

    const handleCallApiInviteCustomer = () => {
        setLoadingHandleEvent(true)
        if (memberList.length !== 0) {
            for (const user of memberList) {
                const dataInvite = {
                    customer_id: user._id,
                    transaction_id: transactionSelected._id,
                };

                dispatch(inviteToJoinTimeshare(dataInvite)).then((res) => {
                    if (inviteToJoinTimeshare.rejected.match(res)) {
                        toast.error(`${res.payload} (${user.email})`);
                        // console.log(res.payload);
                    } else {
                        // console.log(res.payload);
                        toast.success(`Mời ${user.email} thành công!`);

                        const related_object = {
                            sender_id: `${userDecode?._id}`,
                            transaction_invite_id: `${res.payload._id}`,
                            timeshare_name: `${transactionSelected.timeshare_id?.timeshare_name}`
                        }

                        // console.log("related_object", related_object)

                        const dataBodyNoti = {
                            user_id: user._id,
                            notification_content: `${userDecode?.fullName} đã gửi lời mời bạn tham gia timeshare ${transactionSelected.timeshare_id?.timeshare_name}`,
                            notification_title: `INVITE_JOIN_TIMESHARE_TO_CUSTOMER`,
                            notification_type: `INVITE_JOIN_TIMESHARE_TO_CUSTOMER`,
                            related_object: JSON.stringify(related_object)
                        };

                        dispatch(createNotification(dataBodyNoti)).then(
                            (resNoti) => {
                                // console.log(resNoti);
                            }
                        );
                    }
                });
            }
            setLoadingHandleEvent(false)

        }
        setMemberList([])
        setOpenModalConfirm(false)
        setOpenModalInvite(false)

    }

    const handleItemClick = (id) => {
        switch (id) {
            case 1:
                alert('action 1')
                break;
            case 2:
                setOpenModalInvite(true)
                break;
            case 3:
                alert('action 3')
                break;
            case 4:
                alert('action 4')
                break;
            default:
                alert('Hmmmm')
        }
    }

    const renderDropDownMenuItem = () => {
        let actionsToShow = RESERVED_PLACE_LIST_ACTION;

        if (transactionSelected
            && (transactionSelected.timeshare_id.sell_timeshare_status === "Chưa được bán"
                || transactionSelected.timeshare_id.sell_timeshare_status === "Đã bán")) {
            actionsToShow = RESERVED_PLACE_LIST_ACTION.filter(item => item.id !== 3);
        }

        return actionsToShow.map((item, index) => (
            <Dropdown.Item
                key={index}
                className='d-flex align-items-center gap-2'
                onClick={() => handleItemClick(item?.id)}
            >
                {item?.icon}
                {item?.name}
            </Dropdown.Item>
        ));
    }



    return (
        <Dropdown className='notification-container'>
            <Dropdown.Toggle variant="ghost" id="dropdown-basic" className='d-flex justify-content-center align-items-center '>
                <BsThreeDots style={{ cursor: 'pointer' }} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {renderDropDownMenuItem()}
            </Dropdown.Menu>

            {openModalInvite
                &&
                <ModalInvite
                    show={openModalInvite}
                    handleClose={handleCancelInviteModal}
                    handleAccept={handleOpenModalConfirmAfterInviteModal}
                    memberList={memberList}
                    setMemberList={setMemberList}
                />
            }

            {openModalConfirm
                &&
                <ModalConfirm
                    show={openModalConfirm}
                    handleClose={handleCancelModalConfirmAfterInviteModal}
                    handleAccept={handleCallApiInviteCustomer}
                    nameBtnCLose={'Quay lại'}
                    title={'Xác nhận hành động'}
                    body={'Bạn có chắc muốn mời những người này?'}
                />
            }

            {loadingHandleEvent && <SpinnerLoading />}
        </Dropdown>
    )
}

export default MoreAction