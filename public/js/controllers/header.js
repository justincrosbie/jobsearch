  window.angular.module('ngff.controllers.header', [])
  .controller('HeaderController', ['$scope', 'Global',
    function ($scope, Global) {
      $scope.global = Global;
 		$scope.currentAppName = Global.currentAppName();

      $scope.changeNavbar = function(link) {

        $scope.navbarEntries = $scope.apps[link].navbarEntries;
        $scope.navbarAdminEntries = $scope.apps[link].navbarAdminEntries;

      	Global.currentApp(link);
      	Global.introMessage($scope.apps[link].description);
 		$scope.currentAppName = Global.currentAppName();
      }
 
 		var employerLink = "employers/create";
 		if ( Global.currentUser() && Global.currentUser().employer ) {
 			employerLink = "employers/" + Global.currentUser().employer + "/edit";
 		}

 		var applicantLink = "applicants/create";
 		if ( Global.currentUser() && Global.currentUser().applicant ) {
 			applicantLink = "applicants/" + Global.currentUser().applicant + "/edit";
 		}

		$scope.apps = {

		  "employers":
		  {
		    "title": "Employers",
		    "link": "employers",
		    "description": "",
		    "navbarEntries": 
		    [
		      
			  {
			    "title": "Employer Details",
			    "link": employerLink
			  },
			  {
			    "title": "Locations",
			    "link": "sites"
			  },
			  {
			    "title": "Jobs",
			    "link": "jobs"
			  },
			  {
			    "title": "Applicants",
			    "link": "applicants"
			  },
			  {
			    "title": "Calendar",
			    "link": "jobsCalendar"
			  },
			  {
			    "title": "Jobs Map",
			    "link": "jobsMap"
			  }
			],
			"navbarAdminEntries":
			[
		      
			]
		  },

		  "applicants":
		  {
		    "title": "Applicants",
		    "link": "applicants",
		    "description": "",
		    "navbarEntries": 
		    [
		      
			  {
			    "title": "Applicant Details",
			    "link": applicantLink
			  },
			  {
			    "title": "Jobs",
			    "link": "jobs"
			  },
			  {
			    "title": "Jobs Map",
			    "link": "jobsMap"
			  }
			],
			"navbarAdminEntries":
			[
		      
			]
		  }
		};
		
		var appsArray = ['applicants','employers'];


		$scope.navbarEntries = $scope.apps[appsArray[0]].navbarEntries;
		$scope.navbarAdminEntries = $scope.apps[appsArray[0]].navbarAdminEntries;

		if ( Global.currentUser() && Global.currentUser().accountType == 2 ) {
			$scope.navbarEntries = $scope.apps['employers'].navbarEntries;
			$scope.navbarAdminEntries = $scope.apps['employers'].navbarAdminEntries;
		}

    }]);