;(function (){
  'use strict';

  angular.module('addressBook', [])
    .controller('addressBookController', function($http){
      var vm = this;
      
      $http.get('https://stephania-volunteer.firebaseio.com/contacts.json')
      .success(function(data){
        vm.contacts = data;
       });

      vm.addNewContact = function(){
      $http.post('https://stephania-volunteer.firebaseio.com/contacts.json', vm.newContact)
       .sucess(function(data){
         vm.contacts[data.name] = vm.newContact;
         vm.newContact = {};
      	});
        //vm.contacts.push(vm.newContact);
        //vm.newContact = null;
		//console.log("add new contact is firing. new info is:" + vm.newContact.name);
      };
     
     vm.removeContact = function(abId){
       var url ="https://stephania-volunteer.firebaseio.com/" + abId + ".json";
       $http.delet(url)
       .success(function(){
         delete vm.contacts[ab];
       });
       //var index = vm.contacts.indexOf(contact);
       //vm.contacts.splice(index, 1);
     }
      vm.newContact = {}
    });
})();
