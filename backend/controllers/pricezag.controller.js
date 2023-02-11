const axios = require('axios');
const path = require('path');
const moment = require('moment');

const fetchData = async() => {
    const token = process.env.PZ_TOKEN
    const api = `https://pricezag.com/api/v2/${token}/getproducts.json?cur=EUR&screenshots=1`
    const results = await axios.get(api);
    return results.data;
}

//parsing and flattening data from PriceZag API 
const parseData = async (data) => {
    //removing the two first lines of the data batch received from PriceZag
    let codes = Object.keys(data);
    codes.splice(0, 2);

    let results = [];

    for (let code of codes) {
        let competitors = Object.keys(data[code].competitors);
        for (let competitor of competitors) {
            let offer = {
                offerId: '',
                date: moment().format().split('T')[0],
                url: data[code].competitors[competitor].url,
                ean: code,
                name: data[code].name,
                retailer: new URL(data[code].competitors[competitor].url).hostname.replace('www.', ''),
                availability: data[code].competitors[competitor].stock === 0 ?
                    false : true,
                priceCurrent: data[code].competitors[competitor].reliable === 'yes' ?
                    data[code].competitors[competitor].amountmycur : 0,
                priceMap: data[code].amountmycur,
                screenshot: data[code].competitors[competitor].screenshot ?
                    path.basename(data[code].competitors[competitor].screenshot) : '',
            }
            offer.offerId = offer.date + '_' + offer.ean + '_' + offer.retailer;
            results.push(offer);
        }
    }
    return results;
}

module.exports = {
    fetchData,
    parseData,
}