import { createContext, useContext, useState } from "react";
import { account, userUniqId } from "../appwrite/auth";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);

  //console.log(userUniqId)

  const login = async (userInfo) => {
    //console.log("login fun called");
    //console.log(userInfo)
    setLoading(true);
    try {
      let response = await account.createEmailSession(
        userInfo.email,
        userInfo.password
      );
      let accountDetails = await account.get();
      setUser(accountDetails);
      //console.log("login successful");
    } catch (error) {
      //console.log(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER
      });
      setLoginError(error.message);
    }
    setLoading(false);
  };

  //logout function

  const logout = async () => {
    setLoading(true);
    await account.deleteSession("current");
    setUser(null);
    setLoading(false);
  };

  //register user function

  const registerUser = async (data) => {
    setLoading(true);
    if (data.password1 !== data.password2) {
      toast.error("Passwords do not match", {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    try {
      let res = await account.create(
        userUniqId,
        data.email,
        data.password1,
        data.firstName,
        data.lastName
      );
      let resposne = await account.createEmailSession(
        data.email,
        data.password1
      );
      let accountDetails = await account.get();
      setUser(accountDetails);
      //console.log("register success");
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER
      });
    }
    setLoading(false);
  };

  //values
  const values = {
     
    login,
    user,
    logout,
    loginError,
    registerUser,
    loading
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

//custom hook for using context
export const useAuthContext = () => {
  return useContext(AuthContext);
};
