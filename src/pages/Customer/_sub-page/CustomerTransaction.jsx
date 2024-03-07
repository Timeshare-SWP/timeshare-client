import React, { useEffect, useState } from 'react'
import GeneralManagementLayout from '../GeneralManagementLayout'
import { useDispatch, useSelector } from 'react-redux';
import { viewAllTransaction } from '../../../redux/features/transactionSlice';
import SimpleLoading from '../../../components/shared/SimpleLoading';
import { TRANSACTION_TABLE_HEADER_NAME } from '../../../constants/header';
import TableLayout from '../_components/CustomerTransaction/TableLayout'

const CustomerTransaction = () => {
  const [transactionList, setTransactionList] = useState([]);
  const { loadingTransaction } = useSelector((state) => state.transaction)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewAllTransaction()).then((result) => {
      const sortedTransactionList = result.payload.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTransactionList(sortedTransactionList);
    });
  }, []);

  if (loadingTransaction) {
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
      <div className='investor-transaction-container'>
        <TableLayout
          tableHeaderName={TRANSACTION_TABLE_HEADER_NAME}
          transactionList={transactionList}
          setTransactionList={setTransactionList}
        />
      </div>
    </GeneralManagementLayout>
  )
}

export default CustomerTransaction