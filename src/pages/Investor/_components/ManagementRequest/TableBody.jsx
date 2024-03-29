import React, { useContext, useEffect, useState } from 'react';
import { convertToSlug, convertToVietnameseTime } from '../../../../utils/handleFunction';
import MoreAction from './MoreAction';
import { AuthContext } from '../../../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import SpinnerLoading from '../../../../components/shared/SpinnerLoading'
import { confirmSellTimeshare } from '../../../../redux/features/timeshareSlice';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import ModalConfirm from '../../../../components/shared/ModalConfirm';
import { createNotification } from '../../../../redux/features/notificationSlice';
import { checkAllTransactionHaveContract, getContractByTransactionId } from '../../../../redux/features/contractSlice';
import Skeleton from '../../../../components/shared/Skeleton';

const TableBody = ({ transactionList, setTransactionList }) => {
    // console.log("transactionList", transactionList);

    const { userDecode } = useContext(AuthContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const displayedTimeshares = [];

    //state cho việc xử lý confirm sell
    const [openModalConfirmSell, setOpenModalConfirmSell] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [actionType, setActionType] = useState("");
    const [selectedTransaction, setSelectedTransaction] = useState("");
    const [noteRejected, setNoteRejected] = useState("")
    const [errorNoteRejected, setErrorNoteRejected] = useState("");

    const handleActionConfirmBuy = (status, item) => {
        setActionType(status);
        setSelectedTransaction(item)
        setOpenModalConfirmSell(true);
    }

    const handleCallApiConfirmSell = () => {

        if (actionType === "Rejected" && noteRejected === "") {
            setErrorNoteRejected("Vui lòng nhập lý do từ chối!");
            return;
        }

        setIsLoading(true);

        dispatch(confirmSellTimeshare({ transaction_id: selectedTransaction._id, transaction_status: actionType, note_rejected: noteRejected })).then((resConfirm) => {
            if (confirmSellTimeshare.fulfilled.match(resConfirm)) {
                toast.success('Phản hồi thành công!')
                console.log("selectedTransaction", selectedTransaction)
                console.log("transactionList", transactionList)
                const updatedTransactionList = transactionList.filter(transaction => transaction._id !== selectedTransaction._id);
                setTransactionList(updatedTransactionList);

                setNoteRejected("")
                setErrorNoteRejected("");


                //xử lý change UI
                if (actionType === "Rejected") {
                    const index = transactionList.findIndex(transaction => transaction._id === resConfirm.payload._id);

                    if (index !== -1) {
                        const updatedTransactionList = [...transactionList];
                        updatedTransactionList[index] = resConfirm.payload;
                        setTransactionList(updatedTransactionList);
                    }
                } else {
                    if (selectedTransaction?.timeshare_id?.sell_number === 1) {
                        setTransactionList(transactionPlaces => transactionPlaces.map(place => {
                            if (place._id === resConfirm.payload._id) {
                                return resConfirm.payload;
                            } else if (place.timeshare_id._id === resConfirm?.payload?.timeshare_id._id) {
                                return {
                                    ...place,
                                    transaction_status: "Rejected"
                                };
                            }
                            return place;
                        }));
                    } else {
                        const updatedTransactionList = transactionList.map(transaction => {
                            if (transaction._id === selectedTransaction._id) {
                                return resConfirm.payload;
                            }
                            return transaction;
                        });
                        setTransactionList(updatedTransactionList);
                    }
                }

                //xử lý gửi Noti
                if (actionType === "Rejected") {
                    for (const user of resConfirm?.payload?.customers) {
                        try {
                            const dataBodyNoti = {
                                user_id: user._id,
                                notification_content: `${userDecode?.fullName} đã từ chối bán dự án ${resConfirm?.payload?.timeshare_id.timeshare_name} cho bạn`,
                                notification_title: `REJECT_BUY_TIMESHARE_TO_CUSTOMER`,
                                notification_type: `REJECT_BUY_TIMESHARE_TO_CUSTOMER`,
                            };

                            dispatch(createNotification(dataBodyNoti)).then((resCreateNoti) => {
                                console.log("resCreateNoti", resCreateNoti.payload)
                            })
                            // console.log("resNoti", resNoti)
                        } catch (error) {
                            toast.error(`${error}`);
                        }
                    }
                } else if (actionType === "Selected") {
                    for (const user of resConfirm?.payload?.customers) {
                        try {
                            const dataBodyNoti = {
                                user_id: user._id,
                                notification_content: `${userDecode?.fullName} đã đồng ý bán dự án ${resConfirm?.payload?.timeshare_id.timeshare_name} cho bạn`,
                                notification_title: `ACCEPT_BUY_TIMESHARE_TO_CUSTOMER`,
                                notification_type: `ACCEPT_BUY_TIMESHARE_TO_CUSTOMER`,
                            };

                            dispatch(createNotification(dataBodyNoti)).then((resCreateNoti) => {
                                console.log("resCreateNoti", resCreateNoti.payload);
                            });

                        } catch (error) {
                            toast.error(`${error}`);
                        }
                    }

                    const updatedTransactionList = transactionList.filter(transaction => transaction.transaction_status === "Waiting");
                    updatedTransactionList?.forEach(obj => {
                        obj?.customers?.forEach(user => {
                            try {
                                const dataBodyNoti = {
                                    user_id: user._id,
                                    notification_content: `${userDecode?.fullName} đã từ chối bán dự án ${resConfirm?.payload?.timeshare_id.timeshare_name} cho bạn`,
                                    notification_title: "REJECT_BUY_TIMESHARE_TO_CUSTOMER",
                                    notification_type: "REJECT_BUY_TIMESHARE_TO_CUSTOMER",
                                };

                                dispatch(createNotification(dataBodyNoti)).then((resCreateNoti) => {
                                    console.log("resCreateNoti", resCreateNoti.payload);
                                });

                            } catch (error) {
                                toast.error(`${error}`);
                            }
                        });
                    });
                }

                setIsLoading(false)
            } else {
                toast.error(`${resConfirm.payload}`)
                setIsLoading(false)
            }
            setOpenModalConfirmSell(false)
        })
    }

    //reset lại list transaction list để xem đã có contract chưa
    const [isLoadingContractStatus, setIsLoadingContractStatus] = useState(false)
    const [transactionContractList, setTransactionContractList] = useState([])

    useEffect(() => {
        setIsLoadingContractStatus(true)
        dispatch(checkAllTransactionHaveContract()).then((resCheckTrans) => {
            if (checkAllTransactionHaveContract.fulfilled.match(resCheckTrans)) {
                setTransactionContractList(resCheckTrans.payload);
            }
            setIsLoadingContractStatus(false)
        });

    }, []);

    useEffect(() => {
        const updatedTransactionList = transactionList.map(transaction => {
            const matchingContract = transactionContractList.find(contract => contract._id === transaction._id);
            if (matchingContract) {
                return {
                    ...transaction,
                    is_contract: matchingContract.is_contract
                };
            } else {
                return transaction;
            }
        });

        // console.log("updatedTransactionList", updatedTransactionList)

        setTransactionList(updatedTransactionList);
    }, [transactionContractList]);


    //Xử lý countdown, đồng hồ đếm ngược 30 phút
    const [countdown, setCountdown] = useState(null);
    const [showCountdown, setShowCountdown] = useState(false);
    const [timeshareIdInLocal, setTimeshareIdInLocal] = useState('');

    useEffect(() => {
        const storedDataCountdown = localStorage.getItem('data_countdown');
        if (storedDataCountdown !== null) {
            const { timeshare_id, countdown_timestamp } = JSON.parse(storedDataCountdown);
            const storedTimeElapsed = Math.floor((Date.now() - countdown_timestamp) / 1000);
            const remainingTime = 30 * 60 - storedTimeElapsed;
            setTimeshareIdInLocal(timeshare_id);
            if (remainingTime > 0) {
                setCountdown(remainingTime);
                setShowCountdown(true);
            } else {
                setShowCountdown(false);
            }
        }
    }, []);

    useEffect(() => {
        if (countdown !== null && countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);

            return () => clearTimeout(timer);
        } else if (countdown === 0) {
            setShowCountdown(false);
        }
    }, [countdown]);

    const renderCountdown = () => {
        const minutes = Math.floor(countdown / 60);
        const seconds = countdown % 60;

        return (
            <div className="countdown">
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </div>
        );
    };

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
                                <p className='text-center fw-bold'>Bạn chưa có yêu cầu nào cả</p>
                            </td>
                        </tr>
                    ) : (
                        transactionList.map((item, index) => {
                            const isDisplayed = displayedTimeshares.includes(item.timeshare_id._id);
                            if (!isDisplayed) {
                                displayedTimeshares.push(item.timeshare_id._id);
                                return (
                                    <>
                                        <tr className="row100 body" key={index} style={{ position: 'relative' }}>
                                            <td className="cell100 column1"
                                                rowSpan={transactionList.filter(transaction => transaction.timeshare_id.timeshare_name === item.timeshare_id.timeshare_name).length}
                                            >
                                                {item?.timeshare_id?.timeshare_name}
                                            </td>

                                            <td className="cell100 column2">{item?.customers.map((person, index) => (
                                                <p key={index}>
                                                    {person?.fullName}
                                                    {person?._id === userDecode?._id && " (bạn)"}
                                                </p>
                                            ))}
                                            </td>
                                            <td className="cell100 column3">{item?.customers.map((person, index) => (
                                                <p key={index} style={{ fontStyle: person?.phone_number ? 'normal' : 'italic' }}>
                                                    {person?.phone_number || '(Chưa cập nhập)'}
                                                </p>
                                            ))}
                                            </td>
                                            <td className='cell100 column4' style={{ fontStyle: item?.reservation_time ? 'normal' : 'italic' }}>
                                                {item?.reservation_time ? convertToVietnameseTime(item.reservation_time) : "Chưa đặt chỗ trước"}
                                            </td>
                                            <td className="cell100 column5">{convertToVietnameseTime(item?.updatedAt)}</td>
                                            <td className="cell100 column6">
                                                {item?.transaction_status === "Waiting" && (
                                                    <span>
                                                        <button className="status-button accept" onClick={() => handleActionConfirmBuy("Selected", item)}>
                                                            Đồng ý
                                                        </button>
                                                        {" "}
                                                        /
                                                        {" "}
                                                        <button className="status-button reject" onClick={() => handleActionConfirmBuy("Rejected", item)}>
                                                            Từ chối
                                                        </button>
                                                    </span>
                                                )}
                                                {item?.transaction_status !== "Waiting" && (
                                                    <span className={item?.transaction_status === "Selected" ? "status-selected" : "status-rejected"}>
                                                        {item?.transaction_status === "Selected" ? "Đã đồng ý bán" : "Đã từ chối bán"}
                                                    </span>
                                                )}
                                            </td>

                                            <td className='cell100 column7'
                                                rowSpan={transactionList.filter(transaction => transaction.timeshare_id.timeshare_name === item.timeshare_id.timeshare_name).length}>
                                                {item?.timeshare_id?.sell_number ? item?.timeshare_id?.sell_number : '1'}
                                            </td>

                                            <td className='cell100 column8'
                                            >
                                                <MoreAction
                                                    item={item}
                                                    transactionList={transactionList}
                                                    setTransactionList={setTransactionList}
                                                    userDecode={userDecode} />

                                            </td>

                                            {item?.timeshare_id._id === timeshareIdInLocal && (showCountdown && renderCountdown())}

                                        </tr >
                                    </>
                                );
                            } else {
                                return (
                                    <>
                                        <tr className="row100 body" key={index} style={{ position: 'relative' }}>
                                            <td className="cell100 column2">{item?.customers.map((person, index) => (
                                                <p key={index}>
                                                    {person?.fullName}
                                                    {person?._id === userDecode?._id && " (bạn)"}
                                                </p>
                                            ))}
                                            </td>
                                            <td className="cell100 column3">{item?.customers.map((person, index) => (
                                                <p key={index} style={{ fontStyle: person?.phone_number ? 'normal' : 'italic' }}>
                                                    {person?.phone_number || '(Chưa cập nhập)'}
                                                </p>
                                            ))}
                                            </td>
                                            <td className='cell100 column4' style={{ fontStyle: item?.reservation_time ? 'normal' : 'italic' }}>
                                                {item?.reservation_time ? convertToVietnameseTime(item.reservation_time) : "Chưa đặt chỗ trước"}
                                            </td>
                                            <td className="cell100 column5">{convertToVietnameseTime(item?.updatedAt)}</td>
                                            <td className="cell100 column6">
                                                {item?.transaction_status === "Waiting" && (
                                                    <span>
                                                        <button className="status-button accept" onClick={() => handleActionConfirmBuy("Selected", item)}>
                                                            Đồng ý
                                                        </button>
                                                        {" "}
                                                        /
                                                        {" "}
                                                        <button className="status-button reject" onClick={() => handleActionConfirmBuy("Rejected", item)}>
                                                            Từ chối
                                                        </button>
                                                    </span>
                                                )}
                                                {item?.transaction_status !== "Waiting" && (
                                                    <span className={item?.transaction_status === "Selected" ? "status-selected" : "status-rejected"}>
                                                        {item?.transaction_status === "Selected" ? "Đã đồng ý bán" : "Đã từ chối bán"}
                                                    </span>
                                                )}
                                            </td>



                                            <td className='cell100 column8'
                                            >                             
                                                <MoreAction
                                                    item={item}
                                                    transactionList={transactionList}
                                                    setTransactionList={setTransactionList}
                                                    userDecode={userDecode} />

                                            </td>
                                        </tr>
                                    </>
                                );
                            }
                        })
                    )}
                </tbody>
            </table>

            {openModalConfirmSell
                &&
                <ModalConfirm
                    show={openModalConfirmSell}
                    handleClose={() => {
                        setOpenModalConfirmSell(false);
                        setNoteRejected("");
                    }}
                    handleAccept={handleCallApiConfirmSell}
                    body={
                        <>
                            <p>
                                Bạn có chắc muốn <span className='fw-bold'>{actionType === "Selected" ? "bán" : "từ chối bán"}</span> timeshare cho bên này?
                            </p>

                            {actionType !== "Selected" && (
                                <>
                                    <div className="form-group-material mt-4">
                                        <textarea
                                            rows="3"
                                            required="required"
                                            className="form-control"
                                            spellCheck="false"
                                            value={noteRejected}
                                            onChange={(e) => {
                                                setNoteRejected(e.target.value);
                                                setErrorNoteRejected("")
                                            }}
                                            placeholder='Timeshare này đã hết slot để mua!'
                                        />
                                        <label>Lý do từ chối <span className="text-danger">*</span></label>
                                    </div>
                                    {errorNoteRejected && <span className="error-message">{errorNoteRejected}</span>}


                                </>
                            )}
                        </>
                    }
                />
            }

            {isLoading && <SpinnerLoading />}
        </div >
    );
};

export default TableBody;
