import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Accordion from 'react-bootstrap/Accordion';

const DrawerCustomFilter = (props) => {
    const { show, handleClose, filterOptions, setFilterOptions, handleClearFilters, constants } = props;

    return (
        <Offcanvas show={show} onHide={handleClose} placement={'end'} backdropClassName='filter-drawer'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Bảng bộ lọc</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='mt-4'>
                <Accordion alwaysOpen>
                    {constants.map((filterItem, index) => (
                        <Accordion.Item key={index} eventKey={`${index}`}>
                            <Accordion.Header>{filterItem.label}</Accordion.Header>

                            <Accordion.Body>
                                {filterItem.options.map((option, optionIndex) => (
                                    <div className="form-check" key={optionIndex}
                                    >

                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            id={`${filterItem.value}-${option.value}`}
                                            value="Đang mở bán"
                                            checked={filterOptions[filterItem.value]?.includes(
                                                option.value
                                            )}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                setFilterOptions((prevFilterOption) => ({
                                                    ...prevFilterOption,
                                                    [filterItem.value]: isChecked
                                                        ? [
                                                            ...prevFilterOption[filterItem.value],
                                                            option.value,
                                                        ]
                                                        : prevFilterOption[filterItem.value].filter(
                                                            (value) => value !== option.value
                                                        ),
                                                }));
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor={`${filterItem.value}-${option.value}`}>
                                            {option.label}
                                        </label>
                                    </div>
                                ))}

                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
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

export default DrawerCustomFilter;
