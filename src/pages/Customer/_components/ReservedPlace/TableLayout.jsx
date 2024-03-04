import React from 'react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'

const TableLayout = (props) => {

    const { tableHeaderName, reservedPlaceList } = props

    return (
        <div className="table100 ver2 m-b-110">
            <TableHeader tableHeaderName={tableHeaderName} />
            <TableBody reservedPlaceList={reservedPlaceList} />
        </div>
    )
}

export default TableLayout