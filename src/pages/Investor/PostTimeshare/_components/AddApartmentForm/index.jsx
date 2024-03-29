import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { MdDeleteOutline } from 'react-icons/md';

const AddApartmentForm = (props) => {
    const { sell_number, onChange, values, errors, apartmentImages, setApartmentImages, apartmentImagesOrigin,
        setApartmentImagesOrigin, errorApartmentImages, setErrorApartmentImages } = props

    const handleInputChange = (index, propertyName, value) => {
        if (propertyName === 'area') {
            value = value.replace(/\D/g, '');
            if (parseInt(value) > 1000) {
                value = parseInt(value).toLocaleString();
            }
        }
        const newData = { ...values[index], [propertyName]: value };
        onChange(index, newData);
    };

    // console.log("values", values)

    // console.log("apartmentImages", apartmentImages)

    const handleOnDropApartment = (acceptedFiles) => {
        setApartmentImagesOrigin([...apartmentImages, ...acceptedFiles]);
        setApartmentImages([...apartmentImages, ...acceptedFiles]);

        acceptedFiles?.forEach((file) => {
            previewApartmentImage(file);
        });

        const isValidImage = [...apartmentImages, ...acceptedFiles].length >= 5;
        if (isValidImage) {
            setErrorApartmentImages("");
        }
    };

    const previewApartmentImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const imageUrl = e.target.result;

            setApartmentImages((prevFiles) =>
                prevFiles.map((prevFile) =>
                    prevFile.name === file.name ? { ...prevFile, previewUrl: imageUrl, type: file.type } : prevFile
                )
            );
        };
    };

    const {
        getRootProps: getRootPropsApartment,
        getInputProps: getInputPropsApartment,
        isFocused: isFocusedApartment,
        isDragAccept: isDragAcceptApartment,
        isDragReject: isDragRejectApartment,
        acceptedFiles: acceptedFilesApartment,
        fileRejections: fileRejectionsApartment,
    } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.png']
        },
        onDrop: handleOnDropApartment,
    });


    const removeApartmentImage = (path) => {
        setApartmentImages((prevFiles) => prevFiles.filter((file) => file.path !== path));
        setApartmentImagesOrigin((prevFiles) => prevFiles.filter((file) => file.path !== path));
    };

    const renderApartmentInputs = () => {
        const inputs = [];
        for (let i = 0; i < sell_number; i++) {

            inputs.push(
                <>
                    <p className='fw-bold mt-4'>Thông tin căn hộ số {i + 1}</p>
                    <div className='d-flex flex-row gap-2'>
                        <div style={{ width: "33%" }}>
                            <div className="form-group-material" style={{ width: '100%' }}>
                                <input type="text" required="required" className="form-control"
                                    value={values[i]?.apartment_number || ''}
                                    onChange={(e) => handleInputChange(i, 'apartment_number', e.target.value)}
                                />
                                <label>Số căn hộ<span className="text-danger">*</span></label>
                            </div>
                            {errors[i]?.apartment_number && <span className="error-message">{errors[i].apartment_number}</span>}
                        </div>

                        <div style={{ width: "33%" }}>
                            <div className="form-group-material" style={{ width: '100%' }}>
                                <input type="text" required="required" className="form-control"
                                    value={values[i]?.floor_number || ''}
                                    onChange={(e) => handleInputChange(i, 'floor_number', e.target.value)}
                                />
                                <label>Tên tòa<span className="text-danger">*</span></label>
                            </div>
                            {errors[i]?.floor_number && <span className="error-message">{errors[i].floor_number}</span>}
                        </div>

                        <div style={{ width: "33%" }}>
                            <div className="form-group-material" style={{ width: '100%' }}>
                                <input type="text" required="required" className="form-control"
                                    value={values[i]?.area || ''}
                                    onChange={(e) => handleInputChange(i, 'area', e.target.value)}
                                />
                                <label >Diện tích căn hộ<span className="text-danger">*</span></label>
                                <p className='unit-area'>m&#178;</p>
                            </div>
                            {errors[i]?.area && <span className="error-message">{errors[i].area}</span>}
                        </div>
                    </div>

                    <div className='d-flex flex-row gap-2 mt-4'>
                        <div style={{ width: "50%" }}>
                            <div className="form-group-material" style={{ width: '100%' }}>
                                <input type="text" required="required" className="form-control"
                                    value={values[i]?.condition || ''}
                                    onChange={(e) => handleInputChange(i, 'condition', e.target.value)}
                                />
                                <label>Tình trạng căn hộ<span className="text-danger">*</span></label>
                            </div>
                            {errors[i]?.condition && <span className="error-message">{errors[i].condition}</span>}

                        </div>

                        <div style={{ width: "50%" }}>
                            <div className="form-group-material" style={{ width: '100%' }}>
                                <input type="text" required="required" className="form-control"
                                    value={values[i]?.interior || ''}
                                    onChange={(e) => handleInputChange(i, 'interior', e.target.value)}
                                />
                                <label>Nội thất<span className="text-danger">*</span></label>
                            </div>
                            {errors[i]?.interior && <span className="error-message">{errors[i].interior}</span>}
                        </div>
                    </div>

                    <div className="form-group-material mt-4">
                        <textarea rows="3" placeholder="Có 2 phòng khách, 2 phòng ngủ, 2 phòng vệ sinh, ..." required="required" className="form-control" spellCheck="false"
                            value={values[i]?.number_of_rooms || ''}
                            onChange={(e) => handleInputChange(i, 'number_of_rooms', e.target.value)}
                        />
                        <label>Mô tả các phòng <span className="text-danger">*</span></label>
                    </div>
                    {errors[i]?.number_of_rooms && <span className="error-message">{errors[i].number_of_rooms}</span>}

                    <div className="form-group-material mt-4">
                        <textarea rows="3" required="required" className="form-control" spellCheck="false"
                            value={values[i]?.note || ''}
                            onChange={(e) => handleInputChange(i, 'note', e.target.value)}
                        />
                        <label>Chú thích thêm <span className="text-danger">*</span></label>
                    </div>
                    {errors[i]?.note && <span className="error-message">{errors[i].note}</span>}

                    {/* ảnh về apartment */}
                    {errors[i]?.apartment_image && <span className="error-message">{errors[i].apartment_image}</span>}

                </>
            );
        }
        return inputs;
    };

    return (
        <div className="section-form">
            <h2 className="form-title">Ảnh mẫu chung về căn hộ</h2>
            <div className="form-group mt-4">

                <label htmlFor="select_photos" className="photo-upload mb-2" {...getRootPropsApartment(isFocusedApartment, isDragAcceptApartment, isDragRejectApartment)}>
                    <input {...getInputPropsApartment()} />
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

                {apartmentImages?.length > 0 && (
                    <div className="form-group mb-0" >
                        <div className="photo-uploaded">
                            <h4>Ảnh căn hộ đã tải</h4>

                            <ul className="list-photo">
                                {apartmentImages?.map((file) => (
                                    <li key={file.path}>
                                        <div className='photo-item'>
                                            {file.previewUrl ? (
                                                <img src={file.previewUrl} alt={file.path} />
                                            ) : (
                                                <p>Loading...</p>
                                            )}
                                            <div className='delete-item'>
                                                <MdDeleteOutline onClick={() => removeApartmentImage(file.path)} />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            {errorApartmentImages && <span className="error-message">{errorApartmentImages}</span>}

            <h2 className="form-title mt-5">Thông tin cụ thể của các căn hộ muốn đăng bán</h2>
            {renderApartmentInputs()}

        </div>
    )
}

export default AddApartmentForm