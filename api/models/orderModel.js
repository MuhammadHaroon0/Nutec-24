const mongoose = require("mongoose");
var validator = require("validator");


const orderSchema = new mongoose.Schema({

    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true,
    }],
    price: {
        type: Number,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "failed", "paid", "delivered", "cancelled"],
        default: "pending",
    },


},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })

//To provide efficient searching of mongodb
// orderschema.index({ SOMETHING : 1, SOMETHING: -1 }); //1 for ascending -1 for descending

//Document middlewares,can work before or after save or create
// Pre Save Hook

orderSchema.pre('save', async function (next) {
    try {
        // Assuming that each order item has a 'price' field
        const itemPrices = await Promise.all(
            this.orderItems.map(async (itemId) => {
                const product = await mongoose.model('Products').findById(itemId);
                if (product) {
                    return product.price; // Assuming 'price' is a field in Products collection
                }
                return 0; // Default to 0 if product not found
            })
        );
        // Calculate total price
        const totalPrice = itemPrices.reduce((acc, curr) => acc + curr, 0);
        this.price = totalPrice; // Update order price
        next();
    } catch (error) {
        next(error);
    }
});

// orderschema.pre(/^find/,function(next){
//     //query middleware
//     next()
// })

//Post Save Hook
//The save hook doenst works for findAndUpdate and insertMany etc
// orderschema.post('save', function (doc, next) {
//   next();
// });

//? Aggeregation Middleware, works before or after aggregation function
// orderschema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: {  } });
//   next();
// });

// orderschema.methods.FUNCTIONNAME=function()
// {
//     //member functions
// }

//usually for child-parent referencing
// orderschema.virtual('',{
//
// })

module.exports = mongoose.model("order", orderSchema);
