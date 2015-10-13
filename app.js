var requirejs = require('requirejs');
var express = require('express');


requirejs.config({
    nodeRequire: require,
    baseUrl:__dirname,
    app: '../main',
    map:{
        '*':{visitor:"main/fileVisitor"}
    }
});

var app = express();

requirejs(['main/main'],function(main){
    app.get('/',function(req,res){
        main.calculateDependenciesFor("C:\\Users\\sonste\\Desktop\\projekte\\chrome ext\\srtchrome\\html\\popup.html",function(result){
            res.send(result);
        });
    });
});


module.exports = app;
