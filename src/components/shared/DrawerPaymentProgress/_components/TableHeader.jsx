import React from 'react'

const TableHeader = ({ userDecode }) => {
    console.log(userDecode)
    return (
        <div className="table100-head">
            <table>
                <thead>
                    <tr className="row100 head">
                        <th className={`cell100 column1`}>Lần thanh toán</th>
                        <th className={`cell100 column2`}>Phần trăm</th>
                        <th className={`cell100 column3`}>Thành tiền</th>
                        <th className={`cell100 column4`}>Trạng thái</th>
                        <th className={`cell100 column5`}>Hạn thanh toán</th>
                        {userDecode?.role_id.roleName === "Customer"
                            &&
                            <th className={`cell100 column6`}></th>
                        }
                    </tr>
                </thead>
            </table>
        </div>
    )
}

export default TableHeader