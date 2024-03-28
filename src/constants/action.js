import { IoMdInformationCircleOutline } from "react-icons/io";
import { BsPersonPlus } from "react-icons/bs";
import { AiOutlineTransaction } from "react-icons/ai";
import { MdOutlineCancelScheduleSend } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";


export const RESERVED_PLACE_LIST_ACTION = [
  {
    id: 1,
    name: "Xem thông tin chi tiết",
    icon: <IoMdInformationCircleOutline />,
  },
  { id: 2, name: "Mời thêm người tham gia", icon: <BsPersonPlus /> },
  { id: 3, name: "Đăng ký mua", icon: <AiOutlineTransaction /> },
  { id: 4, name: "Hủy đặt chỗ", icon: <MdOutlineCancelScheduleSend /> },
];

export const TRANSACTION_LIST_ACTION_INVESTOR = [
  { id: 1, name: "Hợp đồng", icon: <IoNewspaperOutline   /> },
  { id: 2, name: "Tiến độ thanh toán", icon: <MdOutlinePayment   /> },
];

export const REQUEST_LIST_ACTION_INVESTOR = [
  { id: 1, name: "Xem thông tin chi tiết", icon: <IoNewspaperOutline   /> },
];

export const TRANSACTION_LIST_ACTION_CUSTOMER = [
  {
    id: 1,
    name: "Xem thông tin chi tiết",
    icon: <IoMdInformationCircleOutline />,
  },
  { id: 2, name: "Hợp đồng", icon: <IoNewspaperOutline   /> },
  { id: 3, name: "Thanh toán", icon: <MdOutlinePayment    /> },
];