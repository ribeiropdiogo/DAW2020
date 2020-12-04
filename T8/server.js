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

app.post('/files', upload.array('myFile'), function(req, res){
    // req.file is the 'myFile' file
    // req.body will hold the text fields, if there were any...
    // multiple files: upload.array(...) => files is an array
    var index;

    for (index = 0; index < req.files.length; ++index) {
        let oldPath = __dirname + '/' + req.files[index].path
        let newPath = __dirname + '/public/fileStore/' + req.files[index].originalname

        fs.rename(oldPath, newPath, function(err) {
            if (err) throw err
        })

        var files = jsonfile.readFileSync('./dbFiles.json')
        var d = new Date().toISOString().substr(0,16)

        console.log(req.files.length)
        if(req.files.length > 1)
            var description = req.body.desc[index]
        else var description = req.body.desc

        files.push(
            {
                date: d,
                name: req.files[index].originalname,
                size: req.files[index].size,
                mimetype: req.files[index].mimetype,
                desc: description
            }
        )
        jsonfile.writeFileSync('./dbFiles.json', files)
    }

    res.redirect('/')
})

app.listen(7777, () => console.log('Servidor à escuta na porta 7777...'))