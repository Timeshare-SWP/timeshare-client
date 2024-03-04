import React, { useState } from 'react'
import { convertToNumberFormat } from '../../../utils/handleFunction';
import ModalReservedPlace from './ModalReservedPlace';

const RightSideComponent = (props) => {

    const { item } = props

    const [openModalReservedPlace, setOpenModalReservedPlace] = useState(false);

    // stage_1
    const [memberList, setMemberList] = useState([])
    const [optionTypeReservedPlace, setOptionTypeReservedPlace] = useState('');
    const [error, setError] = useState('')

    const handleActionTransition = () => {
        if (item?.sell_timeshare_status === "Chưa được bán") {
            setOpenModalReservedPlace(true)
        } else if (item?.sell_timeshare_status === "Đang mở bán") {
            alert("Mua ngay");
        }
    }

    return (
        <>
            <div className='col-4 container-right'>
                <div className='text-price'>Khoảng giá: <span className='detail'>{convertToNumberFormat(item?.price)} VNĐ/m&#178;</span></div>
                <div className='text-price'>Chủ đầu tư: <span className='fw-bold'>{item?.investor_id?.fullName}</span></div>
                <hr></hr>
                <div
                    className={`btn ${item?.sell_timeshare_status === 'Đã bán' ? 'btn-outline-secondary' : 'btn-danger'}`}
                    onClick={handleActionTransition}
                    disabled={item?.sell_timeshare_status === "Đã bán"}
                    style={{ opacity: item?.sell_timeshare_status === 'Đã bán' ? 0.5 : 1 }}
                >
                    {item?.sell_timeshare_status === "Chưa được bán" && "ĐẶT GIỮ CHỖ NGAY"}
                    {item?.sell_timeshare_status === "Đang mở bán" && "MUA NGAY"}
                    {item?.sell_timeshare_status === "Đã bán" && "MUA NGAY"}
                </div>
                <div className='other-text text-center'>hoặc</div>
                <hr style={{ position: 'relative', top: '-20px', zIndex: '-10', opacity: '0.2' }}></hr>
                <div className='btn btn-outline-secondary'>Tham quan nhà mẫu</div>
                <div className='btn btn-outline-secondary'>Đăng ký tư vấn</div>
            </div>

            {openModalReservedPlace &&
                <ModalReservedPlace
                    item={item}
                    show={openModalReservedPlace}
                    handleClose={() => setOpenModalReservedPlace(false)}
                    memberList={memberList}
                    setMemberList={setMemberList}
                    optionTypeReservedPlace={optionTypeReservedPlace}
                    setOptionTypeReservedPlace={setOptionTypeReservedPlace}
                    error={error}
                    setError={setError}
                />}
        </>

    )
}

export default RightSideComponent