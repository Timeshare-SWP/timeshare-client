import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { BsThreeDots } from "react-icons/bs";
import { TRANSACTION_LIST_ACTION_CUSTOMER, TRANSACTION_REJECTED_LIST_ACTION_CUSTOMER } from "../../../../constants/action"
import { useDispatch, useSelector } from 'react-redux';
import DrawerPaymentProgress from '../../../../components/shared/DrawerPaymentProgress';
import ModalContractByCustomer from '../../../../components/shared/ModalContractByCustomer';
import ModalConfirm from '../../../../components/shared/ModalConfirm';

const ActionForRejected = (props) => {
    const { transactionSelected, transactionList, setTransactionList, userDecode } = props

    const [openModalReason, setOpenModalReason] = useState();

    const handleItemClick = (id) => {
        switch (id) {
            case 1:
                setOpenModalReason(true)
                break;

        }
    }

    const renderDropDownMenuItem = () => {
        let actionsToShow = TRANSACTION_REJECTED_LIST_ACTION_CUSTOMER;

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


    return (
        <Dropdown className='notification-container'>
            <Dropdown.Toggle variant="ghost" id="dropdown-basic" className='d-flex justify-content-center align-items-center '>
                <BsThreeDots style={{ cursor: 'pointer' }} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {renderDropDownMenuItem()}
            </Dropdown.Menu>

            {openModalReason &&
                <ModalConfirm
                    show={openModalReason}
                    handleAccept={() => setOpenModalReason(false)}
                    title={''}
                    body={<h5>
                        Lý do từ chối: {transactionSelected.note_rejected}
                    </h5>}
                />
            }

        </Dropdown>
    )
}

export default ActionForRejected