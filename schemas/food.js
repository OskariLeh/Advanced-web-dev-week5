var mongoose = require("mongoose")
var Schema = mongoose.Schema

let foodSchema = new Schema({
    name: String,
    instructions: Array,
    ingredients: Array 
})

module.exports = mongoose.model("Food, foodSchema")