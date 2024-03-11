import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaRegUserCircle, FaMoneyCheckAlt , FaChartBar } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { GoProjectRoadmap } from "react-icons/go";
import { IoIosHelpCircleOutline, IoIosNotificationsOutline, IoIosLogOut } from "react-icons/io";
import { Badge } from 'antd';
import "./index.css"


const index = () => {
  return (
    <div className="bg-light" style={{ width: '15%' }}>
      <div className='container' style={{ height: 590 }}>
        <h6 className=' text-center my-2 mb-4' style={{ color: 'orange' }}>Kho dự án</h6>
        <div className='mt-2'>
          <h5 style={{ color: 'pink' }}>Công cụ</h5>
          <ul style={{ listStyle: 'none' }} className='p-2'>
            <li className='my-3'>
              <Link to="/statistics" className='nav-link'>
                <FaChartBar className='mx-2' />
                Thống kê
              </Link>
            </li>
            <li>
              {/* <Link to="/notification" className='nav-link'>
                <FaRegBell className='mx-2' />
                <Badge count={6} offset={[10, 0]}>
                  Thông báo
                </Badge>
              </Link> */}
            </li>
          </ul>
        </div>
        <div >
          <h5 style={{ color: 'pink' }}>Quản lý</h5>
          <ul style={{ listStyle: 'none' }} className='p-2'>
            <li className='my-3'>
              <Link to="/user" className='nav-link'>
                <FaRegUserCircle className='mx-2' />
                Tài khoản
              </Link>
            </li>
            <li>
              <Link to="/group" className='nav-link'>
                <FaMoneyCheckAlt  className='mx-2' />
                Giao dịch
              </Link>
            </li>
            <li className='my-3'>
              <Link to="/project" className='nav-link'>
                <GoProjectRoadmap className='mx-2' />
                Dự án
              </Link>
            </li>
            <li>
              <Link to="help" className='nav-link'>
                <IoIosHelpCircleOutline className='mx-2' />
                Hỗ trợ vấn đề
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="btn-logout bg-light text-center" style={{ width: '100%' }}>
        <Button variant="secondary" className='my-4 px-4 mx-1'><IoIosLogOut className='mx-2' />Đăng xuất</Button>
      </div>
    </div>
  )
}

export default index