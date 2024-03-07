import React from 'react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'

const TableLayout = (props) => {

    const { tableHeaderName, reservedPlaceList, setReservedPlaceList } = props

    return (
        <div className="table100 ver2 m-b-110">
            <TableHeader tableHeaderName={tableHeaderName} />
            <TableBody reservedPlaceList={reservedPlaceList} setReservedPlaceList={setReservedPlaceList}/>
        </div>
    )
}

export default TableLayout