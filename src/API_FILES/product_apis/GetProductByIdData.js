import axios from "axios"
import { API_URL,getproductbyid } from "../../NwConfig"
export default async function GetProductByIdData(id) {
    try{
        const url=API_URL+getproductbyid+"?id="+id
        const request=await axios.get(url)
        const response=await request.data;
        // console.log(response)
        return response
    }catch(error){
        // console.log(error)
        return error.message
    }
    
}