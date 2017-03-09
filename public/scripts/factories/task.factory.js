myApp.factory('TaskFactory', ['$http', function($http) {

  var factoryTasks = { list: [] };
  var self = this;
  self.newTask = {};

  getTasks();

  function getTasks() {
    $http({
      method: 'GET',
      url: '/tasks'
    }).then(function(response) {
      console.log('response from factory: ', response);
      console.log('response.data from factory: ', response.data);
      factoryTasks.list = response.data;
    });
  }

  function completeTask(taskId){
  // $http request moves to factory because its the glue between the factory and the server
    $http({
      method: 'PUT',
      url: '/tasks/complete/' + taskId
    }).then(function(response) {
      getTasks();
    });
}

function deleteTask(taskId){
$http({
  method: 'DELETE',
  url: '/tasks/' + taskId
}).then(function(response) {
  getTasks();
});
}

function uncompleteTask(taskId){
$http({
  method: 'PUT',
  url: '/tasks/uncomplete/' + taskId
}).then(function(response) {
  getTasks();
});
}

function addTask(){
$http({
  method: 'POST',
  url: '/tasks',
  data: self.newTask
}).then(function(response){
  console.log(response);
  getTasks();
  self.newTask = {};
});
}

  // this is the public API, if it's not in here, your controller won't see it
  return {
    allTasks: factoryTasks,
    updateTasks: getTasks,
    completeTask: completeTask,
    deleteTask: deleteTask,
    uncompleteTask: uncompleteTask,
    addTask: addTask
  };
}]);
