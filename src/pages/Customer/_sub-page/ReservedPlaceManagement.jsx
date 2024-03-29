import React, { useEffect, useState } from 'react'
import GeneralManagementLayout from '../GeneralManagementLayout'
import { viewAllReservedPlace } from '../../../redux/features/reservedPlaceSlice';
import { useDispatch, useSelector } from 'react-redux';
import SimpleLoading from '../../../components/shared/SimpleLoading';
import TableLayout from '../_components/ReservedPlace/TableLayout';
import { RESERVED_PLACE_TABLE_HEADER_NAME } from '../../../constants/header';
import DrawerFilter from '../../../components/shared/DrawerFilter';

const ReservedPlaceManagement = () => {

  const [reservedPlaceList, setReservedPlaceList] = useState([]);
  const [initialReservedPlaceList, setInitialReservedPlaceList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { loadingReservedPlace } = useSelector((state) => state.reservedPlace)
  const [openDrawerFilter, setOpenDrawerFilter] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    sellTimeshareStatus: null,
    isReservationPaid: null,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewAllReservedPlace()).then((result) => {
      const sortedReservedPlaceList = result.payload.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      const filteredReservedPlaceList = sortedReservedPlaceList.filter(item => item.transaction_status !== "Unreserve");
      setReservedPlaceList(filteredReservedPlaceList);
      setInitialReservedPlaceList(filteredReservedPlaceList);
    });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearFilters = () => {
    setFilterOptions({
      sellTimeshareStatus: null,
      isReservationPaid: null,
    });
    setReservedPlaceList(initialReservedPlaceList);
  };

  const filteredReservedPlaceList = reservedPlaceList.filter((item) => {
    const matchesSellStatus =
      !filterOptions.sellTimeshareStatus ||
      item.timeshare_id.sell_timeshare_status ===
      filterOptions.sellTimeshareStatus;
    const matchesPaymentStatus =
      filterOptions.isReservationPaid === null ||
      item.is_reservation_paid.toString() === filterOptions.isReservationPaid;

    return matchesSellStatus && matchesPaymentStatus;
  });

  if (loadingReservedPlace) {
    return (
      <GeneralManagementLayout>
        <div className='reserved-place-container'>
          <div style={{ height: '80vh' }} className='d-flex justify-content-center align-items-center'>
            <SimpleLoading />
          </div>
        </div>
      </GeneralManagementLayout>
    )
  }

  return (
    <GeneralManagementLayout>
      <div className='reserved-place-container'>
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
              <div className="mx-2 btn btn-outline-secondary" style={{ width: '100%' }}
                onClick={() => setOpenDrawerFilter(true)}
              >
                Bộ Lọc
              </div>
            </div>
          </div>
        </div>

        <TableLayout
          tableHeaderName={RESERVED_PLACE_TABLE_HEADER_NAME}
          reservedPlaceList={filteredReservedPlaceList}
          setReservedPlaceList={setReservedPlaceList}
        />

        {openDrawerFilter
          &&
          <DrawerFilter
            show={openDrawerFilter}
            handleClose={() => setOpenDrawerFilter(false)}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            handleClearFilters={handleClearFilters}
          />
        }

        
      </div>
    </GeneralManagementLayout>
  )
}

export default ReservedPlaceManagement
