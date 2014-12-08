;(function (){
  'use strict';

  angular.module('addressBook', [])
    .controller('addressBookController', function($http){
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
