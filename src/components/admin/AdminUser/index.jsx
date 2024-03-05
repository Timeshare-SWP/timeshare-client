import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd'; 
import Cookies from 'js-cookie';


const App = () => {
    const token = Cookies.get("token");
    console.log("token: ", token);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            fetch("https://timeshare-l2nv.onrender.com/api/users", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setUsers(data)
                })
        }
        fetchData();
    }, [])


    const fetchData = async () => {
        try {
            const response = await fetch(`https://timeshare-l2nv.onrender.com/api/users`);
            const result = await response.json();
            setUsers(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = async (record) => {
        console.log(record)
        fetch(`https://timeshare-l2nv.onrender.com/api/users/${record.key}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        })
        //.then(() => fetchData())
       
    };

    const columns = [

        {
            title: 'Full Name',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Address',
            width: 170,
            dataIndex: 'address',
            key: 'address',
            fixed: 'left',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            width: 50,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 100,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: 50,
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 20,
            // render: () => <a>Delete</a>
            render: (text, record) => (
                <Popconfirm
                    title="Are you sure you want to delete this item?"
                    onConfirm={() => handleDelete(record)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="danger">Delete</Button>
                </Popconfirm>
            ),
        },
    ];
    const data = []
    return (
        <div>
            {users.map((user) => {
                const userData = {
                    key: `${user._id}`,
                    name: `${user.fullName}`,
                    address: `${user.address}`,
                    phone: `${user.phone_number}`,
                    email: `${user.email}`,
                    role: `${user.role_id.roleName}`
                };
                data.push(userData);
                return null;
            })}
            <h2 className='mb-4'>Trang quản lí người dùng</h2>
            <Table
                columns={columns}
                dataSource={data}
            />
        </div>
    )
};
export default App;