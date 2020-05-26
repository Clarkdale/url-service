const express = require('express');
var cors = require('cors');
const db = require('./db.js');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// create the server
const app = express();
const port = process.env.PORT || 4003;

const base61Map = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

app.use(cors());

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
                .then(y => {
                    response.json(convertBase61(y));
                });
        })
        .catch(e => {console.trace(); response.status(500).send('The url could not be added')});
});

app.get('/getUrl/:id', (request, response) => {
    let urlId = request.params.id;
    db.getIdUrl(urlId)
        .then(x => response.json(x))
        .catch(e => {console.trace(); response.status(500).send('Could not find the designated URL')});
});

function convertBase61(base10Number) {
    let base61Buffer = [];
    let retVal = "";
    while (base10Number > 0) {
        base61Buffer.push(base10Number % 61);
        base10Number = Math.floor(base10Number / 61);
    }
    base61Buffer.reverse();
                                    
    for (let i = 0; i < base61Buffer.length; i++) {
        retVal += base61Map[base61Buffer[i]];
    }
    return retVal;
}

// start the server
app.listen(port, () => console.log('Listening on port ' + port));