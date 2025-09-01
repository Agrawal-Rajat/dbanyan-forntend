import axios from "axios"
import { API_URL,getfetauredproducts } from "../../NwConfig"
export default async function GetFeaturedProducts() {
    try{
        const url=`${API_URL}${getfetauredproducts}`
        const request=await axios.get(url)
        const response=await request.data;
        // console.log(response)
        return response
    }catch(error){
        // console.log(error)
        return error.message
    }
    
}