window.angular.module('ngff.controllers.sites', [])
  .controller('SitesController', ['$scope','$routeParams','$location','Global','States','Countrys','Sites',
    function($scope, $routeParams, $location, Global, States,Countrys, Sites) {
 
      $scope.global = Global;


      $scope.create = function () {

        if ( !this.site ) {
          this.site = $scope.tmpsite;
        }

        var site = new Sites({ 

          name: this.site.name ? this.site.name : null,
          phone: this.site.phone ? this.site.phone : null,
          address1: this.site.address1 ? this.site.address1 : null,
          address2: this.site.address2 ? this.site.address2 : null,
          address3: this.site.address3 ? this.site.address3 : null,
          city: this.site.city ? this.site.city : null,
          state: this.site.state ? this.site.state._id : null,
          postcode: this.site.postcode ? this.site.postcode : null,
          country: this.site.country ? this.site.country._id : null,
          latitude: this.site.latitude ? this.site.latitude : null,
          longitude: this.site.longitude ? this.site.longitude : null
        });
 
        site.$save(function (response) {
          $location.path("sites/" + response._id);
        });
      };
 
      $scope.update = function () {
        var site = $scope.site;
 
        site.$update(function () {
          $location.path('sites/' + site._id);
        });
      };
 
      $scope.find = function (query) {
        Sites.query(query, function (sites) {
          $scope.sites = sites.data;
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

        Sites.query(query, function (sites) {
          $scope.sites = sites.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = sites.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Sites.get({ siteId: $routeParams.siteId }, function (site) {
          $scope.site = site;
          
        });
      };
 
      $scope.remove = function (site) {
        Sites.get({ siteId: site._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.sites) {
          if ($scope.sites[i] == site) {
            $scope.sites.splice(i, 1)
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