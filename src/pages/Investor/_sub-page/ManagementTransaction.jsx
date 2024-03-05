import React, { useEffect, useState } from 'react'
import GeneralInvestorLayout from '../layout/GeneralInvestorLayout';
import { viewAllTransaction } from '../../../redux/features/transactionSlice';
import { useDispatch, useSelector } from 'react-redux';
import SimpleLoading from '../../../components/shared/SimpleLoading';
import { TRANSACTION_TABLE_HEADER_NAME } from '../../../constants/header';
import TableLayout from '../_components/ManagementTransaction/TableLayout'

const ManagementTransaction = () => {
    const [transactionList, setTransactionList] = useState([]);
    const { loadingTransaction } = useSelector((state) => state.transaction)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(viewAllTransaction()).then((result) => {
            const groupedTransactions = {};
            result.payload.forEach(transaction => {
                const timeshareName = transaction.timeshare_id.timeshare_name;
                if (!groupedTransactions[timeshareName]) {
                    groupedTransactions[timeshareName] = [];
                }
                groupedTransactions[timeshareName].push(transaction);
            });

            const sortedTransactionList = [];
            Object.values(groupedTransactions).forEach(group => {
                const sortedGroup = group.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                sortedTransactionList.push(...sortedGroup);
            });

            sortedTransactionList?.reverse();

            setTransactionList(sortedTransactionList);
        });
    }, []);

    if (loadingTransaction) {
        return (
            <GeneralInvestorLayout>
                <div className='reserved-place-container'>
                    <div style={{ height: '50vh' }} className='d-flex justify-content-center align-items-center'>
                        <SimpleLoading />
                    </div>
                </div>
            </GeneralInvestorLayout>
        )
    }

    return (
        <GeneralInvestorLayout>
            <div className='investor-transaction-container'>
                <TableLayout
                    tableHeaderName={TRANSACTION_TABLE_HEADER_NAME}
                    transactionList={transactionList}
                    setTransactionList={setTransactionList}
                />
            </div>
        </GeneralInvestorLayout>
    )
}

export default ManagementTransaction