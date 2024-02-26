import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdDeleteOutline } from "react-icons/md";

const PostForm = () => {

    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleOnDrop = (acceptedFiles) => {
        setSelectedFiles([...selectedFiles, ...acceptedFiles]);

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

            setSelectedFiles((prevFiles) =>
                prevFiles.map((prevFile) =>
                    prevFile.name === file.name ? { ...prevFile, previewUrl: imageUrl } : prevFile
                )
            );
        };
    };

    const removeImage = (path) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((file) => file.path !== path));
    };

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
                        <li><p>Đây là dịch vụ ký gửi, Timeshare chỉ thu phí hoa hồng theo quy định khi giao dịch thành công.</p></li>
                    </ul>

                    <div className='divider'></div>

                </div>

                <div className="section-form">
                    <h2 className="form-title">Thông tin cơ bản</h2>

                    <div className="form-group">
                        <p className="mb-2">Nhu cầu của bạn là gì? <span className="text-danger">*</span></p>
                        <div className="row flex">
                            <div className="form-check">
                                <input id="service_type_sale" type="radio" name="service_type" className="radio" value="sale" />
                                <label htmlFor="service_type_sale">Cần bán</label>
                            </div>
                            <div className="form-check">
                                <input id="service_type_rent" type="radio" name="service_type" className="radio" value="rent" />
                                <label htmlFor="service_type_rent">Cần cho thuê</label>
                            </div>
                            <div className="form-check">
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
                    </div> <div className="form-group-material mb-0 is-invalid">
                        <input type="text" required="required" className="form-control" /> <label>Địa chỉ <span className="text-danger">*</span></label>
                    </div>
                </div>

                <div className="section-form">
                    <h2 className="form-title">Thông tin nhà đất</h2>
                    <div className="form-group-material is-invalid">
                        <textarea rows="3" required="required" className="form-control" spellCheck="false"></textarea>
                        <label>Mô tả nhà đất <span className="text-danger">*</span></label>
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
                    {selectedFiles.length > 0 && (
                        <div className="form-group mb-0" >
                            <div className="photo-uploaded">
                                <h4>Ảnh đã tải</h4>

                                <ul className="list-photo">
                                    {selectedFiles.map((file) => (
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
                    <button className='btn btn-danger'>Tiếp tục</button>
                </div>
            </div>
        </div>
    )
}

export default PostForm