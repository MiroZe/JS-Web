const Crypto = require('../models/Crypto')


exports.createCrypto = (data) => Crypto.create(data);
exports.getAllCrypto = () => Crypto.find({});
exports.getOneCrypto = (id) => Crypto.findById(id);
exports.buyCrypto = (cryptoId,userId) => Crypto.findByIdAndUpdate(cryptoId, {$push: {buyers: userId}})
exports.deleteCrypto = (id) => Crypto.findByIdAndDelete(id)
