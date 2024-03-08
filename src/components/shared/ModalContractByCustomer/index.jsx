import React, { useContext, useEffect, useState } from 'react'
import { Container, Modal } from 'react-bootstrap'
import LeftSiteContract from '../ModalContract/_components/LeftSiteContract'
import RightSiteContract from '../ModalContract/_components/RightSiteContract'
import { CiEdit } from "react-icons/ci";

import './style.scss'
import { AuthContext } from '../../../contexts/authContext';
import { getContractByTransactionId } from '../../../redux/features/contractSlice';
import SimpleLoading from '../../../components/shared/SimpleLoading';
import { useDispatch } from 'react-redux';
import find_contract from "../../../assets/svg/find-contract.svg";

const ModalContract = (props) => {
    const { show, handleClose,
        transactionSelected, transactionList, setTransactionList,
    } = props

    const { userDecode } = useContext(AuthContext);
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false);

    const [dataContract, setDataContract] = useState('')

    useEffect(() => {
        setIsLoading(true)

        dispatch(getContractByTransactionId(transactionSelected?._id)).then((resGet) => {
            if (getContractByTransactionId.fulfilled.match(resGet)) {
                setDataContract(resGet.payload)
            } else {
                setDataContract('')
            }
            setIsLoading(false)
        })

    }, [])

    return (
        <Modal show={show} dialogClassName='modal-90w' onHide={handleClose} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    Hợp đồng
                    {transactionSelected?.timeshare_id?.investor_id === userDecode._id
                        && dataContract
                        &&
                        <CiEdit />
                    }
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='contract-body-modal mb-4'>

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
                            <img src={find_contract} style={{ width: '400px' }} alt="svg" />
                            <h5>Chủ đầu tư chưa đăng hợp đồng, vui lòng thử lại sau!</h5>

                        </Container>
                        :
                        (<Modal.Body className='contract-body-modal'>
                            <Container className='row contract-container'>
                                <LeftSiteContract dataContract={dataContract} setDataContract={setDataContract} />
                                <RightSiteContract dataContract={dataContract} setDataContract={setDataContract} />
                            </Container>
                        </Modal.Body>)
                }
            </Modal.Body>
        </Modal>
    )
}

export default ModalContract