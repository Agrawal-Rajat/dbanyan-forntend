import axios from "axios"
import { API_URL,getcategory } from "../../NwConfig"
export default async function GetCategoryData() {
    try{
        const url=API_URL+getcategory
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