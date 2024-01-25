export const getTokenFromCookie = () => {
  const cookieString = document.cookie;
  const cookies = cookieString.split("; ").reduce((acc, cookie) => {
    const [name, value] = cookie.split("=");
    acc[name] = value;
    return acc;
  }, {});

  const token = cookies["token"];
  return token ? JSON.parse(token) : null;
};
