const AppError = require("../../exception/app.exception")
const ProSvc = require("../product/product.service")
const cartSvc = require("./cart.service")

class CartController{
    addToCart=async(req,res,next)=>{
        try{    
           const {productId,quantity}=req.body
           const productDetail=await ProSvc.getSingleDataByFilter({
            _id:productId,
            status:"active"
           })
           if(!productDetail){
            throw new AppError({message:"Product doesnot exist"})
           }
           //inventory stock
           const buyerId=req.authUser._id
           const existingCart=await cartSvc.getCartItem({
            buyerId:buyerId,
            orderId:{$eq:null},
            status:"draft",
            "productDetail.product.Id":productDetail._id
           })
           let cartItem
           if(existingCart){
             cartItem=await cartSvc.updateCartItemQuantity(existingCart._id,quantity)
           }
           else{
           //new item to the cart
           const payload=cartSvc.transformCreateCart(productDetail,buyerId,quantity)
            cartItem=await cartSvc.createCartItem(payload)
           }
           //existing cartItem update
           res.json({
            result:cartItem,
            message:"Your utem has been added",
            meta:null
           })

        }   
        catch(exception){
            next(exception)
        }
    }
}
const cartCtrl=new CartController()
module.exports=cartCtrl
