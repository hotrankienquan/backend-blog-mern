import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState , useRef, useEffect } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { Image } from "cloudinary-react"
import { axiosInstance } from "../../config";

// import { axiosInstance } from "../../config";
// export function useIsMounted() {
//   const isMounted = useRef(false);

//   useEffect(() => {
//     isMounted.current = true;
//     return () => isMounted.current = false;
//   }, []);

//   return isMounted;
// }
export default function Settings() {
  const [file, setFile] = useState(null)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [success, setSuccess] = useState(false)
 const [imageSelected, setImageSelected] = useState({});
  const [imgResponse,setImgResponse] = useState("")
  const { user, dispatch } = useContext(Context);
  console.log("check user context api",user)
  const handleSubmit = async (e) => {
    
    e.preventDefault()
    
  //   const formData = new FormData();
  //  formData.append("file", imageSelected)
  //  formData.append("upload_preset", "kchrwa7s")
   
  //  axios.post("https://api.cloudinary.com/v1_1/kienquan/image/upload", formData).then(res => {
  //   console.log("check res image cloudinary", res)
  //    setImgResponse(res.data.secure_url)
  //  })
    dispatch({type: 'UPDATE_START'})
    const updatedUser = {
      userId:user.data.others._id,
      username, email,
      profilePic:imgResponse
    }
    try {
      
     const res = await axiosInstance.put("/users/"+user.data.others._id, updatedUser);
      // setSuccess(true)
      console.log("check res data:", res.data)
      window.location.replace("/")
      
    dispatch({type: 'UPDATE_SUCCESS', payload: res.data})

    } catch (err) {
    dispatch({type: 'UPDATE_FAILURE'})
      console.log(err)
    }
  }
    const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", imageSelected)
    formData.append("upload_preset", "kchrwa7s")

     await axios.post("https://api.cloudinary.com/v1_1/kienquan/image/upload", formData).then(res => {
    console.log("check res image cloudinary", res)
      
       setImgResponse(res.data.secure_url)
       alert("upload image ok")
      // console.log(imgResponse)
    })
    // console.log(URL.createObjectURL(imageSelected))
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
             <Image cloudName="kienquan" publicId={(user && user.data && user.data.others && user.data.others.profilePic) || ""}
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
          <input type="text" placeholder={""} name="name" onChange={e => setUsername(e.target.value)}
          value={username}
          />
          <label>Email</label>
          <input type="email" placeholder={""} name="email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          />
          {/* <label>Password</label>
          <input type="password" placeholder="Password" name="password"
            value={password}
          onChange={e=>setPassword(e.target.value)}
          /> */}
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {/* {success && <span style={{color:'green'}}>profile has been updated..</span>} */}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
