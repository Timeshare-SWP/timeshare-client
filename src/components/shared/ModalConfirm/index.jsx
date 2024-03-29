import React from 'react'
import { Modal } from 'react-bootstrap'
import './style.scss'

const ModalConfirm = (props) => {

    const { show, handleClose, handleAccept, nameBtnCLose, title, body } = props
    return (
        <Modal show={show} onHide={handleClose} centered backdrop="static" className='modal-confirm'>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                {handleClose
                    &&
                    <button className="btn btn-secondary" onClick={handleClose}>
                        {nameBtnCLose ? nameBtnCLose : 'Hủy'}
                    </button>
                }
                <button className="btn btn-primary" onClick={handleAccept}>
                    Xác nhận
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalConfirm