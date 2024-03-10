import axios from "axios";
import { createContext, useState } from "react";


export let CartContext = createContext()

export default function CartContextProvider(props) {
    

    let headers = {
        token : localStorage.getItem('userToken') 
    }

    function setTokenCartContext(){
        headers = {
            token: localStorage.getItem("userToken")
        }
    }

    const[numberOfCartItems,setNumberOfCartItems]=useState(0);

    function addToCart(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , {
            productId
        },{
            headers
        })
        .then((response)=> {setNumberOfCartItems(response.data.numOfCartItems); return response; })
        .catch((err)=> err)
    }

    function getCartItems(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {
            headers
        })
        .then((response)=> {setNumberOfCartItems(response.data.numOfCartItems); return response; })
        .catch((err)=> err)
    }

    function cheackOutSession(cartId , shippingAddress){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000` , {
            shippingAddress
        },{
            headers
        })
        .then((response)=> {setNumberOfCartItems(response.data.numOfCartItems); return response; })
        .catch((err)=> err)
    }

    function deleteCartItems(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
            headers
        })
        .then((response)=> {setNumberOfCartItems(response.data.numOfCartItems); return response; })
        .catch((err)=> err)
    }

    function updateCartItems(productId , count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
            count
        } , {
            headers
        })
        .then((response)=> {setNumberOfCartItems(response.data.numOfCartItems); return response; })
        .catch((err)=> err)
        
    }

    function clearCartItems(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {
            headers
        })
        .then((response)=> {setNumberOfCartItems(0); return response; })
        .catch((err)=> err)
    }

    return <CartContext.Provider value={{numberOfCartItems , addToCart , getCartItems , deleteCartItems , updateCartItems , clearCartItems , setTokenCartContext , cheackOutSession}}>
                {props.children}
            </CartContext.Provider>
}