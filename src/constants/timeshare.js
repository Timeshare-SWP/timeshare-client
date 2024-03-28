export const JURIDICAL_STAGE = [
  {
    id: 1,
    name_status: "Sắp triển khai",
    description: "Đang dừng ở giai đoạn phê duyệt ý tưởng nội bộ",
    risk_percentage: "70",
    required_info: "Có thể bỏ qua giai đoạn 2 và 3 nếu chưa có"
  },
  {
    id: 2,
    name_status: "Đang triển khai",
    description: "Các giấy tờ đang được đưa cho các bên liên quan xét duyệt",
    risk_percentage: "50",
    required_info: "Hồ sơ pháp lý, năm bàn giao, năm khởi công"
  },
  {
    id: 3,
    name_status: "Đã triển khai",
    description: "Toàn bộ các giấy tờ pháp lý đã hoàn thành",
    risk_percentage: "30",
    required_info: "Đầy đủ thông tin khi khởi tạo"
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

export const APARTMENT_ERRORS = {
  apartment_number: 'Vui lòng nhập số căn hộ!',
  floor_number: 'Vui lòng nhập tên tòa!',
  area: 'Vui lòng nhập diện tích căn hộ!',
  apartment_image: 'Vui lòng đăng tối thiểu ít nhất 1 ảnh căn hộ!',
  note: 'Vui lòng nhập chú thích!',
  number_of_rooms: 'Vui lòng mô tả các phòng!',
  condition: 'Vui lòng mô tả tình trạng căn hộ!',
  interior: 'Vui lòng mô tả tình trạng nội thất!'
};

