const brandSvc = require("./brand.service")
const AppError = require("../../exception/app.exception")
const { deleteFile } = require("../../config/helpers")
const ProSvc=require("../product/product.service")
class BrandController {
    index = async (req, res, next) => {
        try {
            //authv1/banner?page=1&limit=15
            const page = +req.query.page || 1
            const limit = +req.query.limit || 15
            if (page <= 0 || limit <= 0) {
                throw new AppError({ message: "Page numebr should begin frm 1", code: 400 })
            }
            const offset = (page - 1) * limit
            const filter = {}
            //authv1/banner?page=1&limit=15&seach=banner
            if (req.query.search) {
                filter = {
                    $or: [
                        { title: new RegExp(req.query.search, 'i') },
                        { status: new RegExp(req.query.search, 'i') }
                    ]
                }

            }
            //pagination
            //1-100
            //per page 15=>1st page=>1-15
            //2nd page=>id=>16-30
            //search operation
            const count = await brandSvc.getTotalCount(filter)
            const data = await brandSvc.getDataByFilter({ offset, filter, limit })
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
         
            const payload =brandSvc.transformCreateObject(req.body, req.authUser._id)

            const brand = await brandSvc.createBrand(payload)
            res.json({
                result:{
                    payload
                },
                message:"This is created successfully",
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
            const detail = await brandSvc.getDataById(id)
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
            
            const banner = await brandSvc.getDataById(req.params.id)
            if (!banner) {
                throw new AppError({ message: "brand Doesnot exist", code: 400 })
            }
            const payload = brandSvc.transformUpdateObject(req.body, banner, req.authUser._id)
            const updatedData = await brandSvc.updateData(banner._id, payload)
            if (!updatedData) {
                throw new AppError({ message: "brand cannot update", code: 400 })
            }
            if(updatedData.image!==payload.image){
                //delete from server old image
                deleteFile('./public/uploads/brand/'+updatedData.image)
            }
            res.json({
                result: payload,
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
            const brand=await brandSvc.getDataById(req.params.id)
            if(!brand){
                throw new AppError({message:"brand does not exists",code:400})
            }
            const deletedBrand=await brandSvc.deleteById(brand._id)
            if(deletedBrand.image){
                deleteFile('./public/uploads/brand'+deletedBrand.image)
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
            const brandList=await brandSvc.getDataByFilter({
                offset:0,
                limit: (+req.query.limit || 2),
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
            const brandDetail=await brandSvc.getDataByFilter({
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
                brand:brandDetail[0]._id
            }
            
            const productCount= await ProSvc.getTotalCount(filter.search)
             const product=await ProSvc.getDataByFilter({
                offset:filter.offset,
                filter:filter.search,
                limit:filter.limit,
             })
            res.json({
                result:{
                    brand:brandDetail[0],
                    product:product
                },
                message:"data by slug",
                meta:{
                    limit:filter.limit,
                    page:filter.page,
                    total:productCount
                }
            })
        }
        catch(exception){
            console.log(exception)
            next(exception)
        }
    }
}
let brandCtrol = new BrandController()//makes a function
module.exports = brandCtrol