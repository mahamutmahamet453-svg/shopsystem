import API from "./api";



export const loginUser =
  async (userData) => {

    const { data } =
      await API.post(
        "/auth/login",
        userData
      );



    localStorage.setItem(
      "userInfo",
      JSON.stringify(data)
    );



    return data;
  };






export const registerUser =
  async (userData) => {

    const { data } =
      await API.post(
        "/auth/register",
        userData
      );



    localStorage.setItem(
      "userInfo",
      JSON.stringify(data)
    );



    return data;
  };