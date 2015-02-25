var Reflux = require('reflux');

var Actions = Reflux.createActions( ["confirmTasks", "addTask", "updateTask", "deleteTask"] );

module.exports = Actions;