import React, { useEffect, useRef, useState } from "react";
import SimpleHeader from "../Header/SimpleHeader";
import SmallContainer from "../SmallContainer";
import { useBlogContext } from "../../context/BlogContext";
import { useAuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading";
import { FaEdit } from "react-icons/fa";
import Input from "../Input";
import { ToastContainer, toast } from "react-toastify";

function UserDashboard() {
  const [editModal, setEditModal] = useState({});
  const [editContent, setEditContent] = useState({});
  const [editImage, setEditImage] = useState({});

  const { user } = useAuthContext();
  const {
    getUserPosts,
    userPosts,
    loading,
    setLoading,
    updateTitle,
    updateContent,
    updateImage,
    postAdded,
    setPostAdded,
    deleteUserPost
  } = useBlogContext();
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState("");
  const [deletePostModal, setDeletePostModal] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const postIdRef = useRef();
  //console.log(singlePost)
  const navigate = useNavigate();
  useEffect(() => {
    if (!getUserPosts) {
      setLoading(true);
    }

    if (user) {
      getUserPosts(user.$id);
      //console.log(user)
    }
  }, []);

  let selectedFile;
  //console.log(userPosts)

  /* const handleEdit = (postId) => {
    console.log(postId);
    if (postId) {
      navigate(`/editpost/${postId}`);
    }
  }; */

  //show edit title modal
  const showEditModalFun = (postId) => {
    //toggle visibility for specific post
    setEditModal((prevVal) => ({
      ...prevVal,
      [postId]: !prevVal[postId]
    }));
    //console.log(postId)
  };
  const hideEditModal = () => {
    setEditModal(!editModal);
    setEditContent(!editContent);
    setEditImage(!editImage);
    selectedFile = "";
  };

  //show edit content modal
  const showEditContentFun = (postId) => {
    setEditContent((prevVal) => ({
      ...prevVal,
      [postId]: !prevVal[postId]
    }));
  };

  //edit post title
  const editTitle = (postId) => {
    if (postTitle == "") {
      toast.error("Please enter new title");
      return;
    }
    if (postTitle !== "") {
      const newData = {
        postId,
        postTitle
      };
      //console.log(newData);
      setPostTitle("");
      updateTitle(newData);
      hideEditModal();
      toast.success("Article Updated");
      setPostAdded(!postAdded);
    }
  };

  //edit post content
  const editContentFun = (postId) => {
    if (postContent == "") {
      toast.error("Please enter content");
      return;
    }
    if (postContent) {
      const newData = {
        postId,
        postContent
      };
      //console.log(newData);
      setPostContent("");
      updateContent(newData);
      hideEditModal();
      toast.success("Article Updated");
      setPostAdded(!postAdded);
    }
  };

  //edit post image
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
  //edit image modal
  const showEditImageFun = (imageId) => {
    setEditImage((prevVal) => ({
      ...prevVal,
      [imageId]: !prevVal[imageId]
    }));
  };

  const handleFileChange = (e) => {
    selectedFile = e.target.files;
    if (selectedFile) {
      // console.log(selectedFile);
    }
  };
  const editImageFun = (postId, file) => {
    if (!selectedFile) {
      toast.error("Please upload valid image .png, .jpg, .gif");
      return;
    }
    if (selectedFile) {
      const newData = {
        postId,
        file: selectedFile
      };
      //console.log(newData);
      updateImage(newData);
      hideEditModal();
      toast.success("Article Updated");
      setPostAdded(!postAdded);
    }
  };

  const showDeleteModal = (postId, imageId) => {
    setDeletePostModal(true);
    setDeleteData({postId, imageId})
  };

  const deletePost = (deleteData) => {
    if (deleteData) {
      deleteUserPost(deleteData );
     // console.log(deleteData.postId, deleteData.imageId)
      setDeletePostModal(false);
      //toast.success("Article deleted");
      //setPostAdded(!postAdded);
    }
  };
  if (!userPosts || loading) {
    return <Loading />;
  }
  return (
    <>
      <SimpleHeader />
      <ToastContainer />
      <SmallContainer>
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-center">Your Articles</h2>
        </div>
        <div>
          <div className="flex flex-wrap">
            {userPosts.length !== 0 ? (
              userPosts.map((post) => (
                <div
                  key={post.$id}
                  className=" md:w-1/3 sm:w-1/2  p-6 flex flex-col"
                >
                  <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
                    <div className="flex flex-wrap no-underline hover:no-underline ">
                      <div className="w-full relative group">
                        <img
                          src={post.featuredImage}
                          className="h-64 w-full rounded-t pb-6 "
                        />

                        <FaEdit
                          className="text-gray-950 px-2 bg-gray-300 absolute right-1 top-2 cursor-pointer text-4xl hidden group-hover:block"
                          title="Edit image"
                          onClick={() => showEditImageFun(post.$id)}
                        />
                        <div
                          className={`absolute inset-0 bg-gray-400 px-3 z-10 h-40 pt-4 overflow-hidden ${
                            editImage[post.$id] ? "block" : "hidden"
                          }`}
                        >
                          <form>
                            <Input
                              name={`image-${post.$id}`}
                              id={`image-${post.$id}`}
                              type="file"
                              className="px-1 mb-4"
                              onChange={handleFileChange}
                            />

                            <button
                              type="button"
                              onClick={() => editImageFun(post.$id)}
                              className="bg-blue-500 text-white rounded-md mt-2 px-4 py-2 hover:bg-indigo-900"
                            >
                              Update
                            </button>

                            <button
                              type="button"
                              onClick={hideEditModal}
                              className="bg-gray-600 ml-2 text-white rounded-md mt-2 px-8 py-2 hover:bg-indigo-900"
                            >
                              Cancel
                            </button>
                          </form>
                        </div>
                      </div>
                      <div className="w-full  px-6 mb-3">
                        <div className="relative  group">
                          <span className="font-bold text-xl text-gray-900">
                            {post.title}
                          </span>
                          <FaEdit
                            className="text-gray-950 absolute right-1 top-2 cursor-pointer text-xl hidden group-hover:block"
                            title="Edit Title"
                            onClick={() => showEditModalFun(post.$id)}
                          />
                          <div
                            className={`absolute inset-0 bg-gray-400 px-3 z-10 h-40 pt-4 overflow-hidden ${
                              editModal[post.$id] ? "block" : "hidden"
                            }`}
                          >
                            <form>
                              <Input
                                name={`title-${post.$id}`}
                                id={`title-${post.$id}`}
                                type="text"
                                className="px-1 mb-4"
                                placeholder="*Enter title title"
                                value={postTitle}
                                onChange={(e) => setPostTitle(e.target.value)}
                              />

                              <button
                                type="button"
                                onClick={() => editTitle(post.$id)}
                                className="bg-blue-500 text-white rounded-md mt-2 px-4 py-2 hover:bg-indigo-900"
                              >
                                Update
                              </button>

                              <button
                                type="button"
                                onClick={hideEditModal}
                                className="bg-gray-600 ml-2 text-white rounded-md mt-2 px-8 py-2 hover:bg-indigo-900"
                              >
                                Cancel
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div className="px-6 mb-5">
                        <div className="relative group">
                          <p className="text-gray-800 font-serif text-base">
                            {post.content ? post.content.slice(0, 200) : null}
                            ...
                          </p>
                          <FaEdit
                            className="text-gray-950 absolute right-1 top-2 cursor-pointer text-xl hidden group-hover:block"
                            title="Edit Content of article"
                            onClick={() => showEditContentFun(post.$id)}
                          />
                          <div
                            className={`absolute inset-0 bg-gray-400 px-3 z-10 h-40 pt-4 overflow-hidden ${
                              editContent[post.$id] ? "block" : "hidden"
                            }`}
                          >
                            <div>
                              <textarea
                                id={`content-${post.$id}`}
                                className="w-full h-20"
                                placeholder="*Enter content"
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
                              ></textarea>

                              <button
                                type="button"
                                onClick={() => editContentFun(post.$id)}
                                className="bg-blue-500 text-white rounded-md mt-2 px-4 py-2 hover:bg-indigo-900"
                              >
                                Update
                              </button>

                              <button
                                type="button"
                                onClick={hideEditModal}
                                className="bg-gray-600 ml-2 text-white rounded-md mt-2 px-8 py-2 hover:bg-indigo-900"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Link
                        to={`/article/${post.$id}`}
                        className="text-blue-600 mx-6"
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                  <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        className="bg-blue-500 text-white rounded-md px-4 py-1 hover:bg-indigo-900"
                        onClick={() => showDeleteModal(post.$id, post.featuredImageId)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="mt-5 text-center w-full">
                You dont have any articles. To write article{" "}
                <Link to="/createpost" className="text-indigo-700">
                  click here
                </Link>{" "}
              </p>
            )}
          </div>

          {deletePostModal && (
            <div className="w-screen h-screen p-5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30  bg-gray-500  bg-opacity-60 flex  justify-center items-center">
              <div className="w-56 h-56 px-6 border shadow-lg bg-gray-500 ">
                <p className="text-white mb-3 mt-6">
                  Are you sure you want to delete article?
                </p>
                <button
                  type="button"
                  className="bg-blue-500 text-white rounded-md  px-4 py-1 hover:bg-indigo-900"
                  onClick={() => deletePost(deleteData)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white ml-2 rounded-md px-4 py-1 hover:bg-indigo-900"
                  onClick={() => setDeletePostModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </SmallContainer>
    </>
  );
}

export default UserDashboard;
