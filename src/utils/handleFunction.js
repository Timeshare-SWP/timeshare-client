export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const convertToSlug = (str) => {
  str = str.toLowerCase();
  str = str.replace(/\s+/g, "-");
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
