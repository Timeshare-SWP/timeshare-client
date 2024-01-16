import React from 'react'
import "./style.scss"

const OutstandingProject = () => {

    const itemExample = [
        {
            isCanBuy: true,
            link_img: "https://photo.rever.vn/v3/get/m8sgt22ufK23zAKaupTzeH+7CNCkH1fORnYxoVSNMIE=/450x300/image.jpg",
            name: "The Rivana",
            address: "Thuận An, Bình Dương",
            price: 36
        },
        {
            isCanBuy: false,
            link_img: "https://photo.rever.vn/v3/get/m8sgt22ufK23zAKaupTzeH+7CNCkH1fORnYxoVSNMIE=/450x300/image.jpg",
            name: "The Rivana",
            address: "Thuận An, Bình Dương",
            price: 36
        },
        {
            isCanBuy: false,
            link_img: "https://photo.rever.vn/v3/get/m8sgt22ufK23zAKaupTzeH+7CNCkH1fORnYxoVSNMIE=/450x300/image.jpg",
            name: "The Rivana",
            address: "Thuận An, Bình Dương",
            price: 36
        },
        {
            isCanBuy: true,
            link_img: "https://photo.rever.vn/v3/get/m8sgt22ufK23zAKaupTzeH+7CNCkH1fORnYxoVSNMIE=/450x300/image.jpg",
            name: "The Rivana",
            address: "Thuận An, Bình Dương",
            price: 36
        },
    ]

    return (
        <div className='outstanding-project-section py-5'>
            <h4>Dự án mới nổi bật</h4>

            <div className='list-outstanding-project d-flex mt-4 gap-4'>
                {itemExample.map((item, index) => (
                    <div
                        className="item"
                        key={index}
                        style={{ backgroundImage: `url(${item.link_img})` }}
                    >
                        <div className="overlay" />
                        <div className='content'>

                            {item.isCanBuy ? <div className='btn btn-danger status-buy'>SẮP MỞ BÁN</div>
                                : <div className='btn btn-success status-buy'>ĐANG MỞ BÁN</div>}
                            <div className='bottom-content'>
                                <h5 className='fw-semibold'>{item.name}</h5>
                                <p className='address'>{item.address}</p>
                                <p className='fw-semibold'>Giá: {item.price} triệu/m2</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OutstandingProject