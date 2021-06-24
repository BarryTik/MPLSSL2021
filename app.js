var fs = require("fs")
var vm = require('vm')

eval(fs.readFileSync(__dirname + '/collect.js')+'');


var express = require('express');
var app = express();

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

var server = app.listen(PORT, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("App listening at http://%s:%s", host, port)
})