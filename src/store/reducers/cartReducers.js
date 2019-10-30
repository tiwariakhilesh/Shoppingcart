export function cartReducers(state={cart:[],totalAmount:0,totalQuantity:0},action){
    switch(action.type){
        case "ADD_TO_CART": return {
            ...state, cart:action.payload,
            totalAmount: totals(action.payload).amount,
            totalQuantity:totals(action.payload).qty
        };
        case "DELETE_FROM_CART": return {...state, 
            cart:action.payload,
            totalAmount: totals(action.payload).amount,
            totalQuantity:totals(action.payload).qty
        };
        case "UPDATE_CART": 
        return {
            ...state,
            cart:[...action.payload],
            totalAmount: totals(action.payload).amount,
            totalQuantity:totals(action.payload).qty
        }
        case "GET_CART": return {cart:[...state.cart]};
    }
    return state;
}

function totals(cartArray){
    const totalamt= cartArray.map(cartArr=>{
        return cartArr.quantity * cartArr.price;
    }).reduce( (a,b)=>{
        return a + b;
    },0);
    const totalqty= cartArray.map(cartArr=>{
        return cartArr.quantity;
    }).reduce((a,b)=>{
        return a + b;
    },0);
    return {amount:totalamt.toFixed(2),
    qty:totalqty};
}
