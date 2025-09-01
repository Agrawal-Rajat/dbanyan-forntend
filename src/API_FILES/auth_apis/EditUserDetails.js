import axios from "axios"
import { API_URL,editdetails } from "../../NwConfig"
export default async function EditUserDetails(form) {
    try{
        const url=API_URL+editdetails
        const request=await axios.put(url, form, { withCredentials: true });
        const response=await request.data;
        // console.log(response)
        return response
    }catch(error){
        // console.log(error)
        return error.message
    }
}