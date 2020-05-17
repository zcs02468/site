const cheerio = require("cheerio");
const fetch = require('../../utils/fetch')
const {removeAllSpaces} = require('../../utils/untils')
const biquge = require('./biquge/index')
const b5200 = require('./b5200/index')
const request = require("request");
const superagent = require('./superagent')

const urlList = {
    biquge: {
        baseUrl: function() {
            return `http://www.biquge.com.cn`
        },
        search: function ( bookName ) {
            return `http://www.biquge.com.cn/search.php?q=${ encodeURIComponent(bookName) }`
        },
        bookDetail: function (bookUrl) {
            return `http://www.biquge.com.cn${ bookUrl }`
        },
    },
    b5200: {
        baseUrl: function() {
            return `http://www.b5200.net`
        },
        search: function ( bookName ) {
            return `http://www.b5200.net/modules/article/search.php?searchkey=${ encodeURIComponent(bookName) }`
        },
        bookDetail: function (bookUrl) {
            return `http://www.b5200.net${ bookUrl }`
        },
    }
}

const searchBook = async function (name) {
    try {
        let body = await fetch(urlList.biquge.search(name));
        return biquge.parsingSearchResults(body)
    } catch (error) {
        console.error( error);
        return  error
    }
}

const getBookDetail = async function(url) {
    const body = await fetch(urlList.biquge.bookDetail(url));
    $ = cheerio.load(body);
    let info = $('#info p');
    let authorDom  = info[0];
    let typeDom = info[1];
    let timeDom = info[2];
    let newSectionDom = info[3];
    let name = $('h1').text();
    let author = removeAllSpaces($(authorDom).text());
    let imgUrl = $('#fmimg img').attr('src');
    let describe = $('#intro').text();
    let type = $(typeDom).text().split(',')[0];
    let lastUpdateTime = $(timeDom).text();
    let newSection = $(newSectionDom).text();
    let list = []
    $('#list dd').each(function (i, elem) {
        let aDom = $(elem).find('a')
        list.push({
            title: aDom.text(),
            bookUrl: aDom.attr('href')
        })
    })
    return {
        name: name,
        author: author,
        imgUrl: imgUrl,
        type: type,
        describe: describe,
        lastUpdateTime: lastUpdateTime,
        newSection: newSection,
        list: list
    }
    
}


const getContent = async function(url) {
    const body = await fetch(urlList.biquge.bookDetail(url));
    $ = cheerio.load(body,{decodeEntities: false});
    let title = $('h1').text();
    let content = $('#content').html();
    return {
        title: title,
        content: content
    }
}


module.exports = {
    searchBook,
    getBookDetail,
    getContent
}