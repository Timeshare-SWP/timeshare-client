import React, { useEffect, useState } from 'react'
import './style.scss'
import { Container } from 'react-bootstrap'
import { useLocation } from 'react-router';

import { LeftSideComponent } from './_components/LeftSideComponent';
import RightSideComponent from './_components/RightSideComponent';

const TimeshareDetail = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditModeChange = () => {
    setIsEditMode(!isEditMode);
  };

  const locationState = useLocation();
  const item = locationState?.state?.item

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <Container >
      <div className='row timeshare-detail my-5' style={{ position: 'relative' }}>
        <LeftSideComponent item={item} isEditMode={isEditMode} handleEditModeChange={handleEditModeChange}/>
        <RightSideComponent item={item}  isEditMode={isEditMode} handleEditModeChange={handleEditModeChange} />
      </div>
    </Container>
  )
}

export default TimeshareDetail