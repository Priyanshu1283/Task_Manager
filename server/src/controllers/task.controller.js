const Task = require('../models/task.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { encrypt, decrypt } = require('../utils/encryption');

const createTask = asyncHandler(async (req, res) => {
    const { title, description, status } = req.body;

    if (!title || !description) {
        throw new ApiError(400, "Title and description are required");
    }

    const task = await Task.create({
        title,
        description: encrypt(description),
        status,
        user: req.user._id
    });

    const responseTask = { ...task._doc, description: decrypt(task.description) };

    return res.status(201).json(
        new ApiResponse(201, responseTask, "Task created successfully")
    );
});

const getTasks = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, status, search } = req.query;

    const query = { user: req.user._id };

    if (status) {
        query.status = status;
    }

    if (search) {
        query.title = { $regex: search, $options: "i" };
    }

    const tasks = await Task.find(query)
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

    const count = await Task.countDocuments(query);

    const decryptedTasks = tasks.map(task => ({
        ...task._doc,
        description: decrypt(task.description)
    }));

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                tasks: decryptedTasks,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                totalCount: count
            },
            "Tasks fetched successfully"
        )
    );
});

const getTaskById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, user: req.user._id });

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    const decryptedTask = { ...task._doc, description: decrypt(task.description) };

    return res.status(200).json(
        new ApiResponse(200, decryptedTask, "Task fetched successfully")
    );
});

const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = encrypt(description);
    if (status) updateData.status = status;

    const task = await Task.findOneAndUpdate(
        { _id: id, user: req.user._id },
        updateData,
        { new: true, runValidators: true }
    );

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    const decryptedTask = { ...task._doc, description: decrypt(task.description) };

    return res.status(200).json(
        new ApiResponse(200, decryptedTask, "Task updated successfully")
    );
});

const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Task deleted successfully")
    );
});

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};
