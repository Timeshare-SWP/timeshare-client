import React from 'react'
import Header from '../_components/Header'
// import './style.scss'

const GeneralInvestorLayout = ({ children }) => {
    return (
        <div className='general-management'>
            <Header />
            <div className='general-management__content container my-3'>
                {children}
            </div>
        </div>
    )
}

export default GeneralInvestorLayout