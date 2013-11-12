window.angular.module('ngff.services.categorys', [])
  .factory('Categorys', ['$resource', 
    function($resource){
      return $resource(
        'categorys/:categoryId', 
        {
          categoryId:'@_id'
        }, 
        { 
          query:  {method:'GET', isArray:false},
          update: {method: 'PUT'}
        }
      )
    }]);