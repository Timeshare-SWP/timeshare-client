import React from 'react'
import { convertToVnTime, generateFallbackAvatar } from '../../../../utils/handleFunction';

import { GiPositionMarker } from 'react-icons/gi';
import { MdAccountBalance, MdManageAccounts, MdNoAccounts } from 'react-icons/md';
import { CgTime } from 'react-icons/cg';

const BuyerDetail = (props) => {

  const { customer } = props
  return (
    <div className="d-flex justify-content-center flex-column profile-container gap-3">
      <div className='user-profile d-flex gap-5 '>
        <div className='left d-flex flex-column gap-3'>
          <div className='avatar-user'>
            <img src={customer?.avatar_url ? customer.avatar_url : generateFallbackAvatar(customer?.fullName)} alt="Avatar"></img>
          </div>

        </div>

        <div className='right d-flex flex-column'>
          <div className="header d-flex flex-column">
            <div className='top-header d-flex justify-content-between align-items-center gap-3'>
              <div className="left-top-header d-flex justify-content-center align-items-center gap-3">
                <p className='user-name'>{customer?.fullName !== ' ' && customer?.fullName ? customer?.fullName : '(Chưa cập nhập thông tin)'}</p>
                <div className='user-location d-flex align-items-center gap-2'>
                  <GiPositionMarker />
                  <p className=''>{customer?.address !== ' ' && customer?.address ? customer?.address : '(Chưa cập nhập thông tin)'}</p>
                </div>
              </div>

            </div>

            <div className='role-name'>
            </div>

            <div className='d-flex gap-5 align-items-center'>
              <div className='rate-section'>
                <p className='title-rate'>Ngày tham gia</p>
                <div className='d-flex rate-data'>
                  {convertToVnTime(customer?.createdAt)}
                </div>
              </div>

              <div className='separation-vertical-line'></div>

              <div className='rate-section'>
                <p className='title-rate'>{customer?.role_id?.roleName === 'Customer' ? 'Số timeshare đã mua' : 'Số timeshare đã mua'}</p>
                <div className='d-flex rate-data'>
                  {customer?.booked ? customer?.booked : 0} lần
                </div>
              </div>

            </div>

          </div>

          <div className="main d-flex flex-column">
            <div className="main-top d-flex gap-4">
              <div className='about d-flex gap-2 active align-items-center'>
                <MdManageAccounts/>
                <p>Bản thân</p>
              </div>

              <div className='timeline d-flex gap-2 align-items-center'>
                <CgTime/>
                <p>Mốc thời gian</p>
              </div>
            </div>

            <div className="main-info d-flex flex-column justify-content-around">
              <div className="contact-info">
                <p className='text-header'>Thông tin liên lạc</p>
                <div className="content d-flex ">
                  <div className="label-info d-flex flex-column">
                    <p>Số điện thoại: </p>
                    <p>Địa chỉ cụ thể: </p>
                    <p>Email: </p>
                  </div>
                  <div className="input-info d-flex flex-column">
                    <p>{customer?.phone !== " " && customer?.phone ? customer?.phone : '(Chưa cập nhập thông tin)'}</p>
                    <p>{customer?.address_details !== " " && customer?.address_details ? customer?.address_details : '(Chưa cập nhập thông tin)'}</p>
                    <p>{customer?.email !== " " && customer?.email ? customer?.email : '(Chưa cập nhập thông tin)'}</p>
                  </div>
                </div>
              </div>

              <div className="basic-info">
                <p className='text-header'>Thông tin cơ bản</p>
                <div className="content d-flex">
                  <div className="label-info d-flex flex-column">
                    <p>Tên: </p>
                    <p>Ngày sinh: </p>
                    <p>Giới tính: </p>
                  </div>
                  <div className="input-info d-flex flex-column">
                    <p>{customer?.fullName !== " " && customer?.fullName ? customer?.fullName : '(Chưa cập nhập thông tin)'}</p>
                    <p>{customer?.dob !== " " && customer?.dob ? convertToVnTime(customer?.dob) : '(Chưa cập nhập thông tin)'}</p>
                    <p>{customer?.gender === 'Male' ? 'Nam' : (customer?.gender === 'Female' ? 'Nữ' : '(Chưa cập nhập thông tin)')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyerDetail