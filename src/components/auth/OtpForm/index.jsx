import React, {useState} from 'react'
import './style.scss'
import Message from '../../shared/Message'

const OtpForm = ({ verifyAction, resendOtpAction, inputsRef, error, setError }) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain');
        const digits = pastedData.replace(/\D/g, '').split('');

        digits.forEach((digit, index) => {
            if (inputsRef.current[index]) {
                inputsRef.current[index].value = digit;
            }
        });

        const emptyInput = inputsRef.current.find((input) => input.value === '');
        if (emptyInput) {
            emptyInput.focus();
        } else {
            inputsRef.current[inputsRef.current.length - 1].focus();
        }


    };

    const handleInput = (e, index) => {
        if (setError) {
            setError()
        }
        const inputLength = e.target.value.length;
        const maxLength = e.target.getAttribute('maxlength');

        if (e.key === 'Backspace' && inputLength === 0 && index > 0) {
            inputsRef.current[index - 1].value = '';
            inputsRef.current[index - 1].focus();
        } else if (inputLength >= maxLength && index < inputsRef.current.length - 1) {
            inputsRef.current[index + 1].focus();
        }

    };

    const handleKeyPress = (e) => {

        const keyCode = e.keyCode || e.which;
        const keyValue = String.fromCharCode(keyCode);
        const regex = /[0-9]/;

        if (!regex.test(keyValue)) {
            e.preventDefault();
        }

    };

    const checkButtonDisabled = () => {
        if (inputsRef.current.filter((input) => input.value !== '').length !== 6) {
            setIsButtonDisabled(true);
        } else {
            setIsButtonDisabled(false);
        }
    };

    const handleVerify = () => {
        if (!isButtonDisabled) {
            verifyAction();
        }
    };

    return (
        <div className="otp-Form">
            <div className="inputs">
                <input ref={(ref) => (inputsRef.current[0] = ref)} type="text" maxLength="1" onKeyDown={(e) => handleInput(e, 0)} onKeyUp={checkButtonDisabled} onKeyPress={handleKeyPress} onPaste={handlePaste} />
                <input ref={(ref) => (inputsRef.current[1] = ref)} type="text" maxLength="1" onKeyDown={(e) => handleInput(e, 1)} onKeyUp={checkButtonDisabled} onKeyPress={handleKeyPress} />
                <input ref={(ref) => (inputsRef.current[2] = ref)} type="text" maxLength="1" onKeyDown={(e) => handleInput(e, 2)} onKeyUp={checkButtonDisabled} onKeyPress={handleKeyPress} />
                <input ref={(ref) => (inputsRef.current[3] = ref)} type="text" maxLength="1" onKeyDown={(e) => handleInput(e, 3)} onKeyUp={checkButtonDisabled} onKeyPress={handleKeyPress} />
                <input ref={(ref) => (inputsRef.current[4] = ref)} type="text" maxLength="1" onKeyDown={(e) => handleInput(e, 4)} onKeyUp={checkButtonDisabled} onKeyPress={handleKeyPress} />
                <input ref={(ref) => (inputsRef.current[5] = ref)} type="text" maxLength="1" onKeyDown={(e) => handleInput(e, 5)} onKeyUp={checkButtonDisabled} onKeyPress={handleKeyPress} />
            </div>

            <button
                className={`verifyButton ${isButtonDisabled ? 'button-none-event' : ''}`}
                type="submit"
                onClick={handleVerify}
            >
                Xác nhận
            </button>

            {error && <Message text_color={'text-danger'} children={error} />}

            <div className="d-flex bottom-content gap-2">
                <p className="resendNote">Bạn không nhận được OTP? </p>
                {resendOtpAction &&
                    <button className="resendBtn" onClick={() => resendOtpAction()}>
                        Gửi lại mã
                    </button>
                }
            </div>
        </div>
    );
};

export default OtpForm;
