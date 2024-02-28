import React, { useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { CgArrowsExchange } from "react-icons/cg";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlinePublishedWithChanges } from "react-icons/md";

import { convertToNumberFormat, convertToVnTime } from '../../../../utils/handleFunction';
import { Dropdown } from 'react-bootstrap';
import ModalConfirm from '../../../../components/shared/ModalConfirm';
import { useDispatch, useSelector } from 'react-redux';
import { changeSellTimeshareStatus, changeTimeshareStatus } from '../../../../redux/features/timeshareSlice';
import toast from 'react-hot-toast';
import SpinnerLoading from "../../../../components/shared/SpinnerLoading"

const TableBody = (props) => {
    const { timeshareList, setTimeShareList } = props

    const dispatch = useDispatch();
    const { loadingUpdate } = useSelector((state) => state.timeshare)

    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({
        title: '',
        body: '',
        handleAccept: () => { }
    });


    const renderStatus = (status, statuses) => {
        let classNames = "";
        if (status === statuses[0]) classNames = "button-yellow";
        else if (status === statuses[1]) classNames = "button-green";
        else classNames = "button-gray";

        return <div className={`btn ${classNames}`}><p>{status}</p></div>;
    }

    const renderTimeshareAction = (timeshare_status) => {
        if (timeshare_status === "Sắp triển khai") return "Triển khai dự án";
        else if (timeshare_status === "Đang triển khai") return "Đã triển khai dự án";
        else return "Unknown";
    }

    const renderSellTimeshareAction = (sell_timeshare_status) => {
        if (sell_timeshare_status === "Chưa được bán") return "Mở bán timeshare";
        else if (sell_timeshare_status === "Đang mở bán") return "Xác nhận đã bán timeshare";
        else return "Unknown";
    }

    const handleOpenModalViewDetail = () => {

    }

    const buildModalBodyChangeTimeshareStatus = (timeshare_status) => {
        let body = '';
        if (timeshare_status === "Sắp triển khai") {
            body = 'Bạn có chắc chắn muốn triển khai Timeshare này?';
        } else if (timeshare_status === "Đang triển khai") {
            body = 'Bạn có chắc chắn muốn chuyển Timeshare này sang "Đã triển khai"?';
        }
        return body;
    }

    const buildModalBodyChangeSellTimeshareStatus = (sell_timeshare_status) => {
        let body = '';
        if (sell_timeshare_status === "Chưa được bán") {
            body = 'Bạn có chắc chắn muốn mở bán Timeshare này?';
        } else if (sell_timeshare_status === "Đang mở bán") {
            body = 'Bạn có chắc chắn muốn chuyển Timeshare này sang đã bán?';
        }
        return body;
    }

    const handleChangeTimeshareStatus = (item) => {
        setSelectedItem(item);
        setModalInfo({
            title: 'Xác nhận hành động',
            body: buildModalBodyChangeTimeshareStatus(item.timeshare_status),
            handleAccept: () => callApiChangeTimeshareStatus(item)
        });
        setShowModal(true);
    }

    const callApiChangeTimeshareStatus = (item) => {
        let newTimeshareStatus = '';

        if (item.timeshare_status === "Sắp triển khai") {
            newTimeshareStatus = "Đang triển khai";
        } else if (item.timeshare_status === "Đang triển khai") {
            newTimeshareStatus = "Đã triển khai";
        }

        const data = {
            timeshare_id: item._id,
            timeshare_status: newTimeshareStatus
        }

        dispatch(changeTimeshareStatus(data)).then((result) => {
            if (changeTimeshareStatus.fulfilled.match(result)) {
                toast.success("Thay đổi trạng thái thành công!")
                const updatedTimeshare = result.payload;

                const updatedList = timeshareList.map((timeshare) =>
                    timeshare._id === item._id ? updatedTimeshare : timeshare
                );

                setTimeShareList(updatedList);
            } else {
                toast.error(`${result.payload}`)
            }
            setShowModal(false);

        })
    }

    const handleChangeSellTimeshareStatus = (item) => {
        setSelectedItem(item);
        console.log(item)
        setModalInfo({
            title: 'Xác nhận hành động',
            body: buildModalBodyChangeSellTimeshareStatus(item.sell_timeshare_status),
            handleAccept: () => callApiChangeSellTimeshareStatus(item)
        });
        setShowModal(true);
    }

    const callApiChangeSellTimeshareStatus = (item) => {

        let newSellTimeshareStatus = '';

        if (item.sell_timeshare_status === "Chưa được bán") {
            newSellTimeshareStatus = "Đang mở bán";
        } else if (item.sell_timeshare_status === "Đang mở bán") {
            newSellTimeshareStatus = "Đã bán";
        }

        const data = {
            timeshare_id: item._id,
            sell_timeshare_status: newSellTimeshareStatus
        }

        dispatch(changeSellTimeshareStatus(data)).then((result) => {
            if (changeSellTimeshareStatus.fulfilled.match(result)) {
                toast.success("Thay đổi trạng thái thành công!")
                const updatedTimeshare = result.payload;

                const updatedList = timeshareList.map((timeshare) =>
                    timeshare._id === item._id ? updatedTimeshare : timeshare
                );

                setTimeShareList(updatedList);
            } else {
                toast.error(`${result.payload}`)
            }
            setShowModal(false);

        })

    }

    const handleDeleteTimeshare = () => {

    }

    const handleCloseModal = () => {
        setSelectedItem(null);
        setShowModal(false);
    }


    return (
        <tbody>
            {timeshareList?.length === 0 ? (
                <tr>
                    <td colSpan="8" className='text-center'>Không tìm thấy timeshare phù hợp</td>
                </tr>
            ) : (
                <>
                    {timeshareList?.map((item, index) => (
                        <tr key={index} className='table-body'>
                            <th scope="row">{index + 1}</th>
                            <td>{item?.timeshare_name}</td>
                            <td>{convertToNumberFormat(item?.land_area)}</td>
                            <td>{item?.timeshare_type}</td>
                            <td>
                                {renderStatus(item.timeshare_status, ["Sắp triển khai", "Đang triển khai", "Đã triển khai"])}
                            </td>
                            <td>
                                {renderStatus(item.sell_timeshare_status, ["Chưa được bán", "Đang mở bán", "Đã bán"])}
                            </td>
                            <td>{convertToVnTime(item?.createdAt)}</td>
                            <td style={{ cursor: 'pointer' }}>
                                <Dropdown>
                                    <Dropdown.Toggle variant="ghost" id="dropdown-basic">
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item ><div className='d-flex gap-2 align-items-center'><BiDetail /> Xem chi tiết</div></Dropdown.Item>
                                        {item.timeshare_status !== "Đã triển khai" && <Dropdown.Item onClick={() => handleChangeTimeshareStatus(item)}>
                                            <div className='d-flex gap-2 align-items-center'>
                                                <CgArrowsExchange /> {renderTimeshareAction(item.timeshare_status)}
                                            </div>
                                        </Dropdown.Item >}
                                        {item.sell_timeshare_status !== "Đã bán" && <Dropdown.Item onClick={() => handleChangeSellTimeshareStatus(item)}>
                                            <div className='d-flex gap-2 align-items-center'>
                                                <MdOutlinePublishedWithChanges /> {renderSellTimeshareAction(item.sell_timeshare_status)}
                                            </div>
                                        </Dropdown.Item>
                                        }
                                        <Dropdown.Item ><div className='d-flex gap-2 align-items-center'><MdOutlineDelete />Xóa timeshare</div></Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                    ))}

                    {showModal && <ModalConfirm show={showModal}
                        handleClose={handleCloseModal}
                        handleAccept={modalInfo.handleAccept}
                        title={modalInfo.title}
                        body={modalInfo.body} />}
                </>
            )}

            {loadingUpdate && <SpinnerLoading />}
        </tbody>
    )
}

export default TableBody