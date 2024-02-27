import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTimeshareForGuest } from '../../redux/features/timeshareSlice'
import CommonSection from "../../components/CommonSection"
import { Container } from 'react-bootstrap'
import TimeshareListLoading from './_components/TimeshareListLoading'
import './style.scss'

import TimeshareCard from './_components/TimeshareCard'

const TimeshareList = () => {

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
    dispatch(getTimeshareForGuest()).then((result) => {
      if (getTimeshareForGuest.fulfilled.match(result)) {
        setTimeShareList(result.payload)
      }
    })
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loadingTimeshare) {
    return (<TimeshareListLoading />)
  }

  return (
    <div className='timeshare-list-container'>
      <CommonSection title="Các timeshare hiện có" />

      <Container>
        <div className="d-flex justify-content-between align-items-center px-3 my-3 header-function">
          <div className='d-flex'>
            <div className="group">
              <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
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
        </div>

        <div className='timeshare-list-container__list-card'>
          {filteredTimeshareList.length === 0 ? (
            <div className="text-center">Không tìm thấy timeshare phù hợp</div>
          ) : (
            filteredTimeshareList.map((item, index) => (
              <TimeshareCard item={item} key={index} />
            ))
          )}
        </div>
      </Container>

    </div>
  )
}

export default TimeshareList