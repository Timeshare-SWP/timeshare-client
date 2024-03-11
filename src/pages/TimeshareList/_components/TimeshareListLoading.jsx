import React from 'react'
import CommonSection from '../../../components/CommonSection'
import SimpleLoading from '../../../components/shared/SimpleLoading'

const TimeshareListLoading = () => {
    return (
        <>
            <CommonSection title="Các timeshare hiện có" />

            <SimpleLoading />
        </>
    )
}

export default TimeshareListLoading