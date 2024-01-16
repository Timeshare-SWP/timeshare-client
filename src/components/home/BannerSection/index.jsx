import React from 'react'
import './style.scss'
import { BiSearchAlt2 } from "react-icons/bi";
import Hint from "../../shared/Hint"
import { IoIosInformation } from "react-icons/io";

const BannerSection = () => {
    return (
        <section className="p-0 banner-section">
            <div className="overlay"></div>

            <div className='container banner-content'>
                <div className='d-flex gap-2'>
                    <p className='fw-semibold'>An tâm với 100% bất động sản xác thực</p>
                    <Hint content="Tồn tại thực - Hình ảnh thực tế - Giá đúng thị trường - Sẵn sàng giao dịch">
                        <div className='d-flex justify-content-center align-items-center bg-body-secondary rounded-circle' style={{ cursor: "pointer", width: "15px", height: "15px" }}><IoIosInformation className='text-black'/></div>
                    </Hint>
                </div>

                <h1 className='my-3'>Lựa chọn timeshare ưng ý của bạn</h1>

                <div className='d-flex gap-5'>
                    <p
                        className="nav__item fw-bold active"
                    >
                        Mua nhà
                    </p>

                    <p
                        className="nav__item fw-bold"
                    >
                        Thuê nhà
                    </p>
                </div>

                <form className="d-flex align-items-center my-4">
                    <BiSearchAlt2 className='text-black mx-2' />
                    <input className="" type="search" placeholder="Tìm kiếm nhà đất" />
                    <button className="btn btn-danger" type="submit">Tìm kiếm</button>
                </form>

                <div className='d-flex align-items-center gap-2'>
                    <p className="fw-semibold">Gợi ý: </p>
                    <div className='list-suggest d-flex align-items-center gap-2'>
                        <div className='btn btn-outline-light'>The Rivana</div>
                        <div className='btn btn-outline-light'>The Rivana</div>
                        <div className='btn btn-outline-light'>The Rivana</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BannerSection