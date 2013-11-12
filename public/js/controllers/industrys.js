window.angular.module('ngff.controllers.industrys', [])
  .controller('IndustrysController', ['$scope','$routeParams','$location','Global','Industrys',
    function($scope, $routeParams, $location, Global,  Industrys) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.industry ) {
          this.industry = $scope.tmpindustry;
        }

        var industry = new Industrys({ 

          name: this.industry.name ? this.industry.name : null
        });
 
        industry.$save(function (response) {
          $location.path("industrys/" + response._id);
        });
      };
 
      $scope.update = function () {
        var industry = $scope.industry;
 
        industry.$update(function () {
          $location.path('industrys/' + industry._id);
        });
      };
 
      $scope.find = function (query) {
        Industrys.query(query, function (industrys) {
          $scope.industrys = industrys.data;
        });
      };
 
      $scope.currentPage = 1;
      $scope.totalItems = 100;
      $scope.maxSize = 5;
      $scope.sortOrder = 1;
      var searchFields = ['name'];
      var sortFields = ['name'];

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

  		

        var query = {
            q2: q2val
            , //search term
            sort_field: $scope.sortField,
            sort_order: $scope.sortOrder,
            page_limit: 10, // page size
            page: $scope.currentPage // page number
        };

        Industrys.query(query, function (industrys) {
          $scope.industrys = industrys.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = industrys.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Industrys.get({ industryId: $routeParams.industryId }, function (industry) {
          $scope.industry = industry;
          
        });
      };
 
      $scope.remove = function (industry) {
        Industrys.get({ industryId: industry._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.industrys) {
          if ($scope.industrys[i] == industry) {
            $scope.industrys.splice(i, 1)
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