/**
 * Created by piotrkluska on 26/03/16.
 */
angular.module('app.module.SearchController',['mgcrea.ngStrap.typeahead'])
  .controller('SearchController',['$scope', function ($scope) {
    $scope.lecturers = ["Dr inz. Krzysztof Brzostowski ", "Dr inz Krzysztof Chudzik",
                        "Dr inz. Krzysztof Juszczyszyn", "Dr inz Krzysztof Wasko"];
    $scope.searchText = "";


}]);
