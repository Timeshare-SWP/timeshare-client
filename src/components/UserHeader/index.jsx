import React, { useState, useContext } from 'react'
import './style.scss'

import { Link } from "react-router-dom";
import logo from "../../assets/images/logo_timeshare.png"
import { IoIosArrowDown } from "react-icons/io";
import Login from '../auth/Authentication';
import SpinnerLoading from '../../components/shared/SpinnerLoading'
import { AuthContext } from '../../contexts/authContext';
import DropDownUser from '../UserHeader/_components/DropDownUser'
import { USER_HEADER_LINK } from '../../constants/header';
import Authentication from '../auth/Authentication';

const UserHeader = () => {
  const { currentToken, logout, userDecode, isLoadingEvent } = useContext(AuthContext);

  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const [swapToRegisterState, setSwapToRegisterState] = useState(false);

  const handleCloseAuthentication = () => {
    setModalLoginOpen(false)
    setSwapToRegisterState(false)
  }

  const handleSwapToRegister = () => {
    setSwapToRegisterState(true)
  }

  const handleSwapToLogin = () => {
    setSwapToRegisterState(false)
  }

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
            {USER_HEADER_LINK.map((item, index) => (
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
              <Authentication
                open={modalLoginOpen}
                onClose={handleCloseAuthentication}
                swapToRegisterState={swapToRegisterState}
                actionSwapToRegister={handleSwapToRegister}
                actionSwapToLogin={handleSwapToLogin}
              />

              <button
                className="btn btn-danger fw-semibold"
              >
                Ký gửi nhà đất
              </button>
            </div>
            }

            {/*  */}
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

            {userDecode && Object.keys(userDecode).length !== 0 && <>
              <DropDownUser user={userDecode} actionLogout={logout} />

              {userDecode.role_id.roleName === "Investor"
                &&
                <button
                  className="btn btn-danger fw-semibold"
                >
                  Ký gửi nhà đất
                </button>
              }
            </>}

            {isLoadingEvent && <SpinnerLoading />}
          </div>
        </div >
      </div >
    </header >
  )
}

export default UserHeader