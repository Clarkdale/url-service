const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')
const url = require('url');
const db = require('./db.js');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// create the server
const app = express();
const port = process.env.PORT || 4003;

app.use(cors());

app.get('/allUrls', (request, response) => {
    db.getAllUrls()
    .then(x => response.json(x))
    .catch(e => {console.trace(); response.status(500).send('The categories could not be retrieved.')});
});

app.get('/addUrl/:url', (request, response) => {
    let url = request.params.url;
    db.getUrlId(url)
        .then(x => {
            console.log(json(x));
        })
        //.catch(e => {console.trace(); response.status(500).send(e)});
    //db.addUrl(url)
      //  .then(x => response.json(x))
        //.catch(e => {console.trace(); response.status(500).send(e)});
});

app.get('/getUrl/:id', (request, response) => {
    let urlId = request.params.id;
    db.getIdUrl(urlId)
        .then(x => response.json(x))
        .catch(e => {console.trace(); response.status(500).send('The categories could not be retrieved.')});
});

// start the server
app.listen(port, () => console.log('Listening on port ' + port));