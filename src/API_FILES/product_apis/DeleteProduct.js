import axios from "axios"
import { API_URL,deleteproduct } from "../../NwConfig"
export default async function DeleteProduct(id) {
    try{
        const url=API_URL+deleteproduct+"?id="+id
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