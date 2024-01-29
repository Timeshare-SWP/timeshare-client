import React from 'react'
import CommonSection from '../../../components/CommonSection'
import { Container } from 'react-bootstrap'

const TimeshareListLoading = () => {
    return (
        <>
            <CommonSection title="Các timeshare hiện có" />

            <Container className='d-flex justify-content-center'>
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </Container>
        </>
    )
}

export default TimeshareListLoading