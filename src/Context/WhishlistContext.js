import axios from "axios";
import { createContext } from "react";


export let WhishlistContext = createContext()

export default function WhishlistContextProvider(props){
    let headers = {
        token : localStorage.getItem('userToken') 
    }
    function setWishToken(){
        headers = {
            token: localStorage.getItem("userToken")
        }
    }

    function addToWhishlist(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
            productId
        },{
            headers
        })
        .then((response)=> response)
        .catch((err)=> err)
    }

    function getWhishlistItems(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
            headers
        })
        .then((response)=> response)
        .catch((err)=> err)

    }

    function deleteWhishlistItems(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` , {
            headers
        })
        .then((response)=> response)
        .catch((err)=> err)
    }

    return <>
        <WhishlistContext.Provider value={{addToWhishlist , getWhishlistItems , deleteWhishlistItems , setWishToken}}>
            {props.children}
        </WhishlistContext.Provider>
    
    </>
}

