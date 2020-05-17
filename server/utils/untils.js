


const removeAllSpaces = function(str) {
    str = String(str)
    return str.replace(/&nbsp;/g, "").replace(/ /g, "").replace(/\s/g, "")
}

module.exports = {
    removeAllSpaces
}