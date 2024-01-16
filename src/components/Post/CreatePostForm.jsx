import React, { useEffect } from "react";
import Input from "../Input";
import SimpleHeader from "../Header/SimpleHeader";
import { useAuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useBlogContext } from "../../context/BlogContext";
import { useForm, useController, Controller } from "react-hook-form";

function CreatePostForm() {
  const { createPost, postSuccess, setLoading, setPostAdded } =
    useBlogContext();
  const { register, handleSubmit, useController, Controller, control, reset } =
    useForm({
      title: "",
      file: "",
      content: ""
    });
  // image upload validation
  const validateFile = (value) => {
    if (!value || !value[0]) {
      toast.error("Please upload an image");
      return false;
    }

    const file = value[0];
    const allowedFiles = [".jpg", ".png", ".gif"];
    const fileExtension = file.name.slice(
      ((file.name.lastIndexOf(".") - 1) >>> 0) + 2
    );

    if (!allowedFiles.includes(`.${fileExtension.toLowerCase()}`)) {
      toast.error("Please upload a valid image file (jpg, png, gif)");
      return false;
    } else {
      return true;
    }
  };

  const createAnArticle = async (data) => {
    setPostAdded(false);
    createPost(data);
    //console.log(data);
    //console.log(setValue)
    resetForm();
    //reset fields
  };
  const resetForm = async () => {
    reset();
  };
  useEffect(() => {
    if (postSuccess) {
      // console.log("post success");
      setPostAdded(true);
      setLoading(false);
    }
  }, [postSuccess]);

  return (
     
      <form onSubmit={handleSubmit(createAnArticle)}>
        <Input
          name="title"
          id="title"
          type="text"
          className="px-1 mb-4"
          placeholder="*Enter article title"
          {...register("title", {
            required: true
          })}
        />

        <Input
          type="file"
          id="imageInput"
          onChange={(e) => field.onChange(e.target.files)}
          {...register("file", {
            required: true
          })}
        />

        <textarea
          id="content"
          name="content"
          className="px-1 my-4 w-full h-40"
          placeholder="*Enter article content"
          {...register("content", {
            required: true
          })}
        />

        {/* <Input
              type="text"
              id="author"
              name="author"
              placeholder="*Enter authour name"
              className="px-1 my-4"
              {...register("author", {
                required: true
              })}
            /> */}

        <div className="relative">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md px-8 py-2 hover:bg-indigo-900 mr-10"
          >
            POST
          </button>
          <button
            className="bg-gray-500   text-white rounded-md px-8 py-2 hover:bg-gray-900"
            onClick={resetForm}
          >
            Reset
          </button>
        </div>
      </form>
     
  );
}

export default CreatePostForm;
