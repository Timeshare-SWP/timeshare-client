import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import Cookies from 'js-cookie';


const App = () => {
    const token = Cookies.get("token");
    console.log("token: ", token);

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {

        fetchData();
    }, [])

    const fetchData = async () => {
        fetch("https://timeshare-server-7qcr.onrender.com/api/transactions", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setTransactions(data)
            })
    }
    const handleDelete = async (record) => {
        console.log(record)
        fetch(`https://timeshare-server-7qcr.onrender.com/api/users/${record.key}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        })
            .then(() => fetchData())

    };

    const data = []

    const columns = [
        {
            title: 'Full Name',
            width: 180,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Address',
            width: 90,
            dataIndex: 'address',
            key: 'address',
            fixed: 'left',
        },
        {
            title: 'Diện tích',
            width: 60,
            dataIndex: 'land_area',
            key: 'land_area',
            fixed: 'left',
        },
        {
            title: 'Năm bắt đầu',
            dataIndex: 'year_of_commencement',
            key: 'year_of_commencement',
            width: 50,
        },
        {
            title: 'Năm bàn giao',
            dataIndex: 'year_of_handover',
            key: 'year_of_handover',
            width: 50,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'timeshare_status',
            key: 'timeshare_status',
            width: 85,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 120,
        },
        {
            title: 'Cập nhật',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            width: 120,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            width: 75,
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 20,
            //render: () => <a>Delete</a>
            render: (text, record) => (
                <Popconfirm
                    title="Are you sure you want to delete this item?"
                    onConfirm={() => handleDelete(record)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="danger" style={{ backgroundColor: "red", color: "white" }}>Delete</Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <div>
            {
                transactions.map((tran) => {
                    const transactionData = {
                        key: `${tran._id}`,
                        address: `${tran.timeshare_id.timeshare_address}`,
                        name: `${tran.timeshare_id.timeshare_name}`,
                        land_area: `${tran.timeshare_id.land_area}`,
                        year_of_commencement: `${tran.timeshare_id.year_of_commencement}`,
                        year_of_handover: `${tran.timeshare_id.year_of_handover}`,
                        timeshare_status: `${tran.timeshare_id.timeshare_status}`,
                        createdAt: `${tran.timeshare_id.createdAt}`,
                        updatedAt: `${tran.timeshare_id.updatedAt}`,
                        price: `${tran.timeshare_id.price}`
                    };
                    data.push(transactionData);
                    return null;
                })
            }
            <h2 className='mb-4'>Các giao dịch</h2>
            <Table
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}

export default App;