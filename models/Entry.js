const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// function validator(data) {
//    var validator =  Entry.education + Entry.shopping + Entry.browse + Entry.social
//    switch(data) {
//     case Entry.education:
//         validator - Entry.education;
//         break;
//     case Entry.shopping:
//         validator - Entry.shopping;
//         break;
//     case Entry.browse:
//         validator - Entry.browse;
//         break;
//     case Entry.social:
//         validator - Entry.social;
//         break;
//     default:
//         console.log("Something went wrong");
//         break;

//     validator = (1440 - validator);
//     return validator;
//    }
// }

var usageSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    education: {
        type: Number,
        required: true,
        min: 0, max: 1440
    },
    shopping: {
        type: Number,
        required: true,
        min: 0, max: 1440
    },
    browse: {
        type: Number,
        required: true,
        min: 0,  max: 1440
    },
    social: {
        type: Number,
        required: true,
        min: 0, max: 1440
    },
    date: { 
        type : Date,
        required: true,
        max: Date.now
    },
}, {
    timestamps: true
});
var entries = mongoose.model('Entry', usageSchema); //initialize a model with a scheme you created. schema gives the layout while the model provides the functions for interacting the database

module.exports = entries;