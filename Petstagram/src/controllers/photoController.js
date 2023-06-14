const { hasUser } = require('../middlewares/guard');
const { getAll, createPhoto, getOnePhoto, postComment, updatePhoto ,deletePhoto} = require('../services/photoService');
const { parseError } = require('../utils/parser');

const photoController = require('express').Router();




photoController.get('/catalog' , async (req,res)=> {

    try {
        const allPhotos = await getAll().populate('owner').lean();

        res.render('catalog', {allPhotos})

    } catch (error) {
        res.render('catalog', {errors:parseError(error)})
    }


})

photoController.get('/create',hasUser, (req,res) => {
    res.render('create')
})

photoController.post('/create', hasUser, async (req,res) => {

    const photoData = {
        name: req.body.name,
        age: Number(req.body.age),
        description: req.body.description,
        location: req.body.location,
        image: req.body.image
    }
   try {


    if(Object.values(req.body).some(f => f == '')) {
        throw new Error('All fields are required')
    }

    photoData.owner = req.user._id;

    await createPhoto(photoData)
    res.redirect('/photos/catalog')


     
   } catch (error) {
    res.render('create', {errors: parseError(error), photoData})
   }
})


photoController.get('/:photoId/details', async(req,res)=> {
    
    const photo = await getOnePhoto(req.params.photoId).populate('owner').populate('commentList.userId').lean()
    
    
    try {

        if(req.user) {
            if(req.user._id == photo.owner._id) {
                photo.isOwner = true
            }
        }
        res.render('details', {photo})
    } catch (error) {
        
    }
})

photoController.post('/:photoId/details', hasUser, async(req,res) => {

    const userComment = req.body.comment;
    const userId = req.user._id;
    const photoId = req.params.photoId

    try {
       const result = await postComment(photoId,userComment,userId)
       res.redirect(`/photos/${photoId}/details`)
        
    } catch (error) {
        res.render('details', {errors: parseError(error)})
    }

})

photoController.get('/:photoId/edit', hasUser, async (req,res)=> {

    try {
        
        const photo = await getOnePhoto(req.params.photoId).lean()
        if(req.user._id != photo.owner._id) {
            res.redirect('auth/login')
        }

        res.render('edit', {photo})
    } catch (error) {
        res.render('edit', {errors: parseError(error)})
    }
})

photoController.post('/:photoId/edit', hasUser, async (req,res)=> {

    const {name, age,description,location,image} = req.body

    try {
        if(Object.values(req.body).some(f=> f == '')) {
            throw new Error( 'All fields are mandatory')
        }
        
        await updatePhoto(req.params.photoId, {name, age,description,location,image})
        
        res.redirect(`/photos/${req.params.photoId}/details`)

    } catch (error) {
        console.log(error);
        res.render('edit', {photo: req.body,errors: parseError(error)})
    }
})

photoController.get('/:photoId/delete', hasUser, async (req,res)=> {
    try {
        await deletePhoto(req.params.photoId)
        res.redirect('/photos/catalog')
        
    } catch (error) {
        res.redirect(`/photos/${req.params.photoId}/details`)

    }
})

module.exports = photoController