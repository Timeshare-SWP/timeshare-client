import React, { useContext, useState } from 'react'
import { convertToNumberFormat, convertToVietnameseTime, convertToVnTime } from '../../../../utils/handleFunction'
import { AuthContext } from '../../../../contexts/authContext'
import ModalConfirm from '../../../../components/shared/ModalConfirm'
import { useDispatch } from 'react-redux'
import { createPaymentUrlForPhase } from '../../../../redux/features/phaseSlice'
import toast from 'react-hot-toast'
import { createNotification } from '../../../../redux/features/notificationSlice'
import create_contract from "../../../../assets/svg/create-contract.svg";
import find_contract from "../../../../assets/svg/find-contract.svg";
import { Container } from 'react-bootstrap'

const TableBody = (props) => {
    const { transactionSelected, dataPhase, setDataPhase, useDecode } = props
    const { userDecode } = useContext(AuthContext);
    const dispatch = useDispatch();
    console.log("dataPhase", dataPhase)


    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [phaseSelected, setPhaseSelected] = useState('');

    const handleClickWantToPayment = (item) => {
        setOpenModalConfirm(true)
        setPhaseSelected(item)
    }

    const handleCallApiPaymentPhase = () => {
        const data = {
            amount: phaseSelected?.phase_price,
            language: "vn",
            bankCode: "",
            OrderInfo: phaseSelected?._id,
            OrderType: "Phase"
        }

        console.log('data', data)

        dispatch(createPaymentUrlForPhase(data)).then((resPayment) => {
            console.log("resPayment", resPayment)

            if (createPaymentUrlForPhase.fulfilled.match(resPayment)) {
                window.open(resPayment.payload.vnpUrl);

                setDataPhase(prevDataPhase => prevDataPhase.map(phase => {
                    if (phase._id === phaseSelected?._id) {
                        return { ...phase, is_payment: true };
                    }
                    return phase;
                }));
                setOpenModalConfirm(false)
                toast.success('Giao dịch thành công!')

            } else {
                setOpenModalConfirm(false)
                toast.error(`${resPayment?.payload}`)
                toast.error('Giao dịch thất bại!')
            }
        })
    }

    return (
        <div className="table100-body js-pscroll ps ps--active-y">
            {Array.isArray(dataPhase) && dataPhase.length > 0 ? (
                <table>
                    <tbody>
                        {dataPhase
                            .sort((a, b) => new Date(a.phase_no) - new Date(b.phase_no))
                            .map((item, index) => (
                                <tr className="row100 body" key={index}>
                                    <td className="cell100 column1">{index + 1}</td>
                                    <td className="cell100 column2"> {item?.phase_price_percent} %</td>
                                    <td className="cell100 column3">
                                        {convertToNumberFormat(item?.phase_price)}
                                    </td>
                                    <td className={`cell100 column4 ${item?.is_payment ? 'text-success' : 'text-danger'}`}>
                                        {item?.is_payment ? "Đã thanh toán" : "Chưa thanh toán"}
                                    </td>
                                    <td className="cell100 column5">{convertToVnTime(item?.remittance_deadline)}</td>
                                    {userDecode?.role_id.roleName === "Customer"
                                        && !item?.is_payment &&
                                        <th className={`cell100 column6`}>
                                            <div className='btn btn-outline-danger'
                                                style={{ fontSize: '14px' }}
                                                onClick={() => handleClickWantToPayment(item)}
                                            >
                                                Thanh Toán
                                            </div>
                                        </th>
                                    }
                                </tr>
                            ))}
                    </tbody>
                </table>
            ) : (
                <Container className='d-flex align-items-center justify-content-center flex-column'>
                    {transactionSelected?.timeshare_id.investor_id === userDecode._id
                        ?
                        <>
                            <img src={create_contract} style={{ width: '400px' }} alt="svg" />
                            <h5>
                                Vui lòng đăng hợp đồng trước khi coi giai đoạn thanh toán!
                            </h5>
                        </>
                        :
                        <>
                            <img src={find_contract} style={{ width: '400px' }} alt="svg" />
                            <h5>Hãy đợi chủ đầu tư đăng hợp đồng để coi được giai đoạn thanh toán!</h5>
                        </>
                    }
                </Container>
            )}

            {openModalConfirm
                &&
                <ModalConfirm
                    show={openModalConfirm}
                    handleClose={() => setOpenModalConfirm(false)}
                    handleAccept={handleCallApiPaymentPhase}
                    body={<h5>Bạn có chắc chắn muốn thanh toán giai đoạn này?</h5>}
                />
            }
        </div>
    );
}

export default TableBody