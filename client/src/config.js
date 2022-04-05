import axios from "axios"
export const axiosInstance = axios.create({
    baseURL : "https://kq-blog-backend.herokuapp.com/api/"
})