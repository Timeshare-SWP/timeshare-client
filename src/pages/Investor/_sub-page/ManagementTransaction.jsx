import React, { useEffect, useState } from 'react';
import GeneralInvestorLayout from '../layout/GeneralInvestorLayout';
import { viewAllTransaction } from '../../../redux/features/transactionSlice';
import { useDispatch, useSelector } from 'react-redux';
import SimpleLoading from '../../../components/shared/SimpleLoading';
import { TRANSACTION_TABLE_HEADER_NAME } from '../../../constants/header';
import TableLayout from '../_components/ManagementTransaction/TableLayout';

const ManagementTransaction = () => {
    const [transactionList, setTransactionList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { loadingTransaction } = useSelector((state) => state.transaction);

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

            sortedTransactionList.reverse();

            setTransactionList(sortedTransactionList);
        });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredTransactions = transactionList.filter(transaction => {
        const timeshareName = transaction.timeshare_id.timeshare_name.toLowerCase();
        return timeshareName.includes(searchTerm.toLowerCase());
    });
    

    if (loadingTransaction) {
        return (
            <GeneralInvestorLayout>
                <div className='reserved-place-container'>
                    <div style={{ height: '50vh' }} className='d-flex justify-content-center align-items-center'>
                        <SimpleLoading />
                    </div>
                </div>
            </GeneralInvestorLayout>
        );
    }

    return (
        <GeneralInvestorLayout>
            <div className='investor-transaction-container'>
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

                <TableLayout
                    tableHeaderName={TRANSACTION_TABLE_HEADER_NAME}
                    transactionList={filteredTransactions}
                    setTransactionList={setTransactionList}
                />
            </div>
        </GeneralInvestorLayout>
    );
};

export default ManagementTransaction;
