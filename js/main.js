;(function (){
  'use strict';
   
  angular.module('addressBook', ['ngRoute', 'mgcrea.ngStrap'])
    .config(function($routeProvider){
      $routeProvider
      .when('/', {
        templateUrl: 'views/table.html',
        controller: 'addressBookController',
        controllerAs: 'ab'
    })
    .when('/new', {
      templateUrl : 'views/form.html',
      controller: 'addressBookController',
      controllerAs: 'ab'
    })
    .when('/:id', {
      templateUrl: 'views/show.html',
      controller: 'ShowController',
      controllerAs: 'show'
    })
    .when('/:id/edit', {
      templateUrl: 'views/form.html',
      controller: 'EditController',
      controllerAs: 'ab'
    })
    .otherwise({redirectTo: '/'});
    })
   .controller("ShowController", function($http, $routeParams){
      var vm = this;
      var id = $routeParams.id;
      $http.get("https://addressbookapp.firebaseio.com/contacts/" + id + ".json")
        .success(function(data){
          vm.contact = data;
          console.log(vm.contact);
        })
        .error(function(err){
          console.log(err);
        });
   })
   .controller("EditController", function($http, $routeParams, $location){
     var vm =  this;
     var id = $routeParams.id;
     var url = "https://addressbookapp.firebaseio.com/contacts/" + id + ".json"
     $http.get(url)
     .success(function(data){
        vm.newContact = data;
     })
     .error(function(err){
        console.log(err);
     });

     vm.addNewContact = function(){
       $http.put(url, vm.newContact)
         .success(function(data){
            $location.path('/')
         })
         .error(function(err){
          console.log(err);
         });
     };
   })

    .controller('addressBookController', function($http, $location){
      var vm = this;
      
      $http.get("https://addressbookapp.firebaseio.com/contacts.json")
      .success(function(data){
        vm.contacts = data;
       });

      vm.addNewContact = function(){
      $http.post("https://addressbookapp.firebaseio.com/contacts.json", vm.newContact)
       .success(function(data){
        vm.contacts[data.name] = vm.newContact;
        vm.newContact = null;
      	})
       .error(function(err){
       	  console.log(err);
       });
        
      };
     
     vm.removeContact = function(abId){
       var url ="https://addressbookapp.firebaseio.com/contacts/" + abId + ".json";
       $http.delete(url)
       .success(function(){
         delete vm.contacts[abId];
         console.log(url);
       })
       .error(function(err){
       	  console.log(err);
       });
     }
      vm.newContact = {}
    });
})();
