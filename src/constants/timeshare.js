export const JURIDICAL_STAGE = [
  {
    id: 1,
    name_status: "Sắp triển khai",
    description: "Đang dừng ở giai đoạn phê duyệt ý tưởng nội bộ",
    risk_percentage: "70",
  },
  {
    id: 2,
    name_status: "Đang triển khai",
    description: "Các giấy tờ đang được đưa cho các bên liên quan xét duyệt",
    risk_percentage: "50",
  },
  {
    id: 3,
    name_status: "Đã triển khai",
    description: "Toàn bộ các giấy tờ pháp lý đã hoàn thành",
    risk_percentage: "30",
  },
];

export const PRIORITY_LEVEL = [
  {
    id: 1,
    name: "Time",
    title: "Theo thời gian thực",
    description:
      "Thứ tự sẽ được sắp xếp theo chiều từ trên xuống. Ai tới trước sẽ có nhiều ưu đãi hơn",
    note: "Mặc định",
  },
  {
    id: 2,
    name: "Random",
    title: "Quay số ngẫu nhiên",
    description: "Thứ tự tất khách hàng là như nhau",
    note: "Chưa hỗ trợ",
  },
];
