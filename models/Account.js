const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({

    accountname : {
        type : String,
        required:[true,"Please provide an account name"]
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true
    },
    currency  : {
        type: String,
        enum : ["TRY","USD","EUR"],
        required:[true,"Please provide a currency. TRY, USD, EUR"]
    },
    balance : {
        type : Number,
        default : 0
    },
    createdAt : {
        type : Date,
        default : Date.now
    }

});

// Pre Save Method
AccountSchema.pre("save",function(next){
    next();
});

// Getter
AccountSchema.path('balance').get(function(num) {
    return num.toFixed(2);
});

module.exports.Account  = mongoose.model("Account",AccountSchema);