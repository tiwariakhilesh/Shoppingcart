import axios from 'axios';

export  function addToCart(cart){
    return function(dispatch){
        axios.post('/cart',cart)
            .then((res)=>{
                console.log(res.data);
                dispatch({type:"ADD_TO_CART",payload:res.data});
            })
            .catch(err=>{
                dispatch({type:"ADD_TO_CART_REJECTED",payload:'add to cart is throwing an error'});
            })
    }
}
export  function deleteFromCart(_id){
    return{
        type:"DELETE_FROM_CART",
        payload:_id
    }
}
export  function updateCart(_id, unit, cart){
    const cartData= [...cart];
        const indexToUpdate= cartData.findIndex(cartArr=>{
            return cartArr._id === _id;
        })
            cartData[indexToUpdate].quantity=  cartData[indexToUpdate].quantity + unit;
    return{
        type:"UPDATE_CART",
        payload:cartData
    }
}
export  function getCart(){
    return function(dispatch){
        axios.get('/cart')
            .then((res)=>{
                dispatch({type:"GET_CART",payload:res.data});
            })
            .catch(err=>{
                dispatch({type:"GET_CART_REJECTED",payload:'add to cart is throwing an error'});
            })
    }
}