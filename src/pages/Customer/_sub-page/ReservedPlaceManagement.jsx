import React, { useEffect, useState } from 'react'
import GeneralManagementLayout from '../GeneralManagementLayout'
import { viewAllReservedPlace } from '../../../redux/features/reservedPlaceSlice';
import { useDispatch, useSelector } from 'react-redux';
import SimpleLoading from '../../../components/shared/SimpleLoading';
import TableLayout from '../_components/ReservedPlace/TableLayout';
import { RESERVED_PLACE_TABLE_HEADER_NAME } from '../../../constants/header';

const ReservedPlaceManagement = () => {

  const [reservedPlaceList, setReservedPlaceList] = useState([]);
  const { loadingReservedPlace } = useSelector((state) => state.reservedPlace)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewAllReservedPlace()).then((result) => {
      setReservedPlaceList(result.payload)
    })
  }, [])

  if (loadingReservedPlace) {
    return (
      <GeneralManagementLayout>
        <div className='reserved-place-container'>
          <div style={{ height: '50vh' }} className='d-flex justify-content-center align-items-center'>
            <SimpleLoading />
          </div>
        </div>
      </GeneralManagementLayout>
    )
  }

  return (
    <GeneralManagementLayout>
      <div className='reserved-place-container'>
        <TableLayout tableHeaderName={RESERVED_PLACE_TABLE_HEADER_NAME} reservedPlaceList={reservedPlaceList} />
      </div>
    </GeneralManagementLayout>

  )
}

export default ReservedPlaceManagement