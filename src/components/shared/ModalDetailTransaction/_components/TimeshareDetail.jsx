import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { LeftSideComponent } from '../../../../pages/TimeshareDetail/_components/LeftSideComponent';
import RightSideComponent from '../../../../pages/TimeshareDetail/_components/RightSideComponent';

const TimeshareDetail = (props) => {
    const { timeshare, setTimeShareList, timeshareList, handleClose } = props


    const [isEditMode, setIsEditMode] = useState(false);

    const handleEditModeChange = () => {
        setIsEditMode(!isEditMode);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container >
            <div className='row timeshare-detail my-5' style={{ position: 'relative' }}>
                <LeftSideComponent item={timeshare}
                    isEditMode={isEditMode}
                    handleEditModeChange={handleEditModeChange}
                    setTimeShareList={setTimeShareList}
                    timeshareList={timeshareList}
                    handleClose={handleClose}
                />
                <RightSideComponent
                    item={timeshare}
                    setTimeShareList={setTimeShareList}
                    timeshareList={timeshareList}
                    handleClose={handleClose}
                    isEditMode={isEditMode}
                    handleEditModeChange={handleEditModeChange}
                />
            </div>
        </Container>
    )
}

export default TimeshareDetail