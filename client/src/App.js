import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPosts } from "./actions/posts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrimarySearchAppBar from "./components/Navbar/Navbar";
import Layout from "./components/Layout/Layout";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <PrimarySearchAppBar />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/posts" element={<Layout />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/posts/search" element={<Layout />} />
        <Route path="/SignIn" element={<Auth type={"in"} />} />
        <Route path="/SignUp" element={<Auth type={"up"} />} />
      </Routes>
    </Router>
  );
};

export default App;
