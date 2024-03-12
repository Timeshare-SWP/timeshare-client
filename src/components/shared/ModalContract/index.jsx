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
import toast from 'react-hot-toast';
import FormUpdateContract from './_components/FormUpdateContract';

const ModalContract = (props) => {
    const { show, handleClose,
        transactionSelected, transactionList, setTransactionList,
        handleOpenModalConfirmToCreateContract,
        imagesContract, setImagesContract, imagesContractOrigin, setImagesContractOrigin,
        fileContract, setFileContract, fileContractOrigin, setFileContractOrigin,
        formErrors, setFormErrors, phases, setPhases, minDates, setMinDates,
        phaseError, setPhaseError, finalPrice, setFinalPrice,
        finalPriceError, setFinalPriceError
    } = props

    const { userDecode } = useContext(AuthContext);
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false);

    const [dataContract, setDataContract] = useState('')
    const [openCreateContractMode, setOpenCreateContractMode] = useState(false);


    const [editMode, setEditMode] = useState(false);
    const [newDataContract, setNewDataContract] = useState('');
    const [newPhase, setNewPhase] = useState([]);

    const closeEditMode = () => {
        setEditMode(false)
        setNewDataContract('');
        setNewPhase([])
    }

    const handleOpenModalConfirmToUpdateContract = () => {

    }

    const handleEditMode = () => {
        if (dataContract?.is_all_confirm === true) {
            toast.error("Bạn không thể chỉnh sửa hợp đồng khi bên mua đã xác nhận!")
            return;
        } else {
            toast.error("Tính năng chưa sẵn sàng!")
            return;
        }
        // setEditMode(!editMode)
    }

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
                    {editMode ? 'Cập nhập hợp đồng' : 'Hợp đồng'}
                    {transactionSelected?.timeshare_id?.investor_id === userDecode._id
                        && dataContract
                        &&
                        <CiEdit onClick={handleEditMode} style={{ cursor: 'pointer' }} />
                    }
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='contract-body-modal mb-4'>

                {editMode
                    ? <FormUpdateContract
                        transactionSelected={transactionSelected}
                        imagesContract={imagesContract}
                        setImagesContract={setImagesContract}
                        imagesContractOrigin={imagesContractOrigin}
                        setImagesContractOrigin={setImagesContractOrigin}
                        fileContract={fileContract}
                        setFileContract={setFileContract}
                        fileContractOrigin={fileContractOrigin}
                        setFileContractOrigin={setFileContractOrigin}
                        formErrors={formErrors}
                        phases={phases}
                        setPhases={setPhases}
                        minDates={minDates}
                        setMinDates={setMinDates}
                        finalPrice={finalPrice}
                        setFinalPrice={setFinalPrice}
                        newDataContract={newDataContract}
                        setNewDataContract={setNewDataContract}
                        newPhase={newPhase}
                        setNewPhase={setNewPhase}
                    />
                    :
                    isLoading
                        ?
                        <div style={{ height: '400px' }}
                            className='d-flex justify-content-center align-items-center'>
                            <SimpleLoading />
                        </div>
                        :
                        dataContract === ""
                            ?
                            openCreateContractMode
                                ?
                                <FormCreateContract
                                    transactionSelected={transactionSelected}
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
                                    phases={phases}
                                    setPhases={setPhases}
                                    minDates={minDates}
                                    setMinDates={setMinDates}
                                    phaseError={phaseError}
                                    setPhaseError={setPhaseError}
                                    finalPrice={finalPrice}
                                    setFinalPrice={setFinalPrice}
                                    finalPriceError={finalPriceError}
                                    setFinalPriceError={setFinalPriceError}
                                />
                                :
                                <Container className='d-flex align-items-center justify-content-center flex-column'>
                                    {userDecode?.role_id?.roleName === "Investor"
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
                                    <LeftSiteContract dataContract={dataContract} setDataContract={setDataContract} />
                                    <RightSiteContract dataContract={dataContract} setDataContract={setDataContract} />
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

            {editMode
                &&
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={closeEditMode}>
                        Hủy
                    </button>

                    <button className="btn btn-primary" onClick={handleOpenModalConfirmToUpdateContract}>
                        Cập nhập hợp đồng
                    </button>
                </Modal.Footer>
            }

        </Modal>
    )
}

export default ModalContract