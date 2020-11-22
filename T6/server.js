var http = require('http')
var axios = require('axios')
var fs = require('fs')

var static = require('./static')

var {parse} = require('querystring')

// Aux. Functions
// Retrieves student info from request body --------------------------------
function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            console.log(body)
            callback(parse(body))
        })
    }
}

function generateId(tasks){
    var id = 0
    
    tasks.forEach(t => {
        if(t.id > id)
            id = t.id
    });

    id = Number(id) + 1
    return id;
}

// POST Confirmation HTML Page Template -------------------------------------
function geraConfirm(msg){
    return `
    <html>
        <head>
            <title>ToDo App</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body style="background-color: #e6e8e6">
            <div class="w3-container w3-teal">
                <h2>ToDo App</h2>
            </div>
            <div class="w3-container">
                <p>` + msg + ` <a href="/tasks">Home</a></p>
            </div>
            <div class="w3-container w3-teal" style="position: fixed; left: 0; bottom: 0; width: 100%; color: white; text-align: center;">
                <h4>TPC 6 - DAW2020</h4>
            </div>
        </body>
    </html>
        
            
    </body>
    </html>
    `
}


function geraPagPrincipal(tasks, types){

    var newid = generateId(tasks)

    let pagHTML = `
        <html>
            <head>
                <title>ToDo App</title>
                <meta charset="utf-8"/>
                <link rel="icon" href="favicon.png"/>
                <link rel="stylesheet" href="w3.css"/>
            </head>
            <body style="background-color: #e6e8e6">
                <div class="w3-container w3-teal">
                    <h2>ToDo App</h2>
                </div>
    `


    // Tabela e Formulário adicionar
    pagHTML += `
        <div style="width: 100%; background-color: #e6e8e6">
            <div class="w3-container w3-col m12 l7" style="text-align: center; background-color: #e6e8e6;">
                <h2>ToDo Tasks</h2>
                <table class="w3-table w3-border">
                    <tr>
                        <th>Date Created</th>
                        <th>Date Due</th>
                        <th>Owner</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Option</th>
                    </tr>
    `

    tasks.forEach(t => {
        if(t.state == "todo")
            pagHTML += `
                <tr>
                    <td>${t.dateCreated}</td>
                    <td>${t.dateDued}</td>
                    <td>${t.who}</td>
                    <td>${t.description}</td>
                    <td>${t.type}</td>
                    <td><a href="/tasks/${t.id}/edit"><button class="w3-button w3-teal w3-teal w3-round-large w3-small">Edit</button></a></td>
                </tr>
            `
    });

    pagHTML += `
                </table>
                <h2>Resolved Tasks</h2>
                <table class="w3-table w3-border">
                    <tr>
                        <th>Date Created</th>
                        <th>Date Due</th>
                        <th>Owner</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Option</th>
                    </tr>
    `

    tasks.forEach(t => {
        if(t.state == "done")
            pagHTML += `
                <tr>
                    <td>${t.dateCreated}</td>
                    <td>${t.dateDued}</td>
                    <td>${t.who}</td>
                    <td>${t.description}</td>
                    <td>${t.type}</td>
                    <td><a href="/tasks/${t.id}/delete"><button class="w3-button w3-teal w3-round-large w3-small">Delete</button></a></td>
                </tr>
            `
    });
                    
    pagHTML += `
                </table>
                <br>
            </div>
            <div class="w3-container w3-col m12 l5" style="text-align: left; background-color: #e6e8e6">
                <div class="w3-container" style="text-align: center;">
                    <h2>Add Task</h2>
                </div>
                <form class="w3-container" action="/tasks" method="POST">
                    <input type="hidden" name="id" value="${newid}">
                    <br>
                    <label class="w3-text-black"><b>Creation Date</b></label>
                    <input class="w3-input w3-border w3-light-grey" type="date" name="dateCreated">
                    <br>
                    <label class="w3-text-black"><b>Due Date</b></label>
                    <input class="w3-input w3-border w3-light-grey" type="date" name="dateDued">
                    <br>
                    <label class="w3-text-black"><b>Owner</b></label>
                    <input class="w3-input w3-border w3-light-grey" type="text" name="who">
                    <br>
                    <label class="w3-text-black"><b>Description</b></label>
                    <input class="w3-input w3-border w3-light-grey" type="text" name="description">
                    <br>
                    <label class="w3-text-black"><b>Type</b></label>
                    <select class="w3-select w3-border w3-light-grey" name="type">
    `

    types.forEach(t => {
        pagHTML += `
            <option value="${t.name}">${t.name}</option>
        `
    });

    pagHTML +=  `
                    </select> 
                    <br>
                    <br>
                    <input type="hidden" name="state" value="todo">
                    <input class="w3-btn w3-blue-grey" type="submit" value="Add"/>
                    <input class="w3-btn w3-blue-grey" type="reset" value="Reset"/> 
                </form>
            </div>
            <div class="w3-container w3-col m12 l12" style="height: 70px;"/>
        </div> 
    `

    pagHTML += `
            </table>
            <div class="w3-container w3-teal" style="position: fixed; left: 0; bottom: 0; width: 100%; color: white; text-align: center;">
                <h4>TPC 6 - DAW2020</h4>
            </div>
        </body>
        </html>
    `
    return pagHTML
}

