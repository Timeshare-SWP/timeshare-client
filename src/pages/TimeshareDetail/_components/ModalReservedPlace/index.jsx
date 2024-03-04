import React, { useContext, useState } from 'react'
import { Container, Modal } from 'react-bootstrap'
import Stage_1 from '../StageReservedPlace/Stage_1';
import Stage_2 from '../StageReservedPlace/Stage_2';
import toast from 'react-hot-toast';
import './style.scss'
import { useDispatch, useSelector } from 'react-redux';
import { createReservedPlace } from '../../../../redux/features/reservedPlaceSlice';
import { inviteToJoinTimeshare } from '../../../../redux/features/transactionSlice';
import { createNotification } from '../../../../redux/features/notificationSlice';
import { getTimeshareById } from '../../../../redux/features/timeshareSlice';
import { AuthContext } from '../../../../contexts/authContext';
import SpinnerLoading from '../../../../components/shared/SpinnerLoading'
import { useNavigate } from 'react-router-dom';

const ModalReservedPlace = (props) => {
    const { item, show, handleClose, handleAccept, error, setError,
        memberList, setMemberList, optionTypeReservedPlace,
        setOptionTypeReservedPlace } = props

    const { userDecode } = useContext(AuthContext)
    const { loadingReservedPlace } = useSelector((state) => state.reservedPlace)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currentStage, setCurrentStage] = useState(1)
    const [stageEnabled, setStageEnabled] = useState({
        1: true,
        2: false,
    })

    const handleStageClick = (stage) => {
        setCurrentStage(stage);
    };

    const handleBackStage = () => {
        setCurrentStage(currentStage - 1);
    };

    const handleContinueStage = () => {
        if (currentStage === 1 && (!optionTypeReservedPlace || optionTypeReservedPlace === null)) {
            toast.error("Vui lòng chọn một trước khi qua giai đoạn tiếp theo!");
            return;
        }

        if (currentStage === 1 && optionTypeReservedPlace === 'group' && memberList.length === 0) {
            setError('Vui lòng mời ai đó trước khi tiếp tục!');
            return;
        }


        setStageEnabled(prevState => ({
            ...prevState,
            [currentStage + 1]: true
        }));

        setCurrentStage(currentStage + 1);
    };

    const getStageName = (stage) => {
        switch (stage) {
            case 1:
                return "Bạn đặt chỗ cho?";
            case 2:
                return "Thanh toán đặt cọc";
            default:
                return "";
        }
    };

    const getStageContent = (stage) => {
        switch (stage) {
            case 1:
                return <Stage_1
                    error={error}
                    setError={setError}
                    memberList={memberList}
                    setMemberList={setMemberList}
                    optionTypeReservedPlace={optionTypeReservedPlace}
                    setOptionTypeReservedPlace={setOptionTypeReservedPlace}
                />;
            case 2:
                return <Stage_2 />;
            default:
                return null;
        }
    };

    const handleCallApiReservedPlace = async () => {
        const dataCreateReservedPlace = {
            timeshare_id: item._id,
            reservation_price: 123456789
        };

        try {
            const resCreate = await dispatch(createReservedPlace(dataCreateReservedPlace));

            if (createReservedPlace.rejected.match(resCreate)) {
                console.log("resCreate", resCreate.payload);
                toast.error(`${resCreate.payload}`);
            } else {
                toast.success(`Giữ chỗ thành công!`);
                console.log("resCreate", resCreate.payload);
                navigate("/reserved-place-list");

                if (memberList.length !== 0) {
                    for (const user of memberList) {
                        const dataInvite = {
                            customer_id: user._id,
                            transaction_id: resCreate.payload._id,
                        };

                        console.log("dataInvite", dataInvite);

                        const resInvite = await dispatch(inviteToJoinTimeshare(dataInvite));

                        if (inviteToJoinTimeshare.rejected.match(resInvite)) {
                            toast.error(`${resInvite.payload} (${user.email})`);
                            console.log("resInvite.payload", resInvite.payload);
                        } else {
                            console.log("resInvite.payload", resInvite.payload);
                            toast.success(`Mời ${user.email} thành công!`);

                            const related_object = {
                                sender_id: `${userDecode?._id}`,
                                transaction_invite_id: `${resInvite.payload._id}`,
                                timeshare_name: `${item?.timeshare_name}`
                            };

                            const dataBodyNoti = {
                                user_id: user._id,
                                notification_content: `${userDecode?.fullName} đã gửi lời mời bạn tham gia timeshare ${item.timeshare_name}`,
                                notification_title: `INVITE_JOIN_TIMESHARE_TO_CUSTOMER`,
                                notification_type: `INVITE_JOIN_TIMESHARE_TO_CUSTOMER`,
                                related_object: JSON.stringify(related_object)
                            };

                            await dispatch(createNotification(dataBodyNoti));
                        }
                    }
                }

                const dataBodyNotiForInvestor = {
                    user_id: item.investor_id._id,
                    notification_content: `${userDecode?.fullName} đã đặt giữ chỗ timeshare ${item.timeshare_name} của bạn`,
                    notification_title: `NOTI_RESERVER_PLACE_TO_INVESTOR`,
                    notification_type: `NOTI_RESERVER_PLACE_TO_INVESTOR`,
                }

                await dispatch(createNotification(dataBodyNotiForInvestor));
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <Modal show={show} size="lg" onHide={handleClose} centered backdrop="static" className='modal-continue-post-timeshare'>
            <Modal.Header closeButton>
                <h4>Đặt giữ chỗ</h4>
            </Modal.Header>
            <Modal.Body className='webkit-scrollbar-modal'>
                <div className="stage-header">
                    {[1, 2].map(stageNum => (
                        <button
                            key={stageNum}
                            className={`stage btn ${stageEnabled[stageNum] ? '' : 'disabled'} ${currentStage === stageNum ? 'active' : ''}`}
                            onClick={() => handleStageClick(stageNum)}
                        >
                            {stageNum}. {getStageName(stageNum)}
                        </button>
                    ))}
                </div>

                <Container className='py-4'>
                    {getStageContent(currentStage)}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <div style={{ marginRight: "50px" }}>
                    {currentStage > 1 && (
                        <button className="btn fw-bold btn-cancel" onClick={handleBackStage}>
                            Quay lại
                        </button>
                    )}

                    {currentStage < 2 && (
                        <button className="btn fw-bold btn-continue mx-2" onClick={handleContinueStage}>
                            Tiếp tục
                        </button>
                    )}

                    {currentStage === 2 && (
                        <button className="btn fw-bold btn-continue mx-2" onClick={handleCallApiReservedPlace}>
                            Xác nhận
                        </button>
                    )}

                </div>
            </Modal.Footer>

            {loadingReservedPlace && <SpinnerLoading />}
        </Modal>
    )
}

export default ModalReservedPlace