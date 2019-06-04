const express = require('express');
const route = express();
const conn = require('./mysql');
const FilterQuery = require('./services/FilterQuery');

route.get('/walmartproducts', (req, res) => {
    const { query } = req;
    let condition = FilterQuery(query);
    let queryString = `SELECT * from products WHERE ${condition}`;
    conn.query(queryString, (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    });
});

route.get('/getProductDetails/:id', (req, res) => {
    const { id } = req.params;
    conn.query(`SELECT * from products WHERE productId='${id}'`, (err, result, fields) => {
        if (err) throw err;
        res.send(result[0]);
    });
});

module.exports = route;