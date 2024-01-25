import React, { useContext, useRef, useState } from 'react'
import './style.scss'
import { Container } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { registerUser, sendOtpWhenRegister, verifyOtpWhenRegister } from '../../redux/features/authSlice';
import toast from "react-hot-toast";
import SpinnerLoading from '../../components/shared/SpinnerLoading'
import { CHOOSE_LIST_ROLE } from '../../constants/role';
import OtpForm from '../../components/auth/OtpForm';
import { getOtpFromSessionStorage, removeOtpFromSessionStorage } from '../../redux/utils/handleOtp';
import { AuthContext } from '../../contexts/authContext';

const Register = () => {

  const { login, isLoadingEvent } = useContext(AuthContext)

  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { loadingAuth } = useSelector((state) => state.auth)
  const [dataRegister, setDataRegister] = useState(location?.state?.dataRegister)
  console.log('dataRegister', dataRegister)
  const [openOtpForm, setOpenOtpForm] = useState(false);

  const [errorOtp, setErrorOtp] = useState('');
  const inputsOtpRef = useRef([]);

  //Trên UI sau khi chọn role xong sẽ gửi OTP và cần confirm OTP
  const handleSelectedRole = (value) => {
    setDataRegister((prev) => ({ ...prev, roleName: value, gender: "", dob: "", address: "", phone_number: "" }));
    dispatch(sendOtpWhenRegister(dataRegister?.email)).then((result) => {
      if (sendOtpWhenRegister.fulfilled.match(result)) {
        setOpenOtpForm(true)
      } else {
        if (!result?.payload) {
          toast.error('Đã có lỗi xảy ra vui lòng thử lại sau!')
        } else {
          toast.error(result.payload)
        }
      }
    })
  };

  //Xác nhận otp nhập đúng hay sai
  const confirmOTP = () => {
    setErrorOtp('')
    const otpEntered = [
      inputsOtpRef.current[0].value,
      ...inputsOtpRef.current.slice(1).map(input => input.value)
    ].join('');

    const otpReceivedFromApi = getOtpFromSessionStorage()

    const dataVerifyOtp = {
      otp: otpEntered?.toString(),
      otpExpired: otpReceivedFromApi.otpExpires,
      otpStored: otpReceivedFromApi?.otp?.toString(),
      fullName: dataRegister.fullName,
      email: dataRegister.email,
      imgURL: ""
    }

    dispatch(verifyOtpWhenRegister(dataVerifyOtp)).then((result) => {
      if (verifyOtpWhenRegister.fulfilled.match(result)) {
        removeOtpFromSessionStorage()
        dispatch(registerUser(dataRegister)).then((response) => {
          console.log(response)
          if (registerUser.fulfilled.match(response)) {
            toast.success('Tạo tài khoản thành công!')
            login({ email: dataRegister.email, password: dataRegister.password })
            navigate('/')
          } else {
            toast.error('Đã có lỗi xảy ra khi tạo tài khoản, vui lòng thử lại sau!')
            navigate('/')
          }
        })
      } else {
        setErrorOtp('OTP bị sai, vui lòng nhập lại!')
      }
    })

  }

  return (
    <Container className='choose-role-background'>

      <div className='choose-role-container'>
        {!openOtpForm
          ?
          <>
            <h4>Bạn sử dụng trang với vai trò</h4>

            <div className='list-role'>
              {CHOOSE_LIST_ROLE.map((item, index) => (
                <div className='card-item' key={index} onClick={() => handleSelectedRole(item.value)}>
                  <div className='card-item-image'>
                    <img src={item.img} alt="img" />
                  </div>

                  <h6 className='card-item-role-name'>
                    {item.roleName}
                  </h6>
                  <p className='card-item-description'>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </>
          :

          <>
            <h4>OTP đã được gửi vui lòng kiểm tra gmail và xác thực:</h4>
            <OtpForm
              verifyAction={confirmOTP}
              inputsRef={inputsOtpRef}
              error={errorOtp}
            />
          </>
        }
      </div>



      {(loadingAuth || isLoadingEvent) && <SpinnerLoading />}

    </Container>
  )
}

export default Register