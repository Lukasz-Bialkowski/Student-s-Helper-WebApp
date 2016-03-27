/**
 * Created by piotrkluska on 26/03/16.
 */
angular.module('app.module.SearchController',['mgcrea.ngStrap.typeahead'])
  .controller('SearchController',['$scope', function ($scope) {
    $scope.lecturers = ["Dr inż. Krzysztof Brzostowski ", "Dr inż. Krzysztof Chudzik",
      "Dr inż. Krzysztof Juszczyszyn", "Dr inż. Krzysztof Waśko"];
    $scope.searchText = "";
  }])
  .directive('mainpageSearch',function () {
    return {
      restrict: 'E',
      replace : true,
      templateUrl: "scripts/search/mainPageSearch.tmpl.html",
      controller: "SearchController"
    }
  });
