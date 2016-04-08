/**
 * Created by piotrkluska on 26/03/16.
 */
angular.module('app.module.SearchController',['mgcrea.ngStrap.typeahead'])
  .directive('mainpageSearch',function () {
    return {
      restrict: 'E',
      replace : true,
      templateUrl: "scripts/search/mainPageSearch.tmpl.html",
      controller: "SearchController"
    }
  })
  .directive('navbarSearch',function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: "scripts/search/searchNavbar.tmpl.html",
      controller: "SearchController"
    }
  })
  .factory('coursesSearchSrv', function($resource){
     var res = $resource('http://localhost:8080/student-helper/courses/:operation/:courseId', {}, {

         getAllCourses : {
             method : 'GET',
//             params : {
//                 operation : 'configurations'
//             },
             isArray : true
         },
         getCourse : {
             method : 'GET',
             params : {
                operation : 'course'
             }
         }

     });
     return res;

   })
  .factory('lecturersSearchSrv', function($resource){
      var res = $resource('http://localhost:8080/student-helper/lecturers/:operation/:lecturerId', {}, {

          getAllLectuters : {
              method : 'GET',
//              params : {
//                  operation : 'configurations'
//              },
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
  })
  .factory('buildingsSearchSrv', function($resource){
      var res = $resource('http://localhost:8080/student-helper/buildings/:operation/:buildingId', {}, {

          getAllBuildings : {
              method : 'GET',
//              params : {
//                  operation : 'configurations'
//              },
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
  })
  .controller('SearchController',['$scope', 'coursesSearchSrv','buildingsSearchSrv'
   , 'lecturersSearchSrv', function ($scope, lecturersSearchSrv, coursesSearchSrv, buildingsSearchSrv) {

      $scope.buildings = [];
      $scope.courses = [];
      var searchCtrl = this;
      $scope.searchText = "";

      $scope.lecturersNames = [];
      $scope.lecturerss = [];
      $scope.getAllLectuters();



      searchCtrl.didPerformFirstSearch = false;

      searchCtrl.performSearch = function () {
        if($scope.lecturers.indexOf($scope.searchText) != -1) {
          searchCtrl.didPerformFirstSearch = true;
        } else {
          console.info("errror")
        }
      }

// LECTURER

      $scope.extractLecturersNames = function(lecturers) {
          $scope.lecturersNames = lecturers.map(function(obj){
             return obj.title + " " + obj.name + " " + obj.surname;
          });
      };

      $scope.getAllLectuters = function() {
          lecturersSearchSrv.getAllLectuters({}, function(response){
              $scope.lecturerss = response;
              $scope.extractLecturersNames(response);
          })
      };

      $scope.getLecturer = function(lecturer) {
          lecturersSearchSrv.getLecturer({lecturerId : lecturer.id}, function(response){
              $scope.currentLecturer = response;
          })
      };


// COURSES

      $scope.getAllCourses = function() {
          coursesSearchSrv.getAllCourses({}, function(response){
              $scope.courses = response;
          })
      };

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

    }]);
