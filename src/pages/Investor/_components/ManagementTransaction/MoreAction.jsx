import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { BsThreeDots } from "react-icons/bs";
import { TRANSACTION_LIST_ACTION_INVESTOR } from "../../../../constants/action"
import { useDispatch, useSelector } from 'react-redux';
import ModalContract from '../../../../components/shared/ModalContract';
import ModalConfirm from '../../../../components/shared/ModalConfirm';

const MoreAction = ({ item, setTransactionList, userDecode }) => {

    const [formErrors, setFormErrors] = useState({
        images_contract: false,
        file_contract: false
    })

    const dispatch = useDispatch();
    //modal state
    const [openModalContract, setOpenModalContract] = useState(false)
    const [openModalConfirm, setOpenModalConfirm] = useState(false);

    //xử lý ẢNH hợp đồng
    const [imagesContract, setImagesContract] = useState([]); //list ảnh này là để preview trên UI
    const [imagesContractOrigin, setImagesContractOrigin] = useState([]) //list ảnh này là file gốc khi vừa mới drop lên

    //xử lý FILE hợp đồng
    const [fileContract, setFileContract] = useState([]); //list file này là để preview trên UI
    const [fileContractOrigin, setFileContractOrigin] = useState([]) //list ảnh này là file gốc khi vừa mới drop lên

    const handleItemClick = (id) => {
        switch (id) {
            case 1:
                //hợp đồng
                setOpenModalContract(true)
                break;
            case 2:
                //tiến độ thanh toán
                alert('tien do!')
                break;
            default:
                alert('Hmmmm, something wrong!')
        }
    }

    const renderDropDownMenuItem = () => {

        let actionsToShow = TRANSACTION_LIST_ACTION_INVESTOR;

        if (item?.transaction_status === "Waiting") {
            actionsToShow = actionsToShow.filter(item => item.id !== 2);
        }

        return actionsToShow.map((item, index) => (
            <Dropdown.Item
                key={index}
                className='d-flex align-items-center gap-2'
                onClick={() => handleItemClick(item?.id)}
            >
                {item?.icon}
                {item?.name}
            </Dropdown.Item>
        ));
    }

    const handleOpenModalConfirmToCreateContract = () => {
        const isValidImagesContract = imagesContract.length >= 1;
        const isValidFileContract = fileContract.length >= 1

        if (isValidImagesContract && isValidFileContract) {
            setOpenModalConfirm(true)
            setOpenModalContract(false)
        } else {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                images_contract: !isValidImagesContract
            }))
            setFormErrors(prevErrors => ({
                ...prevErrors,
                file_contract: !isValidFileContract
            }))
        }


    }

    const handleCloseModalContract = () => {
        setOpenModalContract(false)
        setFormErrors({})
    }

    const handleCloseModalConfirm = () => {
        setOpenModalConfirm(false)
        setOpenModalContract(true)
    }

    const handleCallApiForCreateContract = () => {

    }

    return (
        <Dropdown className='notification-container'>
            <Dropdown.Toggle variant="ghost" id="dropdown-basic" className='d-flex justify-content-center align-items-center '>
                <BsThreeDots style={{ cursor: 'pointer' }} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {renderDropDownMenuItem()}
            </Dropdown.Menu>

            {openModalContract
                &&
                <ModalContract
                    show={openModalContract}
                    transactionSelected={item}
                    setTransactionList={setTransactionList}
                    handleClose={handleCloseModalContract}
                    handleAccept={() => setOpenModalContract(true)}
                    handleOpenModalConfirmToCreateContract={handleOpenModalConfirmToCreateContract}
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
            }

            {openModalConfirm
                &&
                <ModalConfirm
                    show={openModalConfirm}
                    handleClose={handleCloseModalConfirm}
                    handleAccept={handleCallApiForCreateContract}
                    nameBtnCLose={'Quay lại'}
                    body={<h5>Bạn có chắc muốn thêm hợp đồng này?</h5>} />
            }

        </Dropdown>
    )
}

export default MoreAction