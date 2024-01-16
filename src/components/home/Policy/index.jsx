import React from 'react'
import './style.scss'

const Policy = () => {

  const navLinks = [
    {
      display: "Cam kết xác thực",
      src: "https://s3-cdn.rever.vn/p/v2.48.39/images/icon-verify-listing.svg"
    },
    {
      display: "Dẫn đầu số lượng",
      src: "https://s3-cdn.rever.vn/p/v2.48.39/images/icon-many-listing.svg"
    },
    {
      display: "Trọn hỗ trợ, chi phí thấp",
      src: "https://s3-cdn.rever.vn/p/v2.48.39/images/icon-save-money.svg"
    },
    {
      display: "Nhận nhiều ưu đãi",
      src: "https://s3-cdn.rever.vn/p/v2.48.39/images/icon-save-money-star.svg"
    },
  ];

  return (
    <div className='policy-section py-5'>
      <div className='row'>
        {navLinks.map((item, index) => (
          <div
            className="col"
            key={index}
          >
            <div className='d-flex justify-content-center'>
              <img src={item.src} alt="img" />
            </div>
            <p className='text-center fw-semibold mt-3'>{item.display}</p>
          </div>
        ))}
      </div>

      <div className='mt-5 text-center'>
        <div className='btn btn-outline-dark fw-semibold py-2 px-5'>Tìm hiểu thêm</div>
      </div>
    </div>
  )
}

export default Policy