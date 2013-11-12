window.angular.module('ngff.services.states', [])
  .factory('States', ['$resource', 
    function($resource){
      return $resource(
        'states/:stateId', 
        {
          stateId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);