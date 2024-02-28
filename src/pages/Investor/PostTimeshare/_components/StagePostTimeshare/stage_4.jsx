import React from 'react'
import { PRIORITY_LEVEL } from '../../../../../constants/timeshare'
import { BiCheckboxChecked } from "react-icons/bi";

const Stage_4 = (props) => {

  const { priorityLevel, setPriorityLevel } = props;

  return (
    <div className='stage-container d-flex flex-column justify-content-center align-items-center'>
      <h4 className='title'>Cách thức ưu tiên khách hàng của bạn</h4>
      <p className='sub-title mt-2'>Bổ sung các thông tin cần thiết về dự án của bạn để có thể hoàn thành
        các bước đăng tin thành công </p>

      <div className='stage-4'>
        {PRIORITY_LEVEL.map((obj, index) => (
          <button className={`item ${obj.name === priorityLevel ? 'selected' : ''} ${obj.name !== priorityLevel ? 'disabled' : ''}`} key={index} >
            <div className='checked'>
              <input
                type='radio'
                id={`priority_${index}`}
                name='priority'
                value={obj.name}
                defaultChecked={priorityLevel === obj.name}
              // onChange={() => handleRadioChange(obj.name)}
              />
            </div>
            <div className='content d-flex flex-column'>
              <h5>{obj.title}</h5>
              <p>{obj.description}</p>
            </div>
            <div className='note'>
              {obj.note}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Stage_4