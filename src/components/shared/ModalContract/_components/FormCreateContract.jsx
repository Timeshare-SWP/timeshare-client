import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { MdDeleteOutline } from 'react-icons/md'
import { CiCirclePlus } from "react-icons/ci";
import DatePicker from 'react-datepicker';
import { MdOutlineDelete } from "react-icons/md";
import Hint from '../../Hint';
import { IoIosInformation } from 'react-icons/io';
import toast from 'react-hot-toast';

const FormCreateContract = (props) => {
    const {
        imagesContract, setImagesContract, imagesContractOrigin, setImagesContractOrigin,
        fileContract, setFileContract, fileContractOrigin, setFileContractOrigin,
        formErrors, setFormErrors, phases, setPhases, minDates, setMinDates,
        phaseError, setPhaseError } = props

    //xử lý phases

    const addPhase = () => {
        if (phases.length < 5) {
            const totalPercent = phases.reduce((acc, curr) => acc + parseFloat(curr.percent || 0), 0);
            if (totalPercent >= 100) {
                toast('Tổng phần trăm các giai đoạn đã vượt quá 100%', { icon: '⚠' });
                return;
            }

            const lastPhaseIndex = phases.length - 1;
            let newMinDate = new Date();
            if (lastPhaseIndex >= 0) {
                const lastPhaseDate = phases[lastPhaseIndex].deadline;
                if (lastPhaseDate instanceof Date && !isNaN(lastPhaseDate)) {
                    newMinDate = new Date(lastPhaseDate.getTime() + 86400000);
                }
            }

            setMinDates([...minDates, newMinDate]);
            setPhases([...phases, { deadline: "", percent: "" }]);
        } else {
            toast('Bạn đã đạt đến số lượng giai đoạn thanh toán tối đa (5) của một hợp đồng!', { icon: '⚠' })
        }
    };

    const handleDeadlineChange = (value, index) => {
        const newPhases = [...phases];
        newPhases[index].deadline = value;
        setPhases(newPhases);

        const lastPhaseIndex = index - 1;
        if (lastPhaseIndex >= 0) {
            const lastPhaseDate = newPhases[lastPhaseIndex].deadline;
            if (!(lastPhaseDate instanceof Date) || isNaN(lastPhaseDate)) {
                toast('Vui lòng chọn ngày cho giai đoạn trước đó trước khi chọn ngày cho giai đoạn hiện tại!', { icon: '⚠' });
                return;
            }
        }

        const newMinDates = [...minDates];
        newMinDates[index] = new Date(value.getTime() + 86400000);
        setMinDates(newMinDates);
    };

    const handlePercentChange = (value, index) => {
        setPhaseError(prevErrors => ({
            ...prevErrors,
            percent: ''
        }));
        let newValue = value.replace(/[^\d]/g, '');
    
        if (newValue === '0' || (newValue.length > 1 && newValue.charAt(0) === '0')) {
            newValue = ''; 
        }
        
        const limitedValue = isNaN(parseInt(newValue)) ? '' : Math.min(parseInt(newValue), 100);
    
        const newPhases = [...phases];
        newPhases[index].percent = limitedValue;
        setPhases(newPhases);
    };
    

    const removePhase = (index) => {
        if (phases.length > 1) {
            const newPhases = [...phases];
            newPhases.splice(index, 1);
            setPhases(newPhases);
        } else {
            toast('Bạn phải có ít nhất một giai đoạn thanh toán!', { icon: '⚠' })
        }
    };

    // xử lý ẢNH hợp đồng
    const handleOnDropImagesContract = (acceptedFiles) => {
        setImagesContractOrigin([...imagesContractOrigin, ...acceptedFiles])
        setImagesContract([...imagesContract, ...acceptedFiles]);

        acceptedFiles?.forEach((file) => {
            previewImage(file);
        });

        const isValidImage = [...imagesContract, ...acceptedFiles].length >= 1;

        if (isValidImage) {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                images_contract: false
            }));
        }
    };

    const previewImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const imageUrl = e.target.result;

            setImagesContract((prevFiles) =>
                prevFiles.map((prevFile) =>
                    prevFile.name === file.name ? { ...prevFile, previewUrl: imageUrl } : prevFile
                )
            );
        };
    };

    const {
        getRootProps: getRootPropsImagesContract,
        getInputProps: getInputPropsImagesContract,
        isFocused: isFocusedImagesContract,
        isDragAccept: isDragAcceptImagesContract,
        isDragReject: isDragRejectImagesContract,
        acceptedFiles: acceptedFilesImagesContract,
        fileRejections: fileRejectionsImagesContract,
    } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.png']
        },
        onDrop: handleOnDropImagesContract
    });

    const removeImagesContract = (path) => {
        setImagesContract((prevFiles) => prevFiles.filter((file) => file.path !== path));
        setImagesContractOrigin((prevFiles) => prevFiles.filter((file) => file.path !== path));
    };

    // xử lý FILE hợp đồng
    const handleOnDropFileContract = (acceptedFiles) => {
        setFileContractOrigin([...fileContractOrigin, ...acceptedFiles])
        setFileContract([...fileContract, ...acceptedFiles]);

        acceptedFiles?.forEach((file) => {
            previewFile(file);
        });

        const isValidFile = [...fileContract, ...acceptedFiles].length >= 1;

        if (isValidFile) {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                file_contract: false
            }));
        }
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const imageUrl = e.target.result;

            setFileContract((prevFiles) =>
                prevFiles.map((prevFile) =>
                    prevFile.name === file.name ? { ...prevFile, previewUrl: imageUrl } : prevFile
                )
            );
        };
    };

    const {
        getRootProps: getRootPropsFileContract,
        getInputProps: getInputPropsFileContract,
        isFocused: isFocusedFileContract,
        isDragAccept: isDragAcceptFileContract,
        isDragReject: isDragRejectFileContract,
        acceptedFiles: acceptedFilesFileContract,
        fileRejections: fileRejectionsFileContract,
    } = useDropzone({
        onDrop: handleOnDropFileContract
    });

    const removeFileContract = (path) => {
        setFileContract((prevFiles) => prevFiles.filter((file) => file.path !== path));
        setFileContractOrigin((prevFiles) => prevFiles.filter((file) => file.path !== path));
    };

    return (
        <div className='create-contract-container d-flex flex-column justify-content-center align-items-center'>
            <h4 className='title'>Giá thành theo từng giai đoạn và hợp đồng liên quan</h4>
            <p className='sub-title mt-2'>
                Bổ sung các thông tin cần thiết về timeshare của bạn
            </p>

            <div className='create-contract-content row'>
                <div className='section-form'>
                    <div className='d-flex flex-row align-items-center'>
                        <h2 className="form-title">
                            Các giai đoạn thanh toán
                        </h2>
                        <Hint content="Giai đoạn thanh toán phải ít nhất là 1 và nhiều nhất là 4">
                            <div className='d-flex justify-content-center align-items-center bg-body-secondary rounded-circle'
                                style={{
                                    cursor: "pointer", width: "15px", height: "15px",
                                    position: 'relative', top: '-15px'
                                }}>
                                <IoIosInformation className='text-black' />
                            </div>
                        </Hint>
                        <CiCirclePlus
                            style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                            onClick={addPhase}
                        />
                    </div>

                    <div className='phases-container'>
                        <div className='d-flex flex-column gap-3 justify-content-center align-items-center'>
                            {phases.map((phase, index) => (
                                <div className='phases-item d-flex flex-row gap-3 justify-content-center align-items-center' key={index}>
                                    <div>Giai đoạn thanh toán {index + 1}</div>

                                    <div className="form-group-material mb-0 year-select">
                                        <input type="text" required="required" className="form-control" />
                                        <label>Hạn thanh toán</label>
                                        <DatePicker
                                            showIcon
                                            selected={phase.deadline}
                                            onChange={(date) => handleDeadlineChange(date, index)}
                                            dateFormat="dd-MM-yyyy"
                                            minDate={minDates[index]}
                                        />
                                    </div>

                                    <div className="form-group-material">
                                        <input
                                            type="text"
                                            required="required"
                                            className="form-control"
                                            value={phase.percent}
                                            onChange={(e) => handlePercentChange(e.target.value, index)}
                                        />
                                        <label>Phần trăm cần thanh toán <span className="text-danger">*</span></label>
                                        <p className='unit-area'>%</p>
                                    </div>

                                    <div>
                                        <MdOutlineDelete
                                            style={{ cursor: 'pointer', width: '25px', height: '25px' }}
                                            onClick={() => removePhase(index)} />
                                    </div>
                                </div>
                            ))}

                            {phaseError.percent && <span className='error-message'>{phaseError.percent}</span>}

                        </div>
                    </div>
                </div>

                {/* xử lý ẢNH trên UI */}
                <div className='d-flex flex-row gap-2'>
                    <div className='section-form col-6'>
                        <h2 className="form-title">Hình ảnh về hợp đồng</h2>

                        <label htmlFor="select_photos"
                            className="photo-upload mb-2"
                            {...getRootPropsImagesContract(isFocusedImagesContract, isDragAcceptImagesContract, isDragRejectImagesContract)}>

                            <img
                                src="https://s3-cdn.rever.vn/p/v2.48.39/images/icon/upload.svg"
                                title="Tải ảnh lên"
                                alt="timeshare"
                                style={{ cursor: 'pointer' }}
                            />
                            <h5 className="photo-upload-title">
                                Kéo thả hình ảnh hợp đồng hoặc {" "}
                                <span className="label-file">
                                    bấm vào đây để tải lên
                                </span>
                            </h5>
                            <p>Yêu cầu tối thiểu 1 hình ảnh</p>
                        </label>

                        {imagesContract.length > 0 && (
                            <div className="form-group mb-0" >
                                <div className="photo-uploaded">
                                    <h4>Ảnh đã tải</h4>

                                    <ul className="list-photo">
                                        {imagesContract.map((file) => (
                                            <li key={file.path}>
                                                <div className='photo-item'>
                                                    {file.previewUrl ? (
                                                        <img src={file.previewUrl} alt={file.path} />
                                                    ) : (
                                                        <p>Loading...</p>
                                                    )}
                                                    <div className='delete-item'>
                                                        <MdDeleteOutline onClick={() => removeImagesContract(file.path)} />
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {fileRejectionsImagesContract.length > 0 && (
                            <div className="form-group mb-0" >
                                <div className="photo-uploaded">
                                    <h4>File bị từ chối</h4>

                                    <ul className="list-photo">
                                        {fileRejectionsImagesContract.map((file, index) => (
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

                        {formErrors.images_contract && <span className="error-message">Vui lòng chọn đủ ít nhất 1 tấm hình hợp đồng!</span>}

                    </div>

                    {/* xử lý File trên UI */}
                    <div className='section-form col-6'>
                        <h2 className="form-title">File tài liệu</h2>

                        <label htmlFor="select_floor_plan_photos"
                            className="photo-upload mb-2"
                            {...getRootPropsFileContract(isFocusedFileContract, isDragAcceptFileContract, isDragRejectFileContract)}
                        >
                            <img
                                src="https://s3-cdn.rever.vn/p/v2.48.39/images/icon/upload.svg"
                                title="Tải ảnh lên"
                                alt="timeshare"
                                style={{ cursor: 'pointer' }}
                            />
                            <h5 className="photo-upload-title">
                                Kéo thả file tài liệu hoặc{" "}
                                <span className="label-file">
                                    bấm vào đây để tải lên
                                </span>
                            </h5>
                            <p>Yêu cầu tối thiểu 1 file tài liệu</p>
                        </label>

                        {fileContract.length > 0 && (
                            <div className="form-group mb-0" >
                                <div className="photo-uploaded">
                                    <h4>File đã tải lên</h4>

                                    <ul className="list-photo">
                                        {fileContract.map((file) => (
                                            <li key={file.path}>
                                                <div className='photo-item'>
                                                    {file.previewUrl ? (
                                                        <img src={file.previewUrl} alt={file.path} />
                                                    ) : (
                                                        <p>Loading...</p>
                                                    )}
                                                    <div className='delete-item'>
                                                        <MdDeleteOutline onClick={() => removeFileContract(file.path)} />
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {fileRejectionsFileContract.length > 0 && (
                            <div className="photo-uploaded">
                                <h4>File bị từ chối</h4>
                                <ul className="list-photo">
                                    {fileRejectionsFileContract.map((file, index) => (
                                        <li key={index}>
                                            <div className='photo-item'>
                                                <img src={file.previewUrl} alt={file.file.path} />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {formErrors.file_contract && <span className="error-message">Vui lòng chọn đủ ít nhất 1 file về hợp đồng!</span>}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormCreateContract