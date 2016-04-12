'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appApp
 */
 angular.module('mainApp', ['ngResource','ui.router','mgcrea.ngStrap.typeahead','ui.calendar','ngDialog'])
  .config(function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/mainsearch');
      $stateProvider
        .state('mainsearch', {
          url : '/mainsearch',
          templateUrl : 'scripts/search/mainPageSearch.tmpl.html',
          controller : 'MainSearchCtrl'
      }).state('navbar', {
          url : '/lecturer/:lecturerindex',
          templateUrl : 'scripts/navbar/main.tpl.html',
          controller : 'NavbarCtrl'
      }).state('navbar.calendar', {
          url : '/calendar',
          templateUrl : 'scripts/calendar/calendar.tpl.html',
          controller : 'CalendarCtrl'
      }).state('navbar.contact', {
          url : '/contact',
          templateUrl : 'scripts/contact/contact.tpl.html',
          controller : 'ContactCtrl'
      });

  }).factory('coursesSearchSrv', function($resource){

      var res = $resource('http://localhost:8080/student-helper/courses/:operation/:courseId', {}, {
          getAllCourses : {
              method : 'GET',
              isArray : true
          },
          getCourse : {
              method : 'GET',
              params : {
                 operation : 'course'
              }
          },
          coursesForLecturer : {
              method : 'GET',
              params : {
                operation : 'lecturer'
              },
              isArray : true
          }

      });
      return res;
    }).factory('lecturersSearchSrv', function($resource){
     var res = $resource('http://localhost:8080/student-helper/lecturers/:operation/:lecturerId', {}, {

         getAllLecturers : {
             method : 'GET',
             isArray : true
         },
         getLecturer : {
             method : 'GET',
             params : {
                 operation : 'lecturer'
             }
         }

     });
     return res;
  }).factory('buildingsSearchSrv', function($resource){
       var res = $resource('http://localhost:8080/student-helper/buildings/:operation/:lecturerId', {}, {

           getRemedialInfo : {
               method : 'GET',
             isArray:true,
               params : {
                   operation : 'lecturer'
               }
           }
       });
       return res;
   }).controller('MainSearchCtrl',['$scope', 'coursesSearchSrv','buildingsSearchSrv','lecturersSearchSrv','$stateParams','$state', function ($scope, coursesSearchSrv, buildingsSearchSrv,lecturersSearchSrv,$stateParams,$state) {

      $scope.buildings = [];
      $scope.courses = [];
      $scope.lecturersNames = [];
      $scope.allLecturers = [];
      $scope.searchText = "";
      $scope.didPerformFirstSearch = false;
      $scope.searchIndeks = {};

      $scope.performSearch = function () {
      console.log("performSearch");
        $scope.searchIndeks = $scope.lecturersNames.indexOf($scope.searchText) ;
        $scope.lectur = $scope.allLecturers[$scope.searchIndeks];

        if($scope.searchIndeks != -1) {
          $scope.didPerformFirstSearch = true;
          $state.go("navbar", {lecturerindex : $scope.lectur.id});
        } else {
          console.info("errror")
        }
      };

 // LECTURER

      $scope.getAllLecturers = function() {
          lecturersSearchSrv.getAllLecturers({}, function(response){
              $scope.allLecturers = response;
              $scope.extractLecturersNames(response);
          })
      };
      $scope.extractLecturersNames = function(lecturers) {
          $scope.lecturersNames = lecturers.map(function(obj){
             var string =  obj.title + " " + obj.name + " " + obj.surname;
             return string.charAt(0).toUpperCase() + string.slice(1);
          });
      };
      $scope.getAllLecturers();

      $scope.getLecturer = function(lecturer) {
          lecturersSearchSrv.getLecturer({lecturerId : lecturer.id}, function(response){
              $scope.currentLecturer = response;
          })
      };


}]).controller('NavbarCtrl',['$scope', 'coursesSearchSrv','buildingsSearchSrv','lecturersSearchSrv','$stateParams', function ($scope, coursesSearchSrv, buildingsSearchSrv,lecturersSearchSrv,$stateParams) {

       $scope.buildings = [];
       $scope.courses = [];
       $scope.lecturersNames = [];
       $scope.allLecturers = [];
       $scope.searchText = "";
       $scope.didPerformFirstSearch = false;
       $scope.searchIndeks = $stateParams.lecturerindex;
       $scope.currentLecturer = {};


       $scope.performSearch = function () {
       console.log("performSearch");
         $scope.searchIndeks = $scope.lecturersNames.indexOf($scope.searchText) ;
         $scope.searchIndeks = $scope.allLecturers[$scope.searchIndeks];
         $scope.searchIndeks = $scope.searchIndeks.id;
         $scope.getLecturer($scope.searchIndeks);
         if($scope.searchIndeks != -1) {
           $scope.didPerformFirstSearch = true;
         } else {
           console.info("errror")
         }
       };

  // LECTURER

       $scope.getAllLecturers = function() {
           lecturersSearchSrv.getAllLecturers({}, function(response){
               $scope.allLecturers = response;
               $scope.extractLecturersNames(response);
           })
       };
       $scope.extractLecturersNames = function(lecturers) {
           $scope.lecturersNames = lecturers.map(function(obj){
              var string =  obj.title + " " + obj.name + " " + obj.surname;
              return string.charAt(0).toUpperCase() + string.slice(1);
           });
       };
       $scope.getAllLecturers();

       $scope.getLecturer = function(lecturerid) {
           lecturersSearchSrv.getLecturer({lecturerId : lecturerid}, function(response){
               $scope.currentLecturer = response;
               var string = response.title+" "+response.name +" "+ response.surname;
               $scope.searchText = string.charAt(0).toUpperCase() + string.slice(1);
           })
       };

       $scope.getLecturer($scope.searchIndeks);

}]).controller('CalendarCtrl', function ($scope, lecturersSearchSrv, coursesSearchSrv, buildingsSearchSrv, ngDialog) {
var startOfWeek = moment().startOf('week').toDate();
   //var d = firstday.getDate();
   var d = startOfWeek.getDate()+1;
   var e = startOfWeek.getDate()+6;


   function returnHourOrMinute(time, i){
     var v = time.split(":");
     if(v.length > 1)
      return v[i];
     else
       var v = time.split(".");
     return v[i];
   }

   function getColor(c){
     switch(c){
       case "L","l":
       {
         return "green";
         break;
       }
       case "W","w":
       {
         return "orange";
         break;
       }
       case "P","p":
       {
         return "red";
         break;
       }
       case "C","c":
       {
         return "blue";
         break;
       }
       case "S","s":
       {
         return "purple";
         break;
       }
     }
   }

   var events = [

     { title: 'Modele systemów dynamicznych <br> dr inż. Krzysztof Brzostowski <br> D-1 312a', start: new Date(2016, 3, d, 13, 15), end: new Date(2016, 3, d, 15, 0), color: 'blue' },
     { title: 'Wstęp do programowania <br> dr inż. Krzysztof Brzostowski <br> B-4 409a', start: new Date(2016, 3, d, 15, 15), end: new Date(2016, 3, d, 16, 55), color: 'orange' },
     { title: 'Modele systemów dynamicznych <br> dr inż. Krzysztof Brzostowski <br> B-4 444', start: new Date(2016, 3, d, 17, 5), end: new Date(2016, 3, d, 18, 55), color: 'blue' },

     { title: 'Zespołowe przedsięwzięcie inżynierskie <br> dr inż. Krzysztof Brzostowski <br> B-1 408', start: new Date(2016, 3, d + 2, 7, 30), end: new Date(2016, 3, d + 2, 11, 0), color: 'red' },
     { title: 'Modele systemów dynamicznych <br> dr inż. Krzysztof Brzostowski <br> C-13 0.32', start: new Date(2016, 3, d + 2, 11, 15), end: new Date(2016, 3, d + 2, 13, 0), color: 'blue' },
     { title: 'Modele systemów dynamicznych <br> dr inż. Krzysztof Brzostowski <br> D-1 311c', start: new Date(2016, 3, d + 2, 13, 15), end: new Date(2016, 3, d + 2, 15, 0), color: 'blue' },

     { title: 'Identyfikacja systemów <br> dr inż. Krzysztof Brzostowski <br> B-4 444', start: new Date(2016, 3, d + 3, 9, 15), end: new Date(2016, 3, d + 3, 11, 0), color: 'green' },
     { title: 'Identyfikacja systemów <br> dr inż. Krzysztof Brzostowski <br> B-4 444', start: new Date(2016, 3, d + 3, 11, 15), end: new Date(2016, 3, d + 3, 13, 0), color: 'green' },
     { title: 'Wstęp do programowania <br> dr inż. Krzysztof Brzostowski <br> B-4 444', start: new Date(2016, 3, d + 3, 13, 15), end: new Date(2016, 3, d + 3, 15, 0), color: 'green' },
     { title: 'Wstęp do programowania <br> dr inż. Krzysztof Brzostowski <br> B-4 444', start: new Date(2016, 3, d + 3, 15, 15), end: new Date(2016, 3, d + 3, 16, 55), color: 'green' },

     { title: 'Identyfikacja systemów <br> dr inż. Krzysztof Brzostowski <br> D-2 333b', start: new Date(2016, 3, d + 4, 11,15), end: new Date(2016, 3, d + 4, 13, 0), color: 'green' },
     { title: 'Identyfikacja systemów <br> dr inż. Krzysztof Brzostowski <br> D-2 127c', start: new Date(2016, 3, d + 4, 13, 15), end: new Date(2016, 3, d + 4, 15, 0), color: 'green' }
  ];


// COURSES
   var calendarCtrl = this;
   calendarCtrl.backupOfCourses = [];
   calendarCtrl.showForm = false;
   $scope.countCourses = 0;

   $scope.getAllCourses = function() {
       if($scope.courses.length==0){coursesSearchSrv.getAllCourses({}, function(response){$scope.courses = response;})}
   };

   var c;
   $scope.getAllCoursesForLecturer = function(lecturerid){
       coursesSearchSrv.coursesForLecturer({courseId : lecturerid}, function(response){

          $scope.courses = response;
         calendarCtrl.backupOfCourses = response;
         calendarCtrl.getTypesOfCourses();
         calendarCtrl.showForm = true;
         $scope.countCourses = $scope.courses.length;

         var startOfWeek = moment().startOf('week').toDate();
         //var d = firstday.getDate();
         var d = startOfWeek.getDate();
         var m = new Date().getMonth();

         for(var i = 0; i < $scope.countCourses; i++){
           c = new Object({"title":$scope.courses[i].name+"<br> "+$scope.courses[i].lecturer.title+" "+$scope.courses[i].lecturer.name+" "+$scope.courses[i].lecturer.surname+"<br> "+$scope.courses[i].address.budynek+" "+$scope.courses[i].address.sala, "start":new Date(2016, m, (parseInt(d)+parseInt($scope.courses[i].dayOfWeek)), returnHourOrMinute($scope.courses[i].startTime, 0), returnHourOrMinute($scope.courses[i].startTime, 1)),
           "end":new Date(2016, m, (parseInt(d)+parseInt($scope.courses[i].dayOfWeek)), returnHourOrMinute($scope.courses[i].endTime, 0), returnHourOrMinute($scope.courses[i].endTime, 1)),
           "color":getColor($scope.courses[i].type),"_id":i});
          }
         console.log(events);
         console.log([c]);
         $scope.result = [[c]];
       })
   };

   $scope.getAllCoursesForLecturer($scope.searchIndeks);

   $scope.getCourse = function(course) {
       coursesSearchSrv.getCourse({courseId : course.id}, function(response){
           $scope.currentCourse = response;
       })
   };

   //FILTER
   calendarCtrl.types = [];
   calendarCtrl.avalaibleTypes = [];

   calendarCtrl.getTypesOfCourses = function(){
     for(var i = 0; i < $scope.courses.length; i++){
       var course = $scope.courses[i];
       if(calendarCtrl.types.indexOf(course.type.toLowerCase()) == -1) {
         calendarCtrl.types.push(course.type.toLowerCase());
         calendarCtrl.avalaibleTypes.push(course.type.toLowerCase());
       }
     }
   };

   calendarCtrl.changeStateOfType = function(type) {
     var index = calendarCtrl.types.indexOf(type);
     if( index != -1) {
       calendarCtrl.types.splice(index,1);
     }else {
       calendarCtrl.types.push(type);
     }
     calendarCtrl.changeScopeOfLecturers();
   };

   calendarCtrl.changeScopeOfLecturers = function(){
     var tempArray = [];
     for (var i = 0; i < calendarCtrl.types.length; i++) {
       for(var j = 0; j < calendarCtrl.backupOfCourses.length ; j++) {
         if (calendarCtrl.backupOfCourses[j].type.toLowerCase() == calendarCtrl.types[i]) {
           tempArray.push(calendarCtrl.backupOfCourses[j]);
         }
       }
     }
     $scope.courses = tempArray;
     $scope.countCourses = $scope.courses.length;
   };

   calendarCtrl.shouldShowCheckbox = function(value) {
     return calendarCtrl.avalaibleTypes.indexOf(value) != -1;
   };

// BUILDINGS
   $scope.getAllBuildings = function() {
       coursesSearchSrv.getAllBuildings({}, function(response){
           $scope.buildings = response;
       })
   };

   $scope.calOptions = {
     header: {
       left: 'null',
       center: "Kalendarzyk",
       right: 'null'
     },
     defaultView: 'agendaWeek',
     slotDuration: '00:30:00',
     minTime: '07:00:00',
     maxTime: '21:00:00',
     firstDay: 1,
     allDay: false,
     lang: 'pl',
     height: 725
   };

   //POPOVER

   $scope.openPopover = function(courseName, building ,lat, lng) {
     ngDialog.open({
       template:'popoverTemplate',
       data: [courseName,building,lat,lng],
       className:'ngdialog-theme-default',
       controller: function ($scope,$window, $timeout) {

         $scope.popCourseName = $scope.ngDialogData[0];
         $scope.popBuilding = $scope.ngDialogData[1];

         function initMap(){
           $window.map = new google.maps.Map(document.getElementById('mapPop'), {
             center: new google.maps.LatLng( $scope.ngDialogData[2], $scope.ngDialogData[3]),
             zoom: 16
           });
           var marker = new google.maps.Marker({
             position: new google.maps.LatLng($scope.ngDialogData[2],$scope.ngDialogData[3]),
             map: $window.map,
             title: 'Map!'
           })
         }
         $timeout(function () {
           initMap();
         },300);
         },
       controllerAs: 'mapCtrl'
     });
   }


 }).controller('ContactCtrl',function ($scope,$window, lecturersSearchSrv, coursesSearchSrv, buildingsSearchSrv) {
   $scope.currentRemedialInfo = {};
   var lat =0.0;
   var lng = 0.0;
   $scope.getLecturer = function(lecturerid) {
     lecturersSearchSrv.getLecturer({lecturerId : lecturerid}, function(response){
       $scope.currentLecturer = response;
     })

   };
   $scope.getLecturer($scope.searchIndeks);

   $scope.getRemedialInfo = function(lecturerid){
     buildingsSearchSrv.getRemedialInfo({lecturerId: lecturerid}, function(response){
       $scope.currentRemedialInfo = response;
       lat = parseFloat($scope.currentRemedialInfo.address.width);
       lng =  parseFloat($scope.currentRemedialInfo.address.length);
       createMap(lat,lng);
     })
   };

 }).controller('ContactCtrl',function ($scope,$window, lecturersSearchSrv, coursesSearchSrv, buildingsSearchSrv) {
   $scope.currentRemedialInfo = {};
   var lat =0.0;
   var lng = 0.0;

   $scope.getLecturer = function(lecturerid) {
     lecturersSearchSrv.getLecturer({lecturerId : lecturerid}, function(response){
       $scope.currentLecturer = response;
     })
   };
   $scope.getLecturer($scope.searchIndeks);

   $scope.getRemedialInfo = function(lecturerid){
     buildingsSearchSrv.getRemedialInfo({lecturerId: lecturerid}, function(response){
       $scope.currentRemedialInfo = response;
       lat = parseFloat($scope.currentRemedialInfo[0].address.width);
       lng =  parseFloat($scope.currentRemedialInfo[0].address.length);
       createMap(lat,lng);
     })
   };
   $scope.getRemedialInfo($scope.searchIndeks);

   function createMap(lati, lngi){
     $window.map = new google.maps.Map(document.getElementById('map'), {
       center: new google.maps.LatLng( lati, lngi),
       zoom: 16
     });
     var marker = new google.maps.Marker({
       position: new google.maps.LatLng(lati,lngi),
       map: $window.map,
       title: 'Map!'
     });
   }
 });
