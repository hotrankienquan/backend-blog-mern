import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import {Image} from "cloudinary-react"
import { axiosInstance } from "../../config";

export default function Settings() {
  const [file, setFile] = useState(null)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [success, setSuccess] = useState(false)
 const [imageSelected, setImageSelected] = useState({});
  const [imgResponse,setImgResponse] = useState("")
  const { user, dispatch } = useContext(Context);
  const handleSubmit =async (e) => {
    e.preventDefault()
    dispatch({type: 'UPDATE_START'})
    const updatedUser = {
      userId:user.data.others._id,
      username, email, password,
      profilePic:imgResponse
    }
    try {
      
     const res = await axiosInstance.put("/users/"+user.data.others._id, updatedUser);
      setSuccess(true)
    dispatch({type: 'UPDATE_SUCCESS', payload: res.data})

    } catch (err) {
    dispatch({type: 'UPDATE_FAILURE'})
      console.log(err)
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
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
          <button onClick={uploadImage} className="imgSubmitSetting">upload image</button>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            {/* <img
              // src={file ? URL.createObjectURL(file) : PF + user.data.others.profilePic}
              alt=""
            /> */}
             <Image cloudName="kienquan" publicId={ user.data.others.profilePic}
        className="writeImg"
            />
            <input id="fileInput" type="file" style={{display:'none'}}
          onChange={e => setImageSelected(e.target.files[0])}
          />
            
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            {/* <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
          onChange={e => setFile(e.target.files[0])}

            /> */}
          </div>
          <label>Username</label>
          <input type="text" placeholder={user.data.others.username} name="name" onChange={e=>setUsername(e.target.value)}/>
          <label>Email</label>
          <input type="email" placeholder={user.data.others.email} name="email"
          onChange={e=>setEmail(e.target.value)}
          />
          <label>Password</label>
          <input type="password" placeholder="Password" name="password"
          onChange={e=>setPassword(e.target.value)}
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {success && <span style={{color:'green'}}>profile has been updated..</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
