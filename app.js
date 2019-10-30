var express = require('express');
var path = require('path');
var logger = require('morgan');
// var httpProxy= require('http-proxy');
var app = express();
//http server proxy settings
// var apiProxy= httpProxy.createProxy({
//   target:'http://localhost:5000'
// });
// var apiProxy = httpProxy.createProxyServer();
// apiProxy.on('error', function (err, req, res) {
//   console.log('Error occurr'+ err); 
// });
// app.use('/api',function(req,res){
//   apiProxy.web(req, res, { target:'http://localhost:9000',changeOrigin:true,secure:false});
// })

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));


var mongoose= require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookShop');
var Books= require('./models/books');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
//setup session
var db= mongoose.connection;
db.on('error',console.error.bind(console, "MONGO DB connection error"));
app.use(session({
  secret:'secretString',
  saveUninitialized:false,
  resave:false,
  cookie:{maxAge:2* 1000 * 24 * 60 * 60},
  store:new MongoStore({mongooseConnection:db,ttl:2 * 24 * 60 * 60})
}))

 // SAVE SESSION CART API
 app.post('/cart', function(req, res){
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err){
    if(err){
      throw err;
    }
    res.json(req.session.cart);
  })
});
// GET SESSION CART API
app.get('/cart', function(req, res){
  if(typeof req.session.cart !== 'undefined'){
    res.json(req.session.cart);
  }
});
//--->>> END SESSION SET UP <<<----


//end session

//API
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

// app.listen(9000,function(err){
//     if(err){
//         return console.log(err);
//     }
//     else{
//         console.log("port is listening at 9000");
//     }
    
// })

app.get('*',function(req,res){
  res.sendFile(path.resolve(__dirname,'public','index.html'));
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
