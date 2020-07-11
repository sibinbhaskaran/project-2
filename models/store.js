const mongoose = require('mongoose');
const storeSchema = new mongoose.Schema({

    name: String,
    imageFront: String,
    imageSide: String,
    imageInside: String,
    price: Number,
    features: String,
    qty: {type:Number , required: true , min : 0},
    

});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;

