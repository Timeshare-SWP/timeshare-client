import React from 'react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'

const TableLayout = (props) => {

    const { tableHeaderName, transactionList, setTransactionList } = props

    return (
        <div className="table100 ver2 m-b-110">
            <TableHeader tableHeaderName={tableHeaderName} />
            <TableBody transactionList={transactionList} setTransactionList={setTransactionList}/>
        </div>
    )
}

export default TableLayout