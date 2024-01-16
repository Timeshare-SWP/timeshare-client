import React from 'react'
import './style.scss'

import { Link } from "react-router-dom";
import logo from "../../assets/images/logo_timeshare.png"
import { IoIosArrowDown } from "react-icons/io";


const UserHeader = () => {

  const navLinks = [
    {
      display: "Mua",
    },
    {
      display: "Dự án",
    },
    {
      display: "Chuyên viên",
    },
    {
      display: "Trang tin",
    },
  ];

  return (
    <header className="user-header">
      <div className="main__navbar">
        <div className="container d-flex align-items-center gap-1 justify-content-between">
          <div className="logo">
            <Link to='/' className="d-flex align-items-center gap-2">
              <img src={logo} alt="logo" />
            </Link>
          </div>

          <div className="menu">
            {navLinks.map((item, index) => (
              <p
                className="nav__item"
                key={index}
              >
                {item.display}
                <IoIosArrowDown style={{color: "rgb(199, 37, 40)", marginLeft: "3px"}}/>
              </p>
            ))}

            <div className='separation-line'>
            </div>

            <div className="header-button">
              <button
                className="btn fw-semibold"
              >
                Đăng nhập
              </button>

              <button
                className="btn btn-danger fw-semibold"
              >
                Ký gửi nhà đất
              </button>
            </div>
          </div>
        </div >
      </div >
    </header >
  )
}

export default UserHeader