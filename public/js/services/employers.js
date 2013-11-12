window.angular.module('ngff.services.employers', [])
  .factory('Employers', ['$resource', 
    function($resource){
      return $resource(
        'employers/:employerId', 
        {
          employerId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);