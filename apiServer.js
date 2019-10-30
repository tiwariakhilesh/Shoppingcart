var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

//Api
var mongoose= require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookShop');
var Books= require('./models/books');

app.post('/books',function(req,res){
  var book= req.body;
  Books.create(book,function(err,books){
  if(err){
    throw err;
  }
    res.json(books);
    })
});
app.get('/books',function(req,res){
  Books.find(function(err,books){
    if(err){
      throw err
    }
    res.json(books);
  })
})
app.delete('/books',function(req,res){
  var query= {_id:req.params._id};
  Books.remove(query,(err,books)=>{
    if(err){
      throw err;
    }
    res.json(books);
  })
})
//End API

app.listen(9000,function(err){
    if(err){
        return console.log(err);
    }
    else{
        console.log("port is listening at 9000");
    }
    
})