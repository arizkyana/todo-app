// init angular app for todo
var app = angular.module('todo', []);

// runtime 
app.run(['$rootScope', '$log', runTime]);

// factory / model
app.factory('TodoFactory', ['$http', '$log', TodoFactory]);

// controller
app.controller('TodoController', ['$scope', '$rootScope', 'TodoFactory', TodoController]);



function runTime($rootScope, $log) {
  $log.log("TODO App Running with Angular");
}


function TodoController($scope, $rootScope, TodoFactory) {
  $scope.data = {
    todo: ''
  };

  $scope.todos = [];  

  $scope.addTodo = function addTodo() {
    TodoFactory.add($scope.data.todo);
    $scope.todos = angular.copy(TodoFactory.todos);
    
  };
}

function TodoFactory($http, $log) {

  var todos = [];  

  var add = function (todo) {
    $log.log(todo);
    todos.push({
      name : todo
    });
  };  

  return {
    add: add,
    todos: todos
  };
}