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
    removeFromCart=async(req,res,next)=>{
        try{
            const {productId,quantity}=req.body
            const loggedInUser=req.authUser
            
            const existingCart=await cartSvc.getCartItem({
                buyerId:loggedInUser._id,
                orderId:{$eq:null},
                status:"draft",
             "productDetail.productId":productId
            })
          
            if(!existingCart){
                throw new AppError({message:"You have not added this item in your cart",code:400})
            }
            if(existingCart.quantity<quantity){
                throw new AppError({message:"You cannot update the cart with quantity which you donot have",code:400})
            }
           
            let cartItem=null
            if(+existingCart.quantity=== +quantity || +quantity<=0){//+ will make quantity in number
                //remove from the cart
               
                cartItem=await cartSvc.removeFromCart(existingCart._id)
                res.json({
                    result:cartItem,
                    message:"Cart item removed succesfully",
                    meta:null
                })
            }else{
                //update cart
                cartItem=await cartSvc.reduceQuantity(existingCart,quantity)
                
                res.json({
                    result:cartItem,
                    message:"Cart updated successfully",
                    meta:null
                })
            }

        }
        catch(exception){
            next(exception)
        }
    }
    listMyCart=async(req,res,next)=>{
        try{
            const loggedInUser=req.authUser
            const cartItems=await cartSvc.getCartList({
             buyerId:loggedInUser._id,
            orderId:{$eq:null},
            status:"draft",
           
            })
            res.json({
                result:cartItems,
                message:"this is your cart List",
                meta:null
            })
        }
        catch(exception){
            next(exception)
        }
    }
    deleteFromCart=async(req,res,next)=>{
        try{
            const cartItem=await cartSvc.getCartItem({
                _id:req.params.cartId,
                buyerId:req.authUser._id,
                status:"draft",
                orderId:{$eq:null}
            })
           
            if(!cartItem){
                throw new AppError({message:"Cart Item does not exist",code:400})
            }
            const removedItem=await cartSvc.removeFromCart(req.params.cartId)
            res.json({
                result:removedItem,
                message:"Cart item is successfully delted",
                meta:null
            })
        }
        catch(exception){
            next(exception)
        }
    }
    createOrder=async(req,res,next)=>{
        try{
            const {cartId,discount,deliveryCharge}=req.body
            const cartItems=await cartSvc.getCartList({
                _id:{$in:cartId},
                buyerId:req.authUser._id,
                orderId:{$eq:null},
                status:"draft"
            })
        
            if(!cartItems){
                throw new AppError({message:"Cart doesnot exisy",code:400})
            }
            const orderObj=cartSvc.createOrderObject(cartItems,discount,deliveryCharge,req.authUser)
            const order=await cartSvc.createOrder(orderObj)
            res.json({
                result:order,
                message:"Your order has been placed sucessfully",
                meta:null
            }
            )
        }
        catch(exception){
            throw exception
        }
    }
}
const cartCtrl=new CartController()
module.exports=cartCtrl
