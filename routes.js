const express = require('express');
const route = express();
const conn = require('./mysql');
const FilterQuery = require('./services/FilterQuery');

const getTotalRecords = () => {
    let queryString = `SELECT * from products`;
    return new Promise((resolve, reject) => {
        conn.query(queryString, (err, result) => {
            if (err) throw err;
            resolve(result.length);
        });
    })
};


route.get('/walmartproducts/:pageNumber/:pageSize', (req, res) => {
    const { query } = req;
    const { pageNumber, pageSize } = req.params;
    let condition = FilterQuery(query);
    let queryString = `SELECT * from products WHERE ${condition} LIMIT ${pageNumber}, ${pageSize}`;
    let response = {
        pageNumber,
        pageSize,
        statusCode: 200
    };

    getTotalRecords().then(count => {
        conn.query(queryString, (err, result, fields) => {
            if (err) throw err;
            response.totalProducts = count;
            response.products = result;
            res.send(response);
        });
    })

});

route.get('/getProductDetails/:id', (req, res) => {
    const { id } = req.params;
    conn.query(`SELECT * from products WHERE productId='${id}'`, (err, result, fields) => {
        if (err) throw err;
        res.send(result[0]);
    });
});

module.exports = route;