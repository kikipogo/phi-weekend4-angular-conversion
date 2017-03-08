myApp.factory('TaskFactory', ['$http', function($http){
  var taskObject = { list: [] };

  function getTasks() {
    $http({
      method: 'GET',
      url: '/tasks'
    }).then(function(response) {
      console.log(response.data);
      taskObject.list = response.data;
    });
  }

  return {
    tasks: taskObject,
    updateTasks: function() {
      getTasks();
    }
  }
}]);
