/**
 * Created by piotrkluska on 26/03/16.
 */
angular.module('app.module.SearchController',['mgcrea.ngStrap.typeahead'])
  .controller('SearchController',['$scope', function ($scope) {

    var searchCtrl = this;
    $scope.lecturers = ["Dr inż. Krzysztof Brzostowski ", "Dr inż. Krzysztof Chudzik",
      "Dr inż. Krzysztof Juszczyszyn", "Dr inż. Krzysztof Waśko"];
    $scope.searchText = "";

    searchCtrl.didPerformFirstSearch = false;

    searchCtrl.performSearch = function () {
      if($scope.lecturers.indexOf($scope.searchText) != -1) {
        searchCtrl.didPerformFirstSearch = true;
      } else {
        console.info("errror")
      }
    }
    
  }])
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
  });
