import axios from "axios";
import { API_URL,singup } from "../../NwConfig";
export default async function Signup(userData) {
    try{
        const url=API_URL+singup;
const response = await axios.post(url, userData,{ withCredentials: true });
    return response.data;
    }
    catch(error){
        console.error("Error during signup:", error);
        return  error;
    }
    
}