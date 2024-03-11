import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { INVESTOR_HEADER_MENU_PROFILE } from '../../../constants/header';

const Header = () => {
    const location = useLocation();

    return (
        <div className='container general-management__menu'>
            <ul className=''>
                {INVESTOR_HEADER_MENU_PROFILE.map((item, index) => (
                    <li key={index}>
                        <Link to={item.pathName} className={location.pathname === `${item.pathName}` ? 'active' : ''}>{item.nameItem}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Header;
