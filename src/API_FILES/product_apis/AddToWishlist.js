import axios from "axios"
import { API_URL,addtowishlist } from "../../NwConfig"
export default async function AddToWishlist(id) {
    try{
        const url=API_URL+addtowishlist
        const request=await axios.post(url,id,{withCredentials:true})
        const response=await request.data;
        // console.log(response)
        return response
    }catch(error){
        // console.log(error)
        return error.message
    }
    
}