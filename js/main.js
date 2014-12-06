;(function (){
  'use strict';

  angular.module('addressBook', [])
    .controller('addressBookController', function(){
      var vm = this;

      vm.contacts = [
        {
          name: 'Adam Sheaffer',
          email: 'adam.e.sheaffer@gmail.com',
          phone: '215-760-0392',
          image: 'https://avatars1.githubusercontent.com/u/9039241?v=3&s=460'
        },
        {
          name: 'Stephania Iyob',
          email: 'stephaniaiyob@gmail.com',
          phone: '202-569-3450',
          image: 'https://avatars3.githubusercontent.com/u/9039275?v=3&s=460'
        },
        {
          name: 'Steve Jobs',
          email: 'stevejobs@gmail.com',
          phone: '123-456-789',
          image: 'http://i.imgur.com/ZOjAIb.jpg'
        },
        {
          name: 'Paulo Coelho',
          email: 'pauloc@gmail.com',
          phone: '123-456-789',
          image: 'http://i.imgur.com/7jpxQxLb.jpg'
        },

      ];
      

      vm.addNewContact = function(){
        vm.contacts.push(vm.newContact);
        vm.newContact = null;
		 	  //console.log("add new contact is firing. new info is:" + vm.newContact.name);
      };
     
     vm.removeContact = function(contact){
       var index = vm.contacts.indexOf(contact);
       vm.contacts.splice(index, 1);

     }
      vm.newContact = {}
    })
})();
