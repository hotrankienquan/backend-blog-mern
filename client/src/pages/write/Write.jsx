import { useContext, useState } from "react";
import "./write.css";
import axios from "axios"
import { Context } from "../../context/Context";
import {Image} from "cloudinary-react"
import { axiosInstance } from "../../config";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);
export default function Write() {
  function handleEditorChange({ html, text }, e) {
    // console.log('handleEditorChange', html, text);
    setDesc(html)
    setDescMarkdown(text)
  }

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [descMarkdown,setDescMarkdown] = useState("")
  const { user } = useContext(Context);
  const [imageSelected, setImageSelected] = useState({});
  const [imgResponse,setImgResponse] = useState("")
  const handleSubmit = async (e) => {
    
    e.preventDefault()
    const newPost = {
      username:user.data.others.username,
      title, desc,descMarkdown,
      photo: imgResponse
    }
    try {
      
      const res = await axiosInstance.post("/posts", newPost);
      window.location.replace("/post/"+res.data._id)
    } catch (err) {
      console.log(err, 'error when write a post')
    }
  }
  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected)
    formData.append("upload_preset", "kchrwa7s")

    axios.post("https://api.cloudinary.com/v1_1/kienquan/image/upload", formData).then(res => {
      setImgResponse(res.data.secure_url)
    })
  }
  return (
    <div className="write">
      <Image cloudName="kienquan" publicId={imgResponse}
        className="writeImg"
      />
      <input id="fileInput" type="file" style={{display:'none'}}
          onChange={e => setImageSelected(e.target.files[0])}
          />
      <button onClick={uploadImage} className="imgSubmit">upload image</button>
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={e =>setTitle(e.target.value)}
          />

        </div>
        <div className="writeFormGroup">
          <MdEditor style={{
            height: '500px', width: '100%'
}} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />

        </div>
        <button className="writeSubmit" type="submit"
        >
          Publish
        </button>
      </form>
    </div>
  );
}
