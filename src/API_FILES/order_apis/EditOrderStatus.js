import axios from "axios"
import { API_URL,editorderstat } from "../../NwConfig"
export default async function EditOrderStatus(form) {
    try{
        const url=API_URL+editorderstat
        const request=await axios.put(url,form,
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