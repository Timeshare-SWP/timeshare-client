export const saveOtpToSessionStorage = (data) => {
  sessionStorage.setItem("otp", JSON.stringify(data));
};

export const getOtpFromSessionStorage = () => {
  const otpString = sessionStorage.getItem("otp");
  return otpString ? JSON.parse(otpString) : null;
};

export const removeOtpFromSessionStorage = () => {
  sessionStorage.removeItem("otp");
};
