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

requirejs(['main/main']);
var app = express();
module.exports = app;
