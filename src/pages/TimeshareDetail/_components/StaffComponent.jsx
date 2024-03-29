import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { viewAllStaff } from '../../../redux/features/staffSlice';
import { generateFallbackAvatar } from '../../../utils/handleFunction';
import { AiOutlineStar } from "react-icons/ai";

const StaffComponent = () => {

    const [staffsData, setStaffsData] = useState([]);
    const [randomStaff, setRandomStaff] = useState(null);
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(viewAllStaff()).then((resViewAll) => {
            if (viewAllStaff.fulfilled.match(resViewAll)) {
                setStaffsData(resViewAll.payload)
            }
        })
    }, [])

    useEffect(() => {
        if (staffsData.length > 0 && !randomStaff) {
            const randomIndex = Math.floor(Math.random() * staffsData.length);
            setRandomStaff(staffsData[randomIndex]);
        }
    }, [staffsData])

    const handleCallAdvisor = () => {
        setShowPhoneNumber(true);
    };

    return (
        <div className='container-right mt-4'>
            <div className=''>
                <h4>Liên hệ tư vấn</h4>

                <div className=''>
                    <div className='profile d-flex flex-row mt-4 align-items-center'>
                        <div className="avatar-profile">
                            <img src={randomStaff?.avatar_url ? randomStaff?.avatar_url : generateFallbackAvatar(randomStaff?.full_name)}
                                alt={randomStaff?.avatar_url ? "UserAva" : "IncognitoAva"} />
                        </div>

                        <div className='mt-3 d-flex' style={{ flexDirection: 'column', marginLeft: '15px' }}>
                            <h5 className='text-center'>{randomStaff?.fullName}</h5>
                            <div className='d-flex align-items-center gap-4 mt-2'>
                                <div className='d-flex align-items-center gap-2'>
                                    <AiOutlineStar
                                        style={{
                                            color: "#F2D21E",
                                        }}
                                    />
                                    <p>{randomStaff?.rating}.0</p>
                                </div>

                                <p>Chuyên viên tư vấn</p>
                            </div>

                        </div>
                    </div>

                    {showPhoneNumber ? (
                        <h4 className="text-danger text-center mt-4 mb-4">{randomStaff?.phone_number}</h4>
                    ) : (
                        <div className='btn btn-danger mt-4 mb-4' onClick={handleCallAdvisor}>Gọi chuyên viên ngay</div>
                    )}

                    <hr></hr>

                    <h5 className='mt-4 mb-4'>Khách hàng đánh giá</h5>

                    <p className='text-center' style={{ fontStyle: 'italic' }}>Chưa có ai đánh giá!</p>

                    <div className='feedback d-flex flex-row'>
                        <div className='avatar'></div>
                        <div className='content'></div>
                        <div className='date'></div>
                        <div className='rating'></div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default StaffComponent