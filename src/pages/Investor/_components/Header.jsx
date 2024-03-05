import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    return (
        <div className='container general-management__menu'>
            <ul className=''>
                <li>
                    <Link to="/investor-statistics" className={location.pathname === '/investor-statistics' ? 'active' : ''}>Dashboard</Link>
                </li>
                <li>
                    <Link to="/management-transaction" className={location.pathname === '/management-transaction' ? 'active' : ''}>Quản lý mua bán</Link>
                </li>

            </ul>
        </div>
    )
}

export default Header;
