import axios from "axios"
import { API_URL,counts } from "../../NwConfig"
export default async function GetCounts() {
    try{
        const url=API_URL+counts
        const request=await axios.get(url,
            {withCredentials:true}
        )
        const response=await request.data;
        // console.log(response)
        return response
    }catch(error){
        // console.log(error)
        return error.message
    }
    
}