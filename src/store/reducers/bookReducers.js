
let initialState={
    books:[],
    error:false
}
export function  booksReducers(state=initialState, action){
    switch(action.type){
        case "GET_BOOKS": return {books:[...action.payload]};
        case "POST_BOOKS": return {books:[...state.books,...action.payload]};
        case "DELETE_BOOK": 
           const currentBookToDelete= [...state.books];
           const indexToDelete=currentBookToDelete.findIndex((book)=>{
                return book._id === action.payload._id
           });
           
           return{
                books:[...currentBookToDelete.slice(0,indexToDelete)
            ,...currentBookToDelete.slice(indexToDelete +1)]   
           };
           case "UPDATE_BOOK":
           const currentBook=[...state.books];
           const indexToUpdate=currentBook.findIndex((book)=>{
                return book._id === action.payload._id;
           });
         currentBook[indexToUpdate].title= action.payload.title;
           return{
               books:[...currentBook]
           }
        case "GET_BOOKS_REJECTED":
        return {
            ...state,
            error:true
        }
        case "POST_BOOK_REJECTED":
        return {
            ...state,
            error:true
        }
        
        
    }
    return state;
}