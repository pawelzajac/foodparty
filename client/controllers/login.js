angular.module('FoodParty')
.controller('LoginController', function($rootScope, $scope, colorService, MainService, $q, $state, $timeout) {

	var infos, listElements, btns;

	$scope.register;

	$scope.events = [];

        $scope.errorMsg = '';
        $scope.ifError = false;


	$rootScope.logged = false;


	$scope.init = function() {
		$scope.register = 0;
		$scope.ifError = false;
		$scope.user = {
			email: '',
			password: '',
			name: ''
		};
        MainService.getEvents().then(function (events) {
            $scope.events = events.slice(0,2);
            $timeout(function() {
                infos = Array.prototype.slice.call(document.getElementsByClassName("info"));
                listElements = Array.prototype.slice.call(document.getElementsByClassName("listElement"));
                btns = Array.prototype.slice.call(document.getElementsByClassName("btnColorMix"));

                colorService.mixColors([], infos, listElements);
                btns.forEach(function (e) {
                    e.addEventListener("click", function (b) {
                        $timeout(function() {
                            infos.push(Array.prototype.slice.call(document.getElementsByClassName("info")));
                            listElements.push(Array.prototype.slice.call(document.getElementsByClassName("listElement")));
                            btns.push(Array.prototype.slice.call(document.getElementsByClassName("btnColorMix")));
                            colorService.mixColors([], infos, listElements);

                        },1);
                    });
                });
            },1);
        });


	}

	$scope.loginn = function(){
        $scope.errorMsg = '';
        $scope.ifError = false;
		MainService.login($scope.user).then(function(){
			$state.go('search');
		},function(){
			$scope.ifError = true;
            $scope.errorMsg = "Wrong email or password."
		});
	}

	$scope.registerr = function(){
        $scope.errorMsg = '';
        $scope.ifError = false;
        if(!$scope.user.name) {
            $scope.ifError = true;
            $scope.errorMsg = "Please enter your username."
        }
        if(!$scope.user.password) {
            $scope.ifError = true;
            $scope.errorMsg = "Please enter your password."
        }
        if(!$scope.user.email) {
            $scope.ifError = true;
            $scope.errorMsg = "Please enter your email."
        }
        if($scope.user.password != $scope.user.password2){
            $scope.ifError = true;
            $scope.errorMsg = "Passwords do not match."
        }
        if(!$scope.ifError)
            MainService.register($scope.user).then(function(){
                $scope.register = 0;
                $scope.ifError = true;
                $scope.errorMsg = "Now you can log in!"
                colorService.mixColors([], infos, listElements);
            },function(){
                $scope.ifError = true;
                $scope.errorMsg = "Server error."
            });
	};

	$scope.openRegister = function(){
        $scope.errorMsg = '';
        $scope.ifError = false;
		$scope.register = 1;
        $timeout(function() {
            infos = Array.prototype.slice.call(document.getElementsByClassName("info"));
            listElements = Array.prototype.slice.call(document.getElementsByClassName("listElement"));
            btns = Array.prototype.slice.call(document.getElementsByClassName("btnColorMix"));
            colorService.mixColors([], infos, listElements);

        },1);
	};
	$scope.closeRegister = function(){
        $scope.errorMsg = '';
        $scope.ifError = false;
		$scope.register = 0;
        $timeout(function() {
            infos = Array.prototype.slice.call(document.getElementsByClassName("info"));
            listElements = Array.prototype.slice.call(document.getElementsByClassName("listElement"));
            btns = Array.prototype.slice.call(document.getElementsByClassName("btnColorMix"));
            colorService.mixColors([], infos, listElements);

        },1);
	};

        $scope.formatDate = function (date) {
            return moment(date).format("YYYY/MM/DD HH:mm");
        };

})