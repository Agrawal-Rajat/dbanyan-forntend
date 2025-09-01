import axios from "axios"
import { API_URL,logout } from "../../NwConfig"
export default async function Logout() {
   try {
    const url=API_URL+logout
    await axios.post(url, {}, { withCredentials: true });
      localStorage.removeItem("tehunyzu@37673");
    window.location.href = "/"; // redirect after logout
  } catch (err) {
    // console.error("Logout failed", err);
  }
    
}