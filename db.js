'use strict';

require('dotenv').config();
const { Pool } = require('pg');

// check whether this api is runing on production server or not


//postgresql://USER:PASSWORD@HOST:PORT/DATABASE
// postgresql://picture_dictionary_user:@localhost:5432/picture_dictionary
const postgreConnectionString =
 `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`;

console.log(postgreConnectionString);

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
    return postgrePool.query('select link from URLs where id=$1', [id])
  .then(result => result.rows);
}

function addUrl(url) {
    return postgrePool.query('insert into URLs(link) values ($1)', [url])
   .then(result => result.rows[0].id);
}

module.exports = { getAllUrls, getUrlId, getIdUrl, addUrl }