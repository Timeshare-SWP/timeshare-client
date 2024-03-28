import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { useDispatch } from 'react-redux';
import { confirmTimeshareByAdmin, getTimeshareForGuest } from '../../../redux/features/timeshareSlice';
import { convertToVNDFormat, convertToVnTime } from '../../../utils/handleFunction';
import toast from 'react-hot-toast';
import SimpleLoading from "../../shared/SimpleLoading"

const App = () => {
    const [timeshareList, setTimeshareList] = useState([]);
    const [loadingData, setLoadingData] = useState(false);

    const dispatch = useDispatch();

    const data = []

    const columns = [
        {
            title: 'Timeshare name',
            width: 150,
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
            title: 'Trạng thái',
            dataIndex: 'timeshare_status',
            key: 'timeshare_status',
            width: 85,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 80,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            width: 75,
        },
        {
            title: 'Xác nhận',
            dataIndex: 'confirm',
            key: 'confirm',
            width: 100,
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 20,
            //render: () => <a>Delete</a>
            render: (text, record) => (
                record.confirm === "Pending" && (
                    <Popconfirm
                        title="Bạn có chắc muốn đăng bán timeshare này?"
                        onConfirm={() => handleConfirm(record)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type="primary" style={{ backgroundColor: "#41C9E2", color: "white" }}>Xác nhận</Button>
                    </Popconfirm>
                )
            ),
        },
    ];

    const handleConfirm = (record) => {
        setLoadingData(true)

        dispatch(confirmTimeshareByAdmin({ timeshare_id: record.key, confirm_status: 'Accepted', reason_rejected: "" })).then((res) => {

            if (confirmTimeshareByAdmin.fulfilled.match(res)) {
                const updatedTimeshareList = timeshareList.map(timeshare => {
                    if (timeshare._id === record.key) {
                        return { ...timeshare, confirm_status: 'Accepted ' };
                    }
                    return timeshare;
                });
                setTimeshareList(updatedTimeshareList);
                toast.success('Đăng bán thành công!')
            } else {
                toast.error(`${res.payload}`)
            }
            console.log('res', res)
            setLoadingData(false)
        })
    }

    useEffect(() => {
        dispatch(getTimeshareForGuest()).then((res) => {
            if (getTimeshareForGuest.fulfilled.match(res)) {
                const timeshareCopy = [...res.payload];
                const sortedTimeshareList = timeshareCopy.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                console.log("res", sortedTimeshareList);
                setTimeshareList(sortedTimeshareList);
            }
        });
    }, []);


    return (
        <div>
            {
                timeshareList.map((timeshare) => {
                    const timeshareListData = {
                        key: `${timeshare._id}`,
                        address: `${timeshare.timeshare_address}`,
                        name: `${timeshare.timeshare_name}`,
                        timeshare_status: `${timeshare.timeshare_status}`,
                        createdAt: `${convertToVnTime(timeshare.createdAt)}`,
                        price: `${convertToVNDFormat(timeshare.price)}`,
                        confirm: `${timeshare.confirm_status}`
                    };
                    data.push(timeshareListData);
                    return null;
                })
            }
            <h2 className='mb-4'>Trang dự án</h2>
            <Table
                columns={columns}
                dataSource={data}
            />

            {loadingData && <SimpleLoading />}
        </div>
    )
}

export default App;