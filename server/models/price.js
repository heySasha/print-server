const mongoose = require('mongoose');

const PriceSchema = mongoose.Schema({
    format: {
        type: String
    },
    quantityOnSRA3: {
        type: Number
    },
    size: {
        type: String
    }
});

const PaperSchema = mongoose.Schema({
    type: {
        type: String
    },
    density: {
        type: Number
    },
    price: {
        type: Number
    }
});

const ImprintSchema = mongoose.Schema({
   color: {
       type: String
   },
   format: {
       type: String
   },
   SPA3: {
       type: Number
   }
});

const DiscountSchema = mongoose.Schema({
   type: {
       type: String
   },
    coefficient: {
       type: Number
    },
    numberOfSheets: {
       type: Number
    }
});

const ExtraSchema = mongoose.Schema({
    time: {
        type: String
    },
    coefficient: {
        type: Number
    }
});

const Price = mongoose.model('Order', PriceSchema);
module.exports = { Price };