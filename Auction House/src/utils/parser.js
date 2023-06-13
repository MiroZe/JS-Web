


function parseError(error) {
if(error.name == 'ValidationError') {
return Object.values(error.errors).map(v=> v.message)
} else {
    return error.message.split('\n')
}
}


function generateOptions(category) {
    const  options = {
        estate: 'Real Estate',
        vehicles: 'Vehicles',
        furniture: 'Furniture',
        electronics: 'Electronics',
        other: 'Other'}


        const result = Object.keys(options).map((key) => ({
            title: options[key],
            value: key,
            selected: category === options[key]
        }));
        return result
}




module.exports = {
    parseError,
    generateOptions
   
}