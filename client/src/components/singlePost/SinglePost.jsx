import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { axiosInstance } from "../../config";
const dotenv = require("dotenv")

dotenv.config()
export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [post, setPost] = useState({});
  // const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [updateMode, setUpdateMode] = useState(false)
  const [imgResponse,setImgResponse] = useState("")
  console.log("data trong store context",user)
  useEffect(() => {
    const getPost = async () => {
      const res =await  axiosInstance.get("/posts/" + path);
      console.log(res)
setImgResponse(res.data.photo)
      setPost(res.data)
      setTitle(res.data.title)
      setDesc(res.data.desc)
    }
    getPost()
  }, [path])
  // console.log(post)
  const handleDelete = async () => {
    
    try {
      await axiosInstance.delete("/posts/" + path, {
        data: {

          username: user.data.others.username
        }
      });
      window.location.replace('/')
    } catch (err) {
      console.log(err)
    }
  }
  const handleUpdate = async () => {
       
    try {
      await axiosInstance.put("/posts/" + post._id, {
          username: user.data.others.username,
          title: title,
          desc
        
      });
      // window.location.reload()
      setUpdateMode(false)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo &&
          <img
            className="singlePostImg"
            src={imgResponse}
            alt=""
          />
        }
        {updateMode ? <input type={"text"} value={title} className="singlePostTitleInput"
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
        />
          : (
            
        <h1 className="singlePostTitle">
          {title}
          {user && user.data &&  post.username === user.data.others.username &&
            <div className="singlePostEdit">
              <i className="singlePostIcon far fa-edit"
              onClick={()=>setUpdateMode(true)}
              ></i>
              <i className="singlePostIcon far fa-trash-alt"
              onClick={handleDelete}
              ></i>
            </div>
          }
        </h1>
      )
      }
        <div className="singlePostInfo">
          <span>
            Author:
            <Link className="link" to={`/?username=${post.username}`}>
            <b className="singlePostAuthor">
             {post.username}
            </b>
            </Link>
            
          </span>
          <span>{ new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode ? (<textarea
          style={{height:'400px'}}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="singlePostDescInput" />) : 
              (
                <p className="singlePostDesc">
              {desc}        
            </p>
          )
        }
        {updateMode ? (

          <button className="singlePostBtn"
          onClick={handleUpdate}
          >Update-blog</button>
        ): ''
        }
      </div>
    </div>
  );
}
