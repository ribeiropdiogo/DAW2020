var express = require('express')
var bodyparser = require('body-parser')
var templates = require('./html-templates')
var jsonfile = require('jsonfile')
var fs = require('fs')
var logger = require('morgan')

var multer = require('multer')
var upload = multer({dest: 'uploads/'})

var app = express()

app.use(logger('dev'))

app.use(bodyparser.urlencoded({extended: false}))

app.use(bodyparser.json())

app.use(express.static('public'))

app.use((req, res, next) => {
    console.log(JSON.stringify(req.body))
    next()
})

app.get('/', function(req, res) {
    var d = new Date().toISOString().substr(0,16)
    var files = jsonfile.readFileSync('./dbFiles.json')
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
    res.write(templates.fileList(files, d))
    res.end()
})

app.get('/files/upload', function(req, res) {
    var d = new Date().toISOString().substr(0,16)
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
    res.write(templates.fileForm(d))
    res.end()
})

app.get('/files/download/:fname', (req,res) => {
    res.download(__dirname + '/public/fileStore/' + req.params.fname)
})

app.post('/files', upload.single('myFile'), function(req, res){

    let oldPath = __dirname + '/' + req.file.path
    let newPath = __dirname + '/public/fileStore/' + req.file.originalname

    fs.rename(oldPath, newPath, function(err) {
        if (err) throw err
    })

    var files = jsonfile.readFileSync('./dbFiles.json')
    var d = new Date().toISOString().substr(0,16)
    files.push(
        {
            date: d,
            name: req.file.originalname,
            size: req.file.size,
            mimetype: req.file.mimetype,
            desc: req.body.desc
        }
    )
    jsonfile.writeFileSync('./dbFiles.json', files)
    res.redirect('/')
})

app.listen(7703, () => console.log('Servidor à escuta na porta 7703...'))