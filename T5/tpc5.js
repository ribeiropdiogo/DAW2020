var http = require('http');
var axios = require('axios');

function part1(title){
    var t = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>' + title + '</title>'
        + '<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">'
        + '<style> .footer {position: fixed;left: 0;bottom: 0;width: 100%;background-color: #4D7298;color: white;text-align: center;}</style>'
        + '</head>'
        + '<body style="Background-color: #fcfffc;">'
        + '<div class="w3-bar" style="background-color: #4D7298; color: white;">'
        + '<div class="w3-bar-item">Escola de Música</div></div>'
        + '<div class="w3-container">';
        return t;
}
function part2(){
    var t = '</div><div class="footer"><p>DAW 2020 - TPC5</p></div></body></html>';
    return t;
}


http.createServer(function (req,res) {
    console.log(req.method + ' ' + req.url);
    if(req.method == 'GET'){
        if(req.url == '/'){
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(part1("Escola de Música"))
            res.write('<div class="w3-container w3-center">')
            res.write('<h2>Escola de Música</h2>')
            res.write('<button class="w3-button w3-teal w3-round-large"><a href="/alunos">Lista de Alunos</a></button><br><br>')
            res.write('<button class="w3-button w3-teal w3-round-large"><a href="/cursos">Lista de Cursos</a></button><br><br>')
            res.write('<button class="w3-button w3-teal w3-round-large"><a href="/instrumentos">Lista de Instrumentos</a></button>')
            res.write('</div>')
            res.write(part2())
            res.end()
        } else if(req.url.match(/\/alunos(\&page\=\d\d?\d?)?$/)){
            var pagearray = req.url.split("=")
            page = 1
            if(pagearray.length > 1) page = pagearray[1]
            axios.get('http://localhost:3001/alunos?_limit=10&_page='+page)
                .then(function(resp) {
                    alunos = resp.data;
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(part1("Lista de Alunos"))
                    res.write('<h2>Lista de Alunos</h2>')
                    res.write('<ul class="w3-ul">')

                    alunos.forEach(a => {
                        res.write('<li><a href="/alunos/' + a.id + '">' + a.id + ' - ' + a.nome + '</a></li>')
                    });
                    res.write('</ul>')
                    if(Number(page) > 1)
                        res.write('<a href="/alunos&page='+(Number(page) - 1)+'"><button class="w3-button w3-teal w3-round-large">Página Anterior</button></a>')
                    res.write('<a href="/"><button class="w3-button w3-teal w3-round-large">Voltar</button></a>')
                    if(Number(page) < 37)
                        res.write('<a href="/alunos&page='+(Number(page) + 1)+'"><button class="w3-button w3-teal w3-round-large">Página Seguinte</button></a>')
                    res.write(part2())
                    res.end()
                })
                .catch(function(error) {
                    console.log('Erro na obtenção da lista de alunos: ' + error);
                });
        } else if(req.url.match(/\/alunos\/A\d\d\d\d\d?$/)){
            axios.get('http://localhost:3001'+req.url)
                .then(function(resp) {
                    aluno = resp.data;
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(part1(aluno.id))
                    res.write('<div class="w3-container w3-left">')
                    res.write("<h1><b>Número:</b> " + aluno.id + "</h1>")
                    res.write("<h3><b>Nome:</b> " + aluno.nome + "</h3>")
                    res.write("<h3><b>Data Nascimento:</b> " + aluno.dataNasc + "</h3>")
                    res.write("<h3><b>Curso:</b> " + aluno.curso + "</h3>")
                    res.write("<h3><b>Ano:</b> " + aluno.anoCurso + "</h3>")
                    res.write("<h3><b>Instrumento:</b> " + aluno.instrumento + "</h3>")
                    res.write('<a href="/alunos"><button class="w3-button w3-teal w3-round-large">Voltar</button></a>')
                    res.write('</div>')
                    res.write(part2())
                    res.end()
            })
            .catch(function(error) {
                console.log('Erro na obtenção do aluno: ' + error);
            });
        } else if(req.url.match(/\/cursos(\&page\=\d\d?\d?)?$/)){
            var pagearray = req.url.split("=")
            page = 1
            if(pagearray.length > 1) page = pagearray[1]
            axios.get('http://localhost:3001/cursos?_limit=10&_page='+page)
                .then(function(resp) {
                    alunos = resp.data;
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(part1("Lista de Cursos"))
                    res.write('<h2>Lista de Cursos</h2>')
                    res.write('<ul class="w3-ul">')

                    alunos.forEach(c => {
                        res.write('<li><a href="/cursos/' + c.id + '">' + c.id + ' - ' + c.designacao + '</a></li>')
                    });

                    res.write('</ul>')
                    if(Number(page) > 1)
                        res.write('<a href="/cursos&page='+(Number(page) - 1)+'"><button class="w3-button w3-teal w3-round-large">Página Anterior</button></a>')
                    res.write('<a href="/"><button class="w3-button w3-teal w3-round-large">Voltar</button></a>')
                    if(Number(page) < 5)
                        res.write('<a href="/cursos&page='+(Number(page) + 1)+'"><button class="w3-button w3-teal w3-round-large">Página Seguinte</button></a>')
                    res.write(part2())
                    res.end()
                })
                .catch(function(error) {
                    console.log('Erro na obtenção da lista de cursos: ' + error);
                });
        } else if(req.url.match(/\/cursos\/[A-Z][A-Z]?\d\d?$/)){
                axios.get('http://localhost:3001'+req.url)
                    .then(function(resp) {
                        curso = resp.data;
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(part1(curso.id))
                        res.write('<div class="w3-container w3-left">')
                        res.write("<h1><b>ID:</b> " + curso.id + "</h1>")
                        res.write("<h3><b>Designação:</b> " + curso.designacao + "</h3>")
                        res.write("<h3><b>Duração:</b> " + curso.duracao + "</h3>")
                        res.write("<h4><b>Instrumento:</b> " + curso.instrumento["id"] + " - " + curso.instrumento["#text"] + "</h4>")
                        res.write('<a href="/cursos"><button class="w3-button w3-teal w3-round-large">Voltar</button></a>')
                        res.write('</div>')
                        res.write(part2())
                        res.end()
                })
                .catch(function(error) {
                    console.log('Erro na obtenção do curso: ' + error);
                });
        } else if(req.url.match(/\/instrumentos(\&page\=\d\d?\d?)?$/)){
            var pagearray = req.url.split("=")
            page = 1
            if(pagearray.length > 1) page = pagearray[1]
            axios.get('http://localhost:3001/instrumentos?_limit=10&_page='+page)
                .then(function(resp) {
                    alunos = resp.data;
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(part1("Lista de Instrumentos"))
                    res.write('<h2>Lista de Instrumentos</h2>')
                    res.write('<ul class="w3-ul">')
                    alunos.forEach(i => {
                        res.write('<li><a href="/instrumentos/' + i.id + '">' + i.id + ' - ' + i["#text"] + '</li>')
                    });

                    res.write('</ul>')
                    if(Number(page) > 1)
                        res.write('<a href="/instrumentos&page='+(Number(page) - 1)+'"><button class="w3-button w3-teal w3-round-large">Página Anterior</button></a>')
                    res.write('<a href="/"><button class="w3-button w3-teal w3-round-large">Voltar</button></a>')
                    if(Number(page) < 3)
                        res.write('<a href="/instrumentos&page='+(Number(page) + 1)+'"><button class="w3-button w3-teal w3-round-large">Página Seguinte</button></a>')
                    res.write(part2())
                    res.end()
                })
                .catch(function(error) {
                    console.log('Erro na obtenção da lista de instrumentos: ' + error);
                });
        } else if(req.url.match(/\/instrumentos\/I\d\d?$/)){
            axios.get('http://localhost:3001'+req.url)
                    .then(function(resp) {
                        instrumento = resp.data;
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(part1(instrumento.id))
                        res.write('<div class="w3-container w3-left">')
                        res.write("<h1><b>ID:</b> " + instrumento.id + "</h1>")
                        res.write("<h3><b>Designação:</b> " + instrumento["#text"] + "</h3>")
                        res.write('<a href="/instrumentos"><button class="w3-button w3-teal w3-round-large">Voltar</button></a>')
                        res.write('</div>')
                        res.write(part2())
                        res.end()
                })
                .catch(function(error) {
                    console.log('Erro na obtenção do instrumento: ' + error);
                });
        } else {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
            res.end()
        }
    } else {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
        res.end()
    }
}).listen(4000);

console.log('Servidor à escuta na porta 4000...')