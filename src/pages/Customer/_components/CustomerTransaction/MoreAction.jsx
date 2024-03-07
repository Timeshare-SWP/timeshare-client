import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { BsThreeDots } from "react-icons/bs";
import { TRANSACTION_LIST_ACTION_CUSTOMER } from "../../../../constants/action"
import { useDispatch, useSelector } from 'react-redux';

const MoreAction = ({ transactionSelected, setReservedPlaceList, userDecode }) => {

    console.log('transactionSelected', transactionSelected)
    const dispatch = useDispatch();

    const handleItemClick = (id) => {
        switch (id) {
            case 1:
                // xem thông tin chi tiết
                alert('xem thông tin chi tiết')
                break;
            case 2:
                alert('Hợp đồng')
                break;
            default:
                alert('thanh toán!')
        }
    }

    const renderDropDownMenuItem = () => {
        let actionsToShow = TRANSACTION_LIST_ACTION_CUSTOMER;

        if (transactionSelected && transactionSelected.transaction_status !== "Selected") {
            actionsToShow = actionsToShow.filter(item => item.id !== 2 && item.id !== 3);
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

        </Dropdown>
    )
}

export default MoreAction