import React, { useState } from 'react'
import { JURIDICAL_STAGE } from '../../../../../constants/timeshare'

const Stage_1 = (props) => {

  const { selectedTimeshareStatus, setSelectedTimeshareStatus } = props

  const handleItemClick = (obj) => {
    setSelectedTimeshareStatus(obj);
  };

  return (
    <div className='stage-container d-flex flex-column justify-content-center align-items-center'>
      <h4 className='title'>Giai đoạn pháp lý timeshare của bạn</h4>
      <p className='sub-title mt-2'>Bổ sung các thông tin cần thiết về dự án của bạn để có thể hoàn thành
        các bước đăng tin thành công</p>

      <div className='stage-1'>
        {JURIDICAL_STAGE.map((obj, index) => (
          <div className={`card-item ${obj === selectedTimeshareStatus ? 'selected' : ''}`} key={index} onClick={() => handleItemClick(obj)}>
            <h4>{obj.name_status}</h4>
            <p className='text-center'>{obj.description}</p>
            <div className='divider'></div>
            <p>Mức độ rủi ro: trên {obj.risk_percentage}%</p>
            <p>Hosting Type</p>
            <p>Financial Service Features</p>

            <button className='btn'>Chọn ngay</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Stage_1
