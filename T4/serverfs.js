var http = require('http');
var fs = require('fs')
var utils = require('./utils.js')

http.createServer(function (req,res) {
    console.log(req.method + " " + req.url + " " + utils.myDateTime())
    if(req.url.match(/\/\d+$/)){
        if(req.url.match(/\/([1-9]|\d\d|1[0-1]\d|12[0-2])$/)){
        var num = req.url.split("/")[2]
        fs.readFile('site/arq' + num + '.html', function(err,data){
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(data)
            res.end()
        })
        } else {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write("<h3 style='margin: 0;position: absolute; top: 50%; left:30%;'>O arqueosítio não existe :(</h3>")
            res.end()
        }
    } else {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.write("<h3 style='margin: 0;position: absolute; top: 50%; left:30%;'>O URL não é válido :(</h3>")
        res.end()
    }
}).listen(7777);

console.log('Servidor à escuta na porta 7777...')