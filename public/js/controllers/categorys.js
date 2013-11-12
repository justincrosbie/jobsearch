window.angular.module('ngff.controllers.categorys', [])
  .controller('CategorysController', ['$scope','$routeParams','$location','Global','Categorys',
    function($scope, $routeParams, $location, Global,  Categorys) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.category ) {
          this.category = $scope.tmpcategory;
        }

        var category = new Categorys({ 

          name: this.category.name ? this.category.name : null
        });
 
        category.$save(function (response) {
          $location.path("categorys/" + response._id);
        });
      };
 
      $scope.update = function () {
        var category = $scope.category;
 
        category.$update(function () {
          $location.path('categorys/' + category._id);
        });
      };
 
      $scope.find = function (query) {
        Categorys.query(query, function (categorys) {
          $scope.categorys = categorys.data;
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

        Categorys.query(query, function (categorys) {
          $scope.categorys = categorys.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = categorys.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Categorys.get({ categoryId: $routeParams.categoryId }, function (category) {
          $scope.category = category;
          
        });
      };
 
      $scope.remove = function (category) {
        Categorys.get({ categoryId: category._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.categorys) {
          if ($scope.categorys[i] == category) {
            $scope.categorys.splice(i, 1)
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