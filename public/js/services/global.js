window.angular.module('ngff.services.global', [])
  .factory('Global', function(){
    var current_user = window.user;
    var apps = ['employers','applicants'];
    var current_app = apps[0];

    return {
      currentUser: function() {
        return current_user;
      },
      isSignedIn: function() {
        return !!current_user;
      },
      currentApp: function(app) {
        if ( app ) {
          current_app = app;
        }
        return current_app;
      },
      introMessage: function(str) {
        return 'test';
      },
      currentAppName: function() {

        if ( current_app == 'employers' ) {
          return 'Employers';
        }

        if ( current_app == 'applicants' ) {
          return 'Applicants';
        }
     return 'No Name';
      }

      ,countrySelect: {
        placeholder: "Search for a Country",
        minimumInputLength: 1,
        allowClear: true,
        ajax: {
            url: "/countrys",
            data: function (term, page) { // page is the one-based page number tracked by Select2
			    var searchFields = ['name','iso'];
		        var termArray = term.split(' ');
		        var qval = {};
		        for ( var i=0; i<termArray.length; i++ ) {
        			if ( i <= searchFields.length ) {
        				qval[searchFields[i]] = { $regex : termArray[i] + '.*', $options: 'i' };
        			}
        		}

                return {
                    q: qval,
                    page_limit: 10, // page size
                    page: page // page number
                };
            },
            results: function (responseObj, page) {
                var more = responseObj.data.length > 0; // whether or not there are more results available

                // notice we return the value of more so Select2 knows if more results can be loaded
                return {results: responseObj.data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            if (id!=="") {
                $.ajax("/countrys/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name + " " + result.iso; },
        formatSelection: function (result) { return result.name + " " + result.iso; },
        escapeMarkup: function (m) { return m; }     
      }

      ,employerSelect: {
        placeholder: "Search for a Employer",
        minimumInputLength: 1,
        allowClear: true,
        ajax: {
            url: "/employers",
            data: function (term, page) { // page is the one-based page number tracked by Select2
			    var searchFields = ['firstname','middlename','lastname'];
		        var termArray = term.split(' ');
		        var qval = {};
		        for ( var i=0; i<termArray.length; i++ ) {
        			if ( i <= searchFields.length ) {
        				qval[searchFields[i]] = { $regex : termArray[i] + '.*', $options: 'i' };
        			}
        		}

                return {
                    q: qval,
                    page_limit: 10, // page size
                    page: page // page number
                };
            },
            results: function (responseObj, page) {
                var more = responseObj.data.length > 0; // whether or not there are more results available

                // notice we return the value of more so Select2 knows if more results can be loaded
                return {results: responseObj.data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            if (id!=="") {
                $.ajax("/employers/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.firstname + " " + result.middlename + " " + result.lastname; },
        formatSelection: function (result) { return result.firstname + " " + result.middlename + " " + result.lastname; },
        escapeMarkup: function (m) { return m; }     
      }

      ,siteSelect: {
        placeholder: "Search for a Site",
        minimumInputLength: 1,
        allowClear: true,
        ajax: {
            url: "/sites",
            data: function (term, page) { // page is the one-based page number tracked by Select2
			    var searchFields = ['name'];
		        var termArray = term.split(' ');
		        var qval = {};
		        for ( var i=0; i<termArray.length; i++ ) {
        			if ( i <= searchFields.length ) {
        				qval[searchFields[i]] = { $regex : termArray[i] + '.*', $options: 'i' };
        			}
        		}

                return {
                    q: qval,
                    page_limit: 10, // page size
                    page: page // page number
                };
            },
            results: function (responseObj, page) {
                var more = responseObj.data.length > 0; // whether or not there are more results available

                // notice we return the value of more so Select2 knows if more results can be loaded
                return {results: responseObj.data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            if (id!=="") {
                $.ajax("/sites/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name; },
        formatSelection: function (result) { return result.name; },
        escapeMarkup: function (m) { return m; }     
      }

      ,jobSelect: {
        placeholder: "Search for a Job",
        minimumInputLength: 1,
        allowClear: true,
        ajax: {
            url: "/jobs",
            data: function (term, page) { // page is the one-based page number tracked by Select2
			    var searchFields = ['name'];
		        var termArray = term.split(' ');
		        var qval = {};
		        for ( var i=0; i<termArray.length; i++ ) {
        			if ( i <= searchFields.length ) {
        				qval[searchFields[i]] = { $regex : termArray[i] + '.*', $options: 'i' };
        			}
        		}

                return {
                    q: qval,
                    page_limit: 10, // page size
                    page: page // page number
                };
            },
            results: function (responseObj, page) {
                var more = responseObj.data.length > 0; // whether or not there are more results available

                // notice we return the value of more so Select2 knows if more results can be loaded
                return {results: responseObj.data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            if (id!=="") {
                $.ajax("/jobs/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name; },
        formatSelection: function (result) { return result.name; },
        escapeMarkup: function (m) { return m; }     
      }

      ,applicantSelect: {
        placeholder: "Search for a Applicant",
        minimumInputLength: 3,
        allowClear: true,
        ajax: {
            url: "/applicants",
            data: function (term, page) { // page is the one-based page number tracked by Select2
			    var searchFields = ['firstname','middlename','lastname'];
		        var termArray = term.split(' ');
		        var qval = {};
		        for ( var i=0; i<termArray.length; i++ ) {
        			if ( i <= searchFields.length ) {
        				qval[searchFields[i]] = { $regex : termArray[i] + '.*', $options: 'i' };
        			}
        		}

                return {
                    q: qval,
                    page_limit: 10, // page size
                    page: page // page number
                };
            },
            results: function (responseObj, page) {
                var more = responseObj.data.length > 0; // whether or not there are more results available

                // notice we return the value of more so Select2 knows if more results can be loaded
                return {results: responseObj.data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            if (id!=="") {
                $.ajax("/applicants/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.firstname + " " + result.middlename + " " + result.lastname; },
        formatSelection: function (result) { return result.firstname + " " + result.middlename + " " + result.lastname; },
        escapeMarkup: function (m) { return m; }     
      }
      


      ,titleSelect: {
        minimumResultsForSearch: -1,
        placeholder: "Select a Title",
        allowClear: true,
        ajax: {
            url: "/titles",
            results: function (responseObj, page) {
                var more = (page * 10) < responseObj.data.length;
                return {results: responseObj.data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            if (id!=="") {
                $.ajax("/titles/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name; },
        formatSelection: function (result) { return result.name; },
        escapeMarkup: function (m) { return m; }     
      }

      ,categorySelect: {
        minimumResultsForSearch: -1,
        placeholder: "Select a Category",
        allowClear: true,
        ajax: {
            url: "/categorys",
            results: function (responseObj, page) {
                var more = (page * 10) < responseObj.data.length;
                return {results: responseObj.data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            if (id!=="") {
                $.ajax("/categorys/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name; },
        formatSelection: function (result) { return result.name; },
        escapeMarkup: function (m) { return m; }     
      }

      ,industrySelect: {
        minimumResultsForSearch: -1,
        placeholder: "Select a Industry",
        allowClear: true,
        ajax: {
            url: "/industrys",
            results: function (responseObj, page) {
                var more = (page * 10) < responseObj.data.length;
                return {results: responseObj.data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            if (id!=="") {
                $.ajax("/industrys/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name; },
        formatSelection: function (result) { return result.name; },
        escapeMarkup: function (m) { return m; }     
      }

      ,stateSelect: {
        minimumResultsForSearch: -1,
        placeholder: "Select a State",
        allowClear: true,
        ajax: {
            url: "/states",
            results: function (responseObj, page) {
                var more = (page * 10) < responseObj.data.length;
                return {results: responseObj.data, more: more};
            }
        },
        initSelection: function(element, callback) {
            var id=$(element).val();
            if (id!=="") {
                $.ajax("/states/"+id).done(function(data) { callback(data); });
            }
        },
        id: function (e) { return e._id; },
        formatResult: function (result) { return result.name; },
        formatSelection: function (result) { return result.name; },
        escapeMarkup: function (m) { return m; }     
      }
      

    };
  });