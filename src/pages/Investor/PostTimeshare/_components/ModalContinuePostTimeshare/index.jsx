import React, { useState } from 'react'
import { Container, Modal } from 'react-bootstrap'
import "./style.scss"
import Stage_1 from "../StagePostTimeshare/stage_1"
import Stage_2 from "../StagePostTimeshare/stage_2"
import Stage_3 from "../StagePostTimeshare/stage_3"
import Stage_4 from "../StagePostTimeshare/stage_4"
import toast from 'react-hot-toast'
import Stage_5 from '../StagePostTimeshare/stage_5'

const ModalContinuePostTimeshare = (props) => {
    const { show, handleCloseModalContinuePost,
        handleOpenModalContinuePost, currentStage, setCurrentStage,
        stageEnabled, setStageEnabled,
        selectedTimeshareStatus,
        setSelectedTimeshareStatus, selectedJuridicalFiles,
        setSelectedJuridicalFiles, juridicalFilesOrigin, setJuridicalFilesOrigin, anotherInfo, setAnotherInfo,
        priorityLevel, setPriorityLevel, openModalConfirmState,
        handleCancelModalConfirm, handleConfirmPostTimeshare, handleOpenConfirmModal,
        depositPrice, setDepositPrice, errorDepositPrice, setErrorDepositPice } = props

    const handleStageClick = (stage) => {
        setCurrentStage(stage);

    };

    const handleBackStage = () => {
        setCurrentStage(currentStage - 1);
    };

    const handleContinueStage = () => {
        if (currentStage === 1 && (!selectedTimeshareStatus || selectedTimeshareStatus === null)) {
            toast.error("Vui lòng chọn một trước khi qua giai đoạn tiếp theo!");
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
                return "Chọn giai đoạn pháp lý";
            case 2:
                return "Cập nhập hồ sơ pháp lý";
            case 3:
                return "Cập nhập các thông tin khác";
            case 4:
                return "Mức độ ưu tiên";
            case 5:
                return "Giá giữ chân"
            default:
                return "";
        }
    };

    const getStageContent = (stage) => {
        switch (stage) {
            case 1:
                return <Stage_1 selectedTimeshareStatus={selectedTimeshareStatus} setSelectedTimeshareStatus={setSelectedTimeshareStatus} />;
            case 2:
                return <Stage_2 selectedJuridicalFiles={selectedJuridicalFiles} setSelectedJuridicalFiles={setSelectedJuridicalFiles} juridicalFilesOrigin={juridicalFilesOrigin} setJuridicalFilesOrigin={setJuridicalFilesOrigin} />;
            case 3:
                return <Stage_3 anotherInfo={anotherInfo} setAnotherInfo={setAnotherInfo} />;
            case 4:
                return <Stage_4 priorityLevel={priorityLevel} setPriorityLevel={setPriorityLevel} />;
            case 5:
                return <Stage_5 depositPrice={depositPrice} setDepositPrice={setDepositPrice} errorDepositPrice={errorDepositPrice} setErrorDepositPice={setErrorDepositPice}/>
            default:
                return null;
        }
    };

    return (
        <Modal show={show} fullscreen onHide={handleCloseModalContinuePost} className='modal-continue-post-timeshare'>
            <Modal.Header closeButton>
                {/* <Modal.Title></Modal.Title> */}
            </Modal.Header>

            <Modal.Body className='webkit-scrollbar-modal'>
                <div className="stage-header">
                    {[1, 2, 3, 4, 5].map(stageNum => (
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

                    {currentStage < 5 && (
                        <button className="btn fw-bold btn-continue mx-2" onClick={handleContinueStage}>
                            Tiếp tục
                        </button>
                    )}

                    {currentStage === 5 && (
                        <button className="btn fw-bold btn-continue mx-2" onClick={handleOpenConfirmModal}>
                            Xác nhận đăng bán
                        </button>
                    )}

                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalContinuePostTimeshare