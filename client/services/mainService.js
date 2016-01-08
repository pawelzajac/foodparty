angular.module('FoodParty').service('MainService', function($q, $http, $cookies) {

    this.login = function(user) {
        var d = $q.defer();

        $http({
            method: 'POST',
            url: 'http://localhost:3000/login',
            data: user
        }).then(function successCallback(response) {
            var cookie = {
                userId: response.data._id,
                name: response.data.name,
                email: response.data.email
            }
            $cookies.putObject('user', cookie);
            d.resolve(response.data);
        }, function errorCallback(response) {
            console.log(response);
            d.reject(response.data);
        });

        return d.promise;
    };

    this.logout = function() {
        var d = $q.defer();
        var user = $cookies.getObject('user');
        $http({
            method: 'POST',
            url: 'http://localhost:3000/logout',
            data: user
        }).then(function successCallback(response) {
            $cookies.remove('user');
            d.resolve(response.data);
        }, function errorCallback(response) {
            console.log(response);
            d.reject(response.data);
        });
        return d.promise;
    };

    this.logCheck = function() {
        var d = $q.defer();
        var user = $cookies.getObject('user');
        if (!user) {
            d.reject();
        } else {
            $http({
                method: 'POST',
                url: 'http://localhost:3000/logcheck',
                data: user
            }).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(response) {
                console.log(response);
                d.reject(response.data);
            });
        }
        return d.promise;
    };

    this.getUser = function() {
        return $cookies.getObject('user');
    }

    this.getEvents = function(req) {
        var d = $q.defer();

        $http({
            method: 'POST',
            url: 'http://localhost:3000/getevents',
            data: req
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            console.log(response);
        });

        return d.promise;
    };

    this.makeEvent = function(req) {
        var d = $q.defer();

        $http({
            method: 'POST',
            url: 'http://localhost:3000/makeevent',
            data: req
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            console.log(response);
        });

        return d.promise;
    };

    this.updateEvent = function(e) {
        var d = $q.defer();

        $http({
            method: 'POST',
            url: 'http://localhost:3000/updateevent',
            data: e
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            console.log(response);
            d.reject();
        });

        return d.promise;
    };

    this.getEvent = function(e) {
        var d = $q.defer();

        $http({
            method: 'POST',
            url: 'http://localhost:3000/getevent',
            data: e
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            console.log(response);
        });

        return d.promise;
    };

    this.register = function(user) {
        var d = $q.defer();

        $http({
            method: 'POST',
            url: 'http://localhost:3000/register',
            data: user
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            console.log(response);
        });

        return d.promise;
    };


    this.removeEvent = function(req) {
        var d = $q.defer();

        $http({
            method: 'POST',
            url: 'http://localhost:3000/removeevent',
            data: req
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            console.log(response);
        });

        return d.promise;
    };
});
