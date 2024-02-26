import React, { useEffect } from 'react'
import "./style.scss"
import { useDispatch, useSelector } from 'react-redux'
import { createTimeshare, getTimeshareForGuest } from '../../../redux/features/timeshareSlice'
import LoadingProject from './_component/LoadingProject'
import { Link, useNavigate } from 'react-router-dom'
import { convertToSlug } from '../../../utils/handleFunction'

const OutstandingProject = () => {

    const img_tmp = "https://photo.rever.vn/v3/get/m8sgt22ufK23zAKaupTzeH+7CNCkH1fORnYxoVSNMIE=/450x300/image.jpg"

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { dataTimeshareList, loadingTimeshare } = useSelector((state) => state.timeshare)

    console.log("dataTimeshareList", dataTimeshareList)

    const handleNavigateToTimeShareDetail = (item) => {
        navigate(`/timeshare-list/${convertToSlug(item.timeshare_name)}`, { state: { item } })
    }

    useEffect(() => {
        dispatch(getTimeshareForGuest())
    }, [])

    if (loadingTimeshare) {
        return (<LoadingProject />)
    }

    return (
        <>
            <div className='outstanding-project-section py-5'>
                <h4>Dự án mới nổi bật</h4>

                <div className='list-outstanding-project d-flex mt-4 gap-4'>
                    {Array.isArray(dataTimeshareList) && dataTimeshareList.map((item, index) => (
                        <div
                            className="item"
                            key={index}
                            style={{
                                backgroundImage:
                                    `url(${item?.timeshare_image
                                        && item?.timeshare_image.length > 0
                                        ? item?.timeshare_image[0]?.timeshare_img_url
                                        : img_tmp}
                                        )`
                            }}
                            onClick={() => handleNavigateToTimeShareDetail(item)}
                        >
                            <div className="overlay" />
                            <div className='content'>
                                {item.sell_timeshare_status === "Chưa được bán"
                                    ? <div className='btn btn-danger status-buy'>SẮP MỞ BÁN</div>
                                    : item.sell_timeshare_status === "Đang mở bán"
                                        ? <div className='btn btn-success status-buy'>ĐANG MỞ BÁN</div>
                                        : <div className='btn btn-secondary status-buy'>ĐÃ BÁN</div>
                                }
                                <div className='bottom-content'>
                                    <h5 className='fw-semibold'>{item.timeshare_name}</h5>
                                    <p className='address'>{item.timeshare_address}</p>
                                    <p className='fw-semibold'>Giá: {item.land_area} triệu/m2</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='outstanding-project-section pb-5'>
                <div className='d-flex justify-content-between align-items-center'>
                    <Link to="/timeshare-list" style={{ textDecoration: 'none', color: 'black' }}>
                        <h4 >Dự án dành cho bạn</h4>
                    </Link>
                    <Link to="/timeshare-list">Xem tất cả</Link>
                </div>

                <div className='list-outstanding-project d-flex mt-4 gap-4'>
                    {Array.isArray(dataTimeshareList) && dataTimeshareList.map((item, index) => (
                        <div
                            className="item"
                            key={index}
                            style={{
                                backgroundImage:
                                    `url(${item?.timeshare_image
                                        && item?.timeshare_image.length > 0
                                        ? item?.timeshare_image[0]?.timeshare_img_url
                                        : img_tmp}
                                        )`
                            }}
                            onClick={() => handleNavigateToTimeShareDetail(item)}
                        >
                            <div className="overlay" />
                            <div className='content'>
                                {item.timeshare_status === "Sắp triển khai"
                                    ? <div className='btn btn-warning status-buy'>SẮP TRIỂN KHAI</div>
                                    : item.timeshare_status === "Đang triển khai"
                                        ? <div className='btn btn-success status-buy'>ĐANG TRIỂN KHAI</div>
                                        : <div className='btn btn-secondary status-buy'>ĐÃ TRIỂN KHAI</div>
                                }
                                <div className='bottom-content'>
                                    <h5 className='fw-semibold'>{item.timeshare_name}</h5>
                                    <p className='address'>{item.timeshare_address}</p>
                                    <p className='fw-semibold'>Giá: {item.land_area} triệu/m2</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default OutstandingProject