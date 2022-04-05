import { Link } from "react-router-dom";
import "./post.css";
import axios from "axios";
import { useEffect } from "react";
export default function Post({img, post}) {
  return (
    <div className="post">
      {post.photo &&
        <img
          className="postImg"
          src={post.photo}
          alt=""
        />
      }
      <div className="postInfo">
        <div className="postCats">
          {
            post.categories.map((c, index) => (
              <Link  key={index} to={`/post/${post._id}`} className="link">
                  <span className="postCat">
                        {c}
                  </span>
                </Link>
            ))
          }
          {/* <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              Life
            </Link>
          </span> */}
        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{new Date( post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
        {post.desc}
      </p>
    </div>
  );
}
