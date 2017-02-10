/**
 * Events Identifier - Constant
 */

var EVENT = {
  TODO_ADD: 'todo:add',
  TODO_UPDATE: 'todo:update',
  TODO_REMOVE: 'todo:remove',
};

/**
 * Component
 */
var panelBody = $('.panel');
var todoNameInput = $('#todoNameInput');
var formTodo = $('#formTodo');

var todos = [];


/**
 * Handle Event
 */

formTodo.submit(addTodo);

panelBody.on(EVENT.TODO_ADD, todoAdd);
panelBody.on(EVENT.TODO_UPDATE, todoUpdate);
panelBody.on(EVENT.TODO_REMOVE, todoRemove);

/**
 * Functions
 */

function todoAdd() {
  var panel = $(this);
  //reset panel
  panel.empty();

  //append content to panel
  _.each(todos, function (todo) {
    panel.append(todoRow());
  });
}

function todoUpdate() {
  var panel = $(this);
  //reset panel
  panel.empty();

  //append content to panel
  _.each(todos, function (todo) {
    panel.append(todoRow());
  });
}

function todoRemove() {
  var panel = $(this);
  //reset panel
  panel.empty();

  //append content to panel
  _.each(todos, function (todo) {
    panel.append(todoRow());
  });
}

function addTodo(e) {
  e.preventDefault();
  todos.push({
    name: todoNameInput.val(),
    isEdit: false,
    createdAt: moment().format(),
    isDone: false
  });
  // reset todoNameInput
  todoNameInput.val(null);
  panelBody.trigger(EVENT.TODO_ADD);

  return;
}

function UpdateTodo(e) {
  e.preventDefault();
  todos.push({
    name: todoNameInput.val(),
    isEdit: false,
    createdAt: moment().format(),
    isDone: false
  });
  // reset todoNameInput
  todoNameInput.val(null);
  panelBody.trigger(EVENT.TODO_ADD);

  return;
}

function RemoveTodo(e) {
  e.preventDefault();
  todos.push({
    name: todoNameInput.val(),
    isEdit: false,
    createdAt: moment().format(),
    isDone: false
  });
  // reset todoNameInput
  todoNameInput.val(null);
  panelBody.trigger(EVENT.TODO_ADD);

  return;
}



function todoRow() {
  var row = '<div class="panel-body"><div class="row">' +
    '<div class="col-md-8">' +
    '<div class="checkbox" ng-hide="todo.isEdit">' +
    '<label>' +
    '<input type="checkbox" ng-model="todo.isDone" ng-change="onChangeIsDone($index)" /> {{ todo.name }}' +
    '</label>' +
    '</div>' +
    '<div class="form-group" ng-show="todo.isEdit">' +
    '<input type="text" class="form-control" ng-model="todo.editedName" ng-value="todo.name" />' +
    '</div>' +
    '</div>' +
    '<div class="col-md-4 text-right">' +
    '<div class="button-group" ng-show="!todo.isDone">' +
    '<button class="btn btn-default" ng-click="onClickTodoSaveEdit($index)" ng-show="todo.isEdit">' +
    '<i class="fa fa-save"></i>' +
    '</button>' +
    '<button type="button" class="btn btn-success" ng-click="onClickTodoEdit($index)" ng-hide="todo.isEdit">' +
    '<i class="fa fa-pencil"></i>' +
    '</button>' +
    '<button type="button" class="btn btn-danger" ng-click="onClickTodoRemove($index)" ng-hide="todo.isEdit">' +
    '<i class="fa fa-trash"></i>' +
    '</button>' +
    '</div>' +
    '</div>' +
    '</div></div>';
  return row;
}



