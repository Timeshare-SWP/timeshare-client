import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getApartmentById } from '../../../../redux/features/apartmentSlice';
import { convertToNumberFormat, convertToVietnameseTime } from '../../../../utils/handleFunction';

const TransactionDetail = (props) => {
  const { transaction } = props
  console.log("transaction", transaction)
  const dispatch = useDispatch();

  return (
    <div className=''>
      {transaction?.apartment_id
        &&
        <div className="apartment-container-info mb-4">
          <h4 className="mb-4">Thông tin căn hộ lựa chọn:</h4>

          <div className="info-wrapper">
            <div className="apartment-image">
              <img src={"https://laptop88.vn/media/news/2412_tmkimbnghnhnh.jpg"} alt="img" />
            </div>
            <div className="info-details">
              <div className="info-row">
                <div className="info-label">Số căn hộ:</div>
                <div className="info-value">{transaction?.apartment_id?.apartment_number}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Tên toà:</div>
                <div className="info-value">{transaction?.apartment_id?.floor_number}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Diện tích:</div>
                <div className="info-value">{transaction?.apartment_id?.area}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Các phòng:</div>
                <div className="info-value">{transaction?.apartment_id?.number_of_rooms}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Tình trạng căn hộ:</div>
                <div className="info-value">{transaction?.apartment_id?.condition}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Nội thất:</div>
                <div className="info-value">{transaction?.apartment_id?.interior}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Chú thích:</div>
                <div className="info-value">{transaction?.apartment_id?.note}</div>
              </div>
            </div>
          </div>
        </div>

      }


      <div className='transaction-container-info'>
        <h4 className='mb-4'>Thông tin giao dịch: </h4>

        <div className='row px-5'>
          <div className=''>
            <p className='label text-uppercase'>GIỮ CHÂN</p>
            <p className='value'>{transaction?.reservation_price ? 'Có giữ chân' : 'Không giữ chân'}</p>
          </div>

          {transaction?.reservation_price && (
            <>
              <div className=''>
                <p className='label text-uppercase'>THỜI GIAN GIỮ CHÂN</p>
                <p className='value'>{convertToVietnameseTime(transaction?.createdAt)}</p>
              </div>
              <div className=''>
                <p className='label text-uppercase'>THANH TOÁN TIỀN CỌC</p>
                <p className={`value ${transaction?.is_reservation_paid ? 'text-success' : 'text-danger'}`}>
                  {transaction?.is_reservation_paid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                </p>
              </div>
              <div className=''>
                <p className='label text-uppercase'>SỐ TIỀN GIỮ CHÂN</p>
                <p className='value'>{convertToNumberFormat(transaction?.reservation_price)}</p>
              </div>
              <div className=''>
                <p className='label text-uppercase'>THỜI GIAN THANH TOÁN</p>
                <p className='value'>{convertToVietnameseTime(transaction?.reservation_time)}</p>
              </div>
            </>
          )}

          <div className=''>
            <p className='label text-uppercase'>TRẠNG THÁI XÁC NHẬN GIAO DỊCH</p>
            <p className='value text-warning'>{transaction?.transaction_status === 'Waiting' ? 'Đang chờ phản hồi' : ''}</p>
          </div>
        </div>
      </div>


    </div>
  )
}

export default TransactionDetail