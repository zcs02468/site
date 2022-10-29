const user = require('./user/user')
const visitors = require('./user/visitors')
const code = require('./code')
const quote = require('./quote')
// const book = require('./book')
const email = require('./email')
const blog = require('./blog')
module.exports = {
    user,
    code,
    quote,
    // book,
    email,
    blog,
    visitors
}
