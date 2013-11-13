window.angular.module('ngff.controllers.map', [])
  .controller('MapController', ['$scope', 'Global', 'Jobs',
    function($scope, Global, Jobs) {
      $scope.global = Global;

      $scope.findJobs = function (query) {
        Jobs.query(query, function (jobs) {
          for ( var i=0; i<jobs.data.length; i++ ) {

          	if ( jobs.data[i].site && jobs.data[i].site.latitude && jobs.data[i].site.longitude ) {
          	  var ll = new google.maps.LatLng(jobs.data[i].site.latitude, jobs.data[i].site.longitude);
			  $scope.myMarkers.push(new google.maps.Marker({
			  	title: jobs.data[i].name + ' in ' + jobs.data[i].site.name,
			    map: $scope.myMap,
			    position: ll
			  }));
			}
          }

          if ( $scope.myMarkers && $scope.myMarkers.length > 0 ) {
          	$scope.myMap.panTo($scope.myMarkers[0].getPosition());
      	  }
        });
      };

		$scope.myMarkers = [];
//		  center: new google.maps.LatLng(-32.7412, 152.1729515),

		var lat = 35.784;
		var lng = -78.670;

		$scope.mapOptions = {
		  center: new google.maps.LatLng(lat, lng),
		  zoom: 15,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		 
		$scope.addMarker = function($event, $params) {
		  $scope.myMarkers.push(new google.maps.Marker({
		    map: $scope.myMap,
		    position: $params[0].latLng
		  }));
		};
		 
		$scope.setZoomMessage = function(zoom) {
		  $scope.zoomMessage = 'You just zoomed to '+zoom+'!';
		  console.log(zoom,'zoomed')
		};
		 
		$scope.openMarkerInfo = function(marker) {
		  $scope.currentMarker = marker;
		  $scope.currentMarkerLat = marker.getPosition().lat();
		  $scope.currentMarkerLng = marker.getPosition().lng();
		  $scope.myInfoWindow.open($scope.myMap, marker);
		};
		 
		$scope.setMarkerPosition = function(marker, lat, lng) {
		  marker.setPosition(new google.maps.LatLng(lat, lng));
		};

	}]);