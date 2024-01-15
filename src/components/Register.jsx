import React, { useEffect, useState } from "react";
import SmallContainer from "./SmallContainer";
import SimpleHeader from "./Header/SimpleHeader";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import { useAuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm, useController, Controller } from "react-hook-form";
import Loading from "./Loading";
import Footer from "./Footer/Footer";

function Register() {
  const { registerUser, user, loading } = useAuthContext();
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      toast.success("Registration successful!", {
        position: toast.POSITION.TOP_CENTER
      });
      navigate("/dashboard");
    }
  }, [user]);
  if (loading) {
    return <Loading />;
  }
  return (
    <>
    
      <SimpleHeader />
      <ToastContainer />
      <SmallContainer>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-2xl sm:mx-auto ">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold text-indigo-900">
                  Register
                </h1>
              </div>
              <div className="divide-y divide-gray-200">
                <form onSubmit={handleSubmit(registerUser)}>
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <Input
                        id="firstName"
                        name="firstName"
                        type="firstName"
                        placeholder="Enter name"
                        className="lg:min-w-80"
                        {...register("firstName", {
                          required: true
                        })}
                      />
                    </div>

                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        {...register("email", { required: true })}
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
                        id="password1"
                        name="password1"
                        type="password"
                        placeholder="Password"
                        {...register("password1", {
                          required: true
                        })}
                      />
                    </div>

                    <div className="relative">
                      <Input
                        id="password2"
                        name="password2"
                        type="password"
                        placeholder="Confirm password"
                        {...register("password2", {
                          required: true
                        })}
                      />
                    </div>
                    <div className="relative">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-md px-2 py-1 hover:bg-indigo-900"
                      >
                        Register
                      </button>
                    </div>
                    <div>
                      <br />
                      <Link
                        to="/login"
                        className="text-indigo-900 text-right hover:underline"
                      >
                        Login here
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

export default Register;
