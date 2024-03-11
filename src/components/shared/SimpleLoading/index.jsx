import React from 'react'
import { Container } from 'react-bootstrap'
import './style.scss'

const SimpleLoading = () => {
    return (
        <Container className='d-flex justify-content-center'>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </Container>
    )
}

export default SimpleLoading