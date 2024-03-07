import React from 'react'
import payment_svg from "../../../../assets/svg/payment.svg"

const Stage_2 = (props) => {

  const { handleCallApiReservedPlace } = props

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className='d-flex flex-column' >
        <img style={{ width: '300px', objectFit: 'cover' }}
          src={payment_svg} alt="vn pay" />

        <div
          className='btn btn-outline-danger'
          onClick={handleCallApiReservedPlace}
        >
          Vui lòng bấm vào đây để thực hiện thanh toán
        </div>
      </div>
    </div>
  )
}

export default Stage_2