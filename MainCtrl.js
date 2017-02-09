(function() {
    // init angular app
    var app = angular.module("githubViewer");

    // one of them is using 'github' service
    var MainCtrl = function($scope, $interval, $location) {
        var decrementCountdown = function() {
            $scope.countdown -= 1;

            if ($scope.countdown < 1) {
                $scope.search($scope.username);
            }
        }

        var countdownInterval = null;
        var startCountdown = function() {
            // run decrementCountdown function every 1000ms and stop when it runs 5x
            countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
        }

        // Go out to GitHUb and grab the data
        $scope.search = function(username) {
            // cancel the interval if user click search
            if (countdownInterval) {
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }

            $location.path("/user/" + username);
        }

        $scope.username = "angular";
        $scope.countdown = 5;
        
        startCountdown();
    }

    app.controller("MainCtrl", MainCtrl);
})();