;(function(){
  'use strict';
  angular.module("addressBook")
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
})();
