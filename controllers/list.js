const List = require('../models/ToDoList');
const Item= require('../models/ToDoItem');
const errorHandler = require('../utils/errorHandler');

module.exports.add = async (req, res) => {
    const list = new List({
        title: req.body.title,
        user: req.user.id
    });

    try {
        await list.save();
        res.status(201).json(list);
    } catch(ex) {
        errorHandler(res, ex);
    }
}

module.exports.delete = async (req, res) => {
    try {
        const listName = List.findById(req.params.id);
        List.remove({ _id: req.params.id });
        Item.remove({ list: req.params.id });
        res.status(200).json({
            message: `List \'${listName}\' has been deleted.`
        });
    } catch(ex) {
        errorHandler(res, ex);
    }
}

module.exports.getByUserId = async (req, res) => {
    try {
        const lists = List.find({ user: req.params.id });
        res.status(200).json({
            lists: lists
        });
    } catch(ex) {
        errorHandler(res, ex);
    }
}