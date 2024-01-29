import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { DROPDOWN_HEADER_CUSTOMER, DROPDOWN_HEADER_INVESTOR, DROPDOWN_HEADER_STAFF } from '../../../../constants/dropdown';

const DropDownUser = (props) => {

    const { user, actionLogout } = props

    console.log(user)
    
    const getMenuItems = () => {
        switch (user?.role_id?.roleName) {
            case 'Customer':
                return DROPDOWN_HEADER_CUSTOMER

            case 'Investor':
                return DROPDOWN_HEADER_INVESTOR

            case 'Staff':
                return DROPDOWN_HEADER_STAFF
            default:
                return [];
        }
    };

    const renderMenuItems = () => {
        const items = getMenuItems();

        return items.map((item, index) => (
            <Dropdown.Item key={index}>
                <Link className='item_link' to={item.link}>{item.label}</Link>
            </Dropdown.Item>
        ));
    };

    return (
        <Dropdown className="dropdown-header" >
            <Dropdown.Toggle variant="ghost" id="dropdown-basic" className='d-flex justify-content-center align-items-center '>
                <div className="avatar-profile">
                    <img src={user?.avatar_url ? user?.avatar_url : "https://cdn.popsww.com/blog/sites/2/2021/03/doraemon-tap-97.jpg"}
                        alt={user?.avatar_url ? "UserAva" : "IncognitoAva"} />
                </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <div className="label-name">
                    <img src={user?.avatar_url ? user?.avatar_url : "https://cdn.popsww.com/blog/sites/2/2021/03/doraemon-tap-97.jpg"}
                        alt={user?.avatar_url ? "UserAva" : "IncognitoAva"} />

                    <p>{user?.fullName}</p>
                </div>

                {renderMenuItems()}

                <hr style={{ margin: '0.1rem 0rem' }}></hr>

                <Dropdown.Item>
                    <div className='item_link text-danger' onClick={actionLogout}>Đăng xuất</div>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DropDownUser