(function () {
    'use strict';

    angular.module('FoodParty')
        .controller('ManageController', function ($rootScope, $scope, colorService, MainService, $timeout, $uibModal) {

            var infos, listElements, btns;
            $rootScope.logged = true;


            var init = function () {
                $scope.events = [];

                $rootScope.loading = true;
                MainService.getEvents({participant: MainService.getUser()}).then(function (events) {
                    events.forEach(function(event){
                        event.isParticipant = true;
                        $scope.events.push(event);
                    });
                    MainService.getEvents({user: MainService.getUser()}).then(function (events) {
                        //$scope.eventsCreated = events;
                        $scope.events = $scope.events.concat(events);
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
                    });
                });
            }

            init();

            $scope.open = function (e) {
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
                    init();
                }, function () {
                    //error
                });
            };

            $scope.formatDate = function (date) {
                return moment(date).format("YYYY/MM/DD HH:mm");
            };

        })

})();