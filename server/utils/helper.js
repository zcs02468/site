class Resolve {
    success(msg = 'success', code = 200, data = '') {
        return {
            msg,
            code,
            data
        }
    }

    error( msg = 'success', code = 200,  data = '') {
        return {
            code,
            msg,
            data
        }
    }
}

module.exports = {
    Resolve
}