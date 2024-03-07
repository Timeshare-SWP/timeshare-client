import React, { useContext, useEffect, useState } from 'react'
import { Container, Modal } from 'react-bootstrap'
import LeftSiteContract from './_components/LeftSiteContract'
import RightSiteContract from './_components/RightSiteContract'
import { CiEdit } from "react-icons/ci";

import './style.scss'
import { AuthContext } from '../../../contexts/authContext';
import { getContractByTransactionId } from '../../../redux/features/contractSlice';
import SimpleLoading from '../../../components/shared/SimpleLoading';
import { useDispatch } from 'react-redux';
import create_contract from "../../../assets/svg/create-contract.svg";
import find_contract from "../../../assets/svg/find-contract.svg";
import FormCreateContract from './_components/FormCreateContract';

const ModalContract = (props) => {
    const { show, handleClose,
        transactionSelected, setTransactionList,
        handleOpenModalConfirmToCreateContract,
        imagesContract, setImagesContract, imagesContractOrigin, setImagesContractOrigin,
        fileContract, setFileContract, fileContractOrigin, setFileContractOrigin,
        formErrors, setFormErrors
    } = props

    const { userDecode } = useContext(AuthContext);
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false);

    const [dataContract, setDataContract] = useState('')
    const [openCreateContractMode, setOpenCreateContractMode] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        dispatch(getContractByTransactionId(transactionSelected._id)).then((resGet) => {
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
                    {transactionSelected?.timeshare_id.investor_id === userDecode._id
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
                    dataContract === ''
                        ?
                        openCreateContractMode
                            ?
                            <FormCreateContract
                                imagesContract={imagesContract}
                                setImagesContract={setImagesContract}
                                imagesContractOrigin={imagesContractOrigin}
                                setImagesContractOrigin={setImagesContractOrigin}
                                fileContract={fileContract}
                                setFileContract={setFileContract}
                                fileContractOrigin={fileContractOrigin}
                                setFileContractOrigin={setFileContractOrigin}
                                formErrors={formErrors}
                                setFormErrors={setFormErrors}
                            />
                            :
                            <Container className='d-flex align-items-center justify-content-center flex-column'>
                                {transactionSelected?.timeshare_id.investor_id === userDecode._id
                                    ?
                                    <>
                                        <img src={create_contract} style={{ width: '400px' }} alt="svg" />
                                        <div className='btn btn-outline-danger' onClick={() => setOpenCreateContractMode(true)}>Thêm hợp đồng</div>
                                    </>
                                    :
                                    <>
                                        <img src={find_contract} style={{ width: '400px' }} alt="svg" />
                                        <h5>Chủ đầu tư chưa đăng hợp đồng, vui lòng thử lại sau!</h5>
                                    </>
                                }
                            </Container>
                        :
                        (<Modal.Body className='contract-body-modal'>
                            <Container className='row contract-container'>
                                <LeftSiteContract />
                                <RightSiteContract />
                            </Container>
                        </Modal.Body>)
                }
            </Modal.Body>

            {openCreateContractMode
                &&
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Hủy
                    </button>

                    <button className="btn btn-primary" onClick={handleOpenModalConfirmToCreateContract}>
                        Thêm hợp đồng
                    </button>
                </Modal.Footer>
            }

        </Modal>
    )
}

export default ModalContract