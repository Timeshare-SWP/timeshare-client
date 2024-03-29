import * as moment from "moment-timezone";

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const convertToSlug = (str) => {
  str = str.toLowerCase();
  str = str?.replace(/\s+/g, "-");
  return str;
};

export const truncateString = (input, maxLength) => {
  if (input?.length > maxLength) {
    return `${input?.substring(0, maxLength)}...`;
  }
  return input;
};

export const convertToVnTime = (date) => {
  const utcDateTime = new Date(date);

  const localTime = new Date(utcDateTime.getTime() + 7 * 60 * 60 * 1000);

  const day = localTime.getDate();
  const month = localTime.getMonth() + 1;
  const year = localTime.getFullYear();

  const localDateString = `${day}/${month}/${year}`;

  return localDateString;
};

export const convertToVNDFormat = (number) => {
  if (typeof number !== "number") {
    return number;
  }

  if (number >= 1000000000) {
    const billion = (number / 1000000000).toLocaleString("vi-VN", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return `${billion} tỷ`;
  } else if (number >= 1000000) {
    const million = (number / 1000000).toLocaleString("vi-VN", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return `${million} triệu`;
  } else if (number >= 1000) {
    const thousand = (number / 1000).toLocaleString("vi-VN", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return `${thousand} nghìn`;
  } else {
    return number.toLocaleString();
  }
};

export const convertRangePriceToVNDFormat = (minPrice, maxPrice) => {
  if (
    (minPrice === null || minPrice === undefined) &&
    (maxPrice === null || maxPrice === undefined)
  ) {
    return "NaN";
  }

  const minFormatted = convertToVNDFormat(minPrice);
  let maxFormatted = null;

  if (maxPrice !== null && maxPrice !== undefined) {
    maxFormatted = convertToVNDFormat(maxPrice);
  }

  if (
    minFormatted.includes("triệu") &&
    maxFormatted &&
    maxFormatted.includes("triệu")
  ) {
    return `${minFormatted.split(" ")[0]} - ${
      maxFormatted.split(" ")[0]
    } triệu`;
  } else if (
    minFormatted.includes("tỷ") &&
    maxFormatted &&
    maxFormatted.includes("tỷ")
  ) {
    return `${minFormatted.split(" ")[0]} - ${maxFormatted.split(" ")[0]} tỷ`;
  } else if (
    minFormatted.includes("nghìn") &&
    maxFormatted &&
    maxFormatted.includes("nghìn")
  ) {
    return `${minFormatted.split(" ")[0]} - ${
      maxFormatted.split(" ")[0]
    } nghìn`;
  } else {
    if (maxFormatted !== null && maxFormatted !== undefined) {
      return `${minFormatted} - ${maxFormatted}`;
    } else {
      return minFormatted;
    }
  }
};

export const convertToNumberFormat = (input) => {
  if (typeof input === "string" && /^\d+$/.test(input)) {
    const number = parseInt(input, 10);
    return number.toLocaleString();
  } else if (typeof input === "number") {
    return input.toLocaleString();
  } else {
    return input;
  }
};

export const generateRandomString = () => {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const randomLetters = Array(7).fill("");

  for (let i = 0; i < randomLetters.length; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);

    const randomLetter = letters[randomIndex];

    randomLetters[i] = randomLetter;
  }

  const randomString = randomLetters.join("");

  return randomString;
};

export const removeCommas = (str) => {
  return str?.replace(/,/g, "");
};

export const getDateTimeDifference = (utcTimeString) => {
  const currentUtcTime = moment.utc();

  const targetUtcTime = moment.utc(utcTimeString);

  const duration = moment.duration(targetUtcTime.diff(currentUtcTime));

  const absoluteDuration = Math.abs(duration.asSeconds());

  if (absoluteDuration < 60) {
    return `${Math.round(absoluteDuration)} giây`;
  } else if (absoluteDuration < 3600) {
    return `${Math.round(absoluteDuration / 60)} phút`;
  } else if (absoluteDuration < 86400) {
    return `${Math.round(absoluteDuration / 3600)} giờ`;
  } else if (absoluteDuration < 604800) {
    return `${Math.round(absoluteDuration / 86400)} ngày`;
  } else if (absoluteDuration < 2419200) {
    return `${Math.round(absoluteDuration / 604800)} tuần`;
  } else if (absoluteDuration < 29030400) {
    return `${Math.round(absoluteDuration / 2419200)} tháng`;
  } else {
    return `${Math.round(absoluteDuration / 29030400)} năm`;
  }
};

export const convertToVietnameseTime = (isoString) => {
  return moment
    .utc(isoString)
    .tz("Asia/Ho_Chi_Minh")
    .format("HH:mm:ss DD-MM-YYYY");
};

export const generateFallbackAvatar = (fullname) => {
  const fallbackColor = "#FF9966";
  const initials = fullname?.charAt(0).toUpperCase() || "";
  const svgString = `
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100">
    <rect width="100%" height="100%" fill="${fallbackColor}" />
    <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="50">
      ${initials}
    </text>
  </svg>
`;
  const dataUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;
  return dataUrl;
};
