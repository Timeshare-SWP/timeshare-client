import React from 'react'

const TableHeader = (props) => {
    const { tableHeaderName } = props

    return (
        <div className="table100-head">
            <table>
                <thead>
                    <tr className="row100 head">
                        {tableHeaderName?.map((item, index) => (
                            <th className={`cell100 column${index + 1}`} key={index}>{item}</th>
                        ))}
                        <th className={`cell100 column${tableHeaderName.length + 1}`}></th>
                    </tr>
                </thead>
            </table>
        </div>
    )
}

export default TableHeader