var myNinjaApp = angular.module('myNinjaApp', ['ngRoute']);

myNinjaApp.config(['$routeProvider', function($routeProvider){


    $routeProvider

        .when('/home', {

            templateUrl : 'views/home.html',
            controller : 'NinjaController'
        })

        .when('/directory', {

            templateUrl : 'views/directory.html',
            controller : 'NinjaController'
        })

        .otherwise({

            redirectTo : '/home'
        })
}]);

myNinjaApp.directive('randomNinja', [function(){

    return {

            //E A C M
            // E - element means only use as an element in the html
            // A - as an attribute
            // EA - element and attribute

        restrict : 'E', 
        scope : {

            runners : '=',
            title : '='

        },

        templateUrl : 'views/random.html',
        transclude : true,
        replace : true,
        controller : function($scope){

            $scope.random = Math.floor(Math.random() * 4);


        }
    };
}]);


myNinjaApp.controller('NinjaController', ['$scope', '$http', function($scope, $http){

    $scope.removeNinja = function(runner){

        runner.available = false;

    };

    $scope.addNinja = function(obj){

        $scope.runners.push({

            name : $scope.newNinja.name,
            belt : $scope.newNinja.belt,
            rate : parseInt($scope.newNinja.rate),
            available : true
        });

        $scope.newNinja.name = "";
        $scope.newNinja.belt = "";
        $scope.newNinja.rate = "";
    };

    // $scope.message = "hey, y'all";

    // $http.get('data/ninjas.json').success(function(data){

    //     $scope.runners = data;

    // });


    $http({ // apparently data fetching was changed in angular 1.5 and above
        method: 'get', 
        url: 'data/ninjas.json'
    }).then(function (response) {

        data = response.data;
        console.log(data);
        $scope.runners = data; 
        
    },function (error){
        console.log(error, 'can not get data.');
    })


}]);
 
    // console.log(angular.toJson($scope.runners));
