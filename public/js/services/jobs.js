window.angular.module('ngff.services.jobs', [])
  .factory('Jobs', ['$resource', 
    function($resource){
      return $resource(
        'jobs/:jobId', 
        {
          jobId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);