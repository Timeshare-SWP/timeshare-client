import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdDeleteOutline } from "react-icons/md";
import ModalContinuePostTimeshare from '../ModalContinuePostTimeshare';
import { createTimeshare, createTimeshareImage } from "../../../../../redux/features/timeshareSlice"
import ModalConfirm from "../../../../../components/shared/ModalConfirm"
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../../../../utils/configFirebase';
import { generateRandomString, removeCommas } from '../../../../../utils/handleFunction';
import SpinnerLoading from "../../../../../components/shared/SpinnerLoading"
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slider'
import Hint from '../../../../../components/shared/Hint'
import { IoIosInformation } from 'react-icons/io';

const PostForm = () => {

    const [openModalContinuePostState, setOpenModalContinuePostState] = useState(false);
    const navigate = useNavigate();
    //xử lý dữ liệu trong post form
    const [formData, setFormData] = useState({
        timeshare_type: "Căn hộ",
        sell_number: "",
        timeshare_address: "",
        timeshare_name: "",
        land_area: "",
        timeshare_description: "",
    });

    const [formErrors, setFormErrors] = useState({
        timeshare_type: false,
        sell_number: false,
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

        if (field === 'land_area' || field === 'sell_number') {
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
            case 'sell_number':
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
    const [juridicalFilesOrigin, setJuridicalFilesOrigin] = useState([]) //stage 2, timeshare_related_link
    const [anotherInfo, setAnotherInfo] = useState({
        real_estate_code: "",
        ownership: "",
        timeshare_scale: "",
        timeshare_utilities: [],
        apartment_direction: "",
        year_of_commencement: null,
        year_of_handover: null,
    }); //stage 3
    const [priorityLevel, setPriorityLevel] = useState("Time") //stage 4
    const [depositPrice, setDepositPrice] = useState('') //stage 5
    const [errorDepositPrice, setErrorDepositPice] = useState('')

    // console.log('juridicalFilesOrigin', juridicalFilesOrigin)

    //xử lý ảnh timeshare
    const [imageSelectedTimeshare, setImageSelectedTimeshare] = useState([]); //list ảnh này là để preview trên UI
    const [imageSelectedTimeshareOrigin, setImageSelectedTimeshareOrigin] = useState([]) //list ảnh này là file gốc khi vừa mới drop lên

    const handleOnDrop = (acceptedFiles) => {
        setImageSelectedTimeshareOrigin([...imageSelectedTimeshareOrigin, ...acceptedFiles])
        setImageSelectedTimeshare([...imageSelectedTimeshare, ...acceptedFiles]);

        acceptedFiles?.forEach((file) => {
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
        setImageSelectedTimeshareOrigin((prevFiles) => prevFiles.filter((file) => file.path !== path));
    };

    //xử lý ảnh mặt bằng
    const [floorPlanImages, setFloorPlanImages] = useState([]); //list ảnh này là để preview trên UI
    const [floorPlanImagesOrigin, setFloorPlanImagesOrigin] = useState([]) //list ảnh này là file gốc khi vừa mới drop lên

    const handleOnDropFloorPlan = (acceptedFiles) => {
        setFloorPlanImagesOrigin([...floorPlanImages, ...acceptedFiles]);
        setFloorPlanImages([...floorPlanImages, ...acceptedFiles]);

        acceptedFiles?.forEach((file) => {
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
                    prevFile.name === file.name ? { ...prevFile, previewUrl: imageUrl, type: file.type } : prevFile
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
        setFloorPlanImagesOrigin((prevFiles) => prevFiles.filter((file) => file.path !== path));
    };

    //luồng trong modal continue post

    const errorRefs = {
        sellNumberError: useRef(null),
        rangePriceError: useRef(null),
        timeshareAddressError: useRef(null),
        timeshareNameError: useRef(null),
        areaLandError: useRef(null),
        timeshareDescriptionError: useRef(null),
        imageTimeshareError: useRef(null),
        imageFloorError: useRef(null)
    };

    const scrollToError = () => {
        let highestErrorTop = Number.MAX_VALUE;
        let errorElementToScroll = null;

        for (const key in errorRefs) {
            const errorRef = errorRefs[key];
            if (errorRef.current) {
                const errorTop = errorRef.current.getBoundingClientRect().top;
                if (errorTop < highestErrorTop) {
                    highestErrorTop = errorTop;
                    errorElementToScroll = errorRef.current;
                }
            }
        }

        if (errorElementToScroll) {
            errorElementToScroll.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleOpenModalContinuePost = () => {
        const isValidForm = validateForm();
        const isValidGeneralImage = imageSelectedTimeshare.length >= 5;
        const isValidFloorImage = floorPlanImages.length >= 1

        //check valid range price
        const minPriceFinal = rangePrice[0] * 1000;
        const maxPriceFinal = rangePrice[1] * 1000;

        const priceDifference = maxPriceFinal - minPriceFinal;
        const minPriceThreshold = minPriceFinal * 0.2;
        const maxPriceThreshold = minPriceFinal * 0.4;

        const isPriceDifferenceValid = priceDifference <= maxPriceThreshold && priceDifference >= minPriceThreshold;

        if (!isPriceDifferenceValid) {
            setErrorRangePrice('Chênh lệch giá không thỏa mãn điều kiện! Không được quá 40% và không nhỏ hơn 20% so với mức hạn dưới của khoảng giá')
        }

        if (isValidForm && isValidGeneralImage && isValidFloorImage && isPriceDifferenceValid) {
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

        scrollToError();
    }

    const [currentStage, setCurrentStage] = useState(1);

    const [stageEnabled, setStageEnabled] = useState({
        1: true,
        2: false,
        3: false,
        4: false,
        5: false
    });

    // xử lý luồng post timeshare
    const [openModalConfirmState, setOpenModalConfirmState] = useState(false)

    const dispatch = useDispatch();

    const handleOpenConfirmModal = () => {

        if (depositPrice === 0 || depositPrice === '') {
            setErrorDepositPice('Vui lòng nhập số tiền đặt cọc bạn muốn')
            return;
        }

        if (currentStage === 5 && (parseInt(removeCommas(depositPrice)) < (rangePrice[0] * 1000 * 0.1) || parseInt(removeCommas(depositPrice)) > rangePrice[1] * 1000 * 0.2)) {
            setErrorDepositPice('Giá tiền đặt cọc không thỏa mãn yêu cầu!')
            return;
        }

        // const depositPercentage = parseFloat(removeCommas(depositPrice)) / parseFloat(removeCommas(formData.price)) * 100;

        // if (depositPercentage < 5 || depositPercentage > 10) {
        //     setErrorDepositPice('Số tiền đặt cọc phải nằm trong khoảng từ 5% đến 10% của giá tiền gốc');
        //     return;
        // }
        setOpenModalContinuePostState(false)
        setOpenModalConfirmState(true)
    }

    const handleCancelModalConfirm = () => {
        setOpenModalContinuePostState(true)
        setOpenModalConfirmState(false)
    }

    // gọi api xử lý

    const [isLoading, setIsLoading] = useState(false)
    const handleConfirmPostTimeshare = async () => {

        //xử lý ảnh up lên firebase
        setIsLoading(true);
        toast('Quá trình diễn ra sẽ hơi lâu, vui lòng chờ trong giây lát!', { icon: '⚠' })

        const uploadPromises = [];
        const uploadedFiles = [];

        // Tải lên ảnh từ imageSelectedTimeshareOrigin
        const imageSelectedTimeshareDownload = imageSelectedTimeshareOrigin.map((file) => {
            const randomFileName = generateRandomString();
            const storageRef = ref(storage, `timeshare-images/${randomFileName}`);
            const uploadTask = uploadBytes(storageRef, file);
            uploadPromises.push(uploadTask);
            uploadedFiles.push({ path: `timeshare-images/${randomFileName}`, file });
            return uploadTask.then(() => getDownloadURL(storageRef));
        });

        // Tải lên ảnh từ floorPlanImagesOrigin
        const floorPlanImagesDownload = floorPlanImagesOrigin.map((file) => {
            const randomFileName = generateRandomString();
            const storageRef = ref(storage, `timeshare-images/${randomFileName}`);
            const uploadTask = uploadBytes(storageRef, file);
            uploadPromises.push(uploadTask);
            uploadedFiles.push({ path: `timeshare-images/${randomFileName}`, file });
            return uploadTask.then(() => getDownloadURL(storageRef));
        });

        //Tải file từ juridicalFilesOrigin
        const juridicalFilesDownload = juridicalFilesOrigin.map((file) => {
            const randomFileName = generateRandomString();
            const storageRef = ref(storage, `timeshare-images/${randomFileName}`);
            const uploadTask = uploadBytes(storageRef, file);
            uploadPromises.push(uploadTask);
            uploadedFiles.push({ path: `timeshare-images/${randomFileName}`, file });
            return uploadTask.then(() => getDownloadURL(storageRef));
        });


        await Promise.all(uploadPromises);

        const imageSelectedTimeshareURLs = await Promise.all(imageSelectedTimeshareDownload);
        const floorPlanImagesURLs = await Promise.all(floorPlanImagesDownload);
        const juridicalFilesURLs = await Promise.all(juridicalFilesDownload);

        // Tạo mảng compileAllImages
        const compileAllImages = [
            ...imageSelectedTimeshareURLs.map((url) => ({ timeshare_img_type: 'Ảnh timeshare', timeshare_img_url: url })),
            ...floorPlanImagesURLs.map((url) => ({ timeshare_img_type: 'Ảnh mặt bằng', timeshare_img_url: url })),
        ];

        let timeshare_image = [];

        const dispatchPromises = compileAllImages.map((data) => {
            return dispatch(createTimeshareImage(data)).then((result) => {
                if (createTimeshareImage.fulfilled.match(result)) {
                    timeshare_image.push(result.payload._id);
                }
            });
        });

        Promise.all(dispatchPromises).then(() => {

            const data = {
                ...formData, ...anotherInfo,
                sell_number: removeCommas(formData.sell_number),
                land_area: removeCommas(formData.land_area),
                timeshare_utilities: anotherInfo.timeshare_utilities.map(item => item.value),
                year_of_commencement: anotherInfo?.year_of_commencement ? anotherInfo?.year_of_commencement.getFullYear() : null,
                year_of_handover: anotherInfo?.year_of_handover ? anotherInfo?.year_of_handover.getFullYear() : null,
                timeshare_image,
                priority_level: priorityLevel,
                timeshare_status: selectedTimeshareStatus.name_status,
                timeshare_related_link: juridicalFilesURLs,
                deposit_price: removeCommas(depositPrice),
                price: rangePrice[0] * 1000,
                max_price: rangePrice[1] * 1000,
            }

            dispatch(createTimeshare(data)).then((result) => {
                if (createTimeshare.fulfilled.match(result)) {
                    toast.success('Đăng timeshare thành công!')
                    navigate('/personal-projects')
                    setFormData("");
                    setAnotherInfo("");
                    setSelectedTimeshareStatus("");
                    setSelectedJuridicalFiles("");
                    setPriorityLevel("");
                    setImageSelectedTimeshare("");
                    setImageSelectedTimeshareOrigin("");
                    setFloorPlanImages("");
                    setFloorPlanImagesOrigin("");
                } else {
                    toast.error(`${result.payload}`)
                }
            })

            setIsLoading(false);

        });
    }

    const SUB_MIN = 100;
    const SUB_MAX = 2000000;
    const [minPriceRange, setMinPriceRange] = useState(SUB_MIN);
    const [maxPriceRange, setMaxPriceRange] = useState(SUB_MAX);
    const [rangePrice, setRangePrice] = useState([minPriceRange, maxPriceRange]);
    const [errorRangePrice, setErrorRangePrice] = useState(false)

    const handleChangeRangePrice = (rangePrice) => {
        setErrorRangePrice('');

        setMinPriceRange(rangePrice[0]);
        setMaxPriceRange(rangePrice[1]);
        setRangePrice(rangePrice);
    };

    const handleChangePriceSelect = (e, type) => {
        setErrorRangePrice('')

        let newValue = e.target.value.trim();
        newValue = newValue !== '' ? parseInt(newValue.replace(/\D/g, '')) : (type === 'min' ? SUB_MIN : SUB_MAX);

        if (type === 'min') {
            if (newValue > maxPriceRange) {
                newValue = maxPriceRange;
            }

            setMinPriceRange(newValue);
            setRangePrice([newValue, maxPriceRange]);
        } else if (type === 'max') {
            if (newValue > SUB_MAX) {
                newValue = SUB_MAX;
            }
            setMaxPriceRange(newValue);
            setRangePrice([minPriceRange, newValue]);
        }
    }

    const handlePriceInputBlur = (type) => {
        if (type === 'min' && minPriceRange < SUB_MIN) {
            setMinPriceRange(SUB_MIN);
            setRangePrice([SUB_MIN, maxPriceRange]);
        }
    };

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
                                <input id="service_type_sale" defaultChecked type="radio" name="service_type" className="radio" value="sale" />
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
                                    value={formData.sell_number}
                                    onChange={(e) => handleInputChange(e, 'sell_number')}
                                />
                                <label ref={errorRefs.sellNumberError} >Số lượng bán <span className="text-danger">*</span></label>
                                {/* <p className='unit-area'>/m&#178;</p> */}
                            </div>
                            {formErrors.sell_number && <span className="error-message">Vui lòng nhập số lượng muốn bán!</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <p ref={errorRefs.rangePriceError}
                            className="mb-2 mt-3" style={{ position: 'relative' }}
                        >
                            Mức giá mong muốn

                            <span className="text-danger"> *</span>

                            <Hint content="Chênh lệch giá phải không quá 40% và không nhỏ hơn 20% so với mức hạn dưới của khoảng giá">
                                <div className='d-flex justify-content-center align-items-center bg-body-secondary rounded-circle'
                                    style={{
                                        cursor: "pointer", width: "15px", height: "15px",
                                        position: 'absolute', top: '-6px', left: "140px"
                                    }}>
                                    <IoIosInformation className='text-black' />
                                </div>
                            </Hint>
                        </p>

                        <div className="row flex-column">
                            <div className="form-check-range">
                                <Slider
                                    className='slider-range'
                                    value={rangePrice}
                                    min={SUB_MIN}
                                    max={SUB_MAX}
                                    onChange={handleChangeRangePrice}
                                />

                                <div className='range-price'>
                                    <div className='line-break'></div>
                                    <span className="range-left">
                                        <input type="tel"
                                            name="price-min-value"
                                            value={minPriceRange.toLocaleString('vi-VN')}
                                            onChange={(e) => handleChangePriceSelect(e, 'min')}
                                            onBlur={() => handlePriceInputBlur('min')}
                                        />
                                        <label className="place-holder">.000đ</label>
                                        <p className='unit-area'>/m&#178;</p>
                                    </span>

                                    <span className="range-right">
                                        <input type="tel"
                                            name="price-max-value"
                                            value={maxPriceRange.toLocaleString('vi-VN')}
                                            onChange={(e) => handleChangePriceSelect(e, 'max')}
                                            onBlur={() => handlePriceInputBlur('max')}
                                        />
                                        <label className="place-holder">.000đ</label>
                                        <p className='unit-area'>/m&#178;</p>
                                    </span>
                                </div>
                            </div>

                            {errorRangePrice && <span className="error-message">{errorRangePrice}</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <p className="mb-2 mt-3">Tỉnh/Thành phố <span className="text-danger">*</span></p> <div className="row flex-column">
                            <div className="form-check">
                                <input id="city_Tp.Hồ Chí Minh" type="radio" className="radio" value="Tp.Hồ Chí Minh" defaultChecked />
                                <label htmlFor="city_Tp.Hồ Chí Minh">Tp.Hồ Chí Minh</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group-material mb-0">
                        <input type="text" required="required" className="form-control"
                            value={formData.timeshare_address}
                            onChange={(e) => handleInputChange(e, 'timeshare_address')}
                        />
                        <label ref={errorRefs.timeshareAddressError}>Địa chỉ <span className="text-danger">*</span></label>
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
                                <label ref={errorRefs.timeshareNameError}>Tên Timeshare<span className="text-danger">*</span></label>
                            </div>
                            {formErrors.timeshare_name && <span className="error-message">Vui lòng nhập tên timeshare!</span>}
                        </div>

                        <div style={{ width: "30%" }}>
                            <div className="form-group-material" style={{ width: '100%' }}>
                                <input type="text" required="required" className="form-control"
                                    value={formData.land_area}
                                    onChange={(e) => handleInputChange(e, 'land_area')}
                                />
                                <label ref={errorRefs.areaLandError}>Tổng diện tích<span className="text-danger">*</span></label>
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
                        <label ref={errorRefs.timeshareDescriptionError}>Mô tả Timeshare <span className="text-danger">*</span></label>
                    </div>
                    {formErrors.timeshare_description && <span className="error-message">Vui lòng mô tả timeshare!</span>}

                    {/* ảnh về timeshare */}
                    <div className="form-group mt-4">
                        <div className="d-flex justify-content-between mb-1">
                            <label htmlFor="" className="mb-0"
                                ref={errorRefs.imageTimeshareError}
                            >
                                Hình ảnh về timeshare
                                <span className="text-danger">*</span>
                            </label>
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
                            <label htmlFor="" className="mb-0"
                                ref={errorRefs.imageFloorError}
                            >
                                Ảnh về mặt bằng timeshare<span className="text-danger">*</span>
                            </label>
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
                        juridicalFilesOrigin={juridicalFilesOrigin}
                        setJuridicalFilesOrigin={setJuridicalFilesOrigin}
                        anotherInfo={anotherInfo}
                        setAnotherInfo={setAnotherInfo}
                        priorityLevel={priorityLevel}
                        setPriorityLevel={setPriorityLevel}
                        openModalConfirm={openModalConfirmState}
                        handleCancelModalConfirm={handleCancelModalConfirm}
                        handleConfirmPostTimeshare={handleConfirmPostTimeshare}
                        handleOpenConfirmModal={handleOpenConfirmModal}
                        depositPrice={depositPrice}
                        setDepositPrice={setDepositPrice}
                        errorDepositPrice={errorDepositPrice}
                        setErrorDepositPice={setErrorDepositPice}
                        rangePrice={rangePrice}
                    />
                }

                {openModalConfirmState && <ModalConfirm
                    show={openModalConfirmState}
                    handleClose={handleCancelModalConfirm}
                    handleAccept={handleConfirmPostTimeshare}
                    title={"Xác nhận hành động"}
                    body={"Bạn có chắc chắn muốn đăng Timeshare này lên?"}
                />
                }
            </div>

            {isLoading && <SpinnerLoading />}
        </div>
    )
}

export default PostForm