import { createContext, useContext, useEffect, useState } from "react";
import { databases, storage, ID } from "../appwrite/config";

import conf from "../conf/conf";
import { Query } from "appwrite";
import { useAuthContext } from "./AuthContext";
import { toast } from "react-toastify";
const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [singlePost, setSinglePost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [createArticle, setCreateArticle] = useState([]);
  const [postSuccess, setPostSuccess] = useState(false);
  const [allArticles, setAllArticles] = useState([]);
  const [postAdded, setPostAdded] = useState(null);
  //console.log(conf.appwriteBucketId)

  const { user, reset, setValue } = useAuthContext();

  const getPost = async (userId) => {
    setLoading(true);

    try {
      let res = await databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        userId
      );
      //console.log(res);
      setSinglePost(res.documents);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  //get allposts of all users
  const getAllPostsFun = async () => {
    try {
      setLoading(true);
      let res = await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      );
      //console.log(res.documents);
      setAllPosts(res.documents);
      setAllArticles(res.documents);

      //setLoading(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    //setPostAdded(true)
  };

  useEffect(() => {
    getAllPostsFun();
    // console.log("use effect ran", postAdded);
    //getPost()
  }, [postAdded]);

  //get posts of logged in user and show in dashboard.
  const getUserPosts = async (userId) => {
    //setLoading(true);
    try {
      //console.log(userId);

      let res = await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("userId", `${userId}`)]
      );
      //console.log(res.documents);
      //filter documents on userId
      //const userDocuments = res.documents.filter(doc => doc.userId === userId);
      //display the user documents
      // console.log(res.documents);
      setUserPosts(res.documents);
    } catch (error) {
      console.log(error);
    }
    //setLoading(false);
  };

  ////create post in appwrite
  const createPost = async (data) => {
    //console.log(data);
    //return
    setLoading(true);
    //firt try is uploading image in storage
    try {
      //image upload
      let res = await storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        data.file[0]
      );
      //taking image id
      let imageId = `${res["$id"]}`;
      //console.log(imageId);
      //getting the uploaded image url from appwrite in imageUrl
      let imageUrl = await storage.getFileView(conf.appwriteBucketId, imageId);
      //console.log("image url: ", imageUrl.href);

      //second try is sending article to appwrite
      try {
        let response = await databases.createDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          ID.unique(),
          {
            name: user.name,
            title: data.title,
            content: data.content,
            status: "active",
            userId: user.$id,
            featuredImage: imageUrl,
            featuredImageId: imageId
          }
        );

        //console.log("post uploaded", response);
      } catch (error) {
        console.log(error);
        toast(error.message);
      }
      //upload Articles here

      setPostSuccess(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      toast.success("Article Posted");
    }
  };

  //update post title
  const updateTitle = async (data) => {
    setLoading(true);
    //console.log(data);

    try {
      let res = await databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        data.postId,
        { title: data.postTitle }
      );
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  //update post content
  const updateContent = async (data) => {
    setLoading(true);
    //console.log(data);

    try {
      let res = await databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        data.postId,
        { content: data.postContent }
      );
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  //update post image
  const updateImage = async (data) => {
    setLoading(true);
    //console.log(data);

    try {
      //image upload
      let res = await storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        data.file[0]
      );
      //taking image id
      let imageId = `${res["$id"]}`;
      //console.log(imageId);
      //getting the uploaded image url from appwrite in imageUrl
      let imageUrl = await storage.getFileView(conf.appwriteBucketId, imageId);
      //console.log("image url: ", imageUrl.href);
      try {
        let response = await databases.updateDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          data.postId,
          { featuredImage: imageUrl }
        );
      } catch (error) {}
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };


  const deleteUserPost = async(data)=>{
      setLoading(true)
      //console.log(data.postId)
      //return
      try {
          let doc = await databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId, data.postId);
          let img = await storage.deleteFile(conf.appwriteBucketId,  data.imageId)
      } catch (error) {
          console.log(error);
      }
      setLoading(false)
      setPostAdded(!postAdded)
      toast.success("Article deleted");
  }
  //values
  const values = {
    getPost,
    allPosts,
    loading,
    setLoading,
    singlePost,
    getUserPosts,
    userPosts,
    createPost,
    createArticle,
    postSuccess,
    allArticles,
    getAllPostsFun,
    postAdded,
    setPostAdded,
    updateTitle,
    updateContent,
    updateImage,
    deleteUserPost
  };

  return <BlogContext.Provider value={values}>{children}</BlogContext.Provider>;
};

//custom hook for using context
export const useBlogContext = () => {
  return useContext(BlogContext);
};
