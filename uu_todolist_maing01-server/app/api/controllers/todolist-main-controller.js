"use strict";
const TodolistMainAbl = require("../../abl/todolist-main-abl.js");

class TodolistMainController {
  init(ucEnv) {
    return TodolistMainAbl.init(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new TodolistMainController();
