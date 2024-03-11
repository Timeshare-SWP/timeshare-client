import React, { useEffect, useState } from 'react'
import { GrDocumentDownload } from "react-icons/gr";
import { useDispatch } from 'react-redux';
import { getPhaseByContractId } from '../../../../redux/features/phaseSlice';
import { convertToNumberFormat, convertToVNDFormat, convertToVnTime } from '../../../../utils/handleFunction';

const LeftSiteContract = (props) => {
    const { dataContract, setDataContract } = props
    console.log("dataContract", dataContract)

    const dispatch = useDispatch();
    const [phaseData, setPhaseData] = useState([])
    const firstContractLink = dataContract?.contract_related_link?.[0] || '';

    const handleViewContract = () => {
        if (firstContractLink) {
            window.open(firstContractLink, '_blank');
        }
    };

    useEffect(() => {
        dispatch(getPhaseByContractId(dataContract?._id)).then((resGetAll) => {
            setPhaseData(resGetAll.payload)
        })
    }, [])

    return (
        <div className='col-7 contract-container__left'>
            <div className='section-document'>
                <h5 className='mb-4'>File hợp đồng</h5>

                <div className='btn btn-danger d-flex gap-2 justify-content-center align-items-center'
                    style={{ width: 'fit-content' }}
                    onClick={handleViewContract}
                >
                    <GrDocumentDownload /> Xem hợp đồng tại đây
                </div>
            </div>

            <div className='section-image  mt-5'>
                <h5 className='mb-4'>Hình ảnh</h5>

                <div className='section-image-container'>
                    {dataContract.contract_image?.map((item, index) => (
                        <img src={item.contract_url} alt="img_contract" key={index} />
                    ))}
                </div>
            </div>

            <div className='section-phase mt-5'>
                <h5 className='mb-4'>Số lần thanh toán</h5>

                <div>
                    <table className='table'>
                        <thead>
                            <tr className='text-center'>
                                <th scope="col">Lần thanh toán</th>
                                <th scope="col">Hạn thanh toán</th>
                                <th scope="col">Phần trăm</th>
                                <th scope="col">Thành tiền phải trả</th>
                            </tr>
                        </thead>
                        <tbody>
                            {phaseData?.map((item, index) => (
                                <tr className='text-center' key={index}>
                                    <td scope="row">{index + 1}</td>
                                    <td>{convertToVnTime(item?.remittance_deadline)}</td>
                                    <td>{item?.phase_price_percent} %</td>
                                    <td>{convertToNumberFormat(item?.phase_price)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table >
                </div >
            </div >
        </div >
    )
}

export default LeftSiteContract