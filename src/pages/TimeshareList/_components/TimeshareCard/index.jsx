import React from 'react'
import { GiPositionMarker } from "react-icons/gi";
import { BsTextareaResize } from "react-icons/bs";
import { LuClipboardType } from "react-icons/lu";
import { useNavigate } from 'react-router';
import { convertRangePriceToVNDFormat, convertToNumberFormat, convertToSlug, convertToVNDFormat, generateFallbackAvatar, truncateString } from '../../../../utils/handleFunction';

const TimeshareCard = (props) => {

    const { item, key } = props

    const img_tmp = "https://photo.rever.vn/v3/get/m8sgt22ufK23zAKaupTzeH+7CNCkH1fORnYxoVSNMIE=/450x300/image.jpg"
    const avatar_tmp = "https://cdn.popsww.com/blog/sites/2/2021/03/doraemon-tap-97.jpg"

    const navigate = useNavigate();
    const handleToNavigateTimeshareDetail = () => {
        navigate(`/timeshare-list/${convertToSlug(item.timeshare_name)}`, { state: { item } })
    }

    const renderStatus = (status, statuses) => {
        let classNames = "";
        if (status === statuses[0]) classNames = "button-yellow";
        else if (status === statuses[1]) classNames = "button-green";
        else classNames = "button-gray";

        return <div className={`btn ${classNames}`} style={{ fontSize: '10px' }}>{status}</div>;
    }

    return (
        <div className='card my-2 timeshare-card' key={key} onClick={handleToNavigateTimeshareDetail}>
            <div
                className="row"
            >
                <div className='col-4 d-flex flex-column justify-content-center align-items-center'>
                    <img src={`${item?.timeshare_image
                        && item.timeshare_image.length > 0
                        ? item.timeshare_image[0]?.timeshare_img_url
                        : img_tmp}`} className='img-fluid'
                        alt="timeshare" />

                    <div className="sub-img">
                        {item.timeshare_image && item.timeshare_image.length > 1 && (
                            <>
                                {item.timeshare_image.length > 1
                                    &&
                                    <div className="item">
                                        <img
                                            src={item.timeshare_image[1]?.timeshare_img_url}
                                            alt="timeshare"
                                        />
                                    </div>
                                }
                                {item.timeshare_image.length > 2
                                    &&
                                    <div className="item">
                                        <img
                                            src={item.timeshare_image[2]?.timeshare_img_url}
                                            alt="timeshare"
                                        />
                                    </div>
                                }
                                {item.timeshare_image.length > 3 && (
                                    <div className="item">
                                        <div className="overlay">
                                            +{item?.timeshare_image.length - 3}
                                        </div>
                                        <img
                                            src={item.timeshare_image[3]?.timeshare_img_url}
                                            alt="timeshare"
                                        />
                                    </div>
                                )}

                            </>
                        )}
                    </div>
                </div>

                <div className='col-8'>
                    <div className='status'>
                        {renderStatus(item.sell_timeshare_status, ["Chưa được bán", "Đang mở bán", "Đã bán"])}
                        {renderStatus(item.timeshare_status, ["Sắp triển khai", "Đang triển khai", "Đã triển khai"])}
                    </div>

                    <h5>{item.timeshare_name}</h5>

                    <div className='other-option d-flex gap-3 align-items-center'>
                        <div style={{ fontSize: '15px' }}><GiPositionMarker /> {truncateString(item.timeshare_address, 20)}</div>

                        <div style={{ fontSize: '15px' }}><BsTextareaResize /> {convertToNumberFormat(item.land_area)} m&#178;</div>

                        <div style={{ fontSize: '15px' }}><LuClipboardType />  {item.timeshare_type}</div>
                    </div>

                    <p>Giá: <span className='text-price'>{convertRangePriceToVNDFormat(item?.price, item?.max_price)}/m&#178;</span></p>

                    <p className='description'>{truncateString(item.timeshare_description, 45)}</p>

                    <div className='d-flex investor-profile gap-3'>
                        <div className='avatar'>
                            <img src={generateFallbackAvatar(item.investor_id.fullName)} alt="tmp" />
                        </div>
                        <div className='info'>
                            <p className='fw-bold'>{item.investor_id.fullName}</p>
                            <p>{item.investor_id.email}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TimeshareCard