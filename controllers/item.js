const Item = require('../models/ToDoItem');
const errorHandler = require('../utils/errorHandler');

module.exports.add = async (req, res) => {
    console.log(req.body)
    const item = await Item({
        title: req.body.title,
        completed: false,
        important: false,
        description: '',
        list: req.body.listId
    });

    try {
        await item.save();
        res.status(201).json(item);
    } catch(ex) {
        errorHandler(res, ex);
    }
}

module.exports.delete = async (req, res) => {
    // delete
}

module.exports.getByListId = async (req, res) => {
    try {
        const items = await Item.find({ list: req.params.id });
        res.status(200).json({
            items: items
        });
    } catch(ex) {
        errorHandler(res, ex);
    }
}