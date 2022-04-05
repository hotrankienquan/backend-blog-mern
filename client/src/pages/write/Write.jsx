import { useContext, useState } from "react";
import "./write.css";
import axios from "axios"
import { Context } from "../../context/Context";
import {Image} from "cloudinary-react"
import { axiosInstance } from "../../config";
export default function Write() {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  // const [file, setFile] = useState(null)
  const { user } = useContext(Context);
  const [imageSelected, setImageSelected] = useState({});
  const [imgResponse,setImgResponse] = useState("")
  const handleSubmit =async (e) => {
    e.preventDefault()
    const newPost = {
      username:user.data.others.username,
      title, desc,
      photo: imgResponse
    }
    // if (file) {
    //   const data =new FormData();
    //   const filename = Date.now() + file.name;
    //   data.append("name", filename);
    //   data.append("file", file);
    //   newPost.photo = filename;
    //   try {
    //     await axios.post("/upload", data);
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
    try {
      
      const res = await axiosInstance.post("/posts", newPost);
      window.location.replace("/post/"+res.data._id)
    } catch (err) {
      console.log(err, 'error when write a post')
    }
  }
  const uploadImage = () => {
      console.log(imageSelected)
    const formData = new FormData();
    formData.append("file", imageSelected)
    formData.append("upload_preset", "kchrwa7s")

    axios.post("https://api.cloudinary.com/v1_1/kienquan/image/upload", formData).then(res => {
      console.log(res)
      setImgResponse(res.data.secure_url)
    })
  }
  return (
    <div className="write">
      {/* {file && (

        <img
          className="writeImg"
          src={URL.createObjectURL(file)}
          alt=""
        />

      )} */}
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
          
          {/* onChange={e => setFile(e.target.files[0])} */}

          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={e =>setTitle(e.target.value)}
          />

        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={e =>setDesc(e.target.value)}

          />
        </div>
        <button className="writeSubmit" type="submit"
        >
          Publish
        </button>
      </form>
    </div>
  );
}