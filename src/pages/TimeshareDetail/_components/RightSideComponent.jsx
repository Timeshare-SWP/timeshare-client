import React, { useContext, useEffect, useState } from 'react'
import { convertRangePriceToVNDFormat, convertToNumberFormat } from '../../../utils/handleFunction';
import ModalReservedPlace from './ModalReservedPlace';
import ModalConfirm from '../../../components/shared/ModalConfirm'
import { useDispatch } from 'react-redux';
import { viewAllReservedPlace, checkReservingTimeshare } from '../../../redux/features/reservedPlaceSlice';
import { buyTimeshare, deleteTimeshare } from '../../../redux/features/timeshareSlice';
import toast from 'react-hot-toast';
import SpinnerLoading from '../../../components/shared/SpinnerLoading'
import { AuthContext } from '../../../contexts/authContext';
import { createNotification } from '../../../redux/features/notificationSlice';
import { CiEdit, CiStop1 } from "react-icons/ci";
import { MdCancel, MdDeleteOutline } from "react-icons/md";
import { LiaCitySolid } from "react-icons/lia";
import { MdAttachMoney } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import SimpleLoading from '../../../components/shared/SimpleLoading';
import { FcCancel } from "react-icons/fc";

const RightSideComponent = (props) => {

    const { item, handleEditModeChange, setTimeShareList, timeshareList, handleClose, isEditMode } = props

    const navigate = useNavigate();

    const [openModalWarning, setOpenModalWarning] = useState(false);
    const [openModalReservedPlace, setOpenModalReservedPlace] = useState(false);
    const [openModalConfirmBuy, setOpenModalConfirmBuy] = useState(false);
    const [isLoadingBuy, setIsLoadingBuy] = useState(false);
    const { userDecode } = useContext(AuthContext)

    // stage_1
    const [memberList, setMemberList] = useState([])
    const [optionTypeReservedPlace, setOptionTypeReservedPlace] = useState('');
    const [error, setError] = useState('')

    const handleActionTransition = () => {
        if (userDecode === null) {
            setOpenModalWarning(true)
            return;
        }

        if (item?.sell_timeshare_status === "Chưa được bán" && !isReserved) {
            setOpenModalReservedPlace(true)
        } else if (item?.sell_timeshare_status === "Đang mở bán") {
            setOpenModalConfirmBuy(true)
        }
    }

    // Xử lý việc mua timeshare
    // console.log("item", item)

    const dispatch = useDispatch();

    const handleCallApiToBuyTimeshare = () => {
        setIsLoadingBuy(true)
        dispatch(viewAllReservedPlace()).then((resViewAll) => {
            if (viewAllReservedPlace.fulfilled.match(resViewAll)) {
                const reservedPlaces = resViewAll.payload.filter(place => place.timeshare_id?._id === item?._id);

                let is_reserve_state
                let transaction_id

                if (reservedPlaces.length > 0) {
                    const nearestUpdatedPlace = reservedPlaces.reduce((nearest, place) => {
                        return place.updatedAt > nearest.updatedAt ? place : nearest;
                    });
                    console.log("nearestUpdatedPlace", nearestUpdatedPlace)
                    is_reserve_state = nearestUpdatedPlace.transaction_status === "Reserving";
                    transaction_id = nearestUpdatedPlace?._id
                } else {
                    is_reserve_state = false;
                }

                const data = {
                    timeshare_id: item?._id,
                    is_reserve: is_reserve_state,
                    transaction_id: transaction_id
                }
                console.log('data', data)

                dispatch(buyTimeshare(data)).then((resBuy) => {
                    if (buyTimeshare.fulfilled.match(resBuy)) {
                        navigate('/customer-transaction')
                        toast.success('Mua thành công!')

                        const dataBodyNoti = {
                            user_id: item?.investor_id?._id,
                            notification_content: `${userDecode?.fullName} muốn mua dự án timeshare ${item.timeshare_name} của bạn`,
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

    // xoá timeshare
    const [openModalDelete, setOpenModalDelete] = useState(false);

    const handleCallApiDeleteTimeshare = () => {
        dispatch(deleteTimeshare(item._id)).then((resDelete) => {
            if (deleteTimeshare.fulfilled.match(resDelete)) {
                toast.success(`Xóa timeshare thành công!`);

                if (timeshareList) {
                    const updatedList = timeshareList.filter(timeshare => timeshare._id !== item._id);
                    setTimeShareList(updatedList);
                    handleClose();
                }

                navigate("/personal-projects")
            } else {
                console.log("resDelete.payload", resDelete)
                toast.error(`${resDelete.payload}`);
            }
            setOpenModalDelete(false);
        });
    }

    //edit timeshare
    const handleEditButtonClick = () => {
        handleEditModeChange();
    };

    const [isReserved, setIsReserved] = useState(false)

    useEffect(() => {
        dispatch(checkReservingTimeshare(item?._id)).then((result) => {
            if (checkReservingTimeshare.fulfilled.match(result)) {
                setIsReserved(result.payload)
            }
        })
    }, [])


    //xử lý countdown, đếm 30 phút
    const [countdown, setCountdown] = useState(null);
    const [showCountdown, setShowCountdown] = useState(false);
    const [timeshareIdInLocal, setTimeshareIdInLocal] = useState('');

    useEffect(() => {
        const storedDataCountdown = localStorage.getItem('data_countdown');
        if (storedDataCountdown !== null) {
            const { timeshare_id, countdown_timestamp } = JSON.parse(storedDataCountdown);
            const storedTimeElapsed = Math.floor((Date.now() - countdown_timestamp) / 1000);
            const remainingTime = 30 * 60 - storedTimeElapsed;
            setTimeshareIdInLocal(timeshare_id);
            if (remainingTime > 0) {
                setCountdown(remainingTime);
                setShowCountdown(true);
            } else {
                setShowCountdown(false);
            }
        }
    }, []);

    useEffect(() => {
        if (countdown !== null && countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);

            return () => clearTimeout(timer);
        } else if (countdown === 0) {
            setShowCountdown(false);
        }
    }, [countdown]);

    const renderCountdown = () => {
        const minutes = Math.floor(countdown / 60);
        const seconds = countdown % 60;

        return (
            <div className="countdown" style={{ width: 'fit-content', top: '400px', left: '15%' }}>
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </div>
        );
    };

    return (
        <>
            <div className='col-4 container-right'>
                {!isEditMode
                    ?
                    <><div className='text-price'>
                        <div className='d-flex justify-content-center align-items-center gap-2'>
                            <MdAttachMoney />
                            Khoảng giá:
                        </div>
                        <span className='detail'>{convertRangePriceToVNDFormat(item?.price, item?.max_price)} VNĐ/m&#178;</span>
                    </div>

                        <div className='text-price'>
                            <div className='d-flex justify-content-center align-items-center gap-2'>
                                <LiaCitySolid />
                                Chủ đầu tư:
                            </div>
                            <span className='fw-bold'>{item?.investor_id?.fullName}</span>
                        </div>
                        <hr></hr></>
                    :
                    <></>
                }

                {userDecode?._id === item?.investor_id?._id || userDecode?._id === item?.investor_id
                    ?
                    item?.sell_timeshare_status !== "Đang mở bán" && item?.sell_timeshare_status !== "Đã bán" ?
                        <>
                            <div className='btn btn-outline-secondary d-flex justify-content-center align-items-center gap-2'
                                onClick={handleEditButtonClick}
                            >
                                {!isEditMode ? <> <CiEdit />Chỉnh sửa timeshare</> : <> <FcCancel />Huỷ thay đổi</>}

                            </div>
                            <div
                                className='btn btn-outline-secondary d-flex justify-content-center align-items-center gap-2'
                                onClick={() => setOpenModalDelete(true)}
                            >
                                <MdDeleteOutline />Xóa timeshare
                            </div>
                        </> : ""
                    :
                    userDecode?.role_id?.roleName !== "Investor"
                        && userDecode?.role_id?.roleName !== "Staff"
                        && userDecode?.role_id?.roleName !== "Admin" ?
                        <>
                            <div
                                className={`btn ${item?.sell_timeshare_status === 'Đã bán' ? 'btn-outline-secondary' : 'btn-danger'}`}
                                onClick={handleActionTransition}
                                disabled={item?.sell_timeshare_status === "Đã bán" || (item?.sell_timeshare_status !== "Chưa được bán" && isReserved)}
                                style={{ opacity: item?.sell_timeshare_status === 'Đã bán' ? 0.5 : 1 }}
                            >
                                {item?.sell_timeshare_status === "Chưa được bán" && isReserved && "Bạn đã đặt giữ chỗ timeshare này"}
                                {item?.sell_timeshare_status === "Chưa được bán" && !isReserved && "ĐẶT GIỮ CHỖ NGAY"}
                                {item?.sell_timeshare_status === "Đang mở bán" && "MUA NGAY"}
                                {item?.sell_timeshare_status === "Đã bán" && "MUA NGAY"}
                            </div>
                            <div className='other-text text-center'>hoặc</div>
                            <hr style={{ position: 'relative', top: '-20px', zIndex: '-10', opacity: '0.2' }}></hr>
                            <div className='btn btn-outline-secondary'>Tham quan nhà mẫu</div>
                            <div className='btn btn-outline-secondary'>Đăng ký tư vấn</div>
                        </>
                        : null
                }

            </div>

            {item?._id === timeshareIdInLocal && (showCountdown && renderCountdown())}

            {openModalReservedPlace &&
                <ModalReservedPlace
                    item={item}
                    show={openModalReservedPlace}
                    handleClose={() => setOpenModalReservedPlace(false)}
                    memberList={memberList}
                    setMemberList={setMemberList}
                    optionTypeReservedPlace={optionTypeReservedPlace}
                    setOptionTypeReservedPlace={setOptionTypeReservedPlace}
                    error={error}
                    setError={setError}
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

            {openModalWarning &&
                <ModalConfirm
                    show={openModalWarning}
                    handleAccept={() => setOpenModalWarning(false)}
                    title={''}
                    body={<h5>Vui lòng đăng nhập trước khi mua!</h5>}
                />
            }

            {openModalDelete
                &&
                <ModalConfirm show={openModalDelete}
                    handleClose={() => setOpenModalDelete(false)}
                    handleAccept={handleCallApiDeleteTimeshare}
                    title={'Xác nhận hành động'}
                    body={
                        <div className="confirmation-message">
                            <p>Bạn có chắc vẫn muốn tiếp tục xóa timeshare này?</p>
                        </div>
                    } />
            }

            {isLoadingBuy && <SimpleLoading />}
        </>

    )
}

export default RightSideComponent