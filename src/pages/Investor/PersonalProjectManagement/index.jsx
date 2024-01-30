import React, { useEffect, useState } from 'react'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getTimeshareForInvestor } from '../../../redux/features/timeshareSlice';
import SimpleLoading from "../../../components/shared/SimpleLoading"
import CommonSection from '../../../components/CommonSection';
import { Container, Form } from 'react-bootstrap';
import TableHeader from './_components/TableHeader';
import TableBody from './_components/TableBody';
import { BsPlusLg, BsSearch } from "react-icons/bs";


const PersonalProjectManagement = () => {
    const dispatch = useDispatch();

    const { dataTimeshareList, loadingTimeshare } = useSelector((state) => state.timeshare)

    const [timeshareList, setTimeShareList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredTimeshareList = timeshareList.filter((timeshare) =>
        timeshare.timeshare_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        dispatch(getTimeshareForInvestor()).then((result) => {
            if (getTimeshareForInvestor.fulfilled.match(result)) {
                setTimeShareList(result.payload)
            }
        })
    }, [])

    console.log("data", dataTimeshareList)


    if (loadingTimeshare) {
        return (<SimpleLoading />)
    }

    return (
        <>
            <CommonSection title="Dự án cá nhân" />

            <Container className='my-3'>
                <div className="d-flex justify-content-between align-items-center px-3 my-3 header-function">
                    <div className='d-flex'>
                        <div class="group">
                            <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                            <input
                                placeholder="Tìm kiếm ..."
                                type="search"
                                className="input"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>

                        <div>
                            <div className="mx-2 btn btn-outline-secondary" style={{ width: '100%' }}>
                                Bộ Lọc
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="mx-2 btn btn-primary"><BsPlusLg /> Đăng Timeshare</div>
                    </div>
                </div>

                <table class="table border table-sm table-timeshare-investor">
                    <TableHeader />
                    <TableBody timeshareList={filteredTimeshareList} setTimeShareList={setTimeShareList} />
                </table>
            </Container>
        </>

    )
}

export default PersonalProjectManagement