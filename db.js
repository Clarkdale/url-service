'use strict';

require('dotenv').config();
const { Pool } = require('pg');

// check whether this api is runing on production server or not
const postgrePool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
}); 

console.log(process.env.DATABASE_URL);

function getAllUrls() {
    return postgrePool.query('select * from URLs')
  .then(result => result.rows);
}

function getUrlId(url) {
    return postgrePool.query('select id from URLs where link=$1', [url])
  .then(result => result.rows);
}

function getIdUrl(id) {
    console.log(id);
    return postgrePool.query('select link from URLs where id=$1', [id])
  .then(result => result.rows);
}

function addUrl(url) {
    return postgrePool.query('insert into URLs(link) values ($1)', [url])
   .then(result => result.rows[0].id);
}

module.exports = { getAllUrls, getUrlId, getIdUrl, addUrl }