import React from 'react'
import './style.scss'
import PostForm from './_components/PostForm'

const PostTimeshare = () => {
    return (
        <div className='post-timeshare-container'>
            <div className='post-timeshare-container__left webkit-scrollbar'>
                <div className='content'>
                    <div className='content__first'>
                        <h2>Cam kết với khách hàng</h2>
                        <ul>
                            <li>
                                <img src="https://s3-cdn.rever.vn/p/v2.48.39/images/icon/shield-check.svg" alt="Timeshare" />
                                <div class="text d-flex flex-column">
                                    Đặt khách hàng làm trọng tâm trong mọi quyết định</div>
                            </li>
                            <li>
                                <img src="https://s3-cdn.rever.vn/p/v2.48.39/images/icon/shield-check.svg" alt="Timeshare" />
                                <div class="text d-flex flex-column"> Những điều đã nói là những điều được làm</div>
                            </li>
                            <li>
                                <img src="https://s3-cdn.rever.vn/p/v2.48.39/images/icon/shield-check.svg" alt="Timeshare" />
                                <div class="text d-flex flex-column">Đảm bảo thực thi (Miễn phí các dịch vụ cao cấp nếu không bán được nhà)
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className='content__second'>
                        <h2>Miễn phí các dịch vụ bổ sung</h2>
                        <ul>
                            <li>
                                <img src="https://s3-cdn.rever.vn/p/v2.48.39/images/icon/camera-plus.svg" alt="Timeshare" />
                                <div class="text d-flex flex-column w-100">
                                    <div class="d-flex flex-row justify-content-between w-100">
                                        <p class="m-0">Dịch vụ chụp ảnh chuyên nghiệp</p>
                                    </div>
                                    <p class="subtext"> Hình ảnh chất lượng cao, chuyên nghiệp <br /> Tiết kiệm đến 1.000.000 đồng so với thị trường
                                    </p>
                                </div>
                            </li>
                            <li>
                                <img src="https://s3-cdn.rever.vn/p/v2.48.39/images/icon/3d-cube-sphere.svg" alt="Timeshare" />
                                <div class="text d-flex flex-column w-100">
                                    <div class="d-flex flex-row justify-content-between w-100">
                                        <p class="m-0">Dịch vụ thực tế ảo (3D)</p></div>
                                    <p class="subtext"> Trải nghiệm xem nhà như thật, chốt giao dịch nhanh <br /> Tiết kiệm đến 5.000.000 đồng so với thị trường </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <PostForm />
        </div>
    )
}

export default PostTimeshare