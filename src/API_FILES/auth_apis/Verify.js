import axios from "axios"
import { API_URL,verify } from "../../NwConfig"
export default async function Verify() {
    try{
        const url=API_URL+verify
        const request=await axios.post(url, {}, { withCredentials: true });
        const response=await request.data;
        // console.log(response)
        return response
    }catch(error){
        // console.log(error)
        return error.message
    }
}