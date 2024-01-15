import React, { useEffect } from "react";
import SmallContainer from "./SmallContainer";
import Container from "./Container";
import SimpleHeader from "./Header/SimpleHeader";
import Input from "./Input";
import { useAuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm, useController, Controller } from "react-hook-form";
import Footer from "./Footer/Footer";
function Login() {
  const { login, user, loginError } = useAuthContext();
  const navigate = useNavigate();
  const { control, reset, setValue, register, handleSubmit } = useForm();
  useEffect(() => {
    if (user) {
      toast.success("Login succeful!", {
        position: toast.POSITION.TOP_CENTER
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, "1000");
    }
  }, [loginError, user]);

  const resetTest = async (data) => {
    console.log("form submitted", data);
    reset();
  };
  return (
    <>
      <SimpleHeader />
      <ToastContainer />
      <SmallContainer>
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <div>
                  <h1 className="text-2xl font-semibold text-indigo-900">
                    Login
                  </h1>
                </div>
                <div className="divide-y divide-gray-200">
                  <form onSubmit={handleSubmit(login)}>
                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <div className="relative">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter email"
                          {...register("email", {
                            required: true,
                            validate: {
                              matchPatern: (value) =>
                                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                  value
                                ) || "Email address must be a valid address"
                            }
                          })}
                        />
                        {/* <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Email Address
                      </label> */}
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Password"
                          {...register("password", {
                            required: true
                          })}
                        />
                        {/* <label
                        htmlFor="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Password
                      </label> */}
                      </div>
                      <div className="relative">
                        <button
                          type="submit"
                          className="bg-blue-500 text-white rounded-md px-2 py-1 hover:bg-indigo-900"
                        >
                          Login
                        </button>
                      </div>
                      <div>
                        No account?{" "}
                        <Link
                          to="/register"
                          className="text-indigo-900 hover:underline"
                        >
                          Register here
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SmallContainer>
      <Footer/>
    </>
  );
}

export default Login;
