import React from 'react'
import { Outlet } from "react-router-dom";
import AdminSideBar from "../../components/admin/AdminSideBar"

const index = () => {
    return (
        <div className='d-flex'>
            <AdminSideBar />
            <div className="main flex-grow-1 p-5 main-admin">
                <Outlet />
            </div>
        </div>
    )
}

export default index