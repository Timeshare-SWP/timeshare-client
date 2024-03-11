import React, { useContext, useEffect, useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import './style.scss'
import { useDispatch } from 'react-redux';
import { getPhaseByContractId } from '../../../redux/features/phaseSlice';
import SimpleLoading from '../SimpleLoading';
import { getContractByTransactionId } from '../../../redux/features/contractSlice';
import TableHeader from './_components/TableHeader';
import TableBody from './_components/TableBody';
import { AuthContext } from '../../../contexts/authContext';
import { Container } from 'react-bootstrap';
import create_contract from "../../../assets/svg/create-contract.svg";
import find_contract from "../../../assets/svg/find-contract.svg";

const DrawerPaymentProgress = (props) => {
    const { show, handleClose, transactionSelected, transactionList, setTransactionList } = props

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [dataContract, setDataContract] = useState('')
    const [dataPhase, setDataPhase] = useState([])
    const { userDecode } = useContext(AuthContext)

    useEffect(() => {
        setIsLoading(true)
        const filteredTransactions = transactionList.filter(
            (transaction) => transaction?.timeshare_id?._id === transactionSelected?.timeshare_id?._id
        );

        const selectedTransaction = filteredTransactions.find(
            (transaction) => transaction.transaction_status === "Selected"
        );

        dispatch(getContractByTransactionId(selectedTransaction?._id)).then((resGet) => {
            if (getContractByTransactionId.fulfilled.match(resGet)) {
                setDataContract(resGet?.payload)

                dispatch(getPhaseByContractId(resGet?.payload._id)).then((resGetPhases) => {
                    if (getPhaseByContractId.fulfilled.match(resGetPhases)) {
                        setDataPhase(resGetPhases.payload)
                        setIsLoading(false)
                    } else {
                        setIsLoading(false)
                    }
                })
            } else {
                setDataContract('')
                setIsLoading(false)
            }
        })

    }, [])

    return (
        <Offcanvas show={show} onHide={handleClose} placement={'end'} name={'end'} backdropClassName='drawer-payment'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Bảng thanh toán theo giai đoạn</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='mt-4'>
                {isLoading
                    ?
                    <div style={{ height: '400px' }}
                        className='d-flex justify-content-center align-items-center'>
                        <SimpleLoading />
                    </div>
                    :
                    dataContract === ""
                        ?
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
                        :
                        <div className="table100 ver2 m-b-110 mt-4">
                            <TableHeader userDecode={userDecode} />
                            <TableBody transactionSelected={transactionSelected} dataPhase={dataPhase} setDataPhase={setDataPhase} userDecode={userDecode} />
                        </div>
                }
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default DrawerPaymentProgress