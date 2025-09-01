import axios from "axios"
import { API_URL,getallorders } from "../../NwConfig"
export default async function GetAllOrderData() {
    try{
        const url=API_URL+getallorders
        const request=await axios.get(url,
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