import React, { useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import toast from "react-hot-toast";
import './style.scss';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { validateEmail } from '../../../utils/handleFunction';
import { useDispatch, useSelector } from 'react-redux';
import { checkEmailExisted } from '../../../redux/features/userSlice';
import SpinnerLoading from "../../shared/SpinnerLoading"
import { auth, providerGoogle } from '../../../utils/configFirebase';
import { signInWithPopup } from 'firebase/auth';

const RegisterModal = (props) => {

    const { actionSwapToLogin, loginGoogleAction, closeModalAction } = props

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const formFieldNames = ['fullName', 'email', 'password', 'confirmPassword'];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loadingUser } = useSelector((state) => state.user)

    const handleChange = (fieldName, value) => {
        setFormData({ ...formData, [fieldName]: value });
        setErrors({ ...errors, [fieldName]: '' });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const { fullName, email, password, confirmPassword } = formData;
        let isValid = true;

        const newErrors = {};

        if (!fullName.trim()) {
            newErrors.fullName = 'Vui lòng nhập tên của bạn.';
            isValid = false;
        }

        if (!validateEmail(email)) {
            newErrors.email = 'Địa chỉ email không hợp lệ.';
            isValid = false;
        }

        if (!email.trim()) {
            newErrors.email = 'Vui lòng nhập địa chỉ email.';
            isValid = false;
        }

        if (!password.trim()) {
            newErrors.password = 'Vui lòng nhập mật khẩu.';
            isValid = false;
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp.';
            isValid = false;
        }

        if (!isValid) {
            setErrors(newErrors);
            return;
        }

        dispatch(checkEmailExisted(email)).then((result) => {
            if (result.payload === true) {
                newErrors.email = 'Địa chỉ email này đã tồn tại';
                setErrors(newErrors);
                return
            } else {
                setFormData({
                    fullName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                })
                closeModalAction()
                navigate('/register', { state: { dataRegister: formData, isLoginGoogle: false } });
            }
        })
    };

    const handleFacebookLogin = () => {
        toast.error('Chưa hỗ trợ tính năng này')
    }

    const handleGoogleLogin = async () => {
        try {
            const data = await signInWithPopup(auth, providerGoogle);
            const dataGoogle = {
                fullName: data?.user?.displayName,
                email: data?.user?.email,
                avatar_url: data?.user?.photoURL,
                roleName: " "
            }

            dispatch(checkEmailExisted(data?.user?.email)).then((result) => {
                if (result.payload) {
                    closeModalAction()
                    loginGoogleAction(dataGoogle)
                } else {
                    closeModalAction()
                    navigate('/register', { state: { dataRegister: dataGoogle, isLoginGoogle: true } });
                }
            })

        } catch (error) {
            console.error("An error occurred during Google login:", error);
        }
    }


    return (
        <>
            <Modal.Header closeButton />
            <div className='form-register'>
                <h2 className='from_heading text-center'>Đăng ký</h2>

                <form className='form-register__content' onSubmit={handleRegister}>
                    {formFieldNames.map((fieldName) => (
                        <div key={fieldName}>
                            <Form.Label className="mt-2" htmlFor="">{fieldName === 'fullName' ? 'Tên của bạn' : fieldName === 'email' ? 'Địa chỉ email' : fieldName === 'password' ? 'Mật khẩu' : 'Nhập lại mật khẩu'}</Form.Label>
                            <Form.Control
                                type={fieldName.includes('assword') ? 'password' : 'text'}
                                className='input'
                                value={formData[fieldName]}
                                onChange={(e) => handleChange(fieldName, e.target.value)}
                                placeholder=" "
                            />

                            {errors[fieldName]
                                ? <span className="text-error">{errors[fieldName]}</span>
                                : <div style={{ height: '24px' }}></div>
                            }

                        </div>
                    ))}

                    <button type="submit" className='btn-register'>Đăng ký</button>
                </form>

                <div className='another-register'>
                    <div className='social-button' onClick={handleFacebookLogin}>
                        <img style={{ width: '15px', height: '15px' }}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/480px-Facebook_Logo_%282019%29.png" alt="fb_logo"
                        />
                        <p>Facebook</p>
                    </div>
                    <div className='social-button' onClick={handleGoogleLogin}>
                        <FcGoogle />
                        <p>Google</p>
                    </div>
                </div>
            </div>

            {loadingUser && <SpinnerLoading />}
        </>
    );
};

export default RegisterModal;
