import React, { useContext, useState } from 'react'
import { convertToNumberFormat } from '../../../utils/handleFunction';
import ModalReservedPlace from './ModalReservedPlace';
import ModalConfirm from '../../../components/shared/ModalConfirm'
import { useDispatch } from 'react-redux';
import { viewAllReservedPlace } from '../../../redux/features/reservedPlaceSlice';
import { buyTimeshare } from '../../../redux/features/timeshareSlice';
import toast from 'react-hot-toast';
import SpinnerLoading from '../../../components/shared/SpinnerLoading'
import { AuthContext } from '../../../contexts/authContext';
import { createNotification } from '../../../redux/features/notificationSlice';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";


const RightSideComponent = (props) => {

    const { item } = props

    const [openModalReservedPlace, setOpenModalReservedPlace] = useState(false);
    const [openModalConfirmBuy, setOpenModalConfirmBuy] = useState(false);
    const [isLoadingBuy, setIsLoadingBuy] = useState(false);
    const { userDecode } = useContext(AuthContext)

    // stage_1
    const [memberList, setMemberList] = useState([])
    const [optionTypeReservedPlace, setOptionTypeReservedPlace] = useState('');
    const [error, setError] = useState('')

    const handleActionTransition = () => {
        if (item?.sell_timeshare_status === "Chưa được bán") {
            setOpenModalReservedPlace(true)
        } else if (item?.sell_timeshare_status === "Đang mở bán") {
            setOpenModalConfirmBuy(true)
        }
    }

    // Xử lý việc mua timeshare
    console.log("item", item)

    const dispatch = useDispatch();

    const handleCallApiToBuyTimeshare = () => {
        setIsLoadingBuy(true)
        dispatch(viewAllReservedPlace()).then((resViewAll) => {
            if (viewAllReservedPlace.fulfilled.match(resViewAll)) {
                const reservedPlaces = resViewAll.payload.filter(place => place.timeshare_id._id === item._id);

                let is_reserve_state

                if (reservedPlaces.length > 0) {
                    const nearestUpdatedPlace = reservedPlaces.reduce((nearest, place) => {
                        return place.updatedAt > nearest.updatedAt ? place : nearest;
                    });

                    is_reserve_state = nearestUpdatedPlace.transaction_status === "Reserving";

                } else {
                    is_reserve_state = false;
                }

                const data = {
                    timeshare_id: item._id,
                    is_reserve: is_reserve_state
                }

                dispatch(buyTimeshare(data)).then((resBuy) => {
                    if (buyTimeshare.fulfilled.match(resBuy)) {
                        toast.success('Mua thành công!')

                        const dataBodyNoti = {
                            user_id: item.investor_id._id,
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

    return (
        <>
            <div className='col-4 container-right'>
                <div className='text-price'>Khoảng giá: <span className='detail'>{convertToNumberFormat(item?.price)} VNĐ/m&#178;</span></div>
                <div className='text-price'>Chủ đầu tư: <span className='fw-bold'>{item?.investor_id?.fullName}</span></div>
                <hr></hr>
                {userDecode._id === item?.investor_id._id
                    ?
                    <>
                        <div className='btn btn-outline-secondary d-flex justify-content-center align-items-center gap-2'>
                            <CiEdit />Chỉnh sửa timeshare
                        </div>
                        <div className='btn btn-outline-secondary d-flex justify-content-center align-items-center gap-2'>
                            <MdDeleteOutline />Xóa timeshare
                        </div>
                    </>
                    :
                    <>
                        <div
                            className={`btn ${item?.sell_timeshare_status === 'Đã bán' ? 'btn-outline-secondary' : 'btn-danger'}`}
                            onClick={handleActionTransition}
                            disabled={item?.sell_timeshare_status === "Đã bán"}
                            style={{ opacity: item?.sell_timeshare_status === 'Đã bán' ? 0.5 : 1 }}
                        >
                            {item?.sell_timeshare_status === "Chưa được bán" && "ĐẶT GIỮ CHỖ NGAY"}
                            {item?.sell_timeshare_status === "Đang mở bán" && "MUA NGAY"}
                            {item?.sell_timeshare_status === "Đã bán" && "MUA NGAY"}
                        </div>
                        <div className='other-text text-center'>hoặc</div>
                        <hr style={{ position: 'relative', top: '-20px', zIndex: '-10', opacity: '0.2' }}></hr>
                        <div className='btn btn-outline-secondary'>Tham quan nhà mẫu</div>
                        <div className='btn btn-outline-secondary'>Đăng ký tư vấn</div>
                    </>
                }

            </div>

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

            {isLoadingBuy && <SpinnerLoading />}
        </>

    )
}

export default RightSideComponent