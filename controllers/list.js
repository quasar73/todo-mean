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
        const listName = await List.findById(req.params.id);
        await List.findByIdAndRemove(req.params.id);
        await Item.remove({ list: req.params.id });
        res.status(200).json({
            message: `List \'${listName}\' has been removed.`
        });
    } catch(ex) {
        errorHandler(res, ex);
    }
}

module.exports.getByUserId = async (req, res) => {
    try {
        const lists = await List.find({ user: req.user.id });
        res.status(200).json({
            lists: lists
        });
    } catch(ex) {
        errorHandler(res, ex);
    }
}

module.exports.getById = async (req, res) => {
    try {
        const list = await List.findById(req.params.id);
        res.status(200).json(list);
    } catch(ex) {
        errorHandler(res, ex);
    }
}

module.exports.updateTitle = async (req, res) => {
    try {
        const list = await List.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { title: req.body.title } },
            { new: true }
        );
        res.status(200).json(list);
    } catch(ex) {
        errorHandler(res, ex);
    }
}