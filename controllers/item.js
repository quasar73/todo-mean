const List = require('../models/ToDoList');
const Item= require('../models/ToDoItem');
const errorHandler = require('../utils/errorHandler');

module.exports.add = async (req, res) => {
    //add
}

module.exports.delete = async (req, res) => {
    // delete
}

module.exports.getAll = async (req, res) => {
    try {
        const items = await List.find({ user: req.params.id });
        res.status(200).json({
            items: items
        });
    } catch(ex) {
        errorHandler(res, ex);
    }
}