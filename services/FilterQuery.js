
const getRangeQuery = (key, min, max) => {
    let queryStr = "";
    if (min && max) {
        queryStr = queryStr + ' and ' + key + ' BETWEEN ' + `${min} and ${max}`;
    }
    if (min || max) {
        if (min) {
            queryStr = queryStr + ' and ' + key + ' >= ' + `${min}`;
        }
        if (max) {
            queryStr = queryStr + ' and ' + key + ' <= ' + `${max}`;
        }

    }
    return queryStr;
}


const FilterQuery = (params) => {

    const { search, inStock, minPrice, maxPrice, minReviewRating, maxReviewRating, minReviewCount, maxReviewCount } = params;

    let queryObject = {
        productName: search,
        inStock: inStock,
        price: { minPrice: minPrice, maxPrice: maxPrice },
        reviewRating: { minReviewRating: minReviewRating, maxReviewRating: maxReviewRating },
        reviewCount: { minReviewCount: minReviewCount, maxReviewCount: maxReviewCount }
    }


    let condition = '1=1 ';
    Object.keys(queryObject).forEach(function (key) {
        if (queryObject[key]) {

            if (typeof queryObject[key] === 'string') {
                if (key == 'productName') {
                    condition = condition + ' and ' + key + ' like ' + `'%${queryObject[key]}%'`;
                } else {
                    condition = condition + ' and ' + key + ' = ' + `'${queryObject[key]}'`;
                }
            }

            if (key === 'price') {
                condition = condition + getRangeQuery(key, minPrice, maxPrice);
            }

            if (key === 'reviewRating') {
                condition = condition + getRangeQuery(key, minReviewRating, maxReviewRating);
            }

            if (key === 'reviewCount') {
                condition = condition + getRangeQuery(key, minReviewCount, maxReviewCount);
            }
        }
    })
    return condition;
}
module.exports = FilterQuery;