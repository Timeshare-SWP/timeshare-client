import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/handleFunction";
import './style.scss'
import Modal from 'react-bootstrap/Modal';
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios'
import { AuthContext } from "../../contexts/authContext";
import { useCookies } from "react-cookie";


function Login({ open, onClose }) {
    const { login, loginWithGoogle, isLoadingEvent } = useContext(AuthContext);
    const [cookies, setCookie, removeCookie] = useCookies(["error"]);

    const [formData, setFormData] = useState({ email: '', password: '' })

    const errorAlert = useRef();
    const errorPassword = useRef();
    const inputRef = useRef();
    const [token, setToken] = useState('');

    useEffect(() => {
        cookies?.error && toast.error(cookies?.error);
        removeCookie("error");
    }, [cookies?.error, removeCookie]);


    const handleOnInput = (e) => {
        if (e.target.value) {
            errorAlert.current.innerText = "";
        }
        if (formData.password) {
            errorPassword.current.innerText = "";
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!formData.email) {
            errorAlert.current.className = "login__errorAlert";
            errorAlert.current.innerText = "Vui lòng nhập email!";
            inputRef.current.focus();
            return;
        }

        if (!validateEmail(formData.email)) {
            errorAlert.current.innerText = "Email không hợp lệ!";
            return;
        }

        if (!formData.password) {
            errorPassword.current.className = "login__errorAlert";
            errorPassword.current.innerText = "Vui lòng nhập mật khẩu!";
            return;
        }

        login(formData);
        onClose()
    };

    const handleLoginWithGoogle = () => {
        toast.error('Chưa hỗ trợ')
        onClose()
    }

    useEffect(() => {
        const url = new URL(window.location.href);
        const token = url.searchParams.get('token');
        if (token) {
            setToken(token)
        }
    }, [])

    return (
        <Modal show={open} onHide={onClose} dialogClassName="login-modal">
            <div className='login_container'>
                <div className='form_container'>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <div className='right'>
                        <h2 className='from_heading'>Chào mừng đến với chúng tôi</h2>
                        <form onSubmit={handleLogin} className="login__form-content">
                            <div className="input-box">
                                <input
                                    type="text"
                                    className='input'
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    onInput={handleOnInput}
                                    placeholder=" "
                                    ref={inputRef}
                                />
                                <label htmlFor="">Email</label>
                            </div>
                            <span ref={errorAlert}>{/* error alert */}</span>

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
                            <Link to='/forgot_password' onClick={onClose}>Quên mật khẩu?</Link>
                        </form>

                        <p className='text'>hoặc</p>
                        <button className='google_btn mt-2' onClick={handleLoginWithGoogle}>
                            <FcGoogle />
                            <span>Đăng nhập với Google</span>
                        </button>

                        <p className='text'>
                            Bạn chưa có sẵn tài khoản? <span className="text-signup" >Đăng ký</span>
                        </p>

                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default Login;