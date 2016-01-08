(function () {
    'use strict';

    angular.module('FoodParty')
        .controller('SearchController', function ($rootScope, $scope, colorService, MainService, $q, $timeout, $uibModal) {

            var infos, listElements, btns;

            $scope.events = [];

            $rootScope.logged = true;

            $scope.searchEvents = function () {
                $rootScope.loading = true;
                var req = {
                    place: $scope.place,
                    rating: $scope.rate
                }
                if ($scope.dateFrom)
                    req.dateFrom = $scope.dateFrom.getTime();
                if ($scope.dateTo)
                    req.dateTo = $scope.dateTo.getTime();

                MainService.getEvents(req).then(function (events) {
                    $scope.events = events;
                    $timeout(function () {
                        infos = Array.prototype.slice.call(document.getElementsByClassName("info"));
                        listElements = Array.prototype.slice.call(document.getElementsByClassName("listElement"));
                        btns = Array.prototype.slice.call(document.getElementsByClassName("btnColorMix"));
                        $timeout(function () {
                            colorService.mixColors(btns, infos, listElements);
                            btns.forEach(function (e) {
                                e.addEventListener("click", function (b) {
                                    colorService.mixColors([], infos, listElements);
                                });
                            });
                            $rootScope.loading = false;
                        }, 1);
                    }, 1);
                }, function (error) {
                    $rootScope.loading = false;
                    console.log(error);
                });
            };

            var init = function () {
                $scope.dateFrom = new Date();
                $scope.dateTo = new Date($scope.dateFrom.getTime() + 604800000);
                $scope.searchEvents();
            }

            init();

            $scope.open = function ($event) {
                $scope.status.opened = true;
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1,
                showButtonBar: 'false'
            };

            $scope.open2 = function ($event) {
                $scope.status.opened2 = true;
            };


            $scope.status = {
                opened: false,
                opened2: false
            };

            $scope.formatDate = function (date) {
                return moment(date).format("YYYY/MM/DD HH:mm");
            };

            $scope.hstep = 1;
            $scope.mstep = 15;
            $scope.hstep2 = 1;
            $scope.mstep2 = 15;

            $scope.rate = 1;
            $scope.max = 10;
            $scope.isReadonly = false;

            $scope.hoveringOver = function (value) {
                $scope.overStar = value;
                $scope.percent = 100 * (value / $scope.max);
            };

            $scope.openEvent = function (e) {
                var modalInstance = $uibModal.open({
                    animation: false,
                    templateUrl: 'views/event.html',
                    controller: 'EventController',
                    size: 'large',
                    resolve: {
                        e: function () {
                            return e;
                        }
                    }
                });

                modalInstance.result.then(function () {
                    //success
                    $scope.searchEvents();
                }, function () {
                    //error
                });
            };


        })

})();


