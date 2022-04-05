// import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { axiosInstance } from "../../config";
import "./homepage.css";
const dotenv = require("dotenv")
dotenv.config()
export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();
  // console.log(search)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosInstance.get("/posts"+search);
      // console.log(res);
      setPosts(res.data)
      console.log("homepage", res.data)
    }
    fetchPosts();
  }, [search])
  
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts = {posts} />
        <Sidebar />
      </div>
    </>
  );
}
