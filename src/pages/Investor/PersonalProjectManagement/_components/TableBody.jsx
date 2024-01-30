import React from 'react'
import { BsThreeDots } from "react-icons/bs";
import { convertToVnTime } from '../../../../utils/handleFunction';

const TableBody = (props) => {
    const { timeshareList, setTimeShareList } = props

    const renderStatus = (status, statuses) => {
        let classNames = "";
        if (status === statuses[0]) classNames = "button-yellow";
        else if (status === statuses[1]) classNames = "button-green";
        else classNames = "button-gray";

        return <div className={`btn ${classNames}`}><p>{status}</p></div>;
    }

    return (
        <tbody>
            {timeshareList?.length === 0 ? (
                <tr>
                    <td colSpan="8" className='text-center'>Không tìm thấy timeshare phù hợp</td>
                </tr>
            ) : (
                timeshareList?.map((item, index) => (
                    <tr key={index} className='table-body'>
                        <th scope="row">{index + 1}</th>
                        <td>{item?.timeshare_name}</td>
                        <td>{item?.land_area}</td>
                        <td>{item?.timeshare_type}</td>
                        <td>
                            {renderStatus(item.timeshare_status, ["Sắp triển khai", "Đang triển khai", "Đã triển khai"])}
                        </td>
                        <td>
                            {renderStatus(item.sell_timeshare_status, ["Chưa được bán", "Đang mở bán", "Đã bán"])}
                        </td>
                        <td>{convertToVnTime(item?.createdAt)}</td>
                        <td style={{cursor: 'pointer'}}><BsThreeDots /></td>
                    </tr>
                ))
            )}

        </tbody>
    )
}

export default TableBody