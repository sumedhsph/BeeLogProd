import React, { useEffect, useState } from "react";
import SmallContainer from "../SmallContainer";
import { useBlogContext } from "../../context/BlogContext";
import SimpleHeader from "../Header/SimpleHeader";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
function Articles() {
  const [allArticles, setAllArticles] = useState();
  const { allPosts, getAllPostsFun, setPostAdded } = useBlogContext();
  //console.log(allPosts[0]);

  useEffect(() => {
    //getAllPostsFun();
    setAllArticles(allPosts);
    window.scrollTo(0, 0);
    setPostAdded(true);
  }, []);
  return (
    <>
      <SimpleHeader />
      <SmallContainer>
        <div className="pt-12 -mx-6">
          <div className="px-6 text-center">
            <h2 className="text-2xl font-semibold">Articles</h2>
          </div>
          <div className="flex flex-wrap">
            {allArticles &&
              allArticles.map((post) => (
                <div
                  key={post.$id}
                  className=" md:w-1/3 sm:w-1/2  p-6 flex flex-col"
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
                        {post.content ? post.content.slice(0, 180) : null}...
                      </p>
                    </Link>
                  </div>
                  <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <Link to={`/article/${post.$id}`}>
                        <span className="text-blue-500">Read more</span>
                      </Link>
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
        </div>
      </SmallContainer>
      <Footer />
    </>
  );
}

export default Articles;
