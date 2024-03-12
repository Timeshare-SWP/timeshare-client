import React, { useState } from 'react'
import { convertRangePriceToVNDFormat } from '../../../../../utils/handleFunction';

const Stage_5 = (props) => {
    const { depositPrice, setDepositPrice, errorDepositPrice, setErrorDepositPice, rangePrice } = props

    const [depositRange, setDepositRange] = useState([rangePrice[0] * 1000 * 0.1, rangePrice[1] * 1000 * 0.2])
    
    const handleInputChange = (e) => {
        setErrorDepositPice('')
        let value = e.target.value;

        value = value.replace(/\D/g, '');
        if (parseInt(value) > 1000) {
            value = parseInt(value).toLocaleString();
        }

        setDepositPrice(value)

    };

    return (
        <div className='stage-container d-flex flex-column justify-content-center align-items-center'>
            <h4 className='title'>Giá thành cho việc đặt giữ chỗ mà bạn mong muốn</h4>
            <p className='sub-title mt-2'>Bổ sung các thông tin cần thiết về dự án của bạn để có thể hoàn thành
                các bước đăng tin thành công </p>

            <div className='stage-5'>

                <p className='comment'>P/s: Giá tiền giữ chân vui lòng từ 10% - 20% giá trị trung bình trong phạm vị giá của timeshare</p>
                <div>
                    <p className=''>Timeshare bạn vừa đăng có phạm vi giá là từ {convertRangePriceToVNDFormat(rangePrice[0] * 1000, rangePrice[1] * 1000)} /m&#178;</p>
                    <p className=''>Nên giá giữ chân có thể cho phép sẽ từ {convertRangePriceToVNDFormat(depositRange[0], depositRange[1])} /m&#178;</p>
                </div>
                <div className="form-group-material">
                    <input type="text" required="required" className="form-control"
                        value={depositPrice}
                        onChange={(e) => handleInputChange(e)}
                        placeholder='000.000.000.000đ'
                    />
                    <label>Giá giữ chân mong muốn <span className="text-danger">*</span></label>
                    <p className='unit-area'>/m&#178;</p>
                </div>

                {errorDepositPrice && <span className="error-message">{errorDepositPrice}</span>}
            </div>
        </div>
    )
}

export default Stage_5