import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { BsThreeDots } from "react-icons/bs";
import { REQUEST_LIST_ACTION_INVESTOR, TRANSACTION_LIST_ACTION_INVESTOR } from "../../../../constants/action"
import { useDispatch, useSelector } from 'react-redux';
import ModalContract from '../../../../components/shared/ModalContract';
import ModalConfirm from '../../../../components/shared/ModalConfirm';
import SpinnerLoading from "../../../../components/shared/SpinnerLoading"
import { createPhase } from '../../../../redux/features/phaseSlice';
import { createContract, createContractImage } from '../../../../redux/features/contractSlice';
import toast from 'react-hot-toast';
import { generateRandomString, removeCommas } from '../../../../utils/handleFunction';
import { storage } from '../../../../utils/configFirebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createNotification } from '../../../../redux/features/notificationSlice';
import DrawerPaymentProgress from '../../../../components/shared/DrawerPaymentProgress';
import ModalDetailTransaction from '../../../../components/shared/ModalDetailTransaction';

const MoreAction = ({ item, transactionList, setTransactionList, userDecode }) => {

    const [isLoadingHandleApi, setIsLoadingHandleApi] = useState(false);

    const dispatch = useDispatch();

    //modal state
    const [openModalTransactionDetail, setOpenModalTransactionDetail] = useState(false)


    const handleItemClick = (id) => {
        switch (id) {
            case 1:
                //Chi tiết dự án
                setOpenModalTransactionDetail(true)
                break;
            default:
                alert('Hmmmm, something wrong!')
        }
    }

    const renderDropDownMenuItem = () => {

        let actionsToShow = REQUEST_LIST_ACTION_INVESTOR;

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


    // xử lý API

    return (
        <Dropdown className='notification-container'>
            <Dropdown.Toggle variant="ghost" id="dropdown-basic" className='d-flex justify-content-center align-items-center '>
                <BsThreeDots style={{ cursor: 'pointer' }} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {renderDropDownMenuItem()}
            </Dropdown.Menu>

            {openModalTransactionDetail
                && <ModalDetailTransaction
                    show={openModalTransactionDetail}
                    handleClose={() => setOpenModalTransactionDetail(false)}
                    handleAccept={() => setOpenModalTransactionDetail(false)}
                    dataTransaction={item}
                />
            }


            {isLoadingHandleApi && <SpinnerLoading />}
        </Dropdown>
    )
}

export default MoreAction