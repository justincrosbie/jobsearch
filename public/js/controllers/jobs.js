window.angular.module('ngff.controllers.jobs', [])
  .controller('JobsController', ['$scope','$routeParams','$location','Global','Industrys','Categorys','Employers','Sites','Applicants','Jobs',
    function($scope, $routeParams, $location, Global, Industrys,Categorys,Employers,Sites,Applicants, Jobs) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.job ) {
          this.job = $scope.tmpjob;
        }

        var job = new Jobs({ 

          name: this.job.name ? this.job.name : null,
          start: this.job.start ? this.job.start : null,
          end: this.job.end ? this.job.end : null,
          industry: this.job.industry ? this.job.industry._id : null,
          category: this.job.category ? this.job.category._id : null,
          employer: this.job.employer ? this.job.employer._id : null,
          site: this.job.site ? this.job.site._id : null,
          applicant: this.job.applicant ? this.job.applicant._id : null
        });
 
        job.$save(function (response) {
          $location.path("jobs/" + response._id);
        });
      };
 
      $scope.update = function () {
        var job = $scope.job;
 
        job.$update(function () {
          $location.path('jobs/' + job._id);
        });
      };
 
      $scope.find = function (query) {
        Jobs.query(query, function (jobs) {
          $scope.jobs = jobs.data;
        });
      };
 
      $scope.currentPage = 1;
      $scope.totalItems = 100;
      $scope.maxSize = 5;
      $scope.sortOrder = 1;
      var searchFields = ['name','industry','category','site'];
      var sortFields = ['name','industry','category','site'];

      $scope.sortField = sortFields[0];
      
      $scope.findPaged = function () {
        var term = $scope.query || '';
        var termArray = term.split(' ');
        
        var q2val = {};
        for ( var i=0; i<termArray.length; i++ ) {
        	if ( i <= searchFields.length ) {
        		q2val[searchFields[i]] = { regex : termArray[i], options: 'i' };
        	}
        }

  		
        if ( $scope.industrySearch ) {
          	q2val.industry = $scope.industrySearch._id;
        }
        if ( $scope.categorySearch ) {
          	q2val.category = $scope.categorySearch._id;
        }
        if ( $scope.employerSearch ) {
          	q2val.employer = $scope.employerSearch._id;
        }
        if ( $scope.siteSearch ) {
          	q2val.site = $scope.siteSearch._id;
        }
        if ( $scope.applicantSearch ) {
          	q2val.applicant = $scope.applicantSearch._id;
        }

        var query = {
            q2: q2val
            , //search term
            sort_field: $scope.sortField,
            sort_order: $scope.sortOrder,
            page_limit: 10, // page size
            page: $scope.currentPage // page number
        };

        Jobs.query(query, function (jobs) {
          $scope.jobs = jobs.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = jobs.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Jobs.get({ jobId: $routeParams.jobId }, function (job) {
          $scope.job = job;
          
          if ( $scope.job && $scope.job.start ) {
            $scope.job.start = new Date($scope.job.start);
          }
          if ( $scope.job && $scope.job.end ) {
            $scope.job.end = new Date($scope.job.end);
          }
        });
      };
 
      $scope.remove = function (job) {
        Jobs.get({ jobId: job._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.jobs) {
          if ($scope.jobs[i] == job) {
            $scope.jobs.splice(i, 1)
          }
        }
        $scope.totalItems--;
      };

      $scope.pageChanged = function(page) {
        $scope.currentPage = page;
        $scope.findPaged();
      };

      $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
      };

      $scope.sortClass = {};
      $scope.sortClass[searchFields[0]] = 'sortable sort-asc sort-desc';

      $scope.changeSort = function (sortField) {
        if ( $scope.sortField == sortField ) {
          $scope.sortOrder *= -1;
        } else {
          $scope.sortOrder = 1;
        }

        $scope.sortClass = {};
        $scope.sortClass[sortField] = $scope.sortOrder == -1 ? 'headerSortDown' : 'headerSortUp';

        $scope.sortField = sortField;
        $scope.findPaged();
      }

    }]);