const Task = require("../models/Task");
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
  //   res.send("get all tasks");
  //   Task.find();
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }

  //   Task.find();
};

const getSingleTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const tasks = await Task.findOne({ _id: taskID });
    if (!tasks) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = (req, res) => {
  res.send("update task item");
  //   Task.find();
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const tasks = await Task.findOneAndDelete({ _id: taskID });
    if (!tasks) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    // res.status(200).json({ tasks });
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
