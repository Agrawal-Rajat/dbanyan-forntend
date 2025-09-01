import axios from "axios"
import { API_URL, removefromcart} from "../../NwConfig"
export default async function RemoveFromCart(id) {
    try{
        const url=API_URL+removefromcart
        const request=await axios.post(url,id,{withCredentials:true})
        const response=await request.data;
        // console.log(response)
        return response
    }catch(error){
        // console.log(error)
        return error.message
    }
    
}