const Publication = require('../models/Publication')


exports.createArt = (artData) => Publication.create(artData);
exports.getAllArts = () => Publication.find();
exports.getOneArt = (artId) => Publication.findById(artId);