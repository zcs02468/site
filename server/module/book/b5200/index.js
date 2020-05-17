const cheerio = require("cheerio");
const {removeAllSpaces} = require('../../../utils/untils')

const parsingSearchResults = function (body) {
    console.log('1111111');
    $ = cheerio.load(body);
    let arr = [];
    
    $('tbody tr').each(function (i, elem) {
        $elem = $(elem);
        if( i > 0 ) {
            // let bookImg = $elem.find('img').attr('src')
            // let name = $elem.find('.result-game-item-title-link').attr('title');
            // let href = $elem.find('.result-game-item-title-link').attr('href');
            // let info = $elem.find('.result-game-item-info span').text();
            // let author = info.split('作者：')[1].split('类型：')[0];
            // let typeDom = $elem.find('.result-game-item-info-tag')[1];
            // let describe = $elem.find('.result-game-item-desc').text();
            let tds = $elem.find('td');
            let nameDom = tds[0]
            let name = nameDom.text()
            // console.log( '222222222', name );
            
            // arr.push({
            //     type:'biquge',
            //     name: name,
            //     bookImg: bookImg,
            //     bookUrl: href,
            //     author: author,
            //     type: removeAllSpaces($(typeDom).text()),
            //     describe: describe
            // })
        }
    })
    // $('.result-list .result-item').each(function(i, elem) {
    //     $elem = $(elem);
    //     let bookImg = $elem.find('img').attr('src')
    //     let name = $elem.find('.result-game-item-title-link').attr('title');
    //     let href = $elem.find('.result-game-item-title-link').attr('href');
    //     let info = $elem.find('.result-game-item-info span').text();
    //     let author = info.split('作者：')[1].split('类型：')[0];
    //     let typeDom = $elem.find('.result-game-item-info-tag')[1];
    //     let describe = $elem.find('.result-game-item-desc').text();
    //     arr.push({
    //         type:'biquge',
    //         name: name,
    //         bookImg: bookImg,
    //         bookUrl: href,
    //         author: author,
    //         type: removeAllSpaces($(typeDom).text()),
    //         describe: describe
    //     })
    // });
    return arr;
}

const parsingBookDetail = function(body) {
    $ = cheerio.load(body);
    let info = $('#info p')
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


const parsingContent = async function(body) {
    $ = $(body);
    let title = $('h1').text();
    let content = $('#content').text();
    return {
        title: title,
        content: content
    }
}

module.exports = {
    parsingSearchResults,
    parsingBookDetail,
    parsingContent
}