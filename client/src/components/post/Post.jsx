import { Link } from "react-router-dom";
import "./post.css";
import axios from "axios";
import { useEffect } from 
  "react";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt(/* Markdown-it options */);
export default function Post({ img, post }) {
  function handleEditorChange({ html, text }, e) {
    // console.log('handleEditorChange', html, text);
    // setDesc(text)
  }
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
       <p
      dangerouslySetInnerHTML={{__html: post.desc}}
        className="postDesc">
      </p>
    </div>
  );
}
