import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import './style.scss'
import { HEADER_DETAIL_TRANSACTION } from '../../../constants/header'
import TimeshareDetail from './_components/TimeshareDetail'
import TransactionDetail from './_components/TransactionDetail'
import BuyerDetail from './_components/BuyerDetail'
import { useLocation } from 'react-router-dom'

const ModalDetailTransaction = (props) => {

    const { show, handleClose, handleAccept, dataTransaction, dataTimeshare, setTimeShareList, timeshareList } = props
    const [activeItem, setActiveItem] = useState(0);
    const [path, setPath] = useState('');

    const location = useLocation();

    useEffect(() => {
        setPath(location.pathname);
    }, [location.pathname]);

    return (
        <Modal show={show} dialogClassName='modal-90w' onHide={handleClose} centered className='modal-confirm'>
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className='container general-management__menu'>
                        <ul className=''>
                            {HEADER_DETAIL_TRANSACTION.map((item, index) => (
                                <li key={index}>
                                    {path === '/personal-projects' && index === 0 && (
                                        <p className={activeItem === index ? 'active' : ''} onClick={() => setActiveItem(index)}>{item}</p>
                                    )}
                                    {path !== '/personal-projects' && (
                                        <p className={activeItem === index ? 'active' : ''} onClick={() => setActiveItem(index)}>{item}</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='container mb-4'>
                    {path === '/personal-projects'
                        ?
                        <TimeshareDetail timeshare={dataTimeshare}
                            setTimeShareList={setTimeShareList}
                            timeshareList={timeshareList}
                            handleClose={handleClose}
                        />
                        :
                        <>
                            {activeItem === 0 && (
                                <TimeshareDetail timeshare={dataTransaction?.timeshare_id} />
                            )}
                            {activeItem === 1 && (
                                <BuyerDetail customer={dataTransaction?.customers[0]} />
                            )}
                            {activeItem === 2 && (
                                <TransactionDetail transaction={dataTransaction} />
                            )}
                        </>
                    }
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModalDetailTransaction