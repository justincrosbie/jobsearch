window.angular.module('ngff.services.applicants', [])
  .factory('Applicants', ['$resource', 
    function($resource){
      return $resource(
        'applicants/:applicantId', 
        {
          applicantId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);