function geraTaskEditForm(task, types){

    let pagHTML = `
        <html>
            <head>
                <title>ToDo App</title>
                <meta charset="utf-8"/>
                <link rel="icon" href="favicon.png"/>
                <link rel="stylesheet" href="w3.css"/>
            </head>
            <body style="background-color: #e6e8e6">
                <div class="w3-container w3-teal">
                    <h2>ToDo App</h2>
                </div>
    `


    // Tabela e Formulário adicionar
    pagHTML += `
        <div style="width: 100%; background-color: #e6e8e6">
            <div class="w3-container w3-col m12 l12" style="text-align: left; background-color: #e6e8e6">
                <div class="w3-container" style="text-align: center;">
                    <h2>Edit Task</h2>
                </div>
                <form class="w3-container" action="/tasks/edit" method="POST">
                    <input type="hidden" name="id" value="${task.id}">
                    <br>
                    <label class="w3-text-black"><b>Creation Date</b></label>
                    <input class="w3-input w3-border w3-light-grey" type="date" name="dateCreated" value="${task.dateCreated}">
                    <br>
                    <label class="w3-text-black"><b>Due Date</b></label>
                    <input class="w3-input w3-border w3-light-grey" type="date" name="dateDued" value="${task.dateDued}">
                    <br>
                    <label class="w3-text-black"><b>Owner</b></label>
                    <input class="w3-input w3-border w3-light-grey" type="text" name="who" value="${task.who}">
                    <br>
                    <label class="w3-text-black"><b>Description</b></label>
                    <input class="w3-input w3-border w3-light-grey" type="text" name="description" value="${task.description}">
                    <br>
                    <label class="w3-text-black"><b>Type</b></label>
                    <select class="w3-select w3-border w3-light-grey" name="type">
    `

    types.forEach(t => {
        if(task.type == t)
            pagHTML += `
                <option value="${t.name}" selected>${t.name}</option>
            `
        else
            pagHTML += `
                <option value="${t.name}">${t.name}</option>
            `
    });

    var todo = ""
    var done = ""

    if(task.state == "todo")
        todo = "checked"
    else done = "checked"

    pagHTML +=  `
                    </select> 
                    <br>
                    <label class="w3-text-black"><b>State</b></label>
                    <input class="w3-radio w3-border w3-light-grey" type="radio" name="state" value="todo" ${todo}>
                    <label>To Do</label>
                    <input class="w3-radio w3-border w3-light-grey" type="radio" name="state" value="done" ${done}>
                    <label>Done</label>
                    <br>
                    <br>
                    <input class="w3-btn w3-blue-grey" type="submit" value="Update"/>
                    <input class="w3-btn w3-blue-grey" type="reset" value="Reset"/> 
                </form>
            </div>
            <div class="w3-container w3-col m12 l12" style="height: 70px;"/>
        </div> 
    `

    pagHTML += `
            </table>
            <div class="w3-container w3-teal" style="position: fixed; left: 0; bottom: 0; width: 100%; color: white; text-align: center;">
                <h4>TPC 6 - DAW2020</h4>
            </div>
        </body>
        </html>
    `
    return pagHTML
}

