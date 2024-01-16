import React, { useEffect, useState } from "react";
import { useBlogContext } from "../../context/BlogContext";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function ThreePosts() {
  const { getPost, allPosts ,setPostAdded, postAdded } = useBlogContext();

  const [latestPosts, setLatestPosts] = useState([]);
  //console.log(allPosts[0])
  //calculate avg read time

  useEffect(() => {
    //getAllPostsFun();
    setPostAdded(true)
    if (allPosts) {
      //const latest = allPosts.slice(0,3); //display only 3 latest articles

      const sortPosts = allPosts.sort(
        (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
      );
      //show only 3 post
      setLatestPosts(sortPosts.slice(0, 3));
      //console.log(latestPosts[0].name);
    }
  }, []);

  return (
    <div className="pt-12 -mx-6">
      <div className="px-6 text-center">
        <h2 className="text-2xl font-semibold">Latest Blogs</h2>
      </div>
      <div className="flex flex-wrap justify-between ">
        {latestPosts &&
          latestPosts.map((post) => (
            <div
              key={post.$id}
              className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink"
            >
              <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
                <Link
                  to={`/article/${post.$id}`}
                  className="flex flex-wrap no-underline hover:no-underline"
                >
                  <img
                    src={post.featuredImage}
                    className="h-64 w-full rounded-t pb-6"
                  />

                  <div className="w-full font-bold text-xl text-gray-900 px-6">
                    {post.title}
                  </div>
                  <p className="text-gray-800 font-serif text-base px-6 mb-5">
                    {post.content ? post.content.slice(0, 200) : null}...
                  </p>
                </Link>
              </div>
              <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <span className="text-blue-500">Read more</span>
                  <p className="text-gray-600 text-xs md:text-sm">
                    By:{" "}
                    <span className="capitalize font-semibold">
                      {post.name}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="text-center my-10 flex justify-center">
        <Link
          to="/articles"
          className="text-center flex align-middle justify-center text-lg text-indigo-900"
        >
          Read all articles <FaArrowRight className="ml-2 mt-1" />
        </Link>
      </div>
      <div className="container font-sans bg-green-100 rounded mt-8 mb-14 p-4 md:py-24 md:px-10 text-center mx-auto">
        <h2 className="font-bold break-normal text-2xl md:text-4xl">
          Register to BeeLogs
        </h2>
        <h3 className="font-bold break-normal text-gray-600 text-base md:text-xl">
          Read and write blogs
        </h3>
        <div className="w-full text-center pt-4">
          <form action="#">
            <div className="max-w-52 mx-auto p-1 pr-0 flex flex-wrap items-center">
              <button
                type="button"
                className="flex-1 mt-4 md:mt-0 block md:inline-block appearance-none bg-green-500 text-white text-base font-semibold tracking-wider uppercase py-4 rounded shadow hover:bg-green-400"
              >
                <Link to="/register">Register</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ThreePosts;
