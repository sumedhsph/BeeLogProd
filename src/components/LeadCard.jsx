import React, { useEffect, useState } from "react";
import { useBlogContext } from "../context/BlogContext";
import { Link } from "react-router-dom";
function LeadCard() {
  const { allArticles } = useBlogContext();

  const [featuredPost, setFeaturedPost] = useState([]);

  useEffect(() => {
    //getAllPostsFun();
  }, []);

  useEffect(()=>{
    if(allArticles.length !==0) {
      //console.log(allArticles.length)
       const randomIndex = Math.floor(Math.random() * allArticles.length);
       //console.log(randomIndex)
       setFeaturedPost(allArticles[randomIndex]);
      // console.log(featuredPost)
     }
  },[allArticles])

  return (
    <div className="flex h-full bg-white rounded overflow-hidden shadow-lg">
      <Link
        to={`/article/${featuredPost.$id}`}
        className="flex flex-wrap no-underline hover:no-underline"
      >
        <div className="w-full md:w-2/3  lg:2/3 min:w-2/3 rounded-t">
          <img
            src={featuredPost && featuredPost.featuredImage}
            className="h-auto  w-full shadow"
          />
        </div>

        <div className="w-full md:w-1/3 md:min-w-[300px] flex flex-col flex-grow ">
          <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
            {/*  <p className="w-full text-gray-600 text-xs md:text-sm pt-6 px-6">GETTING STARTED</p> */}
            <div className="w-full font-bold text-xl text-gray-900 p-6 capitalize">
              {featuredPost && featuredPost.title}
            </div>
            <p className="text-gray-800 font-serif text-base px-6 mb-5 max-h-60 overflow-hidden">
              {featuredPost.content ? featuredPost.content.slice(0, 400) : null}
              ...
            </p>
        
          </div>

          <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
            <div className="flex items-center justify-between">
              <span className="text-blue-500">Read more</span>

              <p className="text-gray-600 text-xs md:text-sm capitalize">
                By: {featuredPost && featuredPost.name}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default LeadCard;
