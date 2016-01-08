angular.module('FoodParty')
    .controller('MakeController', function ($scope, colorService, MainService, $rootScope, $timeout, $state) {

        var infos, listElements, btns;

        $rootScope.logged = true;

        $scope.errorMsg = "";
        $scope.ifError = false;

        $scope.hstep = 1;
        $scope.mstep = 15;


        var init = function () {
            $scope.desc = "We will meet and eat what I cook. I will make pizza with pepperoni, mushrooms, onion and ketchup!";
            $scope.place = "Las Palmas, Spain";
            $scope.fee = "10 EUR";
            $scope.maxp = 10;
            $scope.minp = 2;
            $timeout(function () {
                infos = Array.prototype.slice.call(document.getElementsByClassName("info"));
                listElements = Array.prototype.slice.call(document.getElementsByClassName("listElement"));
                btns = Array.prototype.slice.call(document.getElementsByClassName("btnColorMix"));

                colorService.mixColors(btns, infos, listElements);

                btns.forEach(function (e) {
                    e.addEventListener("click", function (b) {
                        colorService.mixColors(btns, infos, listElements);
                    });
                });
            },1);
        }

        init();

        $scope.makeEvent = function () {
            $scope.ifError = false;
            $scope.errorMsg = "";
            if(!$scope.desc){
                $scope.ifError = true;
                $scope.errorMsg += "description, "
            }
            if(!$scope.dt){
                $scope.ifError = true;
                $scope.errorMsg += "date, "
            }
            if(!$scope.place){
                $scope.ifError = true;
                $scope.errorMsg += "place, "
            }
            if(!$scope.fee){
                $scope.ifError = true;
                $scope.errorMsg += "entry fee, "
            }
            if(!$scope.maxp){
                $scope.ifError = true;
                $scope.errorMsg += "max. participants limit, "
            }
            if(!$scope.minp){
                $scope.ifError = true;
                $scope.errorMsg += "min. participants limit, "
            }
            if(!$scope.ifError) {
                var e = {
                    desc: $scope.desc,
                    date: $scope.dt.getTime(),
                    place: $scope.place,
                    fee: $scope.fee,
                    max: $scope.maxp,
                    min: $scope.minp,
                    user: MainService.getUser()
                };
                MainService.makeEvent(e).then(function (res) {
                    $state.go('manage');
                })
            }
        }

        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        $scope.open = function ($event) {
            $scope.status.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.status = {
            opened: false
        };


        $scope.rate = 1;
        $scope.max = 10;
        $scope.isReadonly = false;

        $scope.hoveringOver = function (value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };


    })
