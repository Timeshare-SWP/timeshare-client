import React from 'react'
import UserHeader from '../../components/UserHeader'
import { Outlet } from 'react-router-dom'
import UserFooter from '../../components/UserFooter'

const UserLayout = () => {
    return (
        <>
            <UserHeader />

            <Outlet />

            <UserFooter />
        </>
    )
}

export default UserLayout