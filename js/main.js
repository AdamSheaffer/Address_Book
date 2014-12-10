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
  .factory('abFactory', function($http, $location){

    function getAb(id, cb) {
      var url = "https://addressbookapp.firebaseio.com/contacts/" + id + ".json";
      $http.get(url)
      .success(function(data){
        cb(data);
      })
      .error(function(err){
        console.log(err);
    });
  }
    function editAb(id, ab){
      var url = "https://addressbookapp.firebaseio.com/contacts/" + id + ".json";
      $http.put(url, ab)
      .success(function(data){
        $location.path('/')
      })
      .error(function(err){
        console.log(err);
      });
    };

    function getAllAb(cb){
      $http.get("https://addressbookapp.firebaseio.com/contacts.json")
      .success(function(data){
        cb(data);
      })
      .error(function(err){
        console.log(err);
      });
    }
    function createAb(contact, cb){
      $http.post("https://addressbookapp.firebaseio.com/contacts.json", contact)
      .success(function(data){
        cb(data)
      })
      .error(function(err){
        console.log(err);
      });
    }

    function deleteAb(abId, cb){
      var url = "https://addressbookapp.firebaseio.com/contacts/" + abId + ".json";
      $http.delete(url)
      .success(function(){
        cb()
      })
      .error(function(err){
        console.log(err);
      });
    }

    return {
      getAb: getAb,
      editAb: editAb,
      getAllAb: getAllAb,
      createAb: createAb,
      deleteAb: deleteAb   
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
    });
})();
