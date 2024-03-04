import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    return (
        <div className='container general-management__menu'>
            <ul className=''>
                <li>
                    <Link to="/reserved-place-list" className={location.pathname === '/reserved-place-list' ? 'active' : ''}>Timeshare đã giữ chỗ</Link>
                </li>
                <li>
                    <Link to="/customer-transaction" className={location.pathname === '/customer-transaction' ? 'active' : ''}>Giao dịch cá nhân</Link>
                </li>
            </ul>
        </div>
    )
}

export default Header;
