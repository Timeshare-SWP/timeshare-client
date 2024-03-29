import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { UTILITIES_LIST } from '../../../../../constants/utilities'

const Stage_3 = (props) => {
  const { anotherInfo, setAnotherInfo, errorStage3, setErrorStage3 } = props
  const [selectedUtilities, setSelectedUtilities] = useState(anotherInfo.timeshare_utilities);

  const handleInputChange = (e, field) => {
    let value = e.target.value;

    if (field === 'real_estate_code') {
      console.log(value)
      value = value.replace(/\D/g, '');
      const intValue = parseInt(value);

      if (intValue > 100) {
        value = '100';
  
      }

      if (!isNaN(intValue)) {
        value = intValue.toLocaleString();
      }
    }

    setAnotherInfo({
      ...anotherInfo,
      [field]: value
    });

  };

  const handleYearChange = (date, field) => {
    setAnotherInfo({
      ...anotherInfo,
      [field]: date
    });
  };

  const handleUtilitiesChange = (selectedOptions) => {
    setSelectedUtilities(selectedOptions);
    setAnotherInfo({
      ...anotherInfo,
      timeshare_utilities: selectedOptions.map(option => option),
    });
  };

  const convert_utilities_list = UTILITIES_LIST.map(item => ({
    value: item.id,
    label: item.name,
  }));

  return (
    <div className='stage-container d-flex flex-column justify-content-center align-items-center'>
      <h4 className='title'>Thêm thông tin ngoài lề khác về timeshare</h4>
      <p className='sub-title mt-2'>Bổ sung các thông tin cần thiết về dự án của bạn để có thể hoàn thành
        các bước đăng tin thành công </p>
      <p className='note-title'>(Bấm tiếp tục để bỏ qua giai đoạn này nếu timeshare đang ở giai đoạn Chưa triển khai)</p>

      <div className='stage-3'>
        <div className='container-input'>
          <div className="form-group-material mb-0">
            <input type="text" required="required" className="form-control"
              value={anotherInfo.ownership}
              onChange={(e) => handleInputChange(e, 'ownership')}
            />
            <label>Hình thức sở hữu</label>
          </div>

          <div className="form-group-material mb-0">
            <input type="text" required="required" className="form-control"
              value={anotherInfo.timeshare_scale}
              onChange={(e) => handleInputChange(e, 'timeshare_scale')}
            />
            <label>Quy mô dự án</label>
          </div>

          <div className="form-group-material mb-0">
            <input type="text" required="required" className="form-control"
              value={anotherInfo.real_estate_code}
              onChange={(e) => handleInputChange(e, 'real_estate_code')}
            />
            <label>Mật độ xây dựng</label>
            <p className='unit-area'>%</p>
          </div>

          <div className="form-group-material mb-0">
            <input type="text" required="required" className="form-control"
              value={anotherInfo.apartment_direction}
              onChange={(e) => handleInputChange(e, 'apartment_direction')}
            />
            <label>Hướng nhà</label>
          </div>

          <div className="form-group-material mb-0 year-select">
            <input type="text" required="required" className="form-control" />
            <label>Năm khởi công</label>
            <DatePicker
              showIcon
              selected={anotherInfo.year_of_commencement}
              onChange={(e) => handleYearChange(e, 'year_of_commencement')}
              dateFormat="yyyy"
              showYearPicker
              minDate={new Date()}
            />

          </div>

          <div className="form-group-material mb-0 year-select">
            <input type="text" required="required" className="form-control" />
            <label>Năm bàn giao</label>
            <DatePicker
              showIcon
              selected={anotherInfo.year_of_handover}
              onChange={(e) => handleYearChange(e, 'year_of_handover')}
              dateFormat="yyyy"
              showYearPicker
              minDate={anotherInfo.year_of_commencement ? anotherInfo.year_of_commencement : new Date()}
            />
          </div>
        </div>

        <div className="form-group-material dropdown select-type select-type">
          <input readOnly="readonly" type="text" required="required" className="form-control input-blank" style={{ backgroundColor: 'white' }} />
          <label>Tiện ích nội khu <span className="text-danger"></span></label>

          <Select
            isMulti
            options={convert_utilities_list}
            className="basic-multi-select"
            classNamePrefix="select"
            value={selectedUtilities}
            onChange={handleUtilitiesChange}
          />

        </div>

        {errorStage3 && <span className='error-message'>{errorStage3}</span>}

      </div>
    </div>
  )
}

export default Stage_3