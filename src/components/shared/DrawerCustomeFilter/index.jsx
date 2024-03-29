import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Accordion from 'react-bootstrap/Accordion';

const DrawerCustomeFilter = (props) => {
    const { show, handleClose, filterOptions, setFilterOptions, handleClearFilters } = props;

    return (
        <Offcanvas show={show} onHide={handleClose} placement={'end'} backdropClassName='filter-drawer'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Bảng bộ lọc</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='mt-4'>
                <Accordion alwaysOpen>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Tình trạng mở bán</Accordion.Header>
                        <Accordion.Body>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="sellTimeshareStatusSelling"
                                    value="Đang mở bán"
                                    checked={filterOptions.sellTimeshareStatus === "Đang mở bán"}
                                    onChange={() =>
                                        setFilterOptions({
                                            ...filterOptions,
                                            sellTimeshareStatus: "Đang mở bán",
                                        })
                                    }
                                />
                                <label className="form-check-label" htmlFor="sellTimeshareStatusSelling">Đang mở bán</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="sellTimeshareStatusNotSold"
                                    value="Chưa được bán"
                                    checked={filterOptions.sellTimeshareStatus === "Chưa được bán"}
                                    onChange={() =>
                                        setFilterOptions({
                                            ...filterOptions,
                                            sellTimeshareStatus: "Chưa được bán",
                                        })
                                    }
                                />
                                <label className="form-check-label" htmlFor="sellTimeshareStatusNotSold">Chưa được bán</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="sellTimeshareStatusSold"
                                    value="Đã bán"
                                    checked={filterOptions.sellTimeshareStatus === "Đã bán"}
                                    onChange={() =>
                                        setFilterOptions({
                                            ...filterOptions,
                                            sellTimeshareStatus: "Đã bán",
                                        })
                                    }
                                />
                                <label className="form-check-label" htmlFor="sellTimeshareStatusSold">Đã bán</label>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Tình trạng thanh toán</Accordion.Header>
                        <Accordion.Body>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="paymentStatusPaid"
                                    value="true"
                                    checked={filterOptions.isReservationPaid === "true"}
                                    onChange={() =>
                                        setFilterOptions({
                                            ...filterOptions,
                                            isReservationPaid: "true",
                                        })
                                    }
                                />
                                <label className="form-check-label" htmlFor="paymentStatusPaid">Đã thanh toán</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="paymentStatusNotPaid"
                                    value="false"
                                    checked={filterOptions.isReservationPaid === "false"}
                                    onChange={() =>
                                        setFilterOptions({
                                            ...filterOptions,
                                            isReservationPaid: "false",
                                        })
                                    }
                                />
                                <label className="form-check-label" htmlFor="paymentStatusNotPaid">Chưa thanh toán</label>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <div className='btn btn-outline-primary'
                    style={{ position: 'fixed', bottom: '20px' }}
                    onClick={handleClearFilters}
                >
                    Clear
                </div>
            </Offcanvas.Body>


        </Offcanvas>
    );
}

export default DrawerCustomeFilter;
