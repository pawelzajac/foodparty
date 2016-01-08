(function() {
  'use strict';

  var app = angular.module('FoodParty', ['ui.router', 'ui.bootstrap', 'ngCookies']);
  app.config(routeConfig);

    function routeConfig($stateProvider, $urlRouterProvider) {
	    $stateProvider
	      .state('search', {
	        url: '/search',
	        class: 'search',
	        templateUrl: 'views/search.html',
	        controller: 'SearchController',
	        controllerAs: 'search',
	        resolve: {
	          auth: function($state, MainService) {
	          	MainService.logCheck().then(function(){
	          		
	          	},function(){
	          		$state.go('login');
	          	});
	          }
	        }
	      })
	      .state('make', {
	        url: '/make',
	        class: 'make',
	        templateUrl: 'views/make.html',
	        controller: 'MakeController',
	        controllerAs: 'make',
	        resolve: {
	          auth: function($state, MainService) {
	          	MainService.logCheck().then(function(){
	          		
	          	},function(){
	          		$state.go('login');
	          	});
	          }
	        }
	      })
	      .state('manage', {
	        url: '/manage',
	        class: 'manage',
	        templateUrl: 'views/manage.html',
	        controller: 'ManageController',
	        controllerAs: 'manage',
	        resolve: {
	          auth: function($state, MainService) {
	          	MainService.logCheck().then(function(){
	          		
	          	},function(){
	          		$state.go('login');
	          	});
	          }
	        }
	      })
	      .state('login', {
	        url: '/login',
	        class: 'login',
	        templateUrl: 'views/login.html',
	        controller: 'LoginController',
	        controllerAs: 'login'
	      })

	      $urlRouterProvider.otherwise('/login');
	  }

})();


