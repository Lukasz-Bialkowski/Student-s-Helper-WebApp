'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appApp
 */
 angular.module('mainApp', ['ngResource','ui.router','mgcrea.ngStrap.typeahead'])
  .config(function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/mainsearch');
      $stateProvider.state('mainsearch', {
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
       var res = $resource('http://localhost:8080/student-helper/buildings/:operation/:buildingId', {}, {

           getAllBuildings : {
               method : 'GET',
               isArray : true
           },
           getBuilding : {
               method : 'GET',
               params : {
                   operation : 'building'
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
      }

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



 // BUILDINGS

      $scope.getAllBuildings = function() {
          coursesSearchSrv.getAllBuildings({}, function(response){
              $scope.buildings = response;
          })
      };

      $scope.getBuildings = function(building) {
          coursesSearchSrv.getBuilding({buildingId : building.id}, function(response){
              $scope.currentBuilding = response;
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
       }

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


  // BUILDINGS

       $scope.getAllBuildings = function() {
           coursesSearchSrv.getAllBuildings({}, function(response){
               $scope.buildings = response;
           })
       };

       $scope.getBuildings = function(building) {
           coursesSearchSrv.getBuilding({buildingId : building.id}, function(response){
               $scope.currentBuilding = response;
           })
       };

}]).controller('CalendarCtrl', function ($scope, lecturersSearchSrv, coursesSearchSrv, buildingsSearchSrv) {

// COURSES

   $scope.getAllCourses = function() {
       if($scope.courses.length==0){coursesSearchSrv.getAllCourses({}, function(response){$scope.courses = response;})}
   };

   $scope.getAllCoursesForLecturer = function(lecturerid){
       coursesSearchSrv.coursesForLecturer({courseId : lecturerid}, function(response){
           $scope.courses = response;
       })
   };

   $scope.getAllCoursesForLecturer($scope.searchIndeks);


   $scope.getCourse = function(course) {
       coursesSearchSrv.getCourse({courseId : course.id}, function(response){
           $scope.currentCourse = response;
       })
   };

// BUILDINGS

   $scope.getAllBuildings = function() {
       coursesSearchSrv.getAllBuildings({}, function(response){
           $scope.buildings = response;
       })
   };

   $scope.getBuildings = function(building) {
       coursesSearchSrv.getBuilding({buildingId : building.id}, function(response){
           $scope.currentBuilding = response;
       })
   };
}).controller('ContactCtrl',function ($scope, lecturersSearchSrv, coursesSearchSrv, buildingsSearchSrv) {

   $scope.getLecturer = function(lecturerid) {
       lecturersSearchSrv.getLecturer({lecturerId : lecturerid}, function(response){
           $scope.currentLecturer = response;
       })
   };
   $scope.getLecturer($scope.searchIndeks);

});
