const path= require('path');
const webpack= require('webpack');

module.exports = {
    entry: ["./src/client.js"],
    mode:"development",
    output: {
      path: path.resolve(__dirname,'public'),
      publicPath: "/",
      filename: "bundle.js"
    },
    watch:true,
    module: {
        rules: [
        {
            test:/\.js$/,
            include: path.appSrc,
            exclude:'/node_modules/',
            loader:'babel-loader',
            query:{
                presets:['react','es2015','stage-1']
            }
        }
      ]
    }
  };
  