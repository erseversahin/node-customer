const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({

    user : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true
    },
    currency  : {
        type: String,
        enum : ["TRY","USD","EUR"],
        required: true,
        default : "TRY"
    },
    balance : {
        type : Number,
        default : 0,
        min: 0
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

module.exports  = mongoose.model("Account",AccountSchema);