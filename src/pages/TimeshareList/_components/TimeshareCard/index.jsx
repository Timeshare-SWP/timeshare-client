import React from 'react'
import { GiPositionMarker } from "react-icons/gi";
import { BsTextareaResize } from "react-icons/bs";
import { LuClipboardType } from "react-icons/lu";
import { useNavigate } from 'react-router';
import { convertToSlug } from '../../../../utils/handleFunction';

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

        return <div className={`btn ${classNames}`}>{status}</div>;
    }

    return (
        <div className='card my-5 timeshare-card' key={key} onClick={handleToNavigateTimeshareDetail}>
            <div
                className="row"
            >
                <div className='col-4 d-flex justify-content-center align-items-center'>
                    <img src={`${item?.timeshare_image
                        && item.timeshare_image.length > 0
                        ? item.timeshare_image[0]?.timeshare_img_url
                        : img_tmp}`} className='img-fluid rounded-start' />
                </div>

                <div className='col-8'>
                    <div className='status'>
                        {renderStatus(item.sell_timeshare_status, ["Chưa được bán", "Đang mở bán", "Đã bán"])}
                        {renderStatus(item.timeshare_status, ["Sắp triển khai", "Đang triển khai", "Đã triển khai"])}
                    </div>

                    <h4>{item.timeshare_name}</h4>

                    <div className='other-option d-flex gap-3 align-items-center'>
                        <div><GiPositionMarker /> {item.timeshare_address}</div>

                        <div><BsTextareaResize /> {item.land_area}</div>

                        <div><LuClipboardType />  {item.timeshare_type}</div>
                    </div>

                    <p>Giá: <span className='text-price'>{item.price} triệu/m2</span></p>

                    <p className='description'>{item.timeshare_description}</p>

                    <div className='d-flex investor-profile gap-3'>
                        <div className='avatar'>
                            <img src={avatar_tmp} alt="tmp" />
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