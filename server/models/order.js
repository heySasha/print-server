const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    _client: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    files: [{
        file: {
            type: Buffer
        }
    }],
    status: {
        type: String,
        required: true,
        default: 'Замовлений'
    },
    cost: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = { Order };