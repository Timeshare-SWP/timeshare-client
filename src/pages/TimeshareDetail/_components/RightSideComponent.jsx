import React, { useContext, useEffect, useState } from 'react'
import { convertRangePriceToVNDFormat, convertToNumberFormat } from '../../../utils/handleFunction';
import ModalReservedPlace from './ModalReservedPlace';
import ModalConfirm from '../../../components/shared/ModalConfirm'
import { useDispatch } from 'react-redux';
import { viewAllReservedPlace, checkReservingTimeshare, viewAllCustomerWhoReservePlaceByTimeshareId } from '../../../redux/features/reservedPlaceSlice';
import { buyTimeshare, changeSellTimeshareStatus, changeTimeshareStatus, deleteTimeshare } from '../../../redux/features/timeshareSlice';
import toast from 'react-hot-toast';
import SpinnerLoading from '../../../components/shared/SpinnerLoading'
import { AuthContext } from '../../../contexts/authContext';
import { createNotification } from '../../../redux/features/notificationSlice';
import { CiEdit, CiStop1 } from "react-icons/ci";
import { MdCancel, MdDeleteOutline, MdOutlinePublishedWithChanges } from "react-icons/md";
import { LiaCitySolid } from "react-icons/lia";
import { MdAttachMoney } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';
import SimpleLoading from '../../../components/shared/SimpleLoading';
import { FcCancel } from "react-icons/fc";
import StaffComponent from './StaffComponent';
import { getAllApartmentOfTimeshare } from '../../../redux/features/apartmentSlice';
import { CgArrowsExchange } from 'react-icons/cg';

