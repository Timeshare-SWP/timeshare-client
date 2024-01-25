import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.scss'
import { useDispatch } from 'react-redux'
import { forgotPassword, resetPassword } from '../../../redux/features/userSlice'
import SpinnerLoading from '../../shared/SpinnerLoading'
import { validateEmail } from '../../../utils/handleFunction'
import { Modal } from 'react-bootstrap'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [errEmail, setErrEmail] = useState('')
    const [sendingOtp, setSendingOtp] = useState(false)
    const [openFormOtp, setOpenFormOtp] = useState(false)

    const [isOpenModalConfirmOtp, setIsOpenModalConfirmOtp] = useState(false)
    const [otp, setOtp] = useState('')
    const [errOtp, setErrOtp] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Tìm kiếm email
    const handleEmailChange = (e) => {
        setErrEmail('')
        setEmail(e.target.value)
    }

    const handleCancel = () => {
        navigate('/')
    }

    const handleFindEmail = () => {
        if (!email.trim()) {
            setErrEmail('Vui lòng nhập email!');
            return;
        }

        if (!validateEmail(email)) {
            setErrEmail('Email không hợp lệ!');
            return;
        }

        setSendingOtp(true)
        dispatch(forgotPassword(email)).then((result) => {
            if (forgotPassword.fulfilled.match(result)) {
                console.log('thấy email')
                setOpenFormOtp(true)
            } else {
                setErrEmail('Không tìm thấy email trong hệ thống!')
            }
            setSendingOtp(false)
        })
    }

    //Qua bước confirm OTP
    const handleOtpChange = (e) => {
        setSendingOtp(false)
        setErrOtp('')
        setOtp(e.target.value)
    }

    const handleKeyPress = (e) => {
        const inputChar = e.key;

        if (!/\d/.test(inputChar)) {
            e.preventDefault();
        } else {
            setOtp(otp + inputChar);
        }
    }

    const handleOk = () => {
        navigate('/')
    }

    const handleConfirmOtp = () => {
        const data = {
            email: email,
            otp: otp
        }
        setSendingOtp(true)
        dispatch(resetPassword(data)).then((result) => {
            setSendingOtp(false)
            setIsOpenModalConfirmOtp(true)
        })
    }

    return (
        <div className='choose-role-background'>
            {!openFormOtp
                ?
                <div className='card_forgot_password'>
                    <div className='d-flex form_forgot_password'>
                        <h4>Tìm kiếm tài khoản của bạn</h4>
                        <hr></hr>
                        <label htmlFor="email" className="form-label">Nhập địa chỉ email để tìm kiếm tài khoản của bạn</label>
                        <input type="email" id="email" placeholder='Email' value={email} onChange={handleEmailChange} />
                        {errEmail && <span style={{ color: 'red' }}>{errEmail}</span>}
                        <hr></hr>
                        <div className='d-flex justify-content-end'>
                            <button className='btn btn-outline-secondary mr-5' onClick={handleCancel}>Hủy</button>
                            <button className='btn btn-primary' onClick={handleFindEmail}>Tìm</button>
                        </div>
                    </div>
                </div>
                :
                <div className='card_otp'>
                    <div className='d-flex card_form'>
                        <h4>Xác thực OTP</h4>
                        <hr></hr>
                        <label htmlFor="email" className="form-label">OTP đã được gửi, vui lòng kiểm tra và xác thực tại đây</label>
                        <input type="text" inputMode="numeric" id="email" placeholder='Nhập OTP' value={otp} onChange={handleOtpChange} onKeyPress={handleKeyPress} />
                        {errOtp && <span style={{ color: 'red' }}>OTP không chính xác!</span>}

                        <hr></hr>
                        <div className='d-flex justify-content-end'>
                            <button className='btn btn-outline-secondary mr-5' onClick={handleCancel}>Hủy</button>
                            <button className='btn btn-primary' onClick={handleConfirmOtp}>Xác nhận</button>
                        </div>
                    </div>

                    <Modal show={isOpenModalConfirmOtp} onHide={handleOk} >
                        <div className='p-3'>
                            <p>Mật khẩu mới đã được gửi, vui lòng kiểm tra email và đăng nhập lại bằng mật khẩu mới!</p>
                            <div className='mt-3 d-flex justify-content-end'>
                                <button type="submit" className='btn btn-primary' onClick={handleOk}>Xác nhận</button>
                            </div>
                        </div>
                    </Modal>
                </div>
            }

            {sendingOtp && <SpinnerLoading />}
        </div>
    )
}

export default ForgotPassword