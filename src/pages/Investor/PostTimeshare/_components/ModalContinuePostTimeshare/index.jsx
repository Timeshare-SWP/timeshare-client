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
        depositPrice, setDepositPrice, errorDepositPrice, setErrorDepositPice, rangePrice } = props

    const [errorStage2, setErrorStage2] = useState('');
    const [errorStage3, setErrorStage3] = useState('');

    const handleStageClick = (stage) => {
        setErrorStage2('')
        setErrorStage3('')
        setCurrentStage(stage);
    };

    const handleBackStage = () => {
        setErrorStage2('')
        setErrorStage3('')
        setCurrentStage(currentStage - 1);
    };

    const handleContinueStage = () => {
        if (currentStage === 1 && (!selectedTimeshareStatus || selectedTimeshareStatus === null)) {
            toast.error("Vui lòng chọn một trước khi qua giai đoạn tiếp theo!");
            return;
        }

        if (currentStage === 2
            && (selectedTimeshareStatus.name_status === "Đang triển khai"
                || selectedTimeshareStatus.name_status === "Đã triển khai")
            && selectedJuridicalFiles.length === 0
        ) {
            setErrorStage2(`Timeshare bạn sắp đăng ở giai đoạn "${selectedTimeshareStatus.name_status}" nên phải có hồ sơ pháp lý, vui lòng cập nhập!`)
            return;
        }

        let errorMessage;

        if (currentStage === 3 && (anotherInfo.year_of_commencement === null || anotherInfo.year_of_handover === null)) {
            if (selectedTimeshareStatus.name_status === "Đang triển khai") {
                errorMessage = `Timeshare bạn sắp đăng ở giai đoạn "Đang triển khai". Vui lòng cập nhập đầy đủ năm bàn giao và năm khởi công!`;
            } else if (selectedTimeshareStatus.name_status === "Đã triển khai") {
                errorMessage = `Timeshare bạn sắp đăng ở giai đoạn "Đã triển khai". Vui lòng cập nhập đầy đủ thông tin!`;
            }
        }

        if (errorMessage) {
            setErrorStage3(errorMessage);
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
                return <Stage_2
                    selectedTimeshareStatus={selectedTimeshareStatus}
                    selectedJuridicalFiles={selectedJuridicalFiles}
                    setSelectedJuridicalFiles={setSelectedJuridicalFiles}
                    juridicalFilesOrigin={juridicalFilesOrigin}
                    setJuridicalFilesOrigin={setJuridicalFilesOrigin}
                    errorStage2={errorStage2}
                    setErrorStage2={setErrorStage2}
                />;
            case 3:
                return <Stage_3
                    anotherInfo={anotherInfo}
                    setAnotherInfo={setAnotherInfo}
                    errorStage3={errorStage3}
                    setErrorStage3={setErrorStage3}
                />;
            case 4:
                return <Stage_4 priorityLevel={priorityLevel} setPriorityLevel={setPriorityLevel} />;
            case 5:
                return <Stage_5
                    depositPrice={depositPrice} setDepositPrice={setDepositPrice}
                    errorDepositPrice={errorDepositPrice} setErrorDepositPice={setErrorDepositPice}
                    rangePrice={rangePrice}
                />
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