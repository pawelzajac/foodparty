angular.module('FoodParty').controller('EventController', function ($scope, $uibModalInstance, e, $timeout, $rootScope, colorService, MainService, $uibModal) {

    $scope.theEvent = e;

    var me = MainService.getUser();


    $scope.init = function () {
        $rootScope.loading = true;
        MainService.getEvent($scope.theEvent).then(function (e) {
            $scope.e = e;
            $scope.isParticipant = isParticipant(e.participants);
            $scope.isCreator = isCreator(e.creator);
            $timeout(function () {
                var infos = Array.prototype.slice.call(document.getElementsByClassName("info"));
                var listElements = Array.prototype.slice.call(document.getElementsByClassName("modal-content"));
                var btns = Array.prototype.slice.call(document.getElementsByClassName("btnColorMix"));
                $timeout(function () {
                    colorService.mixColors(btns, infos, listElements);
                    btns.forEach(function (e) {
                        e.addEventListener("click", function (b) {
                            colorService.mixColors(btns, infos, listElements);
                            //this.style.boxShadow = '0px 0px 0px 4px ' + this.style.backgroundColor;
                        });
                    });
                    $rootScope.loading = false;
                }, 1);
            }, 1);
        })
    }

    $scope.edit = function () {
            var modalInstance = $uibModal.open({
                animation: false,
                templateUrl: 'views/editEvent.html',
                controller: 'EditEventController',
                size: 'large',
                resolve: {
                    e: function () {
                        return $scope.e;
                    }
                }
            });

            modalInstance.result.then(function (e) {
                $scope.e = e;
                if ($scope.e.date.getTime)
                    $scope.e.date = $scope.e.date.getTime();
                MainService.updateEvent($scope.e).then(function () {
                    $scope.init();
                }, function () {

                });
            }, function () {
                //error
            });

        /*MainService.updateEvent($scope.e).then(function () {
            $scope.init();
        }, function () {

        });*/
    }

    $scope.ok = function () {
        $uibModalInstance.close($scope.e);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };


    $scope.participate = function () {
        if($scope.e.participants) {
            $scope.e.participants.push(me)
        } else {
            $scope.e.participants = [me];
        }

        MainService.updateEvent($scope.e).then(function () {
            $scope.init();
        }, function () {

        });

    }

    $scope.leave = function () {
        var index = $scope.e.participants.indexOf(me);
        $scope.e.participants.splice(index, 1);

        MainService.updateEvent($scope.e).then(function () {
            $scope.init();
        }, function () {

        });
    }

    $scope.remove = function () {
        MainService.removeEvent($scope.e).then(function () {
            $uibModalInstance.close($scope.e);
        }, function () {

        });
    }

    $scope.sendComment = function () {
        var comment = {
            content:$scope.comment,
            author: me,
            time: new Date
        };
        if($scope.e.comments) {
            $scope.e.comments.push(comment)
        } else {
            $scope.e.comments = [comment];
        }

        MainService.updateEvent($scope.e).then(function () {
            $scope.init();
        }, function () {

        });
    }

    $scope.share = function () {

    }

    $scope.formatDate = function (date) {
        return moment(date).format("YYYY/MM/DD HH:mm");
    };


    var isParticipant = function(participants){

        if(!participants) {
            return false;
        } else {
            var flag = false;
            participants.forEach(function(p){
                if (p.userId == me.userId){
                    flag = true;
                }
            });
            return flag;
        }

    }

    var isCreator = function(c){
        if(c.userId == me.userId){
            return true;
        } else {
            return false;
        }

    }
});