import React, { useEffect, useState } from 'react'
import { convertToNumberFormat, truncateString } from '../../../utils/handleFunction';
import { UTILITIES_LIST } from '../../../constants/utilities';
import GoogleMapLocation from './GoogleMapLocation';
import toast from 'react-hot-toast';
import JSZip from 'jszip';
import { useDispatch } from 'react-redux';
import { countQuantifyOfBuyer } from '../../../redux/features/transactionSlice';

export const LeftSideComponent = (props) => {
    const { item } = props
    const avatar_tmp = "https://cdn.popsww.com/blog/sites/2/2021/03/doraemon-tap-97.jpg"

    const dispatch = useDispatch();

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

    const handleDownloadAllFiles = async () => {
        toast.error('Chưa hỗ trợ')
    };

    // count số lượng đã bán của timeshare
    const [countQuantityOfBuyer, setCountQuantityOfBuyer] = useState(0);
    useEffect(() => {
        dispatch(countQuantifyOfBuyer(item?._id)).then((resCount) => {
            console.log("resCount", resCount);
            const selectedObj = resCount.payload.find(obj => obj.key === 'Selected');
            if (selectedObj) {
                setCountQuantityOfBuyer(selectedObj.value);
            }
        });
    }, []);


    return (
        <div className='col-8 container-left'>
            <div className='container-left__content'>
                <div className='title'>
                    <h3>{item?.timeshare_name}</h3>
                    {renderStatus(item?.sell_timeshare_status, ["Chưa được bán", "Đang mở bán", "Đã bán"])}
                    {renderStatus(item?.timeshare_status, ["Sắp triển khai", "Đang triển khai", "Đã triển khai"])}
                </div>

                <div className='d-flex flex-row align-items-center mb-3 mt-2'>
                    <div className='location'>
                        <p>{item?.timeshare_address}</p>
                    </div>

                    <div style={{margin: '0px 10px'}}>|</div>

                    <p>
                        <>{countQuantityOfBuyer}</> Đã Bán
                    </p>
                </div>

                <div className='timeshare-img'>
                    {item?.timeshare_image && item?.timeshare_image.length > 0 && (
                        item?.timeshare_image.map((image, index) => {
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
                    <h3 className='mb-3'>Giới thiệu {item?.timeshare_name}</h3>
                    <p>{item?.timeshare_description}</p>

                    <div className='row'>
                        <div className='col-6'>
                            <div className="info-container">
                                <div className="info-item">
                                    <div className="info-label">Tên dự án:</div>
                                    <div className="info-value">{truncateString(item?.timeshare_name, 15)}</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Chủ đầu tư:</div>
                                    <div className="info-value">{item?.investor_id.fullName}</div>
                                </div>

                                <div className="info-item">
                                    <div className="info-label">Hình thức sở hữu:</div>
                                    <div className="info-value">{item?.ownership ? item?.ownership : 'Đang cập nhập'}</div>
                                </div>

                                <div className="info-item">
                                    <div className="info-label">Tổng diện tích:</div>
                                    <div className="info-value">{convertToNumberFormat(item?.land_area)} m&#178;</div>
                                </div>


                                <div className="info-item">
                                    <div className="info-label">Loại hình:</div>
                                    <div className="info-value">{item?.timeshare_type ? item?.timeshare_type : 'Đang cập nhập'}</div>
                                </div>

                            </div>
                        </div>

                        <div className='col-6'>
                            <div className="info-container">
                                <div className="info-item">
                                    <div className="info-label">Mã bất động sản:</div>
                                    <div className="info-value">{item?.real_estate_code ? item?.real_estate_code : 'Đang cập nhập'}</div>
                                </div>

                                <div className="info-item">
                                    <div className="info-label">Khoảng giá:</div>
                                    <div className="info-value">{convertToNumberFormat(item?.price)} VNĐ/m2</div>
                                </div>

                                <div className="info-item">
                                    <div className="info-label">Quy mô:</div>
                                    <div className="info-value">{item?.timeshare_scale ? item?.timeshare_scale : 'Đang cập nhập'}</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Năm khởi công:</div>
                                    <div className="info-value">{item?.year_of_commencement ? item?.year_of_commencement : 'Đang cập nhập'}</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Năm bàn giao:</div>
                                    <div className="info-value">{item?.year_of_handover ? item?.year_of_handover : 'Đang cập nhập'}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='my-3'>
                        <span>Cần tìm hiểu thêm thông tin dự án? </span>
                        {item?.timeshare_related_link && item.timeshare_related_link.length > 0 ? (
                            <button onClick={handleDownloadAllFiles} className='btn btn-danger'>
                                Nhận trọn bộ hồ sơ pháp lý dự án
                            </button>
                        ) : (
                            <>
                                <div className='btn btn-danger' onClick={() => toast.error('Hiện tại chưa được cập nhập nên không thể tải!')}>
                                    Nhận trọn bộ hồ sơ pháp lý dự án
                                </div>
                                <span className='fw-bold' style={{ fontSize: '15px' }}>(Đang cập nhập)</span>
                            </>
                        )}
                    </div>

                </div>

                <hr></hr>

                <div className='section-premises' id="premises">
                    <h3 className='mb-3'>Mặt bằng dự án</h3>
                    {item?.timeshare_image && item?.timeshare_image.length > 0 ? (
                        item?.timeshare_image.map((image, index) => {
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
                        <div className="utility-item">
                            <div className="utility-name fw-bold">Đang cập nhập</div>
                        </div>
                    )}
                </div>


                <hr></hr>

                <div className='section-utilities' id="utilities">
                    <h3 className=''>Tiện ích</h3>

                    <div className='utilities-list'>
                        {item?.timeshare_utilities && item.timeshare_utilities.length > 0 ? (
                            item.timeshare_utilities.map((utilityId) => {
                                const utility = UTILITIES_LIST.find((item) => item.id === utilityId);
                                if (!utility) return null;
                                return (
                                    <div key={utility.id} className="utility-item">
                                        <div className="utility-icon">{utility.icon}</div>
                                        <div className="utility-name">{utility.name}</div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="utility-item">
                                <div className="utility-name fw-bold">Đang cập nhập</div>
                            </div>
                        )}
                    </div>

                </div>

                <hr></hr>

                <GoogleMapLocation timeshare_location={item?.timeshare_address} />

                <hr></hr>

                <div className='section-investor' id="investor">
                    <h3 className='mb-3'>Chủ đầu tư</h3>

                    <div className='mb-5'>
                        <div
                            className="row"
                        >
                            <div className='col-4 d-flex justify-content-center align-items-center'>
                                <img src={`${item?.investor_id?.avatar_url
                                    ? item?.investor_id?.avatar_url
                                    : avatar_tmp}`} className='img-fluid rounded-start'
                                    alt="timeshare" />
                            </div>

                            <div className='col-8'>

                                <h4 >{item?.investor_id?.fullName}</h4>

                                <p className='description my-2'>Là bộ phận phát triển bất động sản của tập đoàn Gamuda Berhad - một trong những tập đoàn phát triển cơ sở hạ tầng và bất động sản hàng đầu tại Malaysia</p>

                                <div className='btn btn-outline-secondary'>Xem chi tiết</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
