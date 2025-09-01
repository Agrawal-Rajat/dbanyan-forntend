import { createSlice } from "@reduxjs/toolkit";
export const WishlistAndCartSlice=createSlice({
    name:"wishlistandcart",
    initialState:{wishlist:[],cart:[]},
    reducers:{
        fetchcart:(state)=>{state.cart},
        fetchwishlist:(state)=>{state.wishlist},
        addcart:(state,action)=>{state.cart.push(action.payload)},
        removecart:(state,action)=>{state.cart=state.cart.filter(item=>item!==action.payload)},
        addwishlist:(state,action)=>{state.wishlist.push(action.payload)},
        removewishlist:(state,action)=>{state.wishlist=state.wishlist.filter(item=>item!==action.payload)},
        clearCartData:(state)=>{state.cart.length=0},
        clearWishlistData:(state)=>{state.wishlist.length=0},
    }
});
export const {
  fetchcart,
  fetchwishlist,
  addcart,
  addwishlist,
  removecart,
  removewishlist,
  clearCartData,
  clearWishlistData
} = WishlistAndCartSlice.actions;

export default WishlistAndCartSlice.reducer;