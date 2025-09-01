import axios from "axios";
import { API_URL,login } from "../../NwConfig";
export default async function Login(userData) {
    try{
        const url=API_URL+login;
const response = await axios.post(url, userData,{ withCredentials: true });
    return response.data;
    }
    catch(error){
        console.error("Error during signup:", error);
        return  error;
    }
    
}