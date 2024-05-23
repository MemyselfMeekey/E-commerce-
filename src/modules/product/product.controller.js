const catSvc = require("./product.service")
const AppError = require("../../exception/app.exception")
const { deleteFile } = require("../../config/helpers")
const ProSvc = require("./product.service")

class CategoryController {
    index = async (req, res, next) => {
        try {
            //authv1/banner?page=1&limit=15
            const page = +req.query.page || 1
            const limit = +req.query.limit || 15
            if (page <= 0 || limit <= 0) {
                throw new AppError({ message: "Page numebr should begin frm 1", code: 400 })
            }
            const offset = (page - 1) * limit
            let filter = {}
            //authv1/banner?page=1&limit=15&seach=banner
            if (req.query.search) {
                filter = {
                    $or: [
                        { name: new RegExp(req.query.search, 'i') },
                        { description: new RegExp(req.query.search, 'i') },
                        { price: new RegExp(req.query.search, 'i') },
                        { status: new RegExp(req.query.search, 'i') }
                    ]
                }

            }
            if(req.authUser.role==='seller'){
                filter={
                    ...filter,
                    seller:req.authUser._id
                }
            }
            //pagination
            //1-100
            //per page 15=>1st page=>1-15
            //2nd page=>id=>16-30
            //search operation
            const count = await ProSvc.getTotalCount(filter)
            const data = await ProSvc.getDataByFilter({ offset, filter, limit })
            res.json({
                result: data,
                message: "Producter Fetched",
                meta: {
                    page: page,
                    limit: limit,
                    count: count
                }
            })
        }
        catch (exception) {
            next(exception)
        }
    }
    create = async (req, res, next) => {
        try {
            const payload = ProSvc.transformCreateObject(req.body, req.authUser._id)
           
            const brand = await ProSvc.createPro(payload)
            res.json({
                result:{
                    payload:payload,
                    brand:brand
                },
                message:"Prooduct is fetched",
                meta:null
            })
        }
        catch (exception) {
            console.log(exception)
            next(exception)
        }

    }
    view = async (req, res, next) => {
        try {
            const id = req.params.id
            if (!id) {
                throw new AppError({ message: "Id is requiredd", code: "400" })
            }
            const detail = await catSvc.getDataById(id)
            if (!detail) {
                throw new AppError({ message: "brand doesnot exitst", code: 400 })
            }
            res.json({
                result: detail,
                message: "brand Detail Fecthed",
                meta: null
            })
        }
        catch (exception) {
    
            next(exception)
        }
    }
    update = async (req, res, next) => {
        try {
            const product = await ProSvc.getDataById(req.params.id)
            if (!product) {
                throw new AppError({ message: "product Doesnot exist", code: 400 })
            }
            const payload = await ProSvc.transformUpdateObject(req.body, product, req.authUser._id)
            const updatedData = await ProSvc.updateData(product._id, payload)
            if (!updatedData) {
                throw new AppError({ message: "product cannot update", code: 400 })
            }
            if(updatedData.image!==payload.image){
                //delete from server old image
                deleteFile('./public/uploads/product/'+updatedData.image)
            }
            res.json({
                result: updatedData,
                message: "brand Updated Successfully",
                meta: null
            })
        }
        catch (exception) {
            console.log(exception)
            next(exception)
        }
    }
    delete = async(req, res, next) => {
        try{
            const product=await ProSvc.getDataById(req.params.id)
            if(!product){
                throw new AppError({message:"product does not exists",code:400})
            }
            const deletedProduct=await ProSvc.deleteById(product._id)
            if(deletedProduct.image.length){
                
                deleteFile('./public/uploads/product'+deletedProduct.image)
            }
            res.json({
                result:"",
                message:"Deleted product successfully",
                meta:null
            })
        }
        catch(exception){
            console.log(exception)
            next(exception) 
        }

    }
    listforhome = async(req, res, next) => {
        try{
            //authv1/banner?page=1&limit=15
            const page = +req.query.page || 1
            const limit = +req.query.limit || 20
            if (page <= 0 || limit <= 0) {
                throw new AppError({ message: "Page numebr should begin frm 1", code: 400 })
            }
            const offset = (page - 1) * limit
            let filter = {
                status:'active',
                showInHome:true
            }
            //authv1/banner?page=1&limit=15&seach=banner
            if (req.query.search) {
                filter = {
                    ...filter,
                    $or: [
                        { name: new RegExp(req.query.search, 'i') },
                        { description: new RegExp(req.query.search, 'i') },
                        { price: new RegExp(req.query.search, 'i') },
                        { status: new RegExp(req.query.search, 'i') }
                    ]
                }

            }
           
                filter={
                    ...filter
                }
            
            //pagination
            //1-100
            //per page 15=>1st page=>1-15
            //2nd page=>id=>16-30
            //search operation
            const count = await ProSvc.getTotalCount(filter)
            const data = await ProSvc.getDataByFilter({offset,filter,limit })
            res.json({
                result: data,
                message: "Producter Fetched",
                meta: {
                    page: page,
                    limit: limit,
                    count: count
                }
            })
        }
        catch(exception){
            console.log(exception)
            next(exception) 
        }
    }
    dataBySlug=async(req,res,next)=>{
        try{
            const slug=req.params.slug
            console.log({
                
                slug:slug,
                status:"active"
            
        })
            const proDetail=await ProSvc.getSingleDataByFilter({
                
                    slug:slug,
                    status:"active"
                
            })
            const realtedProduct=await ProSvc.getDataByFilter({
                offset:0,
                limit:5,
                filter:{
                    slug:{$ne:slug},//not eqauls to mathi ko slug
                    $or:[
                {categories:proDetail.categories},
                {brand:proDetail.brand}
                ]}
            })
            res.json({
                result:{
                    Product:proDetail,
                    realtedProduct:realtedProduct
                },
                message:"data by slug",
              meta:null
            })
        }
        catch(exception){
            console.log(exception)
            next(exception)
        }
    }
}
let catCtrol = new CategoryController()//makes a function
module.exports = catCtrol