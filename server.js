const express = require('express');
var cors = require('cors');
const db = require('./db.js');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// create the server
const app = express();
const port = process.env.PORT || 4003;

app.use(cors());

app.get('/:urlId', (request, response) => {
    db.getIdUrl(request.params.urlId)
        .then(x => {
            response.redirect(x);
        });
});

app.get('/allUrls', (request, response) => {
    db.getAllUrls()
    .then(x => response.json(x))
    .catch(e => {console.trace(); response.status(500).send('The categories could not be retrieved.')});
});

app.get('/addUrl/:url(*)', (request, response) => {
    let url = request.params.url;
    db.addUrl(url)
        .then(x => {
            db.getUrlId(url)
                .then(y => response.json(y));
        })
        .catch(e => {console.trace(); response.status(500).send(e)});
});

app.get('/getUrl/:id', (request, response) => {
    let urlId = request.params.id;
    getUrl(urlId);
});

function getUrl(urlId) {
    db.getIdUrl(urlId)
        .then(x => response.json(x))
        .catch(e => {console.trace(); response.status(500).send('The categories could not be retrieved.')});
}

// start the server
app.listen(port, () => console.log('Listening on port ' + port));