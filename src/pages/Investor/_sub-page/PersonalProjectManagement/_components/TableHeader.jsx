import React from 'react'

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th scope="col">STT</th>
                <th scope="col">Tên dự án</th>
                <th scope="col">Diện tích (m)&#178;</th>
                <th scope="col">Hình thức</th>
                <th scope="col">Trạng thái dự án</th>
                <th scope="col">Trạng thái bán</th>
                <th scope="col">Ngày đăng</th>
                <th scope="col"></th>
            </tr>
        </thead>
    )
}

export default TableHeader