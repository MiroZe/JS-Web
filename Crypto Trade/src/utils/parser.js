function parseError(error) {
if(error.name == 'ValidationError') {
return Object.values(error.errors).map(v=> v.message)
} else {
    return error.message.split('\n')
}
}


function generateOptions(paymentMethod) {
    const  options = {
        "crypto-wallet": 'Crypto Wallet',
        "credit-card": 'Credit Card',
        "debit-card": 'Debit Card',
        "paypal": 'PayPal',
        }


        const generated = Object.keys(options).map((key) => ({
            title: options[key],
            value: key,
            selected: paymentMethod === key
        }));
        return generated
}



module.exports = {
    parseError,
    generateOptions
}