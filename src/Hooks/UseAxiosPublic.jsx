import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'http://localhost:5000'
    // baseURL:'https://soul-tie-server.vercel.app'
})
// 'https://soul-tie-server.vercel.app'
// 'http://localhost:5000'
const UseAxiosPublic =()=>{
    return axiosPublic;
};
export default   UseAxiosPublic 