//Setting up route
window.app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', 
  { 
    templateUrl: 'views/index.html' 
  })

  .when('/titles', 
  {
    templateUrl: 'views/titles/list.html'
  })
  .when('/titles/create', 
  { 
    templateUrl: 'views/titles/create.html' 
  })  
  .when('/titles/:titleId/edit', 
  { 
    templateUrl: 'views/titles/edit.html' 
  })
  .when('/titles/:titleId', 
  { 
    templateUrl: 'views/titles/view.html' 
  })
  
  .when('/categorys', 
  {
    templateUrl: 'views/categorys/list.html'
  })
  .when('/categorys/create', 
  { 
    templateUrl: 'views/categorys/create.html' 
  })  
  .when('/categorys/:categoryId/edit', 
  { 
    templateUrl: 'views/categorys/edit.html' 
  })
  .when('/categorys/:categoryId', 
  { 
    templateUrl: 'views/categorys/view.html' 
  })
  
  .when('/industrys', 
  {
    templateUrl: 'views/industrys/list.html'
  })
  .when('/industrys/create', 
  { 
    templateUrl: 'views/industrys/create.html' 
  })  
  .when('/industrys/:industryId/edit', 
  { 
    templateUrl: 'views/industrys/edit.html' 
  })
  .when('/industrys/:industryId', 
  { 
    templateUrl: 'views/industrys/view.html' 
  })
  
  .when('/states', 
  {
    templateUrl: 'views/states/list.html'
  })
  .when('/states/create', 
  { 
    templateUrl: 'views/states/create.html' 
  })  
  .when('/states/:stateId/edit', 
  { 
    templateUrl: 'views/states/edit.html' 
  })
  .when('/states/:stateId', 
  { 
    templateUrl: 'views/states/view.html' 
  })
  
  .when('/countrys', 
  {
    templateUrl: 'views/countrys/list.html'
  })
  .when('/countrys/create', 
  { 
    templateUrl: 'views/countrys/create.html' 
  })  
  .when('/countrys/:countryId/edit', 
  { 
    templateUrl: 'views/countrys/edit.html' 
  })
  .when('/countrys/:countryId', 
  { 
    templateUrl: 'views/countrys/view.html' 
  })
  
  .when('/employers', 
  {
    templateUrl: 'views/employers/list.html'
  })
  .when('/employers/create', 
  { 
    templateUrl: 'views/employers/create.html' 
  })  
  .when('/employers/:employerId/edit', 
  { 
    templateUrl: 'views/employers/edit.html' 
  })
  .when('/employers/:employerId', 
  { 
    templateUrl: 'views/employers/view.html' 
  })
  
  .when('/sites', 
  {
    templateUrl: 'views/sites/list.html'
  })
  .when('/sites/create', 
  { 
    templateUrl: 'views/sites/create.html' 
  })  
  .when('/sites/:siteId/edit', 
  { 
    templateUrl: 'views/sites/edit.html' 
  })
  .when('/sites/:siteId', 
  { 
    templateUrl: 'views/sites/view.html' 
  })
  
  .when('/jobs', 
  {
    templateUrl: 'views/jobs/list.html'
  })
  .when('/jobs/create', 
  { 
    templateUrl: 'views/jobs/create.html' 
  })  
  .when('/jobs/:jobId/edit', 
  { 
    templateUrl: 'views/jobs/edit.html' 
  })
  .when('/jobs/:jobId', 
  { 
    templateUrl: 'views/jobs/view.html' 
  })
  
  .when('/applicants', 
  {
    templateUrl: 'views/applicants/list.html'
  })
  .when('/applicants/create', 
  { 
    templateUrl: 'views/applicants/create.html' 
  })  
  .when('/applicants/:applicantId/edit', 
  { 
    templateUrl: 'views/applicants/edit.html' 
  })
  .when('/applicants/:applicantId', 
  { 
    templateUrl: 'views/applicants/view.html' 
  })
  .when('/jobsCalendar', 
  {
    templateUrl: 'views/jobs/calendar.html'
  })
  .when('/jobsMap', 
  {
    templateUrl: 'views/jobs/map.html'
  })
  
  
      .otherwise({redirectTo: '/'});
}]);

//Removing tomcat unspported headers
window.app.config(['$httpProvider', function($httpProvider, Configuration) {
    //delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider', function($locationProvider) {
    //$locationProvider.html5Mode(true);
    $locationProvider.hashPrefix("!");
}]);