import axios from "axios"
import { API_URL,getallusers } from "../../NwConfig"
export default async function GetAllUserData() {
    try{
        const url=API_URL+getallusers
        const request=await axios.get(url,
            { withCredentials: true }
        )
        const response=await request.data;
        // console.log(response)
        return response
    }catch(error){
        // console.log(error)
        return error.message
    }
    
}