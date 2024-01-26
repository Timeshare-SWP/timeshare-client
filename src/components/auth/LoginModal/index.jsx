import React, { useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../../utils/handleFunction";
import { FcGoogle } from "react-icons/fc";
import Modal from 'react-bootstrap/Modal';
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { checkEmailExisted } from '../../../redux/features/userSlice';
import { auth, providerGoogle } from '../../../utils/configFirebase';
import { signInWithPopup } from 'firebase/auth';

const LoginModal = (props) => {

    const { loginAction, loginGoogleAction, closeModalAction, actionSwapToRegister } = props

    const [formData, setFormData] = useState({ email: '', password: '' })

    const errorEmail = useRef();
    const errorPassword = useRef();

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleOnInput = () => {
        if (formData.email && errorEmail.current) {
            errorEmail.current.innerText = "";
        }
        if (formData.password && errorPassword.current) {
            errorPassword.current.innerText = "";
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!formData.email) {
            errorEmail.current.className = "login__errorAlert";
            errorEmail.current.innerText = "Vui lòng nhập email!";
            return;
        }

        if (!validateEmail(formData.email)) {
            errorEmail.current.innerText = "Email không hợp lệ!";
            return;
        }

        if (!formData.password) {
            errorPassword.current.className = "login__errorAlert";
            errorPassword.current.innerText = "Vui lòng nhập mật khẩu!";
            return;
        }

        loginAction(formData);
        closeModalAction()
    };

    const handleLoginWithGoogle = async () => {
        try {
            closeModalAction()

            const data = await signInWithPopup(auth, providerGoogle);

            const dataGoogle = {
                fullName: data?.user?.displayName,
                email: data?.user?.email,
                avatar_url: data?.user?.photoURL
            }

            dispatch(checkEmailExisted(data?.user?.email)).then((result) => {
                if (result.payload) {
                    loginGoogleAction(dataGoogle)
                } else {
                    closeModalAction()
                    navigate('/register', { state: { dataRegister: dataGoogle, isLoginGoogle: true } });
                }
            })
            console.log(data)
        } catch (error) {
            console.error("An error occurred during Google login:", error);
        }
    }

    const handleForgotPassword = () => {
        closeModalAction()
    }

    return (
        <div className='login_container'>
            <div className='form_container'>
                <Modal.Header closeButton>
                </Modal.Header>
                <div className='right'>
                    <h2 className='from_heading'>Chào mừng đến với TIMESHARE</h2>
                    <form onSubmit={handleLogin} className="login__form-content">
                        <div className="input-box">
                            <input
                                type="text"
                                className='input'
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                onInput={handleOnInput}
                                placeholder=" "
                            />
                            <label htmlFor="">Email</label>
                        </div>
                        <span ref={errorEmail}>{/* error alert */}</span>

                        <div className="input-box">
                            <input
                                type="password"
                                className='input'
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                onInput={handleOnInput}
                                placeholder=" "
                            />
                            <label htmlFor="">Mật khẩu</label>
                        </div>
                        <span ref={errorPassword}>{/* error alert */}</span>

                        <button type="submit" className='btn-login'>Đăng nhập</button>
                        <Link to='/forgot_password' onClick={handleForgotPassword}>Quên mật khẩu?</Link>
                    </form>

                    <p className='text'>hoặc</p>
                    <button className='google_btn mt-2' onClick={handleLoginWithGoogle}>
                        <FcGoogle />
                        <span>Đăng nhập với Google</span>
                    </button>

                    <p className='text'>
                        Bạn chưa có sẵn tài khoản? <span className="text-signup" onClick={actionSwapToRegister}>Đăng ký</span>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default LoginModal