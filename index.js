var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');
var app = express();

const corsOptions = {
    origin: 'http://localhost:3000', //http://127.0.0.1:8080/updateCards
}
const configuredCors = cors(corsOptions);
app.options('*', configuredCors);
/*
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});*/

var testData = {
    lanes: [
      {
        id: 'lane1',
        title: 'Docked',
        label: '2/2',
        cards: [
          {id: '1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', draggable: false},
          {id: '2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}},
          {id: '3', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}}
        ]
      },
      {
        id: 'lane2',
        title: 'Outbound to Sea',
        label: '0/0',
        cards: []
      },
      {
        id: 'lane3',
        title: 'Inbound to Harbor',
        label: '0/0',
        cards: []
      },
      {
        id: 'lane4',
        title: 'Maintenance',
        label: '0/0',
        cards: []
      }
    ]
};

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.post('/updateCards', configuredCors, async (req, res) => {
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

app.get('/cards', configuredCors, async (req, res) => {
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

app.get('/', configuredCors, async (req, res) => {
    res.send('fishfry server')
});

app.listen(8080);
console.log('Server running at http://127.0.0.1:8080/');