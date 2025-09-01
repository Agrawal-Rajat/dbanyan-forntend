import Verify from "./auth_apis/Verify";
import { useDispatch } from "react-redux";
import { addcart,addwishlist, clearCartData, clearWishlistData } from "../store/slices/WishlistAndCartSlice";
export default async function verifyuser(dispatch){
  // const dispatch=useDispatch()
      const expiry=localStorage.getItem('tehunyzu@37673')
      const timeout = expiry - Date.now();
      if(timeout>0 && expiry){
        const res=await Verify()
        if(res?.message=="Login verified successfully"){
          console.log("yedhwb2781980@998")
          dispatch(clearCartData())
          dispatch(clearWishlistData())
          // console.log(res)
          return res
          if(res?.cartlist && Array.isArray(res?.cartlist) && res?.cartlist?.length>=1){
            res?.cartlist?.forEach((item)=>dispatch(addcart(item)))
          }
          if(res?.wishlist && Array.isArray(res?.wishlist) && res?.wishlist?.length>=1){
            res?.wishlist?.forEach((item)=>dispatch(addwishlist(item)))
          }
          // console.log(cart,wishlist)
        }
        
      }
      
    }
