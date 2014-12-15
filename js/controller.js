;(function(){
  'use strict';
  angular.module("addressBook")
  .controller('LoginController', function(){
    var vm = this;
    vm.login = function(){
    var ref = new Firebase("https://addressbookapp.firebaseio.com");
      ref.authWithPassword({
      email    : vm.email,
      password : vm.password
      }, function(error, authData) {
        if (error === null) {
          console.log("User logged in successfully", authData);
        }else {
          console.log("Error loggin user:", error);
        }
      });
    }
    var vm = this;
    vm.register = function(){
    var ref = new Firebase("https://addressbookapp.firebaseio.com");
    ref.createUser({
    email    : vm.email,
    password : vm.password
    }, function(error, authData) {
      if (error === null) {
        console.log("User created successfully", authData);
      } else {
        console.log("Error creating user:", error);
      }
     });
    };
  })   
  .controller("ShowController", function($routeParams, abFactory){
      var vm = this;
      var id = $routeParams.id;
      abFactory.getAb(id, function(data){
        vm.contact = data;
      });
    })
   .controller("EditController", function($routeParams, abFactory){
     var vm =  this;
     var id = $routeParams.id;
     abFactory.getAb(id, function(data){    
        vm.newContact = data;
     });

     vm.addNewContact = function(){
      abFactory.editAb(id, vm.newContact)
    };
   })
    .controller('addressBookController', function($http, abFactory){
      var vm = this;
      abFactory.getAllAb(function(data){
        vm.contacts = data;
       });

      vm.addNewContact = function(){
        abFactory.createAb(vm.newContact, function(data){
        vm.contacts[data.name] = vm.newContact;
        vm.newContact = null;
      	});
      };
     
     vm.removeContact = function(abId){
       abFactory.deleteAb(abId, function(){
         delete vm.contacts[abId];
         console.log(abId);
       });
     };
      vm.newContact = {}
    })
}());