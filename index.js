var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');
var app = express();

//setup cors
app.use(cors());

//setup bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//update boat cards
app.post('/updateCards', async (req, res) => {
    try {
        var str_json = JSON.stringify(req.body);
        console.log(req.body);
        fs.writeFile('cards.json', str_json, 'utf8', function(){
            res.send(req.body);
            console.log('cards saved successful');
        });
    } catch (err) {
        res.status(500).send('data fetch failed');
    }
});

//get and return boat cards 
app.get('/cards', async (req, res) => {
    try {
        fs.readFile('cards.json', (err, data) => {
            if (err) {
                res.status(200).send('cards fetch failed');
            } else {
                res.send(JSON.parse(data));
                console.log('cards fetched')
            }
        });
    } catch (err) {
        res.status(500).send('cards fetch failed');
    }
    
});

//text for get connection
app.get('/', async (req, res) => {
    res.send('fishfry server')
});

app.listen(8080);
console.log('Server running at http://127.0.0.1:8080/');