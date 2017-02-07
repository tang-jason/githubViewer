(function() {
    // init angular app
    var app = angular.module("githubViewer", []);

    var MainCtrl = function($scope, $http) {
        // Return data when asyc completed
        var onUserComplete = function(response) {
            $scope.user = response.data;

            // send another request for the user repos
            $http.get($scope.user.repos_url).then(onRepos, onError);
        };

        // assign the returned data to repos
        var onRepos = function(response) {
            $scope.repos = response.data;
        }

        // Show errors if any
        var onError = function(reason) {
            $scope.error = "Could not fetch the user";
        };

        // Go out to GitHUb and grab the data
        $scope.search = function(username) {
            $http.get("https://api.github.com/users/" + username).then(onUserComplete, onError);
        }

        $scope.username = "angular";
        $scope.message = "GitHub Viewer in Angular";
        $scope.repoSortOrder = "-stargazers_count";
    }

    app.controller("MainCtrl", ["$scope", "$http", MainCtrl]);
})();