import React, { useState, useContext } from 'react'
import './style.scss'

import { Link } from "react-router-dom";
import logo from "../../assets/images/logo_timeshare.png"
import { IoIosArrowDown } from "react-icons/io";
import Login from '../Login';
import SpinnerLoading from '../../components/shared/SpinnerLoading'
import { AuthContext } from '../../contexts/authContext';
import { Dropdown } from 'react-bootstrap';

const UserHeader = () => {
  const { currentToken, logout, userDecode, isLoadingEvent } = useContext(AuthContext);

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

  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const [modalSignupOpen, setModalSignupOpen] = useState(false);

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
                <IoIosArrowDown style={{ color: "rgb(199, 37, 40)", marginLeft: "3px" }} />
              </p>
            ))}

            <div className='separation-line'>
            </div>

            {!userDecode && <div className="header-button">
              <button
                className="btn fw-semibold"
                onClick={() => {
                  setModalLoginOpen(true);
                }}
              >
                Đăng nhập
              </button>
              <Login open={modalLoginOpen} onClose={() => setModalLoginOpen(false)} />

              <button
                className="btn btn-danger fw-semibold"
              >
                Ký gửi nhà đất
              </button>
            </div>
            }

            {userDecode && Object.keys(userDecode).length === 0 && <div className="header-button">
              <button
                className="btn fw-semibold"
                onClick={() => {
                  setModalLoginOpen(true);
                }}
              >
                Đăng nhập
              </button>
              <Login open={modalLoginOpen} onClose={() => setModalLoginOpen(false)} />

              <button
                className="btn btn-danger fw-semibold"
              >
                Ký gửi nhà đất
              </button>
            </div>}

            {userDecode && Object.keys(userDecode).length !== 0 && <Dropdown className="dropdown-header" >
              <Dropdown.Toggle variant="danger" id="dropdown-basic" className='d-flex gap-3 justify-content-center align-items-center '>
                <div className="avatar-profile">
                  <img src={userDecode?.imgURL || "https://cdn.popsww.com/blog/sites/2/2021/03/doraemon-tap-97.jpg"}
                    alt={userDecode?.imgURL ? "UserAva" : "IncognitoAva"} />
                </div>
                <p >{userDecode?.fullName}</p>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Link className='item_link' to="/my_account">Trang cá nhân</Link>

                <div className='item_link' onClick={logout}>Đăng xuất</div>
              </Dropdown.Menu>
            </Dropdown>}


            {isLoadingEvent && <SpinnerLoading />}
          </div>
        </div >
      </div >
    </header >
  )
}

export default UserHeader