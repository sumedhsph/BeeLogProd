import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlogContext } from "../../context/BlogContext";
import SimpleHeader from "../Header/SimpleHeader";
import SmallContainer from "../SmallContainer";
function SingleArticle() {
  const { postId } = useParams();
  const { allPosts } = useBlogContext();
  const [currentPost, setCurrentPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const post = allPosts.find((post) => post.$id === postId);
    if (post) {
      setCurrentPost(post);
      //console.log(currentPost)
    } else {
      console.log("No article found");
      navigate("/");
      return;
    }
  }, [postId, allPosts]);
  return (
    <>
      <SimpleHeader />
      <SmallContainer>
        {currentPost ? (
          <div className="w-9/12 mx-auto h-full bg-white rounded overflow-hidden  shadow-lg mt-10">
            <div className="w-full  rounded-t">
              <img
                src={currentPost.featuredImage}
                className="h-auto  w-full shadow"
              />
            </div>

            <div className="w-full   flex flex-col">
              <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
                <div className="w-full font-bold py-3 text-2xl text-gray-900 px-6 capitalize">
                  {currentPost.title}
                </div>
                <p className="text-gray-800 font-serif text-base px-6 mb-5">
                  {currentPost.content}
                </p>
              </div>

              <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
                <div className="flex items-center justify-between">
                  
                  <p className="text-gray-600 text-xs md:text-sm">
                    By: {currentPost.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          "No post found"
        )}
      </SmallContainer>
    </>
  );
}

export default SingleArticle;
