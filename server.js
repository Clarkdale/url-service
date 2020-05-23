const express = require('express');
var cors = require('cors');
const db = require('./db.js');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// create the server
const app = express();
const port = process.env.PORT || 4003;

app.use(cors());

var map = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

app.get('/r/:urlId', (request, response) => {
    let curr;
    let init = request.params.urlId;
    let result = 0;

    for (let i = 0, j = init.length - 1; i < init.length && j >= 0; i++, j--) {
        curr = map.indexOf(init[i]);
        result += (curr * Math.pow(61, j));
    }
    console.log(result);
    db.getIdUrl(request.params.urlId)
        .then(x => {
            response.redirect(x);
        })
        .catch(e => {console.trace(); response.status(500).send('Could not find the designated link')});
});

app.get('/allUrls', (request, response) => {
    db.getAllUrls()
    .then(x => response.json(x))
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