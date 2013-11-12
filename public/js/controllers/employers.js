window.angular.module('ngff.controllers.employers', [])
  .controller('EmployersController', ['$scope','$routeParams','$location','Global','Titles','States','Countrys','Employers',
    function($scope, $routeParams, $location, Global, Titles,States,Countrys, Employers) {
 
      $scope.global = Global;


      $scope.mainSelected = function(tmpemployer) {
        $scope.tmpemployer = tmpemployer;
      }

      $scope.contactSelected = function(tmpemployer) {
        $scope.tmpemployer = tmpemployer;
      }

      $scope.create = function () {

        if ( !this.employer ) {
          this.employer = $scope.tmpemployer;
        }

        var employer = new Employers({ 

          title: this.employer.title ? this.employer.title._id : null,
          firstname: this.employer.firstname ? this.employer.firstname : null,
          middlename: this.employer.middlename ? this.employer.middlename : null,
          lastname: this.employer.lastname ? this.employer.lastname : null,
          gender: this.employer.gender ? this.employer.gender : null,
          contactable: this.employer.contactable ? this.employer.contactable : null,
          email: this.employer.email ? this.employer.email : null,
          phone: this.employer.phone ? this.employer.phone : null,
          address1: this.employer.address1 ? this.employer.address1 : null,
          address2: this.employer.address2 ? this.employer.address2 : null,
          address3: this.employer.address3 ? this.employer.address3 : null,
          city: this.employer.city ? this.employer.city : null,
          state: this.employer.state ? this.employer.state._id : null,
          postcode: this.employer.postcode ? this.employer.postcode : null,
          country: this.employer.country ? this.employer.country._id : null
        });
 
        employer.$save(function (response) {
          $location.path("employers/" + response._id);
        });
      };
 
      $scope.update = function () {
        var employer = $scope.employer;
 
        employer.$update(function () {
          $location.path('employers/' + employer._id);
        });
      };
 
      $scope.find = function (query) {
        Employers.query(query, function (employers) {
          $scope.employers = employers.data;
        });
      };
 
      $scope.currentPage = 1;
      $scope.totalItems = 100;
      $scope.maxSize = 5;
      $scope.sortOrder = 1;
      var searchFields = ['firstname','middlename','lastname'];
      var sortFields = ['title','firstname','middlename','lastname'];

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

  		
        if ( $scope.titleSearch ) {
          	q2val.title = $scope.titleSearch._id;
        }
        if ( $scope.stateSearch ) {
          	q2val.state = $scope.stateSearch._id;
        }
        if ( $scope.countrySearch ) {
          	q2val.country = $scope.countrySearch._id;
        }

        var query = {
            q2: q2val
            , //search term
            sort_field: $scope.sortField,
            sort_order: $scope.sortOrder,
            page_limit: 10, // page size
            page: $scope.currentPage // page number
        };

        Employers.query(query, function (employers) {
          $scope.employers = employers.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = employers.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Employers.get({ employerId: $routeParams.employerId }, function (employer) {
          $scope.employer = employer;
          
        });
      };
 
      $scope.remove = function (employer) {
        Employers.get({ employerId: employer._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.employers) {
          if ($scope.employers[i] == employer) {
            $scope.employers.splice(i, 1)
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