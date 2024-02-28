import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdDeleteOutline } from "react-icons/md";
import ModalContinuePostTimeshare from '../ModalContinuePostTimeshare';
import { createTimeshare } from "../../../../../redux/features/timeshareSlice"
import ModalConfirm from "../../../../../components/shared/ModalConfirm"
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const PostForm = () => {

    const [openModalContinuePostState, setOpenModalContinuePostState] = useState(false);

    //xử lý dữ liệu trong post form
    const [formData, setFormData] = useState({
        timeshare_type: "Căn hộ",
        price: "",
        timeshare_address: "",
        timeshare_name: "",
        land_area: "",
        timeshare_description: "",
    });

    const [formErrors, setFormErrors] = useState({
        timeshare_type: false,
        price: false,
        timeshare_address: false,
        timeshare_name: false,
        land_area: false,
        timeshare_description: false,
    });

    const [formImageErrors, setFormImageErrors] = useState({
        general_timeshare_image: false,
        floor_plan_image: false
    })

    const validateForm = () => {
        let hasError = false;
        const newFormErrors = { ...formErrors };
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                newFormErrors[key] = true;
                hasError = true;
            } else {
                newFormErrors[key] = false;
            }
        });
        setFormErrors(newFormErrors);
        return !hasError;
    };

    const handleInputChange = (e, field) => {
        let value = e.target.value;
        let error = false;

        if (field === 'land_area' || field === 'price') {
            value = value.replace(/\D/g, '');
            if (parseInt(value) > 1000) {
                value = parseInt(value).toLocaleString();
            }
        }

        setFormData({
            ...formData,
            [field]: value
        });

        switch (field) {
            case 'timeshare_type':
                error = !value;
                break;
            case 'price':
                error = !value;
                break;
            case 'timeshare_address':
                error = !value;
                break;
            case 'timeshare_name':
                error = !value;
                break;
            case 'land_area':
                error = !value;
                break;
            case 'timeshare_description':
                error = !value;
                break;
            default:
                break;
        }

        setFormErrors({
            ...formErrors,
            [field]: error
        });
    };

    //quản lý lưu trữ giữa các stage
    const [selectedTimeshareStatus, setSelectedTimeshareStatus] = useState(null); //stage 1
    const [selectedJuridicalFiles, setSelectedJuridicalFiles] = useState([]); //stage 2
    const [anotherInfo, setAnotherInfo] = useState([]); //stage 3
    const [priorityLevel, setPriorityLevel] = useState("Time") //stage 4

    //xử lý ảnh timeshare
    const [imageSelectedTimeshare, setImageSelectedTimeshare] = useState([]);

    const handleOnDrop = (acceptedFiles) => {
        setImageSelectedTimeshare([...imageSelectedTimeshare, ...acceptedFiles]);

        acceptedFiles.forEach((file) => {
            previewImage(file);
        });

        const isValidImage = [...imageSelectedTimeshare, ...acceptedFiles].length >= 5;

        if (isValidImage) {
            setFormImageErrors(prevErrors => ({
                ...prevErrors,
                general_timeshare_image: false
            }));
        }
    };

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

    const removeGeneralImage = (path) => {
        setImageSelectedTimeshare((prevFiles) => prevFiles.filter((file) => file.path !== path));
    };

    //xử lý ảnh mặt bằng
    const [floorPlanImages, setFloorPlanImages] = useState([]);

    const handleOnDropFloorPlan = (acceptedFiles) => {
        setFloorPlanImages([...floorPlanImages, ...acceptedFiles]);

        acceptedFiles.forEach((file) => {
            previewFloorImage(file);
        });

        const isValidImage = [...floorPlanImages, ...acceptedFiles].length >= 1;

        if (isValidImage) {
            setFormImageErrors(prevErrors => ({
                ...prevErrors,
                floor_plan_image: false
            }));
        }
    };

    const previewFloorImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const imageUrl = e.target.result;

            setFloorPlanImages((prevFiles) =>
                prevFiles.map((prevFile) =>
                    prevFile.name === file.name ? { ...prevFile, previewUrl: imageUrl } : prevFile
                )
            );
        };
    };

    const {
        getRootProps: getRootPropsFloorPlan,
        getInputProps: getInputPropsFloorPlan,
        isFocused: isFocusedFloorPlan,
        isDragAccept: isDragAcceptFloorPlan,
        isDragReject: isDragRejectFloorPlan,
        acceptedFiles: acceptedFilesFloorPlan,
        fileRejections: fileRejectionsFloorPlan,
    } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.png']
        },
        onDrop: handleOnDropFloorPlan
    });

    const removeFloorImage = (path) => {
        setFloorPlanImages((prevFiles) => prevFiles.filter((file) => file.path !== path));
    };

    //luồng trong modal continue post
    const handleOpenModalContinuePost = () => {
        const isValidForm = validateForm();
        const isValidGeneralImage = imageSelectedTimeshare.length >= 5;
        const isValidFloorImage = floorPlanImages.length >= 1
        if (isValidForm && isValidGeneralImage && isValidFloorImage) {
            setOpenModalContinuePostState(true);
        } else {
            setFormImageErrors(prevErrors => ({
                ...prevErrors,
                general_timeshare_image: !isValidGeneralImage
            }));
            setFormImageErrors(prevErrors => ({
                ...prevErrors,
                floor_plan_image: !isValidFloorImage
            }));
            toast.error("Có chỗ chưa được điền, vui lòng kiểm tra lại!")
        }
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
                        <img src='https://s3-cdn.rever.vn/p/v2.48.39/images/icon/home-listing.svg' alt="timeshare" />
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
                                <select
                                    className="form-select"
                                    value={formData.timeshare_type}
                                    onChange={(e) => handleInputChange(e, 'timeshare_type')}
                                >
                                    <option className="" value={"Căn hộ"}>Căn hộ</option>
                                    <option className="" value={"Nhà phố"}>Nhà phố</option>
                                    <option className="" value={"Đất nền"}>Đất nền</option>
                                    <option className="" value={"Chung cư"}>Chung cư</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group-material">
                                <input type="text" required="required" className="form-control"
                                    value={formData.price}
                                    onChange={(e) => handleInputChange(e, 'price')}
                                />
                                <label>Giá bán mong muốn <span className="text-danger">*</span></label>
                                <p className='unit-area'>/m&#178;</p>
                            </div>
                            {formErrors.price && <span className="error-message">Vui lòng nhập giá muốn bán!</span>}
                        </div>
                    </div> <div className="form-group">
                        <p className="mb-2 mt-3">Tỉnh/Thành phố <span className="text-danger">*</span></p> <div className="row flex-column">
                            <div className="form-check">
                                <input id="city_Tp.Hồ Chí Minh" type="radio" className="radio" value="Tp.Hồ Chí Minh" checked/>
                                <label htmlFor="city_Tp.Hồ Chí Minh">Tp.Hồ Chí Minh</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group-material mb-0">
                        <input type="text" required="required" className="form-control"
                            value={formData.timeshare_address}
                            onChange={(e) => handleInputChange(e, 'timeshare_address')}
                        />
                        <label>Địa chỉ <span className="text-danger">*</span></label>
                    </div>
                    {formErrors.timeshare_address && <span className="error-message">Vui lòng nhập địa chỉ!</span>}

                </div>

                <div className="section-form">
                    <h2 className="form-title">Thông tin Timeshare</h2>

                    <div className='d-flex flex-row gap-2'>
                        <div style={{ width: "70%" }}>
                            <div className="form-group-material" style={{ width: '100%' }}>
                                <input type="text" required="required" className="form-control"
                                    value={formData.timeshare_name}
                                    onChange={(e) => handleInputChange(e, 'timeshare_name')}
                                />
                                <label>Tên Timeshare<span className="text-danger">*</span></label>
                            </div>
                            {formErrors.timeshare_name && <span className="error-message">Vui lòng nhập tên timeshare!</span>}
                        </div>

                        <div style={{ width: "30%" }}>
                            <div className="form-group-material" style={{ width: '100%' }}>
                                <input type="text" required="required" className="form-control"
                                    value={formData.land_area}
                                    onChange={(e) => handleInputChange(e, 'land_area')}
                                />
                                <label>Tổng diện tích<span className="text-danger">*</span></label>
                                <p className='unit-area'>m&#178;</p>
                            </div>
                            {formErrors.land_area && <span className="error-message">Vui lòng điền diện tích!</span>}
                        </div>
                    </div>

                    <div className="form-group-material mt-4">
                        <textarea rows="3" required="required" className="form-control" spellCheck="false"
                            value={formData.timeshare_description}
                            onChange={(e) => handleInputChange(e, 'timeshare_description')}
                        />
                        <label>Mô tả Timeshare <span className="text-danger">*</span></label>
                    </div>
                    {formErrors.timeshare_description && <span className="error-message">Vui lòng mô tả timeshare!</span>}

                    {/* ảnh về timeshare */}
                    <div className="form-group mt-4">
                        <div className="d-flex justify-content-between mb-1">
                            <label htmlFor="" className="mb-0">Hình ảnh về timeshare<span className="text-danger">*</span></label>
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
                                                    <MdDeleteOutline onClick={() => removeGeneralImage(file.path)} />
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

                    {/* Báo lỗi không đủ hình ảnh timeshare */}
                    {formImageErrors.general_timeshare_image && <span className="error-message">Vui lòng chọn đủ ít nhất 5 tấm hình!</span>}


                    {/* ảnh về MẶT BẰNG timeshare*/}
                    <div className="form-group mt-4">
                        <div className="d-flex justify-content-between mb-1">
                            <label htmlFor="" className="mb-0">Ảnh về mặt bằng timeshare<span className="text-danger">*</span></label>
                        </div>
                        <label htmlFor="select_floor_plan_photos" className="photo-upload mb-2" {...getRootPropsFloorPlan(isFocusedFloorPlan, isDragAcceptFloorPlan, isDragRejectFloorPlan)}>
                            <input {...getInputPropsFloorPlan()} />
                            <img
                                src="https://s3-cdn.rever.vn/p/v2.48.39/images/icon/upload.svg"
                                title="Tải ảnh lên"
                                alt="timeshare"
                                style={{ cursor: 'pointer' }}
                            />
                            <h5 className="photo-upload-title">
                                Kéo thả hình ảnh mặt bằng timeshare hoặc{" "}
                                <span className="label-file">
                                    bấm vào đây để tải lên
                                </span>
                            </h5>
                            <p>Yêu cầu tối thiểu 1 hình ảnh</p>
                        </label>

                        {floorPlanImages.length > 0 && (
                            <div className="form-group mb-0" >
                                <div className="photo-uploaded">
                                    <h4>Ảnh mặt bằng đã tải</h4>

                                    <ul className="list-photo">
                                        {floorPlanImages.map((file) => (
                                            <li key={file.path}>
                                                <div className='photo-item'>
                                                    {file.previewUrl ? (
                                                        <img src={file.previewUrl} alt={file.path} />
                                                    ) : (
                                                        <p>Loading...</p>
                                                    )}
                                                    <div className='delete-item'>
                                                        <MdDeleteOutline onClick={() => removeFloorImage(file.path)} />
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {fileRejectionsFloorPlan.length > 0 && (
                            <div className="photo-uploaded">
                                <h4>File mặt bằng bị từ chối</h4>
                                <ul className="list-photo">
                                    {fileRejectionsFloorPlan.map((file, index) => (
                                        <li key={index}>
                                            <div className='photo-item'>
                                                <img src={file.previewUrl} alt={file.file.path} />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Báo lỗi không đủ hình ảnh mặt bằng timeshare */}
                        {formImageErrors.floor_plan_image && <span className="error-message">Vui lòng chọn đủ ít nhất 1 tấm hình về mặt bằng!</span>}

                    </div>

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