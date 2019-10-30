"use strict"
var mongoose= require('mongoose');
var bookSchema= mongoose.Schema({
    "title":String,
    "description":String,
    "images":String,
    "price":Number
});
var Books = mongoose.model('books',bookSchema);
module.exports= Books;