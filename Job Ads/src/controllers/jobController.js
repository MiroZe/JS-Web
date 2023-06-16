const jobController = require('express').Router();

const { hasUser } = require('../middlewares/guard');
const { createItem, createOpenPosition, getallOpenedPositions, getOneOpenedPosition, applyForJob, deletePosition, editPosition } = require('../services/jobService');
const { parseError } = require('../utils/parser');


jobController.get('/create', hasUser, (req,res) => {
    res.render('create')
})


jobController.post('/create', hasUser, async(req,res) => {

    const jobData = {
        headline:req.body.headline,
        location:req.body.location,
        companyName:req.body.companyName,
        companyDescription:req.body.companyDescription,
        author:req.user._id
    }

    try {
        if(Object.values(jobData).some( f=> f == '')) {
            throw new Error ('All fields are mandatory')
        }

        await createOpenPosition(jobData)
        res.redirect('/job/catalog')
        
    } catch (error) {
        
        res.render('create', {jobData, errors:parseError(error)} )
    }
})

jobController.get('/catalog', async (req,res) => {

    try {
        const allPositions = await getallOpenedPositions().lean()
        
        res.render('catalog', {allPositions})
    } catch (error) {
        res.render('catalog', {errors:parseError(error)})
    }
})


jobController.get('/:jobId/details', async (req,res) => {

    try {
        const onePosition = await getOneOpenedPosition(req.params.jobId).populate('author').populate('appliedUsers').lean()
        const isAuthor = req.user?._id == onePosition.author._id
        const isUserApplied = !(onePosition.appliedUsers.some( u => u._id == req.user?._id))
        const counter = onePosition.appliedUsers.length
        
      
        
        res.render('details', {onePosition, isAuthor,isUserApplied,counter})
    } catch (error) {
        res.render('details', {errors:parseError(error)})
    }
})

jobController.get('/:jobId/apply', hasUser, async (req,res)=> {

    try {
        await applyForJob(req.params.jobId, req.user._id)
        res.redirect(`/job/${req.params.jobId}/details`)
        
    } catch (error) {
        res.render('details', {errors:parseError(error)})
    }
})

jobController.get('/:jobId/delete', hasUser, async (req,res)=> {

    try {
        await deletePosition(req.params.jobId);
        res.redirect('/job/catalog')
        
    } catch (error) {
        res.render('details', {errors: parseError(error)})
    }
})

jobController.get('/:jobId/edit', hasUser, async (req,res)=> {

    try {
        const currentPosition = await getOneOpenedPosition(req.params.jobId).lean()
       
        res.render('edit', {currentPosition})
        
    } catch (error) {
        res.render('edit', {errors: parseError(error)})
    }
})

jobController.post('/:jobId/edit', hasUser, async (req, res)=> {

    
    const jobData = {
        headline:req.body.headline,
        location:req.body.location,
        companyName:req.body.companyName,
        companyDescription:req.body.companyDescription,
   
    }
    try {
        await editPosition(req.params.jobId, jobData)
        res.redirect(`/job/${req.params.jobId}/details`)
    } catch (error) {
        res.render('edit', {errors: parseError(error), currentPosition: jobData})
        
    }
})


module.exports = jobController