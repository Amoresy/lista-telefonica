const cors = require("cors");
var express = require('express');
var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

var operadoras = [
    { nome: "Oi", codigo: "11", categoria: "Celular", preco: 1 },
    { nome: "Tim", codigo: "12", categoria: "Celular", preco: 3 },
    { nome: "Vivo", codigo: "13", categoria: "Celular", preco: 1 },
    { nome: "GVT", codigo: "14", categoria: "Fixo", preco: 1.5 },
    { nome: "Embratel", codigo: "15", categoria: "Fixo", preco: 2 },
];

var contatos = [
    { id: 1, nome: "sergio amoroso", telefone: "99999999", operadoras: operadoras[0], data: new Date() },
    { id: 2, nome: "ligia maria", telefone: "99999-9999", operadoras: operadoras[1], data: new Date() },
    { id: 3, nome: "deborah mayara", telefone: "(62) 99999-9999", operadoras: operadoras[2], data: new Date() },
    { id: 4, nome: "euza joaquina", telefone: "99999-9999", operadoras: operadoras[3], data: new Date() }
];

app.listen(process.env.PORT || 3412);

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/operadoras', function (req, res) {
    if (req.url === '/operadoras') res.write(JSON.stringify(operadoras));
    res.end();
});

app.get('/operadoras/:codigo', function (req, res) {
    res.write(JSON.stringify(operadoras[operadoras.findIndex(d => d.codigo == req.params.codigo)]));
    res.end();
});

app.get('/contatos', function (req, res) {
    if (req.url === '/contatos') {
        res.write(JSON.stringify(contatos));
    }
    res.end();
});

app.get('/contatos/:id', function (req, res) {
    res.write(JSON.stringify(contatos[contatos.findIndex(d => d.id == req.params.id)]));
    res.end();
});

app.post('/operadoras', function (req, res) {
    var contato = req.body;
    contatos.push(contato);
    res.end();
});

app.post('/contatos', function (req, res) {
    var contato = req.body;
    contatos.push(JSON.parse(JSON.stringify(contato)));
    res.end();
});

app.options('/contatos', function (req, res) {
    res.end();
});

app.delete('/contatos/:id', function (req, res) {
    contatos = contatos.filter(function (contato) {
        if (!(contato.id == req.params.id)) return contato
    });
    res.end();
});