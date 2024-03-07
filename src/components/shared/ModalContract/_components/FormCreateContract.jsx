import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { MdDeleteOutline } from 'react-icons/md'

const FormCreateContract = (props) => {
    const {
        imagesContract, setImagesContract, imagesContractOrigin, setImagesContractOrigin,
        fileContract, setFileContract, fileContractOrigin, setFileContractOrigin,
        formErrors, setFormErrors } = props

    const handleOnDropImagesContract = (acceptedFiles) => {
        setImagesContractOrigin([...imagesContractOrigin, ...acceptedFiles])
        setImagesContract([...imagesContract, ...acceptedFiles]);

        acceptedFiles.forEach((file) => {
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

    const handleOnDropFileContract = (acceptedFiles) => {
        setFileContractOrigin([...fileContractOrigin, ...acceptedFiles])
        setFileContract([...fileContract, ...acceptedFiles]);

        acceptedFiles.forEach((file) => {
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
                    <h2 className="form-title">Các giai đoạn thanh toán</h2>
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