import React, { useState, useContext, useEffect, useRef } from "react";

import './style.scss'
import Modal from 'react-bootstrap/Modal';
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/authContext";
import { useCookies } from "react-cookie";
import LoginModal from "../LoginModal";
import RegisterModal from "../RegisterModal";


function Authentication(props) {
    const { open, onClose, swapToRegisterState, actionSwapToRegister, actionSwapToLogin } = props
    const { login, loginWithGoogle } = useContext(AuthContext);

    const [cookies, setCookie, removeCookie] = useCookies(["error"]);
    const [token, setToken] = useState('');

    useEffect(() => {
        cookies?.error && toast.error(cookies?.error);
        removeCookie("error");
    }, [cookies?.error, removeCookie]);

    useEffect(() => {
        const url = new URL(window.location.href);
        const token = url.searchParams.get('token');
        if (token) {
            setToken(token)
        }
    }, [])

    return (
        <Modal show={open} onHide={onClose} dialogClassName="login-modal">
            {!swapToRegisterState
                ? <LoginModal
                    loginAction={login}
                    swapToRegisterState={swapToRegisterState}
                    loginGoogleAction={loginWithGoogle}
                    closeModalAction={onClose}
                    actionSwapToRegister={actionSwapToRegister}
                    actionSwapToLogin={actionSwapToLogin}
                />
                : <RegisterModal actionSwapToLogin={actionSwapToLogin} loginGoogleAction={loginWithGoogle} closeModalAction={onClose} />
            }
        </Modal>
    );
}

export default Authentication;