import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import spinner from "./assets/Spinner-5.gif";
import Home from "./components/Home";

import Login from "./components/Login";
import SimpleHeader from "./components/Header/SimpleHeader";
import { useBlogContext } from "./context/BlogContext";
import UserDashboard from "./components/UserPages/UserDashboard";
import PrivateRoute from "./utils/PrivateRoute";
import Register from "./components/Register";
import CreatePost from "./components/Post/CreatePost";
import Loading from "./components/Loading";
import Articles from "./components/Post/Articles";
import SingleArticle from "./components/Post/SingleArticle";
import EditPost from "./components/Post/EditPost";

function App() {
  const [count, setCount] = useState(0);
  const { loading } = useBlogContext();

  if (loading) {
    return <Loading />;
  }
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} isHomePage={false} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/articles" element={<Articles />} />
        <Route  path="/article/:postId" element={<SingleArticle/>} />
        <Route element={<PrivateRoute />}>
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route  path="/editpost/:postId" element={<EditPost/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
