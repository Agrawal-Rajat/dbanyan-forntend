import axios from "axios"
import { API_URL,getallproduct } from "../../NwConfig"
export default async function GetAllProductData(page,limit) {
    try{
        const url=`${API_URL}${getallproduct}?page=${page}&limit=${limit}`
        const request=await axios.get(url)
        const response=await request.data;
        // console.log(response)
        return response
    }catch(error){
        // console.log(error)
        return error.message
    }
    
}