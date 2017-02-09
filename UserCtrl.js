(function() {
    // init angular app
    var app = angular.module("githubViewer");

    // one of them is using 'github' service
    var UserCtrl = function($scope, github, $routeParams) {
        // Return data when asyc completed
        var onUserComplete = function(data) {
            $scope.user = data;

            // send another request for the user repos
            github.getRepos($scope.user).then(onRepos, onError);
        };

        // assign the returned data to repos
        var onRepos = function(data) {
            $scope.repos = data;
        }

        // Show errors if any
        var onError = function(reason) {
            $scope.error = "Could not fetch the user";
        };

        $scope.username = $routeParams.username;
        $scope.repoSortOrder = "-stargazers_count";

        github.getUser($scope.username).then(onUserComplete, onError);
    }

    app.controller("UserCtrl", UserCtrl);
})();