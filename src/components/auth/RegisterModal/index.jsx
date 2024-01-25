import React, { useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import toast from "react-hot-toast";
import './style.scss';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const RegisterModal = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        roleName: ''
    });

    const errorRefs = {
        fullName: useRef(),
        email: useRef(),
        password: useRef(),
        confirmPassword: useRef(),
    };

    const navigate = useNavigate();

    const handleOnInput = (fieldName) => {
        if (formData[fieldName] && errorRefs[fieldName].current) {
            errorRefs[fieldName].current.innerText = "";
        }
    };

    const handleChange = (fieldName, value) => {
        setFormData({ ...formData, [fieldName]: value });
    };

    const handleRegister = (e) => {
        e.preventDefault();

        // Basic form validation
        const { fullName, email, password, confirmPassword } = formData;
        let isValid = true;

        if (!fullName.trim()) {
            errorRefs.fullName.current.innerText = "Vui lòng nhập tên của bạn!";
            isValid = false;
        }

        if (!email.trim()) {
            errorRefs.email.current.innerText = "Vui lòng nhập địa chỉ email!";
            isValid = false;
        }

        if (!password.trim()) {
            errorRefs.password.current.innerText = "Vui lòng nhập mật khẩu!";
            isValid = false;
        }

        if (password.trim() !== confirmPassword.trim()) {
            errorRefs.confirmPassword.current.innerText = "Mật khẩu nhập lại không khớp!";
            isValid = false;
        }

        if (isValid) {
            navigate("/register");
        }
    };


    return (
        <>
            <Modal.Header closeButton />
            <div className='form-register'>
                <h2 className='from_heading text-center'>Đăng ký</h2>

                <form className='form-register__content' onSubmit={handleRegister}>
                    {Object.keys(errorRefs).map((fieldName) => (
                        <div key={fieldName}>
                            <Form.Label className="mt-2" htmlFor="">{fieldName === 'fullName' ? 'Tên của bạn' : fieldName === 'email' ? 'Địa chỉ email' : fieldName === 'password' ? 'Mật khẩu' : 'Nhập lại mật khẩu'}</Form.Label>
                            <Form.Control
                                type={fieldName.includes('password') ? 'password' : 'text'}
                                className='input'
                                value={formData[fieldName]}
                                onChange={(e) => handleChange(fieldName, e.target.value)}
                                onInput={() => handleOnInput(fieldName)}
                                placeholder=" "
                            />
                            {errorRefs[fieldName].current
                                ? <div style={{ height: '10px' }}></div>
                                : <span ref={errorRefs[fieldName]} className='text-error'> </span>
                            }
                        </div>
                    ))}

                    <div type="submit" className='btn-register'>Đăng ký</div>
                </form>

                <div className='another-register'>
                    <div className='social-button'>
                        <img style={{ width: '15px', height: '15px' }}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/480px-Facebook_Logo_%282019%29.png" alt="fb_logo"
                        />
                        <p>Facebook</p>
                    </div>
                    <div className='social-button'>
                        <FcGoogle />
                        <p>Google</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterModal;
