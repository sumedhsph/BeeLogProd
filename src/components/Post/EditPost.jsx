import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlogContext } from "../../context/BlogContext";
import SimpleHeader from "../Header/SimpleHeader";
import SmallContainer from "../SmallContainer";
import { ToastContainer } from "react-toastify";
import CreatePostForm from "./CreatePostForm";

function EditPost() {
  const { postId } = useParams();
  const { allPosts } = useBlogContext();
  const [currentPost, setCurrentPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const post = allPosts.find((post) => post.$id === postId);
    if (post) {
      console.log(post);
      setCurrentPost(post);
      //console.log(currentPost)
    } else {
      console.log("No article found");
      //navigate("/");
      return;
    }
  }, [postId, allPosts]);
  return (
    <>
      <SimpleHeader />
      <SmallContainer>
        <ToastContainer/>
        <div className="mt-10 mx-7 py-8 px-12 bg-gray-600">
          <h2 className="text-2xl font-semibold text-center text-white mb-8">
            Edit Article
          </h2>
        <CreatePostForm/>
        </div>
      </SmallContainer>
    </>
  );
}

export default EditPost;
