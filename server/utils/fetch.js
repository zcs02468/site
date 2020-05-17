
const request = require("request");

function fetch(url) {
    return new Promise(function(resolve,reject) {
        request(url,function (err, res, body) {
            if( !err && res.statusCode == 200 ) {
                resolve(body);
            }else {
                reject(err);
            }
        })
    })
}


module.exports = fetch;