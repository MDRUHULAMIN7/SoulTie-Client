import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'https://n-nine-taupe.vercel.app/'
})

const UseAxiosPublic =()=>{
    return axiosPublic;
};
export default   UseAxiosPublic 