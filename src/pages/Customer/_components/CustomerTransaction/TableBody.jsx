import React, { useContext } from 'react';
import { convertToNumberFormat, convertToVietnameseTime } from '../../../../utils/handleFunction';
import MoreAction from './MoreAction';
import { AuthContext } from '../../../../contexts/authContext';

const TableBody = ({ transactionList, setTransactionList }) => {

    console.log("transactionList", transactionList)
    const { userDecode } = useContext(AuthContext);

    return (
        <div className="table100-body js-pscroll ps ps--active-y">
            <table>
                <tbody>
                    {transactionList.length === 0 ? (
                        <tr className="row100 body">
                            <td className="cell100" colSpan="8">
                                <div style={{ textAlign: 'center' }}>
                                    <img src="https://arthouse.vn/images/emptycart.png" alt="Empty Cart" />
                                </div>
                                <p className='text-center fw-bold'>Bạn chưa đặt giữ chỗ timeshare nào cả</p>
                            </td>
                        </tr>
                    ) : (
                        transactionList.map((item, index) => (
                            <tr className="row100 body" key={index}>
                                <td className="cell100 column1">{item?.timeshare_id?.timeshare_name}</td>
                                <td className="cell100 column2">
                                    {item?.customers.map((person, index) => (
                                        <>
                                            <p key={index}>
                                                {person?.fullName}
                                                {person?._id === userDecode?._id && " (bạn)"}
                                            </p>
                                        </>
                                    ))}
                                </td>
                                <td className="cell100 column3">
                                    {item?.customers.map((person, index) => (
                                        <>
                                            <p key={index} style={{ fontStyle: person?.phone_number ? 'normal' : 'italic' }}>
                                                {person?.phone_number || '(Chưa cập nhập)'}
                                            </p>
                                        </>
                                    ))}
                                </td>
                                <td className='cell100 column4' style={{ fontStyle: item?.reservation_time ? 'normal' : 'italic' }}>
                                    {item?.reservation_time ? convertToVietnameseTime(item.reservation_time) : "Chưa đặt chỗ trước"}
                                </td>
                                <td className="cell100 column5">{convertToVietnameseTime(item?.updatedAt)}</td>
                                <td className="cell100 column6">
                                    <span className={item?.transaction_status === "Waiting" ? "status-waiting" :
                                        item?.transaction_status === "Selected" ? "status-selected" :
                                            item?.transaction_status === "Rejected" ? "status-rejected" : ""}>
                                        {item?.transaction_status === "Waiting" ? "Đang chờ phản hồi" :
                                            item?.transaction_status === "Selected" ? "Đã đồng ý bán" :
                                                item?.transaction_status === "Rejected" ? "Đã từ chối bán" :
                                                    item?.transaction_status}
                                    </span>
                                </td>
                                <td className='cell100 column7'>Chưa đăng</td>
                                <td className='cell100 column8'>
                                    <MoreAction
                                        transactionSelected={item}
                                        transactionList={transactionList}
                                        setTransactionList={setTransactionList}
                                        userDecode={userDecode}
                                    />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableBody;
