import React, { useEffect, useState } from 'react'
import GoogleMapLocation from './GoogleMapLocation';
import { convertToNumberFormat, generateRandomString, truncateString } from '../../../utils/handleFunction';
import { UTILITIES_LIST } from '../../../constants/utilities';
import toast from 'react-hot-toast';
import Select from 'react-select';
import { useDropzone } from 'react-dropzone';
import { MdDeleteOutline } from 'react-icons/md';
import { FiUploadCloud } from 'react-icons/fi';
import { updateTimeshare } from '../../../redux/features/timeshareSlice';
import { useDispatch } from 'react-redux';
import ModalConfirm from '../../../components/shared/ModalConfirm';
import SpinnerLoading from "../../../components/shared/SpinnerLoading"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../../utils/configFirebase';
import { getAllApartmentOfTimeshare } from '../../../redux/features/apartmentSlice';

const EditTimeshareMode = (props) => {
    const { item, handleEditModeChange, setTimeShareList, timeshareList, handleClose } = props

    const avatar_tmp = "https://cdn.popsww.com/blog/sites/2/2021/03/doraemon-tap-97.jpg"

    const [originData, setOriginData] = useState(item);
    const [isDataChanged, setIsDataChanged] = useState(false);
    const [selectedUtilities, setSelectedUtilities] = useState(originData.timeshare_utilities);

    const dispatch = useDispatch();

    useEffect(() => {
        const isChanged = JSON.stringify(originData) !== JSON.stringify(item);
        setIsDataChanged(isChanged);
    }, [originData, item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOriginData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUtilitiesChange = (selectedOptions) => {
        setSelectedUtilities(selectedOptions);
        setOriginData({
            ...originData,
            timeshare_utilities: selectedOptions.map(option => option.value),
        });
    };

    const renderStatus = (status, statuses) => {
        let classNames = "";
        if (status === statuses[0]) classNames = "button-yellow";
        else if (status === statuses[1]) classNames = "button-green";
        else classNames = "button-gray";

        return <div className={`btn ${classNames}`}>{status}</div>;
    }

    const scrollToId = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleLinkClick = (id) => {
        scrollToId(id);
    };

    const convert_utilities_list = UTILITIES_LIST.map(item => ({
        value: item.id,
        label: item.name,
    }));


    // xử lý drop hồ sơ
    const [selectedJuridicalFiles, setSelectedJuridicalFiles] = useState([]);
    const [juridicalFilesOrigin, setJuridicalFilesOrigin] = useState([]);

    const handleOnDrop = (acceptedFiles) => {
        setJuridicalFilesOrigin([...juridicalFilesOrigin, ...acceptedFiles])
        setSelectedJuridicalFiles([...selectedJuridicalFiles, ...acceptedFiles]);

        acceptedFiles?.forEach((file) => {
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

        onDrop: handleOnDrop
    });

    const previewImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const imageUrl = e.target.result;

            setSelectedJuridicalFiles((prevFiles) =>
                prevFiles.map((prevFile) =>
                    prevFile.name === file.name ? { ...prevFile, previewUrl: imageUrl } : prevFile
                )
            );
        };
    };

    const removeImage = (path) => {
        setSelectedJuridicalFiles((prevFiles) => prevFiles.filter((file) => file.path !== path));
    };

    // apartment
    // xử lý nếu timeshare là chung cư thì sẽ lấy apartment của timeshare đó
    const [apartmentData, setApartmentData] = useState([]);

    useEffect(() => {
        if (item?.timeshare_type === "Chung cư") {
            dispatch(getAllApartmentOfTimeshare(item?._id)).then((resGetApart) => {
                if (getAllApartmentOfTimeshare.fulfilled.match(resGetApart)) {
                    setApartmentData(resGetApart.payload.reverse());
                }
            })
        }
    }, [item?.timeshare_type])


    //  

    const [openModalConfirm, setOpenModalConfirm] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const handleCallApiUpdate = async () => {
        // xử lý đăng lên firebase trước
        setIsLoading(true)

        const uploadPromises = [];
        const uploadedFiles = [];

        const juridicalFilesDownload = juridicalFilesOrigin.map((file) => {
            const randomFileName = generateRandomString();
            const storageRef = ref(storage, `timeshare-images/${randomFileName}`);
            const uploadTask = uploadBytes(storageRef, file);
            uploadPromises.push(uploadTask);
            uploadedFiles.push({ path: `timeshare-images/${randomFileName}`, file });
            return uploadTask.then(() => getDownloadURL(storageRef));
        });

        await Promise.all(uploadPromises);

        const juridicalFilesURLs = await Promise.all(juridicalFilesDownload);

        const final_data = {
            ...originData,
            timeshare_related_link: juridicalFilesURLs,
        }

        console.log("final_data", final_data)

        const data = {
            timeshare_id: item?._id, dataBody: final_data
        }

        console.log("data", data)

        dispatch(updateTimeshare(data)).then((resUpdate) => {
            console.log("resUpdate", resUpdate)
            if (updateTimeshare.fulfilled.match(resUpdate)) {
                toast.success('Cập nhập thành công')
                setOpenModalConfirm(false)
                if (timeshareList) {
                    const indexToUpdate = timeshareList.findIndex(item => item._id === resUpdate.payload._id);

                    if (indexToUpdate !== -1) {
                        const updatedTimeshareList = [...timeshareList];
                        updatedTimeshareList[indexToUpdate] = resUpdate.payload;

                        setTimeShareList(updatedTimeshareList);
                    }

                    handleEditModeChange()
                    handleClose()
                }

            } else {
                toast.error(`${resUpdate.payload}`)
            }
            setIsLoading(false);
        })
    }

    return (
        <>
            <div className='col-8 container-left'>
                <div className='container-left__content'>
                    <div className='title d-flex align-items-center'>
                        <h3>{originData?.timeshare_name}</h3>
                        {renderStatus(originData?.sell_timeshare_status, ["Chưa được bán", "Đang mở bán", "Đã bán"])}
                        {renderStatus(originData?.timeshare_status, ["Sắp triển khai", "Đang triển khai", "Đã triển khai"])}

                    </div>

                    <div className='d-flex flex-row align-items-center mb-3 mt-2'>
                        <div className='location'>
                            <p>{originData?.timeshare_address}</p>
                        </div>

                    </div>

                    <div className='timeshare-img'>
                        {originData?.timeshare_image && originData?.timeshare_image.length > 0 && (
                            originData?.timeshare_image.map((image, index) => {
                                if (image.timeshare_img_type === "Ảnh timeshare") {
                                    return (
                                        <img
                                            key={index}
                                            src={image.timeshare_img_url}
                                            alt="timeshare"
                                            className={index === 0 ? "main-image" : "sub-image"}
                                        />
                                    );
                                }
                                return null;
                            })
                        )}
                    </div>

                    <div className="menu mt-4">
                        <p to="#intro" className="menu-item" onClick={() => handleLinkClick('intro')}>Giới thiệu</p>
                        <p to="#premises" className="menu-item" onClick={() => handleLinkClick('premises')}>Mặt bằng</p>
                        <p to="#utilities" className="menu-item" onClick={() => handleLinkClick('utilities')}>Tiện ích</p>
                        <p to="#selling-policy" className="menu-item" onClick={() => handleLinkClick('location')}>Vị trí</p>
                        <p to="#investor" className="menu-item" onClick={() => handleLinkClick('investor')}>Chủ đầu tư</p>
                    </div>

                    <hr></hr>

                    <div className='section-intro' id="intro">

                        <div className='row'>
                            <div className='col-6'>
                                <div className="info-container">
                                    <div className="info-item">
                                        <div className="info-label">Tên dự án:</div>
                                        <input
                                            type="text"
                                            name="timeshare_name"
                                            value={originData?.timeshare_name}
                                            onChange={handleChange}
                                            className='input-change'
                                        />
                                    </div>
                                    <div className="info-item">
                                        <div className="info-label">Chủ đầu tư:</div>
                                        <input
                                            type="text"
                                            name="investor_id.fullName"
                                            value={originData?.investor_id.fullName}
                                            className='input-change'
                                            disabled
                                        />
                                    </div>

                                    <div className="info-item">
                                        <div className="info-label">Hình thức sở hữu:</div>
                                        <input
                                            type="text"
                                            name="ownership"
                                            value={originData?.ownership}
                                            onChange={handleChange}
                                            className='input-change'
                                        />
                                    </div>

                                    <div className="info-item" style={{ position: 'relative' }}>
                                        <div className="info-label">Tổng diện tích:</div>
                                        <input
                                            type="number"
                                            name="land_area"
                                            value={originData?.land_area}
                                            onChange={handleChange}
                                            className='input-change'

                                        />
                                        <span style={{ position: 'absolute', right: '5px', top: '20px' }}>m&#178;</span>
                                    </div>


                                    <div className="info-item">
                                        <div className="info-label">Loại hình:</div>
                                        <input
                                            type="text"
                                            name="timeshare_type"
                                            value={originData?.timeshare_type}
                                            onChange={handleChange}
                                            className='input-change'
                                            disabled
                                        />
                                    </div>

                                </div>
                            </div>

                            <div className='col-6'>
                                <div className="info-container">
                                    <div className="info-item">
                                        <div className="info-label">Hướng nhà:</div>
                                        <input
                                            type="text"
                                            name="apartment_direction"
                                            value={originData?.apartment_direction}
                                            onChange={handleChange}
                                            className='input-change'
                                        />
                                    </div>

                                    <div className="info-item" style={{ position: 'relative' }}>
                                        <div className="info-label">Khoảng giá:</div>
                                        <div className='d-flex align-items-center justify-content-end'>
                                            <input
                                                type="text"
                                                name="price"
                                                value={originData?.price}
                                                onChange={handleChange}
                                                className='input-change'
                                                style={{ width: "40%" }}
                                            />
                                            -
                                            <input
                                                type="text"
                                                name="price"
                                                value={originData?.max_price}
                                                onChange={handleChange}
                                                className='input-change'
                                                style={{ width: "40%" }}
                                            />
                                        </div>
                                    </div>

                                    <div className="info-item">
                                        <div className="info-label">Quy mô:</div>
                                        <input
                                            type="text"
                                            name="timeshare_scale"
                                            value={originData?.timeshare_scale}
                                            onChange={handleChange}
                                            className='input-change'
                                        />
                                    </div>
                                    <div className="info-item">
                                        <div className="info-label">Năm khởi công:</div>
                                        <input
                                            type="month"
                                            name="year_of_commencement"
                                            value={originData?.year_of_commencement}
                                            onChange={handleChange}
                                            className='input-change'
                                        />
                                    </div>
                                    <div className="info-item">
                                        <div className="info-label">Năm bàn giao:</div>
                                        <input
                                            type="month"
                                            name="year_of_handover"
                                            value={originData?.year_of_handover}
                                            min={originData?.year_of_commencement}
                                            onChange={handleChange}
                                            className='input-change'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='my-3'>
                            <h3 className='mb-3'>Hồ sơ pháp lý</h3>

                            {item?.timeshare_related_link && item.timeshare_related_link.length > 0 && (
                                <button onClick={() => { }} className='btn btn-danger'>
                                    Xem lại hồ sơ
                                </button>
                            )}


                            <div className='update-juridical-files'>
                                <label style={{ cursor: 'pointer' }}
                                    htmlFor="select_photos"
                                    className="photo-upload mb-2"
                                    {...getRootProps(isFocused, isDragAccept, isDragReject)}
                                >
                                    <FiUploadCloud />

                                    <h5 className="photo-upload-title">
                                        Chọn hoặc kéo thả tệp tại đây{" "}
                                    </h5>
                                    <p>JPG, PNG hoặc PDF, tệp có dung lượng không trên 10MB</p>
                                </label>

                                {selectedJuridicalFiles?.length > 0 && (
                                    <div className="form-group mb-0 mt-4" >
                                        <div className="photo-uploaded">
                                            <h4 className='fw-bold text-center'>Các file đã đăng</h4>

                                            <ul className="list-photo">
                                                {selectedJuridicalFiles?.map((file) => (
                                                    <li key={file.path}>
                                                        <div className='photo-item'>
                                                            {file.previewUrl ? (
                                                                <p>{truncateString(file.path, 20)}</p>
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
                            </div>


                        </div>

                    </div>

                    <hr></hr>

                    <div className='section-premises' id="premises">
                        <h3 className='mb-3'>Mặt bằng dự án</h3>
                        {originData?.timeshare_image && originData?.timeshare_image.length > 0 ? (
                            originData?.timeshare_image.map((image, index) => {
                                if (image.timeshare_img_type === "Ảnh mặt bằng") {
                                    return (
                                        <img
                                            key={index}
                                            src={image.timeshare_img_url}
                                            alt="timeshare"
                                            className='mb-2'
                                        />
                                    );
                                }
                                return null;
                            })
                        ) : (
                            <div className="utility-originData">
                                <div className="utility-name fw-bold">Đang cập nhập</div>
                            </div>
                        )}
                    </div>

                    <hr></hr>

                    <div className='section-utilities' id="utilities">
                        <h3 className=''>Tiện ích</h3>

                        <div className="form-group-material dropdown select-type select-type mt-2">
                            <Select
                                isMulti
                                options={convert_utilities_list}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                value={selectedUtilities}
                                onChange={handleUtilitiesChange}
                            />

                        </div>

                    </div>

                    {item?.timeshare_type === "Chung cư" && <>
                        <hr></hr>
                        <div className='section-investor' id="investor">
                            <h3 className='mb-3'>Thông tin của các căn hộ sẵn có</h3>


                            <div >
                                <div>
                                    <h5 className='mb-2 fw-bold'>Hình ảnh chung</h5>

                                    <div className='list-img-apartment'>
                                        {apartmentData[0]?.apartment_image?.map((obj, index) => (
                                            <div className='img-container'>
                                                <img src={obj} alt={index} key={index} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className='mt-4'>
                                    <h5 className='mb-2 fw-bold'>Thông tin riêng từng căn hộ </h5>
                                    <div className='apartment-info'>
                                        {apartmentData.map((obj, index) => (
                                            <>
                                                <p className='fw-bold mt-2' style={{ fontSize: '18px' }}>Căn hộ số {index + 1}</p>

                                                <div className='row'>
                                                    <div className='col-6'>
                                                        <div className="info-container">
                                                            <div className="info-item">
                                                                <div className="info-label">Tên căn hộ:</div>
                                                                <div className="info-value">{obj?.apartment_number}</div>
                                                            </div>

                                                            <div className="info-item">
                                                                <div className="info-label">Toà:</div>
                                                                <div className="info-value">{obj?.floor_number}</div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div className='col-6'>
                                                        <div className="info-container">
                                                            <div className="info-item">
                                                                <div className="info-label">Diện tích:</div>
                                                                <div className="info-value">{convertToNumberFormat(obj?.area)} m&#178;</div>
                                                            </div>

                                                            <div className="info-item">
                                                                <div className="info-label">Tình trạng giữ chỗ:</div>
                                                                <div className="info-value">{obj?.is_selected ? 'Đã có người đặt' : 'Còn slot'}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="info-item" style={{ padding: "13px 0px", borderBottom: '1px solid #cccccc' }}>
                                                        <div className="info-label">Tình trạng:</div>
                                                        <div className="info-value" style={{ fontSize: '15px' }}>{obj?.condition}</div>
                                                    </div>

                                                    <div className="info-item" style={{ padding: "13px 0px", borderBottom: '1px solid #cccccc' }}>
                                                        <div className="info-label">Nội thất:</div>
                                                        <div className="info-value">{obj?.interior}</div>
                                                    </div>

                                                    <div className="info-item" style={{ padding: "13px 0px", borderBottom: '1px solid #cccccc' }}>
                                                        <div className="info-label">Phòng ấp:</div>
                                                        <div className="info-value">{obj?.number_of_rooms}</div>
                                                    </div>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </>}

                    <div className='section-investor' id="investor">
                        <h3 className='mb-3'>Chủ đầu tư</h3>

                        <div className='mb-5'>
                            <div
                                className="row"
                            >
                                <div className='col-4 d-flex justify-content-center align-items-center'>
                                    <img src={`${originData?.investor_id?.avatar_url
                                        ? originData?.investor_id?.avatar_url
                                        : avatar_tmp}`} className='img-fluid rounded-start'
                                        alt="timeshare" />
                                </div>

                                <div className='col-8'>

                                    <h4 >{originData?.investor_id?.fullName}</h4>

                                    <p className='description my-2'>Là bộ phận phát triển bất động sản của tập đoàn Gamuda Berhad - một trong những tập đoàn phát triển cơ sở hạ tầng và bất động sản hàng đầu tại Malaysia</p>

                                    <div className='btn btn-outline-secondary'>Xem chi tiết</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {openModalConfirm
                &&
                <ModalConfirm
                    show={openModalConfirm}
                    handleClose={() => setOpenModalConfirm(false)}
                    handleAccept={handleCallApiUpdate}
                    body={
                        <div className="confirmation-message">
                            <p className="warning-text">P/s: </p>
                            <p className="warning-text">Khi bạn thay đổi thì sẽ phải chờ để admin xác nhận lại!</p>
                            <p>Bạn có chắc vẫn muốn tiếp tục thay đổi timeshare này?</p>
                        </div>
                    }
                />
            }

            {isDataChanged && <div className='btn-confirm-change' onClick={() => setOpenModalConfirm(true)}>Xác nhận thay đổi</div>}

            {isLoading && <SpinnerLoading />}
        </>
    )
}

export default EditTimeshareMode