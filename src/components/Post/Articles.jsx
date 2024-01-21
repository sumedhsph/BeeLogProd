import React, { useEffect, useState } from "react";
import SmallContainer from "../SmallContainer";
import { useBlogContext } from "../../context/BlogContext";
import SimpleHeader from "../Header/SimpleHeader";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Input from "../Input";
import useDebouncing from "../customHooks/useDebouncing";
import CustomSelect from "../CustomSelect";

function Articles() {
  const [allArticles, setAllArticles] = useState();
  const {
    allPosts,
    getAllPostsFun,
    setPostAdded,
    selectedOption,
    setSelectedOption
  } = useBlogContext();
  const [keyoword, setKeyword] = useState("");
  //console.log(allPosts[0]);

  useEffect(() => {
    //getAllPostsFun();
    setAllArticles(allPosts);
    window.scrollTo(0, 0);
    setPostAdded(true);
  }, []);

  //sorting using custom select

  const handleSorting = () => {
    if (selectedOption) {
      //console.log(selectedOption);
     // console.log(allPosts);
      if (selectedOption === "title") {
       // console.log(selectedOption);
        const sortedArticles = [...allPosts].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setAllArticles(sortedArticles);
      } else if (selectedOption === "latest") {
        const sortedArticles = [...allPosts].sort((a, b) =>
          b.$createdAt.localeCompare(a.$createdAt)
        );
        setAllArticles(sortedArticles);
      }
      else if (selectedOption === "updated") {
        const sortedArticles = [...allPosts].sort((a, b) =>
          b.$updatedAt.localeCompare(a.$updatedAt)
        );
        setAllArticles(sortedArticles);
      }
    }
  };
  useEffect(() => {
    handleSorting();
  }, [selectedOption]);
  //debouncing search
  const debouncedHandleSearch = useDebouncing((searchQuery) => {
    //setKeyword(searchText);
    //console.log("first");
    if (searchQuery === "") {
      setAllArticles(allPosts);
    }

    //filter data on title

    const filteredArticles = allPosts.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setAllArticles(filteredArticles);
  }, 1000);

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setKeyword(searchText);
    debouncedHandleSearch(searchText);
  };
  return (
    <>
      <SimpleHeader />
      <SmallContainer>
        <div className="pt-12 -mx-6">
          <div className="px-6 text-center">
            <h2 className="text-2xl font-semibold">Articles</h2>
          </div>
          <div className="w-full px-6 flex">
            <Input
              type="text"
              name="search"
              value={keyoword}
              placeholder="Search articles"
              onChange={handleSearch}
              className="px-2 w-60"
            />
            SortBy:{" "}
            <CustomSelect
              options={["title", "latest", "updated"]}
              selectWidth={"w-40"}
            />
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
