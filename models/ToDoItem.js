const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    important: {
        type: Boolean,
        required: true
    },
    description: {
        type: String
    },
    list: {
        ref: 'lists',
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('items', itemSchema);