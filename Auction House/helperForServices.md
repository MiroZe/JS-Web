TODO !!! Change MODEL NAME and Item name 

exports.getAll = () => MODEL.find({})

exports.createItem = (ItemData) => {

  return  MODEL.create(bookData)

}

exports.getOneITEM = (ITEMid) => {
    return MODEL.findById(ITEMid)
}

exports.editITEM = (ITEMfata, ITEMId, ) => {
    

    return Book.findByIdAndUpdate(ITEMId,ITEMdata, {runValidators:true})
}

exports.deleteBook = (ITEMId, userId) => Book.findByIdAndDelete(ITEMId);
exports.wishBook = (ITEMId,userId) => Book.findByIdAndUpdate(bookId, {$push :{wishList:userId}})

exports.getMyWishedBooks = (userId) => {
  return Book.find({wishList : userId})
}



================================
DETAILS page helper


bookController.get('/:bookId/details', async (req,res) => {

    const bookId = req.params.bookId

    try {
        const book = await getOneBook(bookId).lean();
        console.log(book.wishList);
       
        if(req.user?._id) {
           
            if(req.user._id == book.creator._id) {
                book.isCreator = true
                
            } else if(book.wishList.some(f => f._id == req.user._id)){
                book.isAlreadyWished = true
             }
        }
            
        res.render('books/details', {title: 'Details Page', book})
        
    } catch (error) {
        

        res.render('books/details' , {title : 'Details Page', errors: parseErrors(error)})
        
    }
})


imageUrl: {type:String, 
            validate: {validator:(value)=> imagePattern.test(value),message: 'Invalid Url'}},





            const auctionSchema = new Schema ({
    title : {type: String, required:true, minLength: [4, 'Title should be 4 characters ate least']},
    description : {type: String,required:true,  minLength: [200, 'Description should be 200 characters ate least']},
    category : {type: String,required:true, enum: ['Vehicles','Real Estate','Electronics','Furniture', 'Other']},
    imageUrl : {type: String,required:true,},
    Price : {type: Number,required:true, min: [0, 'Price should be positive number']},
    author : {type: Types.ObjectId, ref: 'User', required:true},
    bidder: {type:[Types.ObjectId], ref:'User', default:[] }
})




async function searchCourse(query) {

    
        const results =  await Course.find({title : { $regex: new RegExp(query, 'i') }}).lean()
        return results

  
}


function searchGame(nameQuery, gamePlatform) {

    
    return Game.find()
    .where({name : { $regex: new RegExp(nameQuery, 'i') }})
    .where({platform: { $regex: new RegExp(gamePlatform, 'i') }})


}
