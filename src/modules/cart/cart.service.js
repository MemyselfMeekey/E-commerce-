const CartModel = require("./cart.model")

class CartService{
    transformCreateCart=(product,buyerId,quantity)=>{
        const cartObject={
            buyerId:buyerId,
            orderId:null,
            productDetail:{
                productId:product._id,
                name:product.name,
                price:+product.price,
            },
            sellerId:product.sellerId,
            quantity:+quantity,
            amount:+quantity*+product.price,
       
            status:"draft",
            isPaid:null
        }
        return cartObject
    }
    createCartItem=async(data)=>{
        try{
            const cartObj=new CartModel(data)
            return await cartObj.save()
        }
        catch(exception){
            throw exception
        }
    }
    getCartItem=async(filter)=>{
        try{
            const cartObj=await CartModel.findOne(filter)
            return cartObj
        }
        catch(exception){
            throw exception
        }
    }
    updateCartItemQuantity=async(cartObj,qty)=>{
        try{
            qty=cartObj.quantity*qty
            cartObj.exception +=qty
            cartObj.amount=(cartObj.productDetail.price*qty)
            return await cartObj.save()
        }
        catch(exception){
        throw exception
        }
    }
}
const cartSvc=new CartService()
module.exports=cartSvc