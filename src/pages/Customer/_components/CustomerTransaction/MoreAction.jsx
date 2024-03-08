import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { BsThreeDots } from "react-icons/bs";
import { TRANSACTION_LIST_ACTION_CUSTOMER } from "../../../../constants/action"
import { useDispatch, useSelector } from 'react-redux';
import DrawerPaymentProgress from '../../../../components/shared/DrawerPaymentProgress';
import ModalContractByCustomer from '../../../../components/shared/ModalContractByCustomer';

const MoreAction = (props) => {
    const { transactionSelected, transactionList, setTransactionList, userDecode } = props
    const dispatch = useDispatch();

    const [openModalContract, setOpenModalContract] = useState(false);
    const [openModalPaymentProgress, setOpenModalPaymentProgress] = useState(false);

    const handleItemClick = (id) => {
        switch (id) {
            case 1:
                // xem thông tin chi tiết
                alert('xem thông tin chi tiết')
                break;
            case 2:
                setOpenModalContract(true)
                break;
            default:
                setOpenModalPaymentProgress(true)
        }
    }

    const renderDropDownMenuItem = () => {
        let actionsToShow = TRANSACTION_LIST_ACTION_CUSTOMER;

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

            {openModalContract
                &&
                <ModalContractByCustomer
                    show={openModalContract}
                    handleClose={() => setOpenModalContract(false)}
                    transactionSelected={transactionSelected}
                    transactionList={transactionList}
                    setTransactionList={setTransactionList}
                />
            }

            {openModalPaymentProgress
                &&
                <DrawerPaymentProgress
                    show={openModalPaymentProgress}
                    handleClose={() => setOpenModalPaymentProgress(false)}
                    transactionSelected={transactionSelected}
                    transactionList={transactionList}
                    setTransactionList={setTransactionList}
                />
            }

        </Dropdown>
    )
}

export default MoreAction