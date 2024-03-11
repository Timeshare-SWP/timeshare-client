import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { viewAllCustomerWhoReservePlaceByTimeshareId } from '../../../../../redux/features/reservedPlaceSlice'
import SimpleLoading from '../../../../../components/shared/SimpleLoading'
import { convertToVietnameseTime } from '../../../../../utils/handleFunction'

const ModalReservedPlaceList = (props) => {

    const { show, handleClose, loadingData,
        setListReservedPlace, setLoadingData,
        item, listReservedPlace } = props

    const dispatch = useDispatch();

    useEffect(() => {
        setLoadingData(true);
        dispatch(viewAllCustomerWhoReservePlaceByTimeshareId(item._id)).then((result) => {
            const sortedList = result.payload.sort((a, b) => {
                return new Date(a.createdAt) - new Date(b.createdAt);
            });

            console.log(result.payload)

            setListReservedPlace(sortedList);
            setLoadingData(false);
        });
    }, []);

    return (
        <Modal show={show} dialogClassName="modal-90w" onHide={handleClose} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {loadingData
                    ?
                    <div style={{ height: '50vh' }} className='d-flex justify-content-center align-items-center'>
                        <SimpleLoading />
                    </div>
                    :
                    (<div className='container modal-reserved-place-list'>
                        <div className="table100 ver2 m-b-110">
                            <div className="table100-head">
                                <table>
                                    <thead>
                                        <tr className="row100 head">
                                            <th className={`cell100 column1`}>Số thứ tự</th>
                                            <th className={`cell100 column2`}>Bên đặt giữ chỗ</th>
                                            <th className={`cell100 column3`}>Số điện thoại</th>
                                            <th className={`cell100 column4`}>Trạng thái giữ chỗ</th>
                                            <th className={`cell100 column5`}>Thời gian đặt giữ chỗ</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>

                            <div className="table100-body js-pscroll ps ps--active-y">
                                <table>
                                    <tbody>
                                        {listReservedPlace.length === 0 ? (
                                            <tr className="row100 body">
                                                <td className="cell100" colSpan="8">
                                                    <div style={{ textAlign: 'center' }}>
                                                        <img src="https://arthouse.vn/images/emptycart.png" alt="Empty Cart" />
                                                    </div>
                                                    <p className='text-center fw-bold'>Bạn chưa có ai đặt giữ chỗ cho timeshare này cả</p>
                                                </td>
                                            </tr>
                                        ) : (
                                            listReservedPlace.map((item, index) => (
                                                <tr className="row100 body" key={index}>
                                                    <td className="cell100 column1">{index + 1}</td>
                                                    <td className="cell100 column2">
                                                        {item?.customers.map((person, index) => (
                                                            <>
                                                                <p key={index}>
                                                                    {person?.fullName}
                                                                </p>
                                                            </>
                                                        ))}
                                                    </td>

                                                    <td className="cell100 column3">
                                                        {item?.customers.map((person, index) => (
                                                            <>
                                                                <p key={index} style={{ fontStyle: person?.phone_number ? 'normal' : 'italic' }}>
                                                                    {person?.phone_number || '(Chưa cập nhập)'}
                                                                </p>
                                                            </>
                                                        ))}
                                                    </td>
                                                    <td className="cell100 column4">
                                                        {item?.transaction_status === "Reserving" ? "Đang đặt chỗ" : item?.transaction_status === "Unreserve" ? "Đã hủy đặt" : item?.transaction_status}
                                                    </td>                                               
                                                    <td className="cell100 column5">{convertToVietnameseTime(item?.reservation_time)}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>)
                }


            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={handleClose}>
                    Đóng
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalReservedPlaceList