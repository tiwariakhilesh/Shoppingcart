import axios from 'axios';

export  function getBooks(){
    return function (dispatch){
        axios.get('/books')
        .then((res)=>{
            dispatch({type:"GET_BOOKS",payload:res.data});
        })
        .catch((err)=>{
            console.log(err);
            dispatch({type:"GET_BOOKS_REJECTED",payload:err});
        })
    }
}
export  function postBooks(books){
    console.log(books);
   return function(dispatch){
    axios.post('/books',books)
    .then((res)=>{
        console.log(res.data);
        return dispatch({type:"POST_BOOKS",payload:res.data});
    })
    .catch((err)=>{
        return dispatch({type:"POST_BOOK_REJECTED",payload:err});
    });
   }
}

export  function updateBooks(updateData){
    return{
        type:"UPDATE_BOOK",
        payload:updateData
    }    
}
export  function deleteBooks(_id){
    return{
        type:"DELETE_BOOK",
        payload:_id
    }    
}
