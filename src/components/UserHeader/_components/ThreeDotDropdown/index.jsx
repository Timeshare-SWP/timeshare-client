import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { CiBellOn } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { BsThreeDots } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";


const ThreeDotDropdown = (props) => {

    const {handleMarkAllNoti} = props

    return (
        <Dropdown className='notification-container'>
            <Dropdown.Toggle variant="ghost" id="dropdown-basic" className='d-flex justify-content-center align-items-center '>
                <BsThreeDots />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleMarkAllNoti()} className='d-flex justify-content-center align-items-center gap-2'>
                    <FaCheck />
                    <p>Đánh dấu tất cả là đã đọc</p>
                </Dropdown.Item>
            </Dropdown.Menu>

        </Dropdown>
    )
}

export default ThreeDotDropdown