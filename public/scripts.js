var myApp=angular.module('myApp', ["xeditable"]);

myApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

myApp.controller('Ctrl', function($scope, $filter, $http) {

  $scope.outsideArray=[];
  var objectToSend = {};

  $scope.getRoom = function() {
    console.log("in getRoom function in script");
    roomToSend = {
         room_number: $scope.roomnum
     };
     console.log(roomToSend);
    $http({   // gets recordset via POST
      method: 'POST',
      url: '/getRoom',
      data: roomToSend
    }).then(function() {
      $scope.showRoom();
    });
  }; // end getRoom function

 $scope.roomToShow = [];

$scope.showRoom = function() {
  console.log("in show room function in script");
  $http({   // gets recordset via GET
    method: 'GET',
    url: '/showRoom',
  }).then( function(response){  // success call - runs function with response parameter
  // console.log(response.data);
    $scope.roomToShow = response.data;  // pulls the data from app.js and sets to global var roomToShow
    console.log($scope.roomToShow);
  }, function myError(response){
    console.log(response.statusText);
  }// end error function
  ); // end then response
  $scope.roomnum="";
}; // end showRoom function

$scope.makeSqlHappy=function(recordroom_number, recordroom_type, recordcapacity, recordprice, recordcheck_in_date, recordcheck_out_date, recordnotes, recordid) {
  console.log('in makeSqlHappy');
  console.log("data from makeSqlHappy: ", recordroom_number, recordroom_type, recordcapacity, recordprice, recordcheck_in_date, recordcheck_out_date, recordnotes);
  console.log("makeSqlHappy's stinkin id: ", recordid);
  var id=recordid;
  var data={
    room_number: recordroom_number,
    room_type: recordroom_type,
    capacity: recordcapacity,
    price: recordprice,
    check_in_date: recordcheck_in_date,
    check_out_date: recordcheck_out_date,
    notes: recordnotes
  };
  console.log(data);
  $http({
    method: 'PUT',
    url: '/saveRoom/' +id,
    data: data
  });
};

}); //end controller