const SelectedApartment = (props) => {
    const { item, apartmentData, setApartmentData, selectedIdApartmentData,
        setSelectedIdApartmentData, isReserveState } = props

    console.log("apartmentData", apartmentData)

    const handleRadioChange = (e) => {
        setSelectedIdApartmentData(e.target.value)
    }

    if (isReserveState === "") {
        return (
            <SimpleLoading />
        )
    }

    if (isReserveState === true) {
        return (
            <div className="container d-flex row gap-2 justify-content-center">
                <h5>Bạn có chắc muốn mua timeshare này?</h5>
            </div>
        )
    }

    if (item?.timeshare_type !== "Chung cư") {
        return (
            <div className="container d-flex row gap-2 justify-content-center">
                <h5>Bạn có chắc muốn mua timeshare này?</h5>
            </div>
        )
    }

    return (
        <div className="container d-flex row gap-2 justify-content-center">
            {apartmentData.length === 0 || apartmentData.every(apartment => apartment.is_selected === true) ? (
                <div>
                    <h5>Không còn căn hộ nào còn trống để có thể đăng ký mua! Vui lòng chọn timeshare khác</h5>
                </div>
            ) : (
                <>
                    <h5 className='text-center'>
                        Lựa chọn căn hộ muốn mua
                    </h5>
                    {apartmentData.map((obj, index) => (
                        obj.is_selected === false && (
                            <div className="radio-tile-group gap-3" key={index}>
                                <div className="input-container">
                                    <input
                                        id="bike"
                                        className="radio-button"
                                        type="radio"
                                        value={obj?._id}
                                        name="radio"
                                        onChange={handleRadioChange}
                                        defaultChecked={selectedIdApartmentData === obj._id}
                                    />
                                    <div className="radio-tile">
                                        <label htmlFor="individual" className="radio-tile-label">
                                            Căn hộ số: {obj?.apartment_number}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </>
            )}

        </div>
    )
}


const RightSideComponent = (props) => {

    const { item, handleEditModeChange, setTimeShareList, timeshareList, handleClose, isEditMode } = props

    const navigate = useNavigate();
    const location = useLocation();

    // state đếm giờ:
    const [countdown, setCountdown] = useState(null);
    const [showCountdown, setShowCountdown] = useState(false);
    const [timeshareIdInLocal, setTimeshareIdInLocal] = useState('');

    // 
    const [openModalWarning, setOpenModalWarning] = useState(false);
    const [openModalReservedPlace, setOpenModalReservedPlace] = useState(false);
    const [openModalConfirmBuy, setOpenModalConfirmBuy] = useState(false);
    const [isLoadingBuy, setIsLoadingBuy] = useState(false);
    const { userDecode } = useContext(AuthContext)

    // stage_1
    const [memberList, setMemberList] = useState([])
    const [optionTypeReservedPlace, setOptionTypeReservedPlace] = useState('');
    const [error, setError] = useState('')

    // apartment 
    const [loadingApartment, setLoadingApartment] = useState(false);
    const [apartmentData, setApartmentData] = useState([]);
    const [selectedIdApartmentData, setSelectedIdApartmentData] = useState("");

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


    // XỬ LÝ VIỆC THAY ĐỔI TRẠNG THÁI TIMESHARE VÀ SELL TIMESHARE
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({
        title: '',
        body: '',
        handleAccept: () => { }
    });

    // xử lý UI
    const renderTimeshareAction = (timeshare_status) => {
        if (timeshare_status === "Sắp triển khai") return "Triển khai dự án";
        else if (timeshare_status === "Đang triển khai") return "Đã triển khai dự án";
        else return "Unknown";
    }

    const renderSellTimeshareAction = (sell_timeshare_status) => {
        if (sell_timeshare_status === "Chưa được bán") return "Mở bán timeshare";
        else if (sell_timeshare_status === "Đang mở bán") return "Xác nhận đã bán timeshare";
        else return "Unknown";
    }

    const buildModalBodyChangeTimeshareStatus = (timeshare_status) => {
        let body = '';
        if (timeshare_status === "Sắp triển khai") {
            body = 'Bạn có chắc chắn muốn triển khai Timeshare này?';
        } else if (timeshare_status === "Đang triển khai") {
            body = 'Bạn có chắc chắn muốn chuyển Timeshare này sang "Đã triển khai"?';
        }
        return body;
    }

    const buildModalBodyChangeSellTimeshareStatus = (sell_timeshare_status) => {
        let body = '';
        if (sell_timeshare_status === "Chưa được bán") {
            body = 'Bạn có chắc chắn muốn mở bán Timeshare này?';
        } else if (sell_timeshare_status === "Đang mở bán") {
            body = 'Bạn có chắc chắn muốn chuyển Timeshare này sang đã bán?';
        }
        return body;
    }


    // xử lý action
    const handleChangeTimeshareStatus = (item) => {
        setSelectedItem(item);
        setModalInfo({
            title: 'Xác nhận hành động',
            body: buildModalBodyChangeTimeshareStatus(item.timeshare_status),
            handleAccept: () => callApiChangeTimeshareStatus(item)
        });
        setShowModal(true);
    }

    // api
    const callApiChangeTimeshareStatus = (item) => {
        let newTimeshareStatus = '';

        if (item.timeshare_status === "Sắp triển khai") {
            newTimeshareStatus = "Đang triển khai";
        } else if (item.timeshare_status === "Đang triển khai") {
            newTimeshareStatus = "Đã triển khai";
        }

        const data = {
            timeshare_id: item._id,
            timeshare_status: newTimeshareStatus
        }

        dispatch(changeTimeshareStatus(data)).then((result) => {
            if (changeTimeshareStatus.fulfilled.match(result)) {
                toast.success("Thay đổi trạng thái thành công!")
                const updatedTimeshare = result.payload;

                const updatedList = timeshareList?.map((timeshare) =>
                    timeshare._id === item._id ? updatedTimeshare : timeshare
                );

                if (setTimeShareList) {
                    setTimeShareList(updatedList);
                }
            } else {
                toast.error(`${result.payload}`)
            }
            navigate("/personal-projects")
            if (handleClose) {
                handleClose()
            }
            setShowModal(false);

        })
    }

    // xử lý việc mở bán 
    const handleChangeSellTimeshareStatus = (item) => {
        setSelectedItem(item);
        setModalInfo({
            title: 'Xác nhận hành động',
            body: buildModalBodyChangeSellTimeshareStatus(item.sell_timeshare_status),
            handleAccept: () => callApiChangeSellTimeshareStatus(item)
        });
        setShowModal(true);
    }

    const callApiChangeSellTimeshareStatus = async (item) => {

        let newSellTimeshareStatus = '';

        if (item.sell_timeshare_status === "Chưa được bán") {
            newSellTimeshareStatus = "Đang mở bán";
        } else if (item.sell_timeshare_status === "Đang mở bán") {
            newSellTimeshareStatus = "Đã bán";
        }

        const data = {
            timeshare_id: item._id,
            sell_timeshare_status: newSellTimeshareStatus
        }

        try {
            const result = await dispatch(changeSellTimeshareStatus(data));

            if (changeSellTimeshareStatus.fulfilled.match(result)) {
                toast.success("Thay đổi trạng thái thành công!")
                const updatedTimeshare = result.payload;

                const updatedList = timeshareList?.map((timeshare) =>
                    timeshare._id === item._id ? updatedTimeshare : timeshare
                );

                if (setTimeShareList) {
                    setTimeShareList(updatedList);
                }
            } else {
                toast.error(`${result.payload}`)
            }
        } catch (error) {
            toast.error(`${error}`);
        }

        if (newSellTimeshareStatus === "Đang mở bán") {
            try {
                const resViewAllCustomer = await dispatch(viewAllCustomerWhoReservePlaceByTimeshareId(item._id));

                if (viewAllCustomerWhoReservePlaceByTimeshareId.rejected.match(resViewAllCustomer)) {
                    console.log("resViewAllCustomer error", resViewAllCustomer.payload)
                } else {
                    const reservedCustomers = resViewAllCustomer.payload.filter(obj => obj.transaction_status === "Reserving");

                    for (const obj of reservedCustomers) {
                        for (const user of obj.customers) {
                            try {
                                const related_object = {
                                    sender_id: `${userDecode?._id}`,
                                    timeshare_name: `${item?.timeshare_name}`,
                                    timeshare_id: `${item?._id}`
                                };

                                const dataBodyNoti = {
                                    user_id: user._id,
                                    notification_content: `${userDecode?.fullName} đã mở bán timeshare ${item.timeshare_name} mà bạn có đặt giữ chỗ`,
                                    notification_title: `NOTI_CAN_BUY_TIMESHARE_TO_CUSTOMER`,
                                    notification_type: `NOTI_CAN_BUY_TIMESHARE_TO_CUSTOMER`,
                                    related_object: JSON.stringify(related_object)
                                };

                                const resNoti = await dispatch(createNotification(dataBodyNoti));

                                // console.log("resNoti", resNoti)

                            } catch (error) {
                                toast.error(`${error}`);
                            }
                        }
                    }
                }
            } catch (error) {
                toast.error(`${error}`);
            }

            startCountdown(item._id);
        }

        navigate("/personal-projects")
        if (handleClose) {
            handleClose()
        }

        setShowModal(false);
    }

    const handleCloseModal = () => {
        setSelectedItem(null);
        setShowModal(false);
    }

    const startCountdown = (timeshareId) => {
        const startTime = Date.now();
        const dataCountdown = {
            timeshare_id: timeshareId,
            countdown_timestamp: startTime
        };
        localStorage.setItem('data_countdown', JSON.stringify(dataCountdown));
        setCountdown(30 * 60);
        setShowCountdown(true);
    };

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

    // ///////////////////////////////
    // Xử lý việc mua timeshare
    // console.log("item", item)

    const dispatch = useDispatch();

    // xử lý api để buy timeshare
    const handleCallApiToBuyTimeshare = () => {

        if ((apartmentData.length === 0 || apartmentData.every(apartment => apartment.is_selected === true)) && item?.timeshare_type === "Chung cư") {
            setOpenModalConfirmBuy(false)
            return
        }

        setIsLoadingBuy(true)

        let data = {}

        if (isReserveState === false) {
            data = {
                timeshare_id: item?._id,
                is_reserve: isReserveState,
                transaction_id: transactionId,
                apartment_id: selectedIdApartmentData
            }
        }

        if (isReserveState === true) {
            data = {
                timeshare_id: item?._id,
                is_reserve: isReserveState,
                transaction_id: transactionId,
                apartment_id: apartmentIdFromReserved
            }
        }

        console.log('data', data)

        dispatch(buyTimeshare(data)).then((resBuy) => {
            console.log("resBuy", resBuy)
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
                        // console.log(resNoti)
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

        // LOGIC cũ

        // dispatch(viewAllReservedPlace()).then((resViewAll) => {
        //     // gọi lại api đặt chỗ để xem người này đã có đặt chỗ trước hay không, 
        //     //nếu có đặt chỗ trước thì truyền is_reserve_state và transaction_id (transaction của giữ chỗ) để BE xử lý tiếp
        //     //
        //     if (viewAllReservedPlace.fulfilled.match(resViewAll)) {
        //         const reservedPlaces = resViewAll.payload.filter(place => place.timeshare_id?._id === item?._id);

        //         let is_reserve_state
        //         let transaction_id

        //         if (reservedPlaces.length > 0) {
        //             const nearestUpdatedPlace = reservedPlaces.reduce((nearest, place) => {
        //                 return place.updatedAt > nearest.updatedAt ? place : nearest;
        //             });
        //             console.log("nearestUpdatedPlace", nearestUpdatedPlace)
        //             is_reserve_state = nearestUpdatedPlace.transaction_status === "Reserving";
        //             transaction_id = nearestUpdatedPlace?._id
        //         } else {
        //             is_reserve_state = false;
        //         }

        //         const data = {
        //             timeshare_id: item?._id,
        //             is_reserve: is_reserve_state,
        //             transaction_id: transaction_id,
        //             apartment_id: selectedIdApartmentData
        //         }
        //         console.log('data', data)

        //         dispatch(buyTimeshare(data)).then((resBuy) => {
        //             console.log("resBuy", resBuy)
        //             if (buyTimeshare.fulfilled.match(resBuy)) {
        //                 navigate('/customer-transaction')
        //                 toast.success('Mua thành công!')

        //                 const dataBodyNoti = {
        //                     user_id: item?.investor_id?._id,
        //                     notification_content: `${userDecode?.fullName} muốn mua dự án timeshare ${item.timeshare_name} của bạn`,
        //                     notification_title: `REQUEST_CONFIRM_BUY_TIMESHARE_TO_INVESTOR`,
        //                     notification_type: `REQUEST_CONFIRM_BUY_TIMESHARE_TO_INVESTOR`,
        //                 };

        //                 dispatch(createNotification(dataBodyNoti)).then(
        //                     (resNoti) => {
        //                         // console.log(resNoti)
        //                     }
        //                 );
        //                 setIsLoadingBuy(false)
        //                 setOpenModalConfirmBuy(false)
        //             } else {
        //                 toast.error(`${resBuy.payload}`)
        //                 console.log('error', resBuy)
        //                 setIsLoadingBuy(false)
        //                 setOpenModalConfirmBuy(false)
        //             }
        //         })
        //     }

        // });
    }

    const [isReserveState, setIsReserveState] = useState("");
    const [transactionId, seTransactionId] = useState("");
    const [apartmentIdFromReserved, setApartmentIdFromReserved] = useState("");

    useEffect(() => {
        dispatch(viewAllReservedPlace()).then((resViewAll) => {
            // gọi lại api đặt chỗ để xem người này đã có đặt chỗ trước hay không, 
            //nếu có đặt chỗ trước thì truyền is_reserve_state và transaction_id (transaction của giữ chỗ) để BE xử lý tiếp
            //
            if (viewAllReservedPlace.fulfilled.match(resViewAll)) {
                const reservedPlaces = resViewAll.payload.filter(place => place?.timeshare_id?._id === item?._id);

                if (reservedPlaces.length > 0) {
                    const nearestUpdatedPlace = reservedPlaces.reduce((nearest, place) => {
                        return place.updatedAt > nearest.updatedAt ? place : nearest;
                    });
                    console.log("nearestUpdatedPlace", nearestUpdatedPlace)
                    setIsReserveState(nearestUpdatedPlace.transaction_status === "Reserving")
                    seTransactionId(nearestUpdatedPlace?._id)
                    setApartmentIdFromReserved(nearestUpdatedPlace?.apartment_id?._id)
                    // is_reserve_state = nearestUpdatedPlace.transaction_status === "Reserving";
                    // transaction_id = nearestUpdatedPlace?._id
                } else {
                    setIsReserveState(false)
                    // is_reserve_state = false;
                }
            }

        });
    }, [])

    // xoá timeshare
    const [openModalDelete, setOpenModalDelete] = useState(false);

    const handleCallApiDeleteTimeshare = () => {
        dispatch(deleteTimeshare(item._id)).then((resDelete) => {
            if (deleteTimeshare.fulfilled.match(resDelete)) {
                toast.success(`Xóa timeshare thành công!`);

                if (timeshareList) {
                    const updatedList = timeshareList.filter(timeshare => timeshare._id !== item._id);
                    if (setTimeShareList) {
                        setTimeShareList(updatedList);
                    }
                    if (handleClose) {
                        handleClose()
                    }
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


    // xử lý để hiện apartment
    useEffect(() => {
        if (item?.timeshare_type === "Chung cư") {
            setLoadingApartment(true)
            dispatch(getAllApartmentOfTimeshare(item?._id)).then((resGetApart) => {
                console.log("resGetApart", resGetApart.payload)
                if (getAllApartmentOfTimeshare.fulfilled.match(resGetApart)) {
                    setApartmentData(resGetApart.payload.reverse());
                }
                setLoadingApartment(false)
            })
        }
    }, [item?.timeshare_type])

    return (
        <>
            <div className='col-4'>
                <div className='container-right'>
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


                    {userDecode?._id === item?.investor_id?._id
                        &&
                        <>
                            {item.timeshare_status !== "Đã triển khai"
                                &&
                                <div className='btn btn-outline-secondary d-flex justify-content-center align-items-center gap-2'
                                    onClick={() => handleChangeTimeshareStatus(item)}
                                >
                                    <CgArrowsExchange />{renderTimeshareAction(item.timeshare_status)}
                                </div>
                            }

                            {item.sell_timeshare_status !== "Đã bán" && item.timeshare_status === "Đã triển khai"
                                &&
                                <div className='btn btn-outline-secondary d-flex justify-content-center align-items-center gap-2'
                                    onClick={() => handleChangeSellTimeshareStatus(item)}
                                >
                                    <MdOutlinePublishedWithChanges />{renderSellTimeshareAction(item.sell_timeshare_status)}
                                </div>
                            }

                        </>
                    }
                </div>

                {/* STAFF */}
                {location.pathname.includes('/timeshare-list/') && <StaffComponent />}

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
                    body={
                        <SelectedApartment
                            item={item}
                            apartmentData={apartmentData}
                            setApartmentData={setApartmentData}
                            selectedIdApartmentData={selectedIdApartmentData}
                            setSelectedIdApartmentData={setSelectedIdApartmentData}
                            isReserveState={isReserveState}
                            transactionId={transactionId}
                        />
                    }
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

            {showModal && <ModalConfirm show={showModal}
                handleClose={handleCloseModal}
                handleAccept={modalInfo.handleAccept}
                title={modalInfo.title}
                body={modalInfo.body} />
            }

            {isLoadingBuy && <SpinnerLoading />}
        </>

    )
}

export default RightSideComponent