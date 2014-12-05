;(function (){
  'use strict';

  angular.module('addressBook', []) {
    .controller('addressBookController', function(){
      var vm = this;

      vm.contacts = [
        {
          name: 'Adam Sheaffer',
          email: 'adam.e.sheaffer@gmail.com',
          phone: 215-760-0392
        },
        {
          name: 'Stephania Iyob',
          email: 'StephaniaIyob@gmail.com',
          phone: 202-569-3450
        }
      ];

      vm.addNewContact = function(){
        vm.contacts.push(vm.newContact)
      }


    })
  }

})();
