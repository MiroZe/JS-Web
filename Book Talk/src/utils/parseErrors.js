

exports.parseErrors = (error) => {
    if(error.name == 'Validation Error') {
        return Object.values(error.errors).map(e => e.message)
    } else {
        return error.message.split('\n')
    }
}