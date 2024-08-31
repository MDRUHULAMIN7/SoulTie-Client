import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'https://n-nine-taupe.vercel.app/'
})
// 'https://n-nine-taupe.vercel.app/'
// 'http://localhost:5000'
const UseAxiosPublic =()=>{
    return axiosPublic;
};
export default   UseAxiosPublic 