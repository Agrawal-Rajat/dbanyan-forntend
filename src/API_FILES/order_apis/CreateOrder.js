import axios from "axios"
import { API_URL,createorder } from "../../NwConfig"
export default async function CreateOrder(form) {
    try{
        const url=API_URL+createorder
        const request=await axios.post(url,
            form,
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