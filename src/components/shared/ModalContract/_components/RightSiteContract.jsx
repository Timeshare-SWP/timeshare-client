import React, { useContext, useEffect, useState } from 'react'
import { confirmContractByCustomer, getAllContractStatusByContractId } from '../../../../redux/features/contractSlice';
import { useDispatch } from 'react-redux';
import { convertToNumberFormat, convertToVnTime } from '../../../../utils/handleFunction';
import { AuthContext } from '../../../../contexts/authContext';
import ModalConfirm from '../../ModalConfirm';
import toast from 'react-hot-toast';
import { createNotification } from '../../../../redux/features/notificationSlice'
import SpinnerLoading from '../../../../components/shared/SpinnerLoading'

const RightSiteContract = (props) => {
    const { dataContract, setDataContract } = props
    const dispatch = useDispatch();
    const [contractStatus, setContractStatus] = useState([])
    const { userDecode } = useContext(AuthContext)
    const [selectedConfirm, setSelectedConfirm] = useState(false)
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleWantToConfirmContract = (item) => {
        setSelectedConfirm(item)
        setOpenModalConfirm(true)
    }

    const handleCallApiConfirmContract = () => {
        setIsLoading(true)
        dispatch(confirmContractByCustomer(dataContract?._id)).then((resConfirm) => {
            if (confirmContractByCustomer.fulfilled.match(resConfirm)) {

                const dataBodyNoti = {
                    user_id: "65ae4a156c28b26cd393f64b", //invester
                    notification_content: `${userDecode?.fullName} đã xác nhận hợp đồng cho timeshare mà bạn đã mua. Vui lòng vào xác nhận!`,
                    notification_title: `ACCEPT_CONTRACT_TO_INVESTOR`,
                    notification_type: `ACCEPT_CONTRACT_TO_INVESTOR`,
                };

                dispatch(createNotification(dataBodyNoti)).then((resNoti) => {
                    console.log("resPhase", resNoti)
                })

                setContractStatus(prevDataContract => prevDataContract.map(contract => {
                    if (contract._id === selectedConfirm?._id) {
                        return { ...contract, is_confirm: true };
                    }
                    return contract;
                }));

                setIsLoading(false)
                toast.success('Xác nhận hợp đồng thành công!')
            } else {
                toast.error(`${resConfirm.payload}`)
                setIsLoading(false)
            }
        })
    }

    useEffect(() => {
        dispatch(getAllContractStatusByContractId(dataContract?._id)).then((resGetAll) => {
            setContractStatus(resGetAll.payload)
        })
    }, [])

    return (
        <div className='col-5 contract-container__right'>
            <h5>Bên mua</h5>

            <div className='table'>
                <table className='table'>
                    <thead>
                        <tr className='text-center'>
                            <th scope="col" style={{ fontSize: '12px' }}>Họ và tên</th>
                            <th scope="col" style={{ fontSize: '12px' }}>Số điện thoại</th>
                            <th scope="col" style={{ fontSize: '12px' }}>Trạng thái</th>
                            {userDecode?.role_id.roleName === "Customer"
                                &&
                                <th scope="col" style={{ fontSize: '12px' }}>
                                    Tiến hành xác nhận
                                </th>
                            }

                        </tr>
                    </thead>
                    <tbody>
                        {contractStatus?.map((item, index) => (
                            <tr className='text-center' key={index}>
                                <td style={{ fontSize: '15px' }}>{item?.customer_id.fullName}</td>
                                <td style={{ fontSize: '15px' }}>
                                    {item?.customer_id.phone_number
                                        ? item?.customer_id.phone_number :
                                        '(Chưa cập nhập)'}
                                </td>
                                <td style={{ fontSize: '15px' }} className={`${item?.is_confirm ? 'text-success' : 'text-danger'}`}>
                                    {item?.is_confirm ? 'Đã xác nhận' : 'Chưa xác nhận'}
                                </td>
                                <td style={{ fontSize: '15px' }}>

                                    {userDecode?.role_id.roleName === "Customer"
                                        && !item?.is_confirm
                                        && userDecode?._id === item?.customer_id?._id
                                        &&
                                        <div className='btn btn-outline-danger' style={{ fontSize: '14px' }}
                                            onClick={() => handleWantToConfirmContract(item)}
                                        >
                                            Xác nhận
                                        </div>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table >
            </div>

            {openModalConfirm
                &&
                <ModalConfirm
                    show={openModalConfirm}
                    handleClose={() => setOpenModalConfirm(false)}
                    handleAccept={handleCallApiConfirmContract}
                    body={<h5>Bạn có chắc muốn xác nhận hợp đồng này?</h5>} />
            }

            {isLoading && <SpinnerLoading />}
        </div>
    )
}

export default RightSiteContract