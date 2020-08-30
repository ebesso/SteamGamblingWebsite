const mongoose = require('mongoose')

const offerSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    active: {type: Boolean},
    tradeID: {type: String},
    created: {type: Date},
    offerType: {type: String},
    value: {type: Number}
})

const Offer = mongoose.model('Offers', offerSchema);

module.exports = Offer;
