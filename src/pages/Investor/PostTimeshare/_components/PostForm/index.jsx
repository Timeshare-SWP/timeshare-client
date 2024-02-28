import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdDeleteOutline } from "react-icons/md";
import ModalContinuePostTimeshare from '../ModalContinuePostTimeshare';
import { createTimeshare } from "../../../../../redux/features/timeshareSlice"
import ModalConfirm from "../../../../../components/shared/ModalConfirm"
import { useDispatch } from 'react-redux';

const PostForm = () => {

    const [imageSelectedTimeshare, setImageSelectedTimeshare] = useState([]);
    const [openModalContinuePostState, setOpenModalContinuePostState] = useState(false);

    //quản lý lưu trữ giữa các stage
    const [selectedTimeshareStatus, setSelectedTimeshareStatus] = useState(null); //stage 1
    const [selectedJuridicalFiles, setSelectedJuridicalFiles] = useState([]); //stage 2
    const [anotherInfo, setAnotherInfo] = useState([]); //stage 3
    const [priorityLevel, setPriorityLevel] = useState("Time") //stage 4

    //xử lý drop image
    const handleOnDrop = (acceptedFiles) => {
        setImageSelectedTimeshare([...imageSelectedTimeshare, ...acceptedFiles]);

        acceptedFiles.forEach((file) => {
            previewImage(file);
        });
    };

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
        acceptedFiles,
        fileRejections,
    } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.png']
        },
        onDrop: handleOnDrop
    });

    const previewImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const imageUrl = e.target.result;

            setImageSelectedTimeshare((prevFiles) =>
                prevFiles.map((prevFile) =>
                    prevFile.name === file.name ? { ...prevFile, previewUrl: imageUrl } : prevFile
                )
            );
        };
    };

    const removeImage = (path) => {
        setImageSelectedTimeshare((prevFiles) => prevFiles.filter((file) => file.path !== path));
    };

    //luồng trong modal continue post
    const handleOpenModalContinuePost = () => {
        setOpenModalContinuePostState(true)
    }

    const [currentStage, setCurrentStage] = useState(1);

    const [stageEnabled, setStageEnabled] = useState({
        1: true,
        2: false,
        3: false,
        4: false
    });

    // xử lý luồng post timeshare
    const [openModalConfirmState, setOpenModalConfirmState] = useState(false)

    const dispatch = useDispatch();

    const handleOpenConfirmModal = () => {
        setOpenModalContinuePostState(false)
        setOpenModalConfirmState(true)
    }

    const handleCancelModalConfirm = () => {
        setOpenModalContinuePostState(true)
        setOpenModalConfirmState(false)
    }

    const handleConfirmPostTimeshare = () => {

    }

    return (
        <div className='post-timeshare-container__right webkit-scrollbar'>
            <div className='container'>
                <div className='section-form-note'>
                    <div className="post-title">
                        <h3>Đăng bán nhà đất với Timeshare</h3>
                        <img src='https://s3-cdn.rever.vn/p/v2.48.39/images/icon/home-listing.svg' />
                    </div>
                    <ul>
                        <li><p>Timeshare xin phép chỉ tiếp nhận nhà đất ký gửi từ khu vực <strong>TP. Hồ Chí Minh.</strong></p></li>
                        <li><p>Đây là dịch vụ đăng bán, Timeshare chỉ thu phí hoa hồng theo quy định khi giao dịch thành công.</p></li>
                    </ul>

                    <div className='divider'></div>

                </div>

                <div className="section-form">
                    <h2 className="form-title">Thông tin cơ bản</h2>

                    <div className="form-group">
                        <p className="mb-2">Nhu cầu của bạn là gì? <span className="text-danger">*</span></p>
                        <div className="row flex">
                            <div className="form-check">
                                <input id="service_type_sale" checked type="radio" name="service_type" className="radio" value="sale" />
                                <label htmlFor="service_type_sale">Cần bán</label>
                            </div>
                            <div className="form-check disabled" >
                                <input id="service_type_rent" type="radio" name="service_type" className="radio" value="rent" />
                                <label htmlFor="service_type_rent">Cần cho thuê</label>
                            </div>
                            <div className="form-check disabled">
                                <input id="service_type_sale_and_rent" type="radio" name="service_type" className="radio" value="sale_and_rent" />
                                <label htmlFor="service_type_sale_and_rent">Cần bán và cho thuê</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-md-6">
                            <div className="form-group-material dropdown select-type select-type">
                                <input readOnly="readonly" type="text" required="required" className="form-control" style={{ backgroundColor: 'white' }} />
                                <label >Loại hình nhà đất <span className="text-danger">*</span></label>
                                <select className="form-select">
                                    <option className="" value={"Căn hộ"}>Căn hộ</option>
                                    <option className="" value={"Nhà phố"}>Nhà phố</option>
                                    <option className="" value={"Đất nền"}>Đất nền</option>
                                    <option className="" value={"Chung cư"}>Chung cư</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6"><div className="form-group-material">
                            <input type="text" required="required" className="form-control" /> <label>Giá bán mong muốn <span className="text-danger">*</span></label>
                        </div>
                        </div>
                    </div> <div className="form-group">
                        <p className="mb-2">Tỉnh/Thành phố <span className="text-danger">*</span></p> <div className="row flex-column"><div className="form-check"><input id="city_Tp.Hồ Chí Minh" type="radio" className="radio" value="Tp.Hồ Chí Minh" />
                            <label htmlFor="city_Tp.Hồ Chí Minh">Tp.Hồ Chí Minh</label>
                        </div>
                        </div>
                    </div>
                    <div className="form-group-material mb-0">
                        <input type="text" required="required" className="form-control" />
                        <label>Địa chỉ <span className="text-danger">*</span></label>
                    </div>
                </div>

                <div className="section-form">
                    <h2 className="form-title">Thông tin Timeshare</h2>

                    <div className='d-flex flex-row gap-2'>
                        <div className="form-group-material mb-4" style={{ width: '70%' }}>
                            <input type="text" required="required" className="form-control" />
                            <label>Tên Timeshare<span className="text-danger">*</span></label>
                        </div>

                        <div className="form-group-material mb-4" style={{ width: '30%' }}>
                            <input type="text" required="required" className="form-control" />
                            <label>Tổng diện tích<span className="text-danger">*</span></label>
                            <p className='unit-area'>m&#178;</p>
                        </div>
                    </div>

                    <div className="form-group-material">
                        <textarea rows="3" required="required" className="form-control" spellCheck="false"></textarea>
                        <label>Mô tả Timeshare <span className="text-danger">*</span></label>
                    </div>
                    <div className="form-group">
                        <div className="d-flex justify-content-between mb-1">
                            <label htmlFor="" className="mb-0">Hình ảnh <span className="text-danger">*</span></label>
                        </div>

                        <label htmlFor="select_photos" className="photo-upload mb-2" {...getRootProps(isFocused, isDragAccept, isDragReject)}>
                            <img
                                src="https://s3-cdn.rever.vn/p/v2.48.39/images/icon/upload.svg"
                                title="Tải ảnh lên"
                                alt="timeshare"
                                style={{ cursor: 'pointer' }}
                            />
                            <h5 className="photo-upload-title">
                                Kéo thả hình ảnh nhà đất hoặc{" "}
                                <span className="label-file">
                                    bấm vào đây để tải lên

                                </span>
                            </h5>
                            <p>Yêu cầu tối thiểu 5 hình ảnh</p>
                        </label>

                    </div>
                    {imageSelectedTimeshare.length > 0 && (
                        <div className="form-group mb-0" >
                            <div className="photo-uploaded">
                                <h4>Ảnh đã tải</h4>

                                <ul className="list-photo">
                                    {imageSelectedTimeshare.map((file) => (
                                        <li key={file.path}>
                                            <div className='photo-item'>
                                                {file.previewUrl ? (
                                                    <img src={file.previewUrl} alt={file.path} />
                                                ) : (
                                                    <p>Loading...</p>
                                                )}
                                                <div className='delete-item'>
                                                    <MdDeleteOutline onClick={() => removeImage(file.path)} />
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {fileRejections.length > 0 && (
                        <div className="form-group mb-0" >
                            <div className="photo-uploaded">
                                <h4>File bị từ chối</h4>

                                <ul className="list-photo">
                                    {fileRejections.map((file, index) => (
                                        <li key={index}>
                                            <div className='photo-item'>
                                                <img src={file.previewUrl} alt={file.file.path} />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                <div className="section-form-footer">
                    <p>
                        Đăng kê với Timeshare để bán nhanh gấp 2 lần thị trường và tiết kiệm nhiều hơn với những dịch vụ đi kèm chất lượng cao. Đăng thông tin ngay, chúng tôi sẽ liên hệ tư vấn và hẹn gặp sau ít phút!
                    </p>
                    <button className='btn btn-danger' onClick={handleOpenModalContinuePost}>Tiếp tục</button>
                </div>

                {openModalContinuePostState
                    &&
                    <ModalContinuePostTimeshare
                        show={openModalContinuePostState}
                        handleCloseModalContinuePost={() => setOpenModalContinuePostState(false)}
                        handleOpenModalContinuePost={() => setOpenModalContinuePostState(true)}
                        currentStage={currentStage}
                        setCurrentStage={setCurrentStage}
                        stageEnabled={stageEnabled}
                        setStageEnabled={setStageEnabled}
                        selectedTimeshareStatus={selectedTimeshareStatus}
                        setSelectedTimeshareStatus={setSelectedTimeshareStatus}
                        selectedJuridicalFiles={selectedJuridicalFiles}
                        setSelectedJuridicalFiles={setSelectedJuridicalFiles}
                        anotherInfo={anotherInfo}
                        setAnotherInfo={setAnotherInfo}
                        priorityLevel={priorityLevel}
                        setPriorityLevel={setPriorityLevel}
                        openModalConfirm={openModalConfirmState}
                        handleCancelModalConfirm={handleCancelModalConfirm}
                        handleConfirmPostTimeshare={handleConfirmPostTimeshare}
                        handleOpenConfirmModal={handleOpenConfirmModal}
                    />
                }

                {openModalConfirmState && <ModalConfirm show={openModalConfirmState}
                    handleClose={handleCancelModalConfirm}
                    handleAccept={handleConfirmPostTimeshare}
                    title={"Xác nhận hành động"}
                    body={"Bạn có chắc chắn muốn đăng Timeshare này lên?"} />
                }
            </div>
        </div>
    )
}

export default PostForm