// Criação do servidor

var galunoServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Tratamento do pedido
    if(static.recursoEstatico(req)){
        static.sirvoRecursoEstatico(req, res)
    } else {
        switch(req.method){
            case "GET": 
                if((req.url == "/") || (req.url == "/tasks")){
                    axios.get("http://localhost:3000/tasks")
                        .then(response => {
                            var tasks = response.data
                            axios.get("http://localhost:3000/types?_sort=name")
                            .then(response => {
                                var types = response.data
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(geraPagPrincipal(tasks,types))
                                res.end()
                            })
                            .catch(function(erro){
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>There was a problem fetching types...</p>")
                                res.end()
                            })
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>There was a problem fetching tasks...</p>")
                            res.end()
                        })
                    } else if(/\/tasks\/\d+\/edit/.test(req.url)){
                            var idTask = req.url.split("/")[2]
                            axios.get("http://localhost:3000/tasks/" + idTask)
                                .then( response => {
                                    let t = response.data
                                    axios.get("http://localhost:3000/types?_sort=name")
                                        .then(response => {
                                            var types = response.data
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write(geraTaskEditForm(t,types))
                                            res.end()
                                        })
                                        .catch(function(erro){
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write("<p>There was a problem fetching types...</p>")
                                            res.end()
                                        })
                                })
                                .catch(function(erro){
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>There was a problem fetching the task...")
                                    res.end()
                                })
                    } else if(/\/tasks\/\d+\/edit/.test(req.url)){
                            var idTask = req.url.split("/")[2]
                            axios.get("http://localhost:3000/tasks/" + idTask)
                                .then( response => {
                                    let t = response.data
                                    axios.get("http://localhost:3000/types?_sort=name")
                                        .then(response => {
                                            var types = response.data
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write(geraTaskEditForm(t,types))
                                            res.end()
                                        })
                                        .catch(function(erro){
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write("<p>There was a problem fetching types...</p>")
                                            res.end()
                                        })
                                })
                                .catch(function(erro){
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>There was a problem fetching the task...")
                                    res.end()
                                })
                    } else if(/\/tasks\/\d+\/delete/.test(req.url)){
                            var idTask = req.url.split("/")[2]
                            axios.delete("http://localhost:3000/tasks/" + idTask)
                                .then(resp => {
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write(geraConfirm("Task deleted with success!"))
                                    res.end()
                                })
                                .catch(function(erro){
                                    console.log(erro)
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>There was a problem deleting the task...")
                                    res.end()
                                })
                    }
                break
            case "POST":
                if(req.url == '/tasks'){
                    recuperaInfo(req, resultado => {
                        console.log('POST de task:' + JSON.stringify(resultado))
                        axios.post('http://localhost:3000/tasks', resultado)
                            .then(resp => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(geraConfirm("Task added with success!"))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write('<p>Erro no POST: ' + erro + '</p>')
                                res.write('<p><a href="/">Voltar</a></p>')
                                res.end()
                            })
                    })
                } else if(req.url == '/tasks/edit'){
                    recuperaInfo(req, resultado => {
                        console.log('PUT de task:' + JSON.stringify(resultado))
                        axios.put('http://localhost:3000/tasks/' + resultado.id, resultado)
                            .then(resp => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(geraConfirm("Task updated with success!"))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write('<p>Erro no PUT: ' + erro + '</p>')
                                res.write('<p><a href="/">Voltar</a></p>')
                                res.end()
                            })
                    })
                }
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " não suportado neste serviço.</p>")
                res.end()
        }
    }
})

galunoServer.listen(8888)
console.log('Servidor à escuta na porta 8888...')