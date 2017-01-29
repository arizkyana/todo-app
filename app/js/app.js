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

  $scope.todos = [];

  $scope.onChangeIsDone = function onChangeIsDone() { };
  $scope.onClickTodoEdit = function onClickTodoEdit(index) {
    $scope.todos[index].isEdit = true;

    // Update data 
    TodoFactory.todos = $scope.todos;
  };
  $scope.onClickTodoRemove = function onClickTodoRemove(index) {
    $scope.todos.splice(index, 1);
    delete $scope.todos[index];
    $log.warn($scope.todos);
  };
  $scope.onClickTodoSaveEdit = function onClickTodoSaveEdit(index) {
    $scope.todos[index].isEdit = false;
    $scope.todos[index].name = $scope.todos[index].editedName;

    // Update data 
    TodoFactory.todos = $scope.todos;
  };

  $scope.addTodo = function addTodo() {
    TodoFactory.add($scope.data.todo);
    $scope.todos = angular.copy(TodoFactory.todos);
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

  var add = function (todo) {
    $log.log(todo);
    todos.push({
      name: todo
    });
  };

  return {
    add: add,
    todos: todos
  };
}