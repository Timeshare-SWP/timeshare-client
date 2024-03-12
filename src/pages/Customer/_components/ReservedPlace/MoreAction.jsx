import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { BsThreeDots } from "react-icons/bs";
import { RESERVED_PLACE_LIST_ACTION } from "../../../../constants/action"
import { useDispatch, useSelector } from 'react-redux';
import ModalInvite from '../../../../components/shared/ModalInvite';
import ModalConfirm from '../../../../components/shared/ModalConfirm';
import toast from 'react-hot-toast';
import { inviteToJoinTimeshare } from '../../../../redux/features/transactionSlice';
import { createNotification } from '../../../../redux/features/notificationSlice';
import SpinnerLoading from '../../../../components/shared/SpinnerLoading'
import { cancelReservedPlace, viewAllReservedPlace } from '../../../../redux/features/reservedPlaceSlice';
import SimpleLoading from '../../../../components/shared/SimpleLoading';
import { buyTimeshare } from '../../../../redux/features/timeshareSlice';
import DrawerDetailInfoReservedPlace from '../../../../components/shared/DrawerDetailInfoReservedPlace';

const MoreAction = ({ transactionSelected, setReservedPlaceList, userDecode }) => {

    const [openModalInvite, setOpenModalInvite] = useState(false)
    const [openModalCancel, setOpenModalCancel] = useState(false)
    const [openModalConfirm, setOpenModalConfirm] = useState(false)
    const [openModalConfirmBuy, setOpenModalConfirmBuy] = useState(false)
    const [openDrawerDetailInfoReservedPlace, setOpenDrawerDetailInfoReservedPlace] = useState(false);
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

    const handleCallApiCancelReservedPlace = () => {
        setLoadingHandleEvent(true)
        dispatch(cancelReservedPlace(transactionSelected._id)).then((resCancel) => {
            if (cancelReservedPlace.rejected.match(resCancel)) {
                toast.error(`${resCancel.payload}`)
                console.log(resCancel.payload)
                setLoadingHandleEvent(false)
            } else {
                console.log(resCancel.payload)
                toast.success('Hủy đặt giữ chỗ thành công!')

                setReservedPlaceList(prevReservedPlaceList => {
                    return prevReservedPlaceList.filter(item => item._id !== resCancel.payload._id);
                });

                setLoadingHandleEvent(false)
            }
        })
    }

    const [isLoadingBuy, setIsLoadingBuy] = useState(false)

    const handleCallApiToBuyTimeshare = () => {
        setIsLoadingBuy(true)
        dispatch(viewAllReservedPlace()).then((resViewAll) => {
            if (viewAllReservedPlace.fulfilled.match(resViewAll)) {
                const reservedPlaces = resViewAll.payload.filter(place => place.timeshare_id._id === transactionSelected.timeshare_id._id);

                let is_reserve_state
                let transaction_id

                if (reservedPlaces.length > 0) {
                    const nearestUpdatedPlace = reservedPlaces.reduce((nearest, place) => {
                        return place.updatedAt > nearest.updatedAt ? place : nearest;
                    });

                    is_reserve_state = nearestUpdatedPlace.transaction_status === "Reserving";
                    transaction_id = nearestUpdatedPlace?._id
                } else {
                    is_reserve_state = false;
                }

                const data = {
                    timeshare_id: transactionSelected.timeshare_id._id,
                    is_reserve: is_reserve_state,
                    transaction_id: transaction_id
                }

                dispatch(buyTimeshare(data)).then((resBuy) => {
                    if (buyTimeshare.fulfilled.match(resBuy)) {
                        toast.success('Mua thành công!')

                        const dataBodyNoti = {
                            user_id: transactionSelected.timeshare_id.investor_id._id,
                            notification_content: `${userDecode?.fullName} muốn mua dự án timeshare ${transactionSelected.timeshare_id.timeshare_name} của bạn`,
                            notification_title: `REQUEST_CONFIRM_BUY_TIMESHARE_TO_INVESTOR`,
                            notification_type: `REQUEST_CONFIRM_BUY_TIMESHARE_TO_INVESTOR`,
                        };

                        dispatch(createNotification(dataBodyNoti)).then(
                            (resNoti) => {
                                console.log(resNoti)
                            }
                        );
                        setIsLoadingBuy(false)
                        setOpenModalConfirmBuy(false)
                    } else {
                        toast.error(`${resBuy.payload}`)
                        console.log('error', resBuy)
                        setIsLoadingBuy(false)
                        setOpenModalConfirmBuy(false)
                    }
                })
            }

        });
    }

    const handleItemClick = (id) => {
        switch (id) {
            case 1:
                // xem thông tin chi tiết
                alert('Hmmmm, not support!')
                break;
            case 2:
                // mời thêm người tham gia
                setOpenModalInvite(true)
                break;
            case 3:
                // đăng ký mua
                setOpenModalConfirmBuy(true)
                break;
            case 4:
                // hủy đặt chỗ
                setOpenModalCancel(true)
                break;
            default:
                alert('Hmmmm, something wrong!')
        }
    }

    const renderDropDownMenuItem = () => {
        let actionsToShow = RESERVED_PLACE_LIST_ACTION;

        if (transactionSelected) {
            if (transactionSelected.timeshare_id.sell_timeshare_status === "Chưa được bán") {
                actionsToShow = RESERVED_PLACE_LIST_ACTION.filter(item => item.id !== 3);
            } else if (transactionSelected.timeshare_id.sell_timeshare_status === "Đã bán") {
                actionsToShow = RESERVED_PLACE_LIST_ACTION.filter(item => item.id !== 2 && item.id !== 3 && item.id !== 4);
            }
        }

        actionsToShow = RESERVED_PLACE_LIST_ACTION.filter(item => item.id !== 2);

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

            {openModalCancel
                &&
                <ModalConfirm
                    show={openModalCancel}
                    handleClose={() => setOpenModalCancel(false)}
                    handleAccept={handleCallApiCancelReservedPlace}
                    title={'Xác nhận hành động'}
                    body={
                        <div className="confirmation-message">
                            <p className="warning-text">P/s: </p>
                            <p className="warning-text">- Nếu bạn hủy thì số tiền đặt cọc đã chuyển sẽ không được hoàn lại</p>
                            <p className="warning-text">- Nhóm người tham gia bao gồm cả bạn sẽ tự động giải tán</p>
                            <p>Bạn có chắc vẫn muốn tiếp tục hủy giữ chỗ timeshare này?</p>
                        </div>
                    }
                />
            }

            {openModalConfirmBuy &&
                <ModalConfirm
                    show={openModalConfirmBuy}
                    handleClose={() => setOpenModalConfirmBuy(false)}
                    handleAccept={handleCallApiToBuyTimeshare}
                    title={''}
                    body={<h5>Bạn có chắc chắn muốn mua Timeshare này?</h5>}
                />
            }

            {openDrawerDetailInfoReservedPlace &&
                <DrawerDetailInfoReservedPlace />
            }

            {loadingHandleEvent && <SpinnerLoading />}
            {isLoadingBuy && <SpinnerLoading />}
        </Dropdown>
    )
}

export default MoreAction