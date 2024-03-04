import React, { useState } from 'react'
import { Container, Modal } from 'react-bootstrap'
import Stage_1 from '../StageReservedPlace/Stage_1';
import Stage_2 from '../StageReservedPlace/Stage_2';
import toast from 'react-hot-toast';
import './style.scss'

const ModalReservedPlace = (props) => {
    const { show, handleClose, handleAccept, error, setError,
        memberList, setMemberList, optionTypeReservedPlace,
        setOptionTypeReservedPlace } = props

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

        if (currentStage === 1 && memberList.length === 0) {
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
                        <button className="btn fw-bold btn-continue mx-2" >
                            Xác nhận
                        </button>
                    )}

                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalReservedPlace