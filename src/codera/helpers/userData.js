import axios from "../../api/axios";

export const existUserLogged = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      
      const headers = {
        headers: { Authorization: "Bearer " + token },
      };

      await axios.get("users/me", headers);

      return true;
    } catch (error) {
      localStorage.removeItem("token")
      return false;
    }
  }

  return false;
};


export const getUserInformation = () => {
  if (!existUserLogged) {
    return null;
  }

  const token = localStorage.getItem("token");
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};
