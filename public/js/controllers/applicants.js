window.angular.module('ngff.controllers.applicants', [])
  .controller('ApplicantsController', ['$scope','$routeParams','$location','Global','Titles','States','Countrys','Applicants',
    function($scope, $routeParams, $location, Global, Titles,States,Countrys, Applicants) {
 
      $scope.global = Global;


      $scope.mainSelected = function(tmpapplicant) {
        $scope.tmpapplicant = tmpapplicant;
      }

      $scope.contactSelected = function(tmpapplicant) {
        $scope.tmpapplicant = tmpapplicant;
      }

      $scope.educationSelected = function(tmpapplicant) {
        $scope.tmpapplicant = tmpapplicant;
      }

      $scope.experienceSelected = function(tmpapplicant) {
        $scope.tmpapplicant = tmpapplicant;
      }

      $scope.preferencesSelected = function(tmpapplicant) {
        $scope.tmpapplicant = tmpapplicant;
      }

      $scope.create = function () {

        if ( !this.applicant ) {
          this.applicant = $scope.tmpapplicant;
        }

        var applicant = new Applicants({ 

          title: this.applicant.title ? this.applicant.title._id : null,
          firstname: this.applicant.firstname ? this.applicant.firstname : null,
          middlename: this.applicant.middlename ? this.applicant.middlename : null,
          lastname: this.applicant.lastname ? this.applicant.lastname : null,
          gender: this.applicant.gender ? this.applicant.gender : null,
          contactable: this.applicant.contactable ? this.applicant.contactable : null,
          dob: this.applicant.dob ? this.applicant.dob : null,
          email: this.applicant.email ? this.applicant.email : null,
          phone: this.applicant.phone ? this.applicant.phone : null,
          address1: this.applicant.address1 ? this.applicant.address1 : null,
          address2: this.applicant.address2 ? this.applicant.address2 : null,
          address3: this.applicant.address3 ? this.applicant.address3 : null,
          city: this.applicant.city ? this.applicant.city : null,
          state: this.applicant.state ? this.applicant.state._id : null,
          postcode: this.applicant.postcode ? this.applicant.postcode : null,
          country: this.applicant.country ? this.applicant.country._id : null,
          highschool: this.applicant.highschool ? this.applicant.highschool : null,
          highschoolDate: this.applicant.highschoolDate ? this.applicant.highschoolDate : null,
          highschoolResults: this.applicant.highschoolResults ? this.applicant.highschoolResults : null,
          university: this.applicant.university ? this.applicant.university : null,
          universityDate: this.applicant.universityDate ? this.applicant.universityDate : null,
          universityResults: this.applicant.universityResults ? this.applicant.universityResults : null,
          postgrad: this.applicant.postgrad ? this.applicant.postgrad : null,
          postgradDate: this.applicant.postgradDate ? this.applicant.postgradDate : null,
          postgradResults: this.applicant.postgradResults ? this.applicant.postgradResults : null,
          experience1: this.applicant.experience1 ? this.applicant.experience1 : null,
          experience1StartDate: this.applicant.experience1StartDate ? this.applicant.experience1StartDate : null,
          experience1EndDate: this.applicant.experience1EndDate ? this.applicant.experience1EndDate : null,
          experience2: this.applicant.experience2 ? this.applicant.experience2 : null,
          experience2StartDate: this.applicant.experience2StartDate ? this.applicant.experience2StartDate : null,
          experience2EndDate: this.applicant.experience2EndDate ? this.applicant.experience2EndDate : null,
          experience3: this.applicant.experience3 ? this.applicant.experience3 : null,
          experience3StartDate: this.applicant.experience3StartDate ? this.applicant.experience3StartDate : null,
          experience3EndDate: this.applicant.experience3EndDate ? this.applicant.experience3EndDate : null,
          minSalary: this.applicant.minSalary ? this.applicant.minSalary : null,
          partTime: this.applicant.partTime ? this.applicant.partTime : null,
          preferredLocation: this.applicant.preferredLocation ? this.applicant.preferredLocation : null,
          availabilityDate: this.applicant.availabilityDate ? this.applicant.availabilityDate : null
        });
 
        applicant.$save(function (response) {
          $location.path("applicants/" + response._id);
        });
      };
 
      $scope.update = function () {
        var applicant = $scope.applicant;
 
        applicant.$update(function () {
          $location.path('applicants/' + applicant._id);
        });
      };
 
      $scope.find = function (query) {
        Applicants.query(query, function (applicants) {
          $scope.applicants = applicants.data;
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

        Applicants.query(query, function (applicants) {
          $scope.applicants = applicants.data;
          if ( $scope.currentPage == 1 ) {
            $scope.totalItems = applicants.count;
          }
        });
      };
 
      $scope.findOne = function () {
        Applicants.get({ applicantId: $routeParams.applicantId }, function (applicant) {
          $scope.applicant = applicant;
          
          if ( $scope.applicant && $scope.applicant.dob ) {
            $scope.applicant.dob = new Date($scope.applicant.dob);
          }
          if ( $scope.applicant && $scope.applicant.highschoolDate ) {
            $scope.applicant.highschoolDate = new Date($scope.applicant.highschoolDate);
          }
          if ( $scope.applicant && $scope.applicant.universityDate ) {
            $scope.applicant.universityDate = new Date($scope.applicant.universityDate);
          }
          if ( $scope.applicant && $scope.applicant.postgradDate ) {
            $scope.applicant.postgradDate = new Date($scope.applicant.postgradDate);
          }
          if ( $scope.applicant && $scope.applicant.experience1StartDate ) {
            $scope.applicant.experience1StartDate = new Date($scope.applicant.experience1StartDate);
          }
          if ( $scope.applicant && $scope.applicant.experience1EndDate ) {
            $scope.applicant.experience1EndDate = new Date($scope.applicant.experience1EndDate);
          }
          if ( $scope.applicant && $scope.applicant.experience2StartDate ) {
            $scope.applicant.experience2StartDate = new Date($scope.applicant.experience2StartDate);
          }
          if ( $scope.applicant && $scope.applicant.experience2EndDate ) {
            $scope.applicant.experience2EndDate = new Date($scope.applicant.experience2EndDate);
          }
          if ( $scope.applicant && $scope.applicant.experience3StartDate ) {
            $scope.applicant.experience3StartDate = new Date($scope.applicant.experience3StartDate);
          }
          if ( $scope.applicant && $scope.applicant.experience3EndDate ) {
            $scope.applicant.experience3EndDate = new Date($scope.applicant.experience3EndDate);
          }
          if ( $scope.applicant && $scope.applicant.availabilityDate ) {
            $scope.applicant.availabilityDate = new Date($scope.applicant.availabilityDate);
          }
        });
      };
 
      $scope.remove = function (applicant) {
        Applicants.get({ applicantId: applicant._id }, function (d) {
          d.$remove();
        });
        for (var i in $scope.applicants) {
          if ($scope.applicants[i] == applicant) {
            $scope.applicants.splice(i, 1)
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