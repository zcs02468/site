const cheerio = require("cheerio");
const request = require("request");
const Quote = require('../../db').Quote;

const url = 'http://wufazhuce.com'


const getOneData = function () {
    request(url,function (err, res, body) {
        if( !err && res.statusCode == 200 ) {
            siteQuery(body)
        }else {
            console.error('err:'+err);
        }
    })
}

const siteQuery = async function (body) {
    $ = cheerio.load(body);
    let selectItem = $("#carousel-one .carousel-inner .item");
    let todayOne = selectItem[0];
    let quoteImgUrl = $(todayOne).find(".fp-one-imagen").attr("src");
    let type=$(todayOne).find(".fp-one-imagen-footer").text().replace(/(^\s*)|(\s*$)/g, "");
    let content= $(todayOne).find(".fp-one-cita").text().replace(/(^\s*)|(\s*$)/g, "");
    new Quote({ content, quoteImgUrl, type }).save()
    
}
module.exports = getOneData