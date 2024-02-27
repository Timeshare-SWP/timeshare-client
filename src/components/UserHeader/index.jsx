import React, { useState, useContext } from 'react'
import './style.scss'

import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo_timeshare.png"
import { IoIosArrowDown } from "react-icons/io";
import Login from '../auth/Authentication';
import SpinnerLoading from '../../components/shared/SpinnerLoading'
import { AuthContext } from '../../contexts/authContext';
import DropDownUser from '../UserHeader/_components/DropDownUser'
import { USER_HEADER_LINK } from '../../constants/header';
import Authentication from '../auth/Authentication';
import ModalConfirm from '../shared/ModalConfirm';

const UserHeader = () => {
  const { currentToken, logout, userDecode, isLoadingEvent } = useContext(AuthContext);

  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const [swapToRegisterState, setSwapToRegisterState] = useState(false);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

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

  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleUpTimeshare = () => {
    if (!userDecode) {
      setShowModal(true)
    } else {
      navigate("/up-timeshare")
    }
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
              <div
                className="nav__item"
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {item.display}
                <IoIosArrowDown style={{ color: 'rgb(199, 37, 40)', marginLeft: '3px' }} />

                {hoveredItem === index && (
                  <div className={`dropdown-menu ${index === 0 && 'flex-column'}`} >
                    {item?.menuTitles?.map((menuTitle, titleIndex) => (
                      <div key={titleIndex} className="menu-title">
                        <p className="menu-title-text">{menuTitle.title}</p>
                        {menuTitle.items.map((menuItem, menuIndex) => (
                          <Link key={menuIndex} to={menuItem.link}>
                            {menuItem.label}
                          </Link>
                        ))}
                      </div>
                    ))}

                    {item?.menu?.map((menuItem, menuIndex) => (
                      <Link key={menuIndex} to={menuItem.link} className='list-dropdown-menu-item'>
                        {menuItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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

              <div
                className="btn btn-danger fw-semibold"
                onClick={handleUpTimeshare}
              >
                Đăng bán nhà đất
              </div>
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

              <Link
                className="btn btn-danger fw-semibold"
                to="/up-timeshare"
              >
                Đăng bán nhà đất
              </Link>
            </div>}

            {userDecode && Object.keys(userDecode).length !== 0 && <>
              <DropDownUser user={userDecode} actionLogout={logout} />

              {userDecode.role_id.roleName === "Investor"
                &&
                <Link
                  className="btn btn-danger fw-semibold"
                  to="/up-timeshare"
                >
                  Đăng bán nhà đất
                </Link>
              }
            </>}

            {showModal && <ModalConfirm show={showModal}
              handleClose={() => setShowModal(false)}
              handleAccept={() => { setModalLoginOpen(true); setShowModal(false) }}
              body={'Vui lòng đăng nhập trước khi đăng bán nhà đất!'} />
            }

            {isLoadingEvent && <SpinnerLoading />}
          </div>
        </div >
      </div >
    </header >
  )
}

export default UserHeader