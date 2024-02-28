import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { UTILITIES_LIST } from '../../../../../constants/utilities'

const Stage_3 = (props) => {
  const { anotherInfo, setAnotherInfo } = props
  const [selectedYear, setSelectedYear] = useState(new Date());

  const handleYearChange = (year) => {
    setSelectedYear(year);
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
      <p className='note-title'>(Bấm tiếp tục để bỏ qua giai đoạn này)</p>

      <div className='stage-3'>
        <div className="form-group-material mb-0">
          <input type="text" required="required" className="form-control" />
          <label>Mã số bất động sản</label>
        </div>

        <div className="form-group-material mb-0">
          <input type="text" required="required" className="form-control" />
          <label>Hình thức sở hữu</label>
        </div>

        <div className="form-group-material mb-0">
          <input type="text" required="required" className="form-control" />
          <label>Quy mô dự án</label>
        </div>
        <div className="form-group-material mb-0">
          <input type="text" required="required" className="form-control" />
          <label>Năm khởi công</label>
          <div className='form-select'>
            <DatePicker
              showIcon
              selected={selectedYear}
              onChange={handleYearChange}
              dateFormat="yyyy"
              showYearPicker
            />
          </div>
        </div>

        <div className="form-group-material mb-0">
          <input type="text" required="required" className="form-control" />
          <label>Năm bàn giao</label>
          <div className='form-select'>
            <DatePicker
              showIcon
              selected={selectedYear}
              onChange={handleYearChange}
              dateFormat="yyyy"
              showYearPicker
            />
          </div>

        </div>

        <div className="form-group-material dropdown select-type select-type">
          <input readOnly="readonly" type="text" required="required" className="form-control" style={{ backgroundColor: 'white' }} />
          <label>Tiện ích nội khu <span className="text-danger"></span></label>

          <Select
            isMulti
            options={convert_utilities_list}
            className="basic-multi-select"
            classNamePrefix="select"
          />

        </div>

      </div>
    </div>
  )
}

export default Stage_3