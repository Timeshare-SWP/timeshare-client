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
      const sortedReservedPlaceList = result.payload.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      const filteredReservedPlaceList = sortedReservedPlaceList.filter(item => item.transaction_status !== "Unreserve");

      setReservedPlaceList(filteredReservedPlaceList);
    });
  }, []);


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
        <TableLayout
          tableHeaderName={RESERVED_PLACE_TABLE_HEADER_NAME}
          reservedPlaceList={reservedPlaceList}
          setReservedPlaceList={setReservedPlaceList}
        />
      </div>
    </GeneralManagementLayout>

  )
}

export default ReservedPlaceManagement