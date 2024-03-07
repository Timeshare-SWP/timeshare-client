import React from 'react'

const Stage_5 = (props) => {
    const { depositPrice, setDepositPrice, errorDepositPrice, setErrorDepositPice } = props

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

                <p className='comment'>P/s: Giá tiền giữ chân vui lòng trong khoảng từ 5-10% so với tổng giá trị của timeshare</p>
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