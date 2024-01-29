import React, { useEffect } from 'react'
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

  console.log("dataTimeshareList", dataTimeshareList)

  useEffect(() => {
    dispatch(getTimeshareForGuest())
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
        {Array.isArray(dataTimeshareList) && dataTimeshareList.map((item, index) => (
          <TimeshareCard item={item} key={index} />
        ))}
      </Container>

    </div>
  )
}

export default TimeshareList