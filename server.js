const express = require('express');
var cors = require('cors');
const db = require('./db.js');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// create the server
const app = express();
const port = process.env.PORT || 4003;

const map = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

app.use(cors());

app.get('/allUrls', (request, response) => {
    db.getAllUrls()
    .then(x => {
        let vals = [];
        let out = "";
        while (x > 0) {
            vals.push(x % 61);
            x = Math.floor(x / 61);
        }
        vals.reverse();
                            
        for (let i = 0; i < vals.length; i++) {
            out += map[vals[i]];
        }
        response.json(x)
    })
    .catch(e => {console.trace(); response.status(500).send('The databse data could not be retrieved.')});
});

app.get('/addUrl/:url(*)', (request, response) => {
    let url = request.params.url;
    db.addUrl(url)
        .then(x => {
            db.getUrlId(url)
                .then(y => response.json(y));
        })
        .catch(e => {console.trace(); response.status(500).send('The url could not be added')});
});

app.get('/getUrl/:id', (request, response) => {
    let urlId = request.params.id;
    db.getIdUrl(urlId)
        .then(x => response.json(x))
        .catch(e => {console.trace(); response.status(500).send('Could not find the designated URL')});
});

// start the server
app.listen(port, () => console.log('Listening on port ' + port));