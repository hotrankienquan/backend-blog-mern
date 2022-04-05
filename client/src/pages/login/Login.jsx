import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import "./login.css";
import axios from 'axios'
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const {user, dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axiosInstance.post('/auth/login', {
        username: userRef.current.value,
          password: passwordRef.current.value
      })
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      res.data && window.location.replace("/write")
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE' });

      console.log(err);
    }
  }
  console.log(user)
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="loginInput" type="text" placeholder="Enter your username..."
        ref={userRef}
        />
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..."
        ref={passwordRef}/>
        <button className="loginButton" type="submit"
        disabled={isFetching}
        >Login</button>
      </form>
      <button className="loginRegisterButton"
      
      >
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
