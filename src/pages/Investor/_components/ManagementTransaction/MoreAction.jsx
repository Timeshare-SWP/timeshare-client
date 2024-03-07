import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { BsThreeDots } from "react-icons/bs";
import { TRANSACTION_LIST_ACTION_INVESTOR } from "../../../../constants/action"
import { useDispatch, useSelector } from 'react-redux';
import ModalContract from '../../../../components/shared/ModalContract';

const MoreAction = ({ item, setTransactionList, userDecode }) => {

    const dispatch = useDispatch();
    const [openModalContract, setOpenModalContract] = useState(false)

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
                    handleClose={() => setOpenModalContract(false)}
                    handleAccept={() => setOpenModalContract(true)}
                />
            }

        </Dropdown>
    )
}

export default MoreAction