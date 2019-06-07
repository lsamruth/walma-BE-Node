const express = require('express');
const route = express();
const MySqlService = require('./mysqlService');
const config = require('./mysqlConfig');
const FilterQuery = require('./services/FilterQuery');

let mySqlService = new MySqlService(config);

const getTotalRecords = () => {
    let queryString = `SELECT * from products`;
    return mySqlService.query(queryString);
};


route.get('/walmartproducts/:pageNumber/:pageSize', (req, res) => {
    const { query } = req;
    const { pageNumber, pageSize } = req.params;
    let condition = FilterQuery(query);
    let queryString = `SELECT * from products WHERE ${condition} LIMIT ${pageNumber}, ${pageSize}`;

    getTotalRecords().then(records => {
        mySqlService.query(queryString)
            .then(result => {
                let response = {
                    pageNumber,
                    pageSize,
                    statusCode: 200,
                    totalProducts: records.length,
                    products: result
                };
                res.send(response);
            })
    })
});

route.get('/getProductDetails/:id', (req, res) => {
    const { id } = req.params;
    let query = `SELECT * from products WHERE productId='${id}'`;
    mySqlService.query(query)
        .then(result => {
            res.send(result[0]);
        })
});

module.exports = route;