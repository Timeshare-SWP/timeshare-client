import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { BsThreeDots } from "react-icons/bs";
import { TRANSACTION_LIST_ACTION_INVESTOR } from "../../../../constants/action"
import { useDispatch, useSelector } from 'react-redux';
import ModalConfirm from "../../../../components/shared/ModalConfirm"
import { confirmSellTimeshare } from '../../../../redux/features/timeshareSlice';
import toast from 'react-hot-toast';
import SpinnerLoading from '../../../../components/shared/SpinnerLoading'

const MoreAction = ({ transactionSelected, setTransactionList, userDecode }) => {

    const dispatch = useDispatch();
    const [openModalConfirmSell, setOpenModalConfirmSell] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleItemClick = (id) => {
        switch (id) {
            case 1:
                // xem thông tin chi tiết
                alert('xem thông tin chi tiết')
                break;
            case 2:
                //đồng ý bán
                setOpenModalConfirmSell(true)
                break;
            case 3:
                //hợp đồng
                alert('Hợp đồng')
                break;
            default:
                alert('Hmmmm, something wrong!')
        }
    }

    const renderDropDownMenuItem = () => {
        let actionsToShow = TRANSACTION_LIST_ACTION_INVESTOR;

        if (transactionSelected) {
            if (transactionSelected.transaction_status === "Selected" ||
                transactionSelected.transaction_status === "Rejected") {
                actionsToShow = TRANSACTION_LIST_ACTION_INVESTOR.filter(item => item.id !== 2);
            }
        }

        return actionsToShow.map((item, index) => (
            <Dropdown.Item
                key={index}
                className='d-flex align-items-center gap-2'
                onClick={() => handleItemClick(item?.id)}
            >
                {item?.icon}
                {item?.name}
            </Dropdown.Item>
        ));
    }


    const handleCallApiConfirmSell = () => {
        setIsLoading(true)
        dispatch(confirmSellTimeshare(transactionSelected._id)).then((resConfirm) => {
            console.log("resConfirm", resConfirm)
            if (confirmSellTimeshare.fulfilled.match(resConfirm)) {
                toast.success('Phản hồi thành công!')

                if (resConfirm.payload) {
                    setTransactionList(transactionPlaces => transactionPlaces.map(place => {
                        if (place._id === resConfirm.payload._id) {
                            return resConfirm.payload;
                        } else if (place.timeshare_id._id === resConfirm.payload.timeshare_id._id) {
                            return {
                                ...place,
                                transaction_status: "Rejected"
                            };
                        }
                        return place;
                    }));
                }

                setOpenModalConfirmSell(false)
                setIsLoading(false)
            } else {
                toast.error(`${resConfirm.payload}`)
                setOpenModalConfirmSell(false)
                setIsLoading(false)
            }
        })
    }

    return (
        <Dropdown className='notification-container'>
            <Dropdown.Toggle variant="ghost" id="dropdown-basic" className='d-flex justify-content-center align-items-center '>
                <BsThreeDots style={{ cursor: 'pointer' }} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {renderDropDownMenuItem()}
            </Dropdown.Menu>

            {openModalConfirmSell
                &&
                <ModalConfirm
                    show={openModalConfirmSell}
                    handleClose={() => setOpenModalConfirmSell(false)}
                    handleAccept={handleCallApiConfirmSell}
                    body={<h5>Bạn có chắc muốn bán timeshare cho bên này?</h5>}
                />
            }
            {isLoading && <SpinnerLoading />}

        </Dropdown>
    )
}

export default MoreAction