const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const {
  CustomeAPIError,
  createCustomError,
} = require("../errors/custom-error");

//===try catch block is replaced by asyncWrapper in this file===

const getAllTasks = asyncWrapper(async (req, res) => {
  //   try {
  const tasks = await Task.find({});
  res.status(200).json({ tasks, amount: tasks.length });
  //   } catch (error) {
  //   res.status(500).json({ msg: error });
  //   }
});

const createTask = asyncWrapper(async (req, res, next) => {
  //   try {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
  //   } catch (error) {
  // res.status(500).json({ msg: error });
  //   }

  //   Task.find();
});

const getSingleTask = asyncWrapper(async (req, res, next) => {
  //   try {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    // const error = new Error(`No task with id: ${taskID}`);
    // error.status = 404;
    // return next(error);
    //above comment is replaced by below code

    return next(createCustomError(`No task with id: ${taskID}`, 404));
    // return res.status(404).json({ msg: `No task with id: ${taskID}` });
  }
  res.status(200).json({ task });
  //   } catch (error) {
  //     res.status(500).json({ msg: error });
  //   }
});

const updateTask = asyncWrapper(async (req, res) => {
  //   console.log(req.body);
  //   try {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return res.status(404).json({ msg: `No task with id: ${taskID}` });
  }
  res.status(200).json({ task });
  //   } catch (error) {
  //     res.status(500).json({ msg: error });
  //   }
});

const deleteTask = asyncWrapper(async (req, res) => {
  //   try {
  const { id: taskID } = req.params;
  const tasks = await Task.findOneAndDelete({ _id: taskID });
  if (!tasks) {
    return res.status(404).json({ msg: `No task with id: ${taskID}` });
  }
  // res.status(200).json({ tasks });
  res.status(200).send();
  //   } catch (error) {
  //     res.status(500).json({ msg: error });
  //   }
});

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
