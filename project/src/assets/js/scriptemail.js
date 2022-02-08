// create angular app with bootstrap and ng-tags-input dependency
var formApp = angular.module('formApp', ['ngAnimate', 'ui.bootstrap','ngTagsInput','toaster']);

// create angular controller
formApp.controller('mainController', function($http, toaster) {
  var vm = this;
  vm.ccLabel = false;
  vm.loadUserEmails = loadUserEmails;
  vm.submitForm = submitForm;
  vm.cancelForm = cancelForm;
  vm.to = [{
    name: "Sandy K",
    email: "sandy@gmail.com"
  }];
  vm.cc = [{
    name: "Derrick",
    email: "rose@gmail.com"
  }];
  vm.subject = "Test Email";

	// function to load user emails from json file			
  function loadUserEmails($query) {
    return $http.get('emails.json', {
      cache: true
    }).then(function(response) {
      var emails = response.data;
      return emails.filter(function(email) {
        return email.name.toLowerCase().indexOf($query.toLowerCase()) !== -1;
      });
    });
  }
  
  // function to sent an email			
  function submitForm() {
    toaster.pop('success', "Email Sent Successfully", "");
  }
  
  // function to cancel email
  function cancelForm() {
    toaster.pop('error', "Email Sending cancelled", "");
  }

});