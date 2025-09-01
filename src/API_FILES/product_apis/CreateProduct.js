import axios from "axios"
import { API_URL,addproduct } from "../../NwConfig"
export default async function CreateProduct(form) {
    try{
        const url=API_URL+addproduct
        const request=await axios.post(url,
            form,
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