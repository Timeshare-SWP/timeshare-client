import React from 'react'
import { GrDocumentDownload } from "react-icons/gr";

const LeftSiteContract = () => {
    return (
        <div className='col-7 contract-container__left'>
            <div className='section-document'>
                <h5 className='mb-4'>Link</h5>

                <div className='btn btn-danger d-flex gap-2 justify-content-center align-items-center'
                    style={{ width: 'fit-content' }}
                >
                    <GrDocumentDownload /> Tải hợp đồng tại đây
                </div>
            </div>

            <div className='section-image  mt-5'>
                <h5 className='mb-4'>Hình ảnh</h5>

                <div className='section-image-container'>
                    <img src="https://sanketoan.vn/public/library_staff/25094/images/3(273).PNG" alt="contract" />
                    <img src="https://o.vdoc.vn/data/image/2022/05/16/Hop-dong-ve-quay-phim-chup-hinh-1-1.jpg" alt="contract" />
                </div>
            </div>

            <div className='section-phase mt-5'>
                <h5 className='mb-4'>Số lần thanh toán</h5>

                <div>
                    <table className='table'>
                        <thead>
                            <tr className='text-center'>
                                <th scope="col">Lần thanh toán</th>
                                <th scope="col">Ngày thanh toán</th>
                                <th scope="col">Số tiền phải trả</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='text-center'>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                            </tr>
                            <tr className='text-center'>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                            </tr>
                        </tbody>
                    </table >


                </div >
            </div >
        </div >
    )
}

export default LeftSiteContract