import React from 'react'
import { Modal } from 'react-bootstrap'

const ModalConfirm = (props) => {

    const { show, handleClose, handleAccept, nameBtnCLose, title, body } = props
    return (
        <Modal show={show} onHide={handleClose} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={handleClose}>
                    {nameBtnCLose ? nameBtnCLose : 'Hủy'}
                </button>
                <button className="btn btn-primary" onClick={handleAccept}>
                    Xác nhận
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalConfirm