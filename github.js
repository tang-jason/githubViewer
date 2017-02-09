/*
    Summary
    - Services as a barrier
    - Services as components
    - Services for custom logic
*/
(function() {
    var github = function($http, $log) {
        var getUser = function(username) {
            return $http.get("https://api.github.com/users/" + username).then(function(response) {
                return response.data;
            });
        };

        var getRepos = function(user) {
            return $http.get(user.repos_url).then(function(response) {
                return response.data;
            });
        };

        var getRepoDetails = function(username, reponame) {
            $log.info(username);
            $log.info(reponame);
            var repo;
            var repoUrl = "https://api.github.com/repos/" + reponame + "/collaborators";

            return $http.get(repoUrl)
                .then(function(response) {
                    repo = response.data;
                    $log.info(repoUrl);
                    return $http.get(repoUrl + "/collaborators_url");
                })
                .then(function(response) {
                    repo.collaborators = response.data;
                    $log.info(repo.collaborators);
                    return repo;
                });
        };

        return {
            getUser: getUser,
            getRepos: getRepos,
            getRepoDetails: getRepoDetails
        };
    };

    var module = angular.module("githubViewer");
    module.factory("github", github);
})();