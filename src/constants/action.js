import { IoMdInformationCircleOutline } from "react-icons/io";
import { BsPersonPlus } from "react-icons/bs";
import { AiOutlineTransaction } from "react-icons/ai";
import { MdOutlineCancelScheduleSend } from "react-icons/md";

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
