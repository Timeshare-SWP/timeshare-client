import React, { useContext } from 'react';
import { convertToNumberFormat, convertToVietnameseTime } from '../../../../utils/handleFunction';
import { IoIosMore } from "react-icons/io";
import MoreAction from './MoreAction';
import { AuthContext } from '../../../../contexts/authContext';

const TableBody = ({ reservedPlaceList }) => {

    console.log("reservedPlaceList", reservedPlaceList)
    const { userDecode } = useContext(AuthContext);

    return (
        <div className="table100-body js-pscroll ps ps--active-y">
            <table>
                <tbody>
                    {reservedPlaceList.map((item, index) => (
                        <tr className="row100 body" key={index}>
                            <td className="cell100 column1">{item?.timeshare_id?.timeshare_name}</td>
                            <td className="cell100 column2">
                                {item?.timeshare_id?.sell_timeshare_status === "Chưa được bán"
                                    ? <div className='btn btn-danger status-buy' style={{ fontSize: '12px' }}>Sắp mở bán</div>
                                    : item?.timeshare_id?.sell_timeshare_status === "Đang mở bán"
                                        ? <div className='btn btn-success status-buy' style={{ fontSize: '12px' }}>Đang mở bán</div>
                                        : <div className='btn btn-secondary status-buy' style={{ fontSize: '12px' }}>Đã bán</div>
                                }
                            </td>
                            <td className="cell100 column3">
                                {item?.customers.map((person, index) => (
                                    <>
                                        <p key={index}>
                                            {person?.fullName}
                                            {person?._id === userDecode?._id && " (bạn)"}
                                        </p>
                                    </>
                                ))}
                            </td>

                            <td className="cell100 column4">
                                {item?.customers.map((person, index) => (
                                    <>
                                        <p key={index} style={{ fontStyle: person?.phone_number ? 'normal' : 'italic' }}>
                                            {person?.phone_number || '(Chưa cập nhập)'}
                                        </p>
                                    </>
                                ))}
                            </td>
                            <td className="cell100 column5">{convertToNumberFormat(item?.reservation_price)}</td>
                            <td className="cell100 column6">{item?.is_reservation_paid ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
                            <td className="cell100 column7">{convertToVietnameseTime(item?.createdAt)}</td>
                            <td className='cell100 column8'>
                                <MoreAction transactionSelected={item} userDecode={userDecode}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableBody;
