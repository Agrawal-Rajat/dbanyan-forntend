import axios from "axios"
import { API_URL,editcategorybyid } from "../../NwConfig"
export default async function EditCategory(form) {
    try{
        const url=API_URL+editcategorybyid
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