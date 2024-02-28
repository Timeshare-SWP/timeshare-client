import React from 'react'
import GoogleMapReact from 'google-map-react';

const Location = (props) => {

    const { timeshare_location } = props

    return (
        <div className='section-location' id="location">
            <h3 className=''>Vị trí</h3>

            {timeshare_location ? (
                <div>

                </div>
            ) : (
                <div className=" fw-bold"
                    style={{ marginTop: '15px', marginLeft: '10px', fontSize: '14px' }}
                >
                    Đang cập nhập
                </div>
            )}

        </div>
    )
}

export default Location