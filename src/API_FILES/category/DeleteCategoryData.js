import axios from "axios"
import { API_URL,deletecategory } from "../../NwConfig"
export default async function DeleteCategoryData(id) {
    try{
        const url=API_URL+deletecategory+"?id="+id
        const request=await axios.delete(url,
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