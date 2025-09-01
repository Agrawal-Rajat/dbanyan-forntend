import axios from "axios"
import { API_URL,getorderbyid } from "../../NwConfig"
export default async function GetOrderById(id) {
    try{
        var url=""
        if(!id){
         url=API_URL+getorderbyid

        }
        else{
            url=API_URL+getorderbyid+"?id="+id
        }
        const request=await axios.get(url,{withCredentials:true})
        const response=await request.data;
        // console.log(response)
        return response
    }catch(error){
        // console.log(error)
        return error.message
    }
    
}