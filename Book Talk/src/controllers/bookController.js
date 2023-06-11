const { hasUser } = require('../middlewares/hasUser');
const { getAll, createBook, getOneBook, editBook } = require('../services/bookServise');
const { parseErrors } = require('../utils/parseErrors');

const bookController = require('express').Router();


bookController.get('/catalog', async(req, res)=> {
    try {
        const allBooks = await getAll().lean()
        res.render('books/catalog', {title: 'Catalog Page', allBooks})
    } catch (error) {
        
    }
});

bookController.get('/create', hasUser, (req,res)=> {
    res.render('books/create', {title: 'Create Page'})

})


bookController.post('/create', hasUser, async (req,res)=> {
    const bookData = req.body;
    bookData.creator = req.user._id
    try {
        if(Object.values(req.body).some(f => f == '')) {
            throw new Error('All fields are mandatory')
        }
        await createBook(bookData)
        res.redirect('/books/catalog')
    } catch (error) {
        res.render('books/create', {
            title: 'Create Review Page',
            errors: parseErrors(error)
        })
    }


})

bookController.get('/:bookId/details', async (req,res) => {

    const bookId = req.params.bookId

    try {
        const book = await getOneBook(bookId).lean()
       
        if(req.user?._id) {
            if(req.user._id == book.creator._id) {
                book.isCreator = true
            }
        }
            
        res.render('books/details', {title: 'Details Page', book})
        
    } catch (error) {
        

        res.render('books/details' , {title : 'Details Page', errors: parseErrors(error)})
        
    }
})

bookController.get('/:bookId/edit',async (req,res) => {

    try {
        const book = await getOneBook(req.params.bookId).lean();
        res.render('books/edit', {title: 'Edit Book Page', book})
        
    } catch (error) {
        res.render('books/edit', {title: 'Edit Book Page', errors: parseErrors(error)})
    }
    
})

bookController.post('/:bookId/edit',async (req,res) => {

    const bookData = req.body

    try {
        if(Object.values(req.body).some(f => f == '')) {
            throw new Error('All fields are mandatory')
        }
        
        await editBook(bookData, req.params.bookId);
        res.redirect(`/books/${req.params.bookId}/details`)
        
    } catch (error) {
        res.render('books/edit', {title: 'Edit Book Page', 
        errors: parseErrors(error), 
        book:bookData})
    }
    
})

module.exports = bookController