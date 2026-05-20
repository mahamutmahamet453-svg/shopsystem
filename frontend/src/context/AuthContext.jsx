import {
  createContext,
  useEffect,
  useState,
} from "react";

export const AuthContext =
  createContext();

const AuthProvider = ({
  children,
}) => {

  const [user,
    setUser] =
    useState(null);






  useEffect(() => {

    const savedUser =
      localStorage.getItem(
        "user"
      );






    if (savedUser) {

      setUser(
        JSON.parse(
          savedUser
        )
      );

    }

  }, []);







  const login = (
    userData
  ) => {

    localStorage.setItem(
      "user",
      JSON.stringify(
        userData
      )
    );






    setUser(
      userData
    );

  };







  const logout = () => {

    localStorage.removeItem(
      "user"
    );






    setUser(null);






    window.location.href =
      "/";

  };







  return (

    <AuthContext.Provider
      value={{

        user,

        setUser,

        login,

        logout,

      }}
    >

      {children}

    </AuthContext.Provider>

  );

};

export default AuthProvider;