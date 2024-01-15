import React, { useEffect } from "react";
import SmallContainer from "../SmallContainer";
import Input from "../Input";
import SimpleHeader from "../Header/SimpleHeader";
import { useAuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useBlogContext } from "../../context/BlogContext";
import { useForm, useController, Controller } from "react-hook-form";
import CreatePostForm from "./CreatePostForm";
import Footer from "../Footer/Footer";

function CreatePost() {
  return (
    <>
      <SimpleHeader />
      <SmallContainer>
        <ToastContainer />
        <div className="mt-10 mx-7 py-8 px-12 bg-gray-600">
          <h2 className="text-2xl font-semibold text-center text-white mb-8">
            Create Article
          </h2>
          <CreatePostForm />
        </div>
      </SmallContainer>
       
    </>
  );
}

export default CreatePost;
