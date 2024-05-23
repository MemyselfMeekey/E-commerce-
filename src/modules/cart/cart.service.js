const CartModel=require("./cart.model")
const OrderModel = require("./order.model")

class CartService {
    transformCreateCart = (product, buyerId, quantity) => {
        const cartObject = {
            buyerId: buyerId,
            orderId: null,
            productDetail: {
                productId: product._id,
                name: product.name,
                price: +product.price,
            },
            sellerId: product.sellerId,
            quantity: +quantity,
            amount: +quantity * +product.price,
            createdBy: buyerId,
            status: "draft",
            isPaid: null
        }
        return cartObject
    }
    createCartItem = async (data) => {
            const cartObj = new CartModel(data)
            return await cartObj.save()
        }
        catch (exception) {
            throw exception
        }
    }
    getCartItem = async (filter) => {
        try {
           
            const cartObj = await CartModel.findOne(filter)
            return cartObj
        }
        catch (exception) {
            throw exception
        }
    }
    getCartList = async (filter) => {
        try {
            const cartObj = await CartModel.find(filter)
            return cartObj
        }
        catch (exception) {
            throw exception
        }
    }
    updateCartItemQuantity = async (cartObj, qty) => {
        try {
            qty = cartObj.quantity + qty

            return await this.updateCartWithQuantity(cartObj, quantity)
        }
        catch (exception) {
            throw exception
        }
    }
    updateCartWithQuantity = async (cartObj, qty) => {
        try {
            cartObj.updatedBy = cartObj.createdBy
            cartObj.amount = (cartObj.productDetail.price * qty)
            return await cartObj.save()
        }
        catch (exception) {
            throw exception
        }
    }

    reduceQuantity = async (cartObj,qty) => {
        try {
            qty = cartObj.quantity - qty
            return await this.updateCartWithQuantity(cartObj,qty)
          
        }
        catch (exception) {
            throw exception
        }
    }
    removeFromCart = async (cartId) => {
        try {
            return await CartModel.findByIdAndDelete(cartId)
        }
        catch (exception) {
            throw exception
        }
    }
    createOrderObject = (cartItems, discount, deliveryCharge, buyer) => {
        
        let orderObj = {
            buyerId: buyer._id,
            cartItems: [],
            subTotal: 0,
            discount: discount,
            deliveryCharge: deliveryCharge,
            tax: 0,
            total: 0,
            status: "pending",
            isPaid: false,
            createdBy: buyer._id
        }
        let cartIds = []
        let subTotal = 0
        
        cartItems.map((item) => {
            cartIds.push(item._id)
            subTotal += +item.amount
        })
       
        // cartItems.map((item) => {
        //     if (!isNaN(item.discount)) { // Check if item.discount is a valid number
        //         subTotal += parseFloat(item.discount); // Convert to number and add to subTotal
        //     }
        // });

        const tax = (subTotal - discount + deliveryCharge) * 0.13
        const total = (subTotal - discount + deliveryCharge + tax)
        orderObj.cartItems = cartIds
        orderObj.subTotal = subTotal
        orderObj.tax = tax
        orderObj.total = total
      //subtotal:Nan, tax:Nan, total:Nan
        return orderObj
    }
    createOrder = async (orderObj) => {
        try {
            
            const order = new OrderModel(orderObj)
            await order.save()
            await CartModel.updateMany({
                _id: { $in: orderObj.cartItems }
            }, {
                status: "orderObj.cartIds",
                orderIdL: order._id
            })
            return order
        }
        catch (exception) {
            throw exception
        }
    }

const cartSvc = new CartService()
module.exports = cartSvc