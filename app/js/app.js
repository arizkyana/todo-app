// init angular app for todo
var app = angular.module('todo', []);

// runtime 
app.run(['$rootScope', '$log', runTime]);

// factory / model
app.factory('TodoFactory', ['$http', '$log', TodoFactory]);

// controller
app.controller('TodoController', ['$scope', '$rootScope', 'TodoFactory', '$log', TodoController]);

// util
app.filter('reverse', reverse);

/**
 * @name reverse
 * @desc handle array reverse
 */
function reverse() {
  return function (items) {
    return items.slice().reverse();
  };
}

/**
 * @name runTime
 * @param D.I $rootScope, $log
 * @desc handle Angular Runtime
 */
function runTime($rootScope, $log) {
  $log.log("TODO App Running with Angular");
}

/**
 * @name TodoController
 * @param D.I $rootScope, $log, TodoFactory
 * @desc handle Active Screen and Data Presentation
 */
function TodoController($scope, $rootScope, TodoFactory, $log) {
  $scope.data = {
    todo: ''
  };

  $scope.countIsDone = 0;

  $scope.todos = [];

  $scope.onChangeIsDone = function onChangeIsDone(index) {
    TodoFactory.isDone(index, $scope.todos[index].isDone);
    $scope.todos = TodoFactory.todos;  
    
    $scope.countIsDone = TodoFactory.countIsDone;

  };
  $scope.onClickTodoEdit = function onClickTodoEdit(index) {
    /**
     * UI handle
     */
    $scope.todos[index].isEdit = true;

  };
  $scope.onClickTodoRemove = function onClickTodoRemove(index) {
    TodoFactory.remove(index);

    $scope.todos = TodoFactory.todos;
  };
  $scope.onClickTodoSaveEdit = function onClickTodoSaveEdit(index) {
    /**
     * UI handle
     */
    $scope.todos[index].isEdit = false;

    TodoFactory.update(index, $scope.todos[index].editedName);
    $scope.todos = TodoFactory.todos;

  };

  $scope.addTodo = function addTodo() {
    TodoFactory.add($scope.data.todo);
    $scope.todos = _.reverse(TodoFactory.todos);
    $scope.data.todo = "";
  };
}

/**
 * @name TodoFactory
 * @param D.I $http, $log
 * @desc handle Data Application
 */
function TodoFactory($http, $log) {

  var todos = [];
  var countIsDone = 0;

  var add = function add(todo) {
    $log.log(todo);
    todos.push({
      name: todo,
      isEdit: false,
      createdAt: moment().format(),
      isDone: false
    });
  };

  var update = function update(index, newName) {
    todos[index].name = newName;
  };

  var remove = function remove(index) {
    todos.splice(index, 1);
  };

  var isDone = function isDone(index, isDone) {
    todos[index].isDone = isDone;
    if (isDone) countIsDone++;
    $log.warn(countIsDone);
  };


  return {
    add: add,
    update: update,
    remove: remove,
    isDone: isDone,
    countIsDone: countIsDone,
    todos: todos
  };
}