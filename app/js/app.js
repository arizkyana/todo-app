// init angular app for todo
var app = angular.module('todo', []);

//config
app.constant('EVENT', {
  TASK_IS_DONE: 'TASK:IS:DONE',
  TASK_NOT_DONE: 'TASK:NOT:DONE'
});

// runtime 
app.run(['$rootScope', '$log', 'EVENT', runTime]);

// factory / model
app.factory('TodoFactory', ['$http', '$log', TodoFactory]);

// controller
app.controller('TodoController', ['$scope', '$rootScope', 'TodoFactory', '$log', 'EVENT', TodoController]);

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
function runTime($rootScope, $log, EVENT) {
  $log.log("TODO App Running with Angular");
  $rootScope.task = {
    done: 0,
    notDone: 0,
    total: 0
  };
  
  $rootScope.todosRoot = [];

  $rootScope.$on(EVENT.TASK_IS_DONE, function () {
    var count = _.filter($rootScope.todosRoot, { isDone: true });
    $rootScope.task.done = count.length;
    $rootScope.task.total = (($rootScope.task.done - $rootScope.task.notDone) > 0) ?$rootScope.task.done - $rootScope.task.notDone : $rootScope.task.done;
    $log.log("done", $rootScope.task);
  });

  $rootScope.$on(EVENT.TASK_NOT_DONE, function () {
    var count = _.filter($rootScope.todosRoot, { isDone: false });
    $rootScope.task.notDone = count.length;
    $rootScope.task.total = (($rootScope.task.done - $rootScope.task.notDone) > 0) ?$rootScope.task.done - $rootScope.task.notDone : 0;
    $log.log("not done",$rootScope.task);
  });
}

/**
 * @name TodoController
 * @param D.I $rootScope, $log, TodoFactory
 * @desc handle Active Screen and Data Presentation
 */
function TodoController($scope, $rootScope, TodoFactory, $log, EVENT) {
  $scope.data = {
    todo: ''
  };

  $scope.countIsDone = 0;

  $scope.todos = [];

  $scope.onChangeIsDone = function onChangeIsDone(index, isDone) {
    TodoFactory.isDone(index, $scope.todos[index].isDone);
    $scope.todos = TodoFactory.todos;

    $scope.countIsDone = TodoFactory.countIsDone;

    $rootScope.todosRoot = angular.copy($scope.todos);
    if (isDone) {
      $rootScope.$emit(EVENT.TASK_IS_DONE);
    } else {
      $rootScope.$emit(EVENT.TASK_NOT_DONE);
    }


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