const catSvc = require("./category.service")
const AppError = require("../../exception/app.exception")
const { deleteFile } = require("../../config/helpers")
const ProSvc = require("../product/product.service")

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
                        { status: new RegExp(req.query.search, 'i') }
                    ]
                }

            }
            //pagination
            //1-100
            //per page 15=>1st page=>1-15
            //2nd page=>id=>16-30
            //search operation
            const count = await catSvc.getTotalCount(filter)
            const data = await catSvc.getDataByFilter({ offset, filter, limit })
            res.json({
                result: data,
                message: "brander Fetched",
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
            const payload = catSvc.transformCreateObject(req.body, req.authUser._id)
            const brand = await catSvc.createCat(payload)
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
            const banner = await catSvc.getDataById(req.params.id)
            if (!banner) {
                throw new AppError({ message: "brand Doesnot exist", code: 400 })
            }
            const payload = catSvc.transformUpdateObject(req.body, banner, req.authUser._id)
            const updatedData = await catSvc.updateData(banner._id, payload)
            if (!updatedData) {
                throw new AppError({ message: "brand cannot update", code: 400 })
            }
            if(updatedData.image!==payload.image){
                //delete from server old image
                deleteFile('./public/uploads/brand/'+updatedData.image)
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
            const brand=await catSvc.getDataById(req.params.id)
            if(!brand){
                throw new AppError({message:"brand does not exists",code:400})
            }
            const deletedBrand=await catSvc.deleteById(brand._id)
            if(deletedBrand.image){
                deleteFile('./public/uploads/cat'+deletedBrand.image)
            }
            res.json({
                result:"",
                message:"Deleted brand successfully",
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
            const brandList=await catSvc.getDataByFilter({
                offset:0,
                limit: (+req.query.limit || 5),
                filter:{
                    status:"active",
                    showInHome:true
                }

            })
            res.json({
                result:brandList,
                message:"Brand for homepage",
                meta:null
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
            const catDetail=await catSvc.getDataByFilter({
                offset:0,
                limit:1,
                filter:{
                    slug:slug,
                    status:"active"
                }
            })
            const filter=ProSvc.setFilters(req.query)
            filter.search={
                ...filter.search,
                categories:{$in:[catDetail[0].id]}
            }
            const totalCount=await ProSvc.getTotalCount(filter.search)
            const products=await ProSvc.getDataByFilter({
                offset:filter.offset,
                limit:filter.limit,
                filter:filter.search
            })
            res.json({
                result:{
                    category:catDetail[0],
                    product:products
                },
                message:"data by slug",
                meta:{
                    page:filter.page,
                    limit:filter.limit,
                    total:totalCount
                }
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