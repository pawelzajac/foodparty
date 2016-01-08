angular.module('FoodParty').controller('EditEventController', function ($scope, $uibModalInstance, e, MainService, colorService, $timeout) {

    $scope.e = e;
    $scope.hstep = 1;
    $scope.mstep = 15;
    $scope.status = {
        opened: false
    };


    $scope.init = function () {
        $timeout(function () {
            var infos = Array.prototype.slice.call(document.getElementsByClassName("info"));
            var listElements = Array.prototype.slice.call(document.getElementsByClassName("modal-content"));
            var btns = Array.prototype.slice.call(document.getElementsByClassName("btnColorMix"));

            colorService.mixColors(btns, infos, listElements);

            btns.forEach(function (e) {
                e.addEventListener("click", function (b) {
                    colorService.mixColors(btns, infos, listElements);
                });
            });
        },1);
    }

    $scope.ok = function () {
        $uibModalInstance.close($scope.e);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.open = function ($event) {
        $scope.status.opened = true;
    };

    $scope.removeParticipant = function(p){
        var idx = $scope.e.participants.indexOf(p);
        $scope.e.participants.splice(idx,1);

    }

    $scope.removeComment = function (c) {
        var idx = $scope.e.comments.indexOf(c);
        $scope.e.comments.splice(idx,1);
    }

});