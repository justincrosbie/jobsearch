window.angular.module('ngff.controllers.states', [])
  .controller('StatesController', ['$scope','$routeParams','$location','Global','States',
    function($scope, $routeParams, $location, Global,  States) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.state ) {
          this.state = $scope.tmpstate;
        }

        var state = new States({ 

          name: this.state.name ? this.state.name : null,
          abbr: this.state.abbr ? this.state.abbr : null
        });
 
        state.$save(function (response) {
          $location.path("states/" + response._id);
        });
      };
 
      $scope.update = function () {
        var state = $scope.state;
 
        state.$update(function () {
          $location.path('states/' + state._id);
        });
      };
 
      $scope.find = function (query) {
        States.query(query, function (states) {
          $scope.states = states.data;
        });
      };
 
      $scope.currentPage = 1;
      $scope.totalItems = 100;
      $scope.maxSize = 5;
      $scope.sortOrder = 1;
      var searchFields = [];
      var sortFields = [];

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

        States.query(query, function (states) {
          $scope.states = states.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = states.count;
          }
        });
      };
 
      $scope.findOne = function () {
        States.get({ stateId: $routeParams.stateId }, function (state) {
          $scope.state = state;
          
        });
      };
 
      $scope.remove = function (state) {
        States.get({ stateId: state._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.states) {
          if ($scope.states[i] == state) {
            $scope.states.splice(i, 1)
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