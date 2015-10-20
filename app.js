var requirejs = require('requirejs');
var express = require('express');
var argv = require('minimist')(process.argv.slice(2));

requirejs.config({
    nodeRequire: require,
    baseUrl: __dirname,
    app: '../main',
    map: {
        '*': {visitor: "main/fileVisitor"}
    }
});


var result;
requirejs(['main/main'], function (main) {
    if (argv.elementPath) {
        main.calculateDependenciesFor(argv.elementPath, function (res) {
            result = res;
        });
    }
});

var app = express();
app.get('/', function (req, res) {
    res.render('graphexample.jade', {data: JSON.stringify(result)});

});


module.exports = app;
