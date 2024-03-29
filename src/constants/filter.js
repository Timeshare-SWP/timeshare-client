export const FILTER_RESERVED_CUSTOMER = [
    {
      label: "Tình trạng thanh toán",
      value: "isReservationPaid",
      options: [
        { label: "Đã thanh toán", value: "true" },
        { label: "Chưa thanh toán", value: "false" },
      ],
    },
    {
      label: "Tình trạng mở bán",
      value: "sellTimeshareStatus",
      options: [
        { label: "Đang mở bán", value: "Đang mở bán" },
        { label: "Chưa được bán", value: "Chưa được bán" },
        { label: "Đã bán", value: "Đã bán" },
      ],
    },
  ]