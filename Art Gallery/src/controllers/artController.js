const { hasUser } = require('../middlewares/guard');
const { createArt, getOneArt } = require('../services/artService');
const { parseError } = require('../utils/parser');

const artController = require('express').Router();



artController.get('/create', hasUser, (req, res) => {

res.render('create')

})



artController.post('/create', hasUser, async(req, res) => {

    const artData = {
        title:req.body.title,
        technique:req.body.technique,
        picture:req.body.picture,
        certificate:req.body.certificate,
        author:req.body.author,
        author: req.user._id
    }

    try {

        if(Object.values(artData).some(f=> f = '')){
            throw new Error( ' All fields are mandatory')
        }
        
        await createArt(artData)
        res.redirect('/art/catalog')

    } catch (error) {
        res.render('create', {errors: parseError(error), artData})
    }
    
    })

    artController.get('/:artId/details', async (req,res)=> {

        try {

            const art = await getOneArt(req.params.artId).populate('author').lean()
           
         
            res.render('details', {art})
            
        } catch (error) {
            
            res.render('details',{errors: parseError(error)})
        }
    })

module.exports = artController;