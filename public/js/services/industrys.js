window.angular.module('ngff.services.industrys', [])
  .factory('Industrys', ['$resource', 
    function($resource){
      return $resource(
        'industrys/:industryId', 
        {
          industryId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);