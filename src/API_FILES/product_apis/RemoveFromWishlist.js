import axios from "axios"
import { API_URL, removefromwishlist} from "../../NwConfig"
export default async function RemoveFromWishlist(id) {
    try{
        const url=API_URL+removefromwishlist
        const request=await axios.post(url,id,{withCredentials:true})
        const response=await request.data;
        // console.log(response)
        return response
    }catch(error){
        // console.log(error)
        return error.message
    }
    
}