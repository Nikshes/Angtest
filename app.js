var app = angular.module("myApp", ["ngRoute"]);

app.controller("loginCtrl", function ($scope, $http){
	
	$scope.clickLogin = function(){
		var login = $scope.login
		var password = $scope.password
		singIn(login, password, $http)
	}
	
})

app.controller("profileCtrl", function ($scope, $http){
	getProfile($http,$scope)


	$scope.clickProfile = function (){
		window.location.href = '#!/profile'
	}
	$scope.clickOrders = function(){
		window.location.href = '#!/orders'
	}
	$scope.clickLogout = function(){
		userLogout ($http)
	}
	$scope.clickEdit = function(){
		window.location.href = '#!/profile-edit'
	}
})

app.controller("ordersCtrl", function($scope,$http){
	getOrders ($http,$scope)
	
	$scope.clickProfile = function (){
		window.location.href = '#!/profile'
	}
	$scope.clickOrders = function(){
		window.location.href = '#!/orders'
	}

})

app.controller("editProfileCtrl", function($scope, $http){
	
	$scope.clickProfile = function (){
		window.location.href = '#!/profile'
	}
	$scope.clickOrders = function(){
		window.location.href = '#!/orders'
	}

	$scope.clickSave = function (){
	var name = $scope.name
	if (typeof name == "undefined"){
		alert("Введите имя")
	}
	else{
		editProfile(name, $http)
	}

	
	}

})

function singIn(login, password, $http){
	$http({
	method: 'POST',
	url: 'http://test.kluatr.ru/api/user/login',
	headers:{"Content-type":"application/x-www-form-urlencoded"},
	withCredentials:true,
	transformRequest: function(obj) {
	        var str = [];
	        for(var p in obj)
	        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	        return str.join("&");
	    },
	  data:{
	  	email:login,
	  	password:password
	  }
	  

	}).then(function successCallback(response) {
    console.log(response);
		// getProfile ($http)
	    window.location.href = '#!/profile'
  }, function errorCallback(response) {
    console.log(response);
  });

}

function getProfile ($http, $scope){
	$http.get('http://test.kluatr.ru/api/user/profile',{withCredentials:true})
	  .then(function (response) {
	    console.log(response);
	    $scope.name = response.data.data.name
		$scope.email = response.data.data.email

	  })
	  .catch(function (error) {
	    console.log(error);
	  });
}

function getOrders ($http,$scope){
	$http.get('http://test.kluatr.ru/api/orders',{withCredentials:true})
 	 .then(function (response) {
	    console.log(response);
	    $scope.orders=response.data.data
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
}

function editProfile(name, $http){
	$http({
	method: 'POST',
	url: 'http://test.kluatr.ru/api/user/profile/edit',
	headers:{"Content-type":"application/x-www-form-urlencoded"},
	withCredentials:true,
	transformRequest: function(obj) {
	        var str = [];
	        for(var p in obj)
	        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	        return str.join("&");
	    },
	  data:{
	  	name:name
	  }

	}).then(function successCallback(response) {
    console.log(response);
	    window.location.href = '#!/profile'
  }, function errorCallback(response) {
    console.log(response);
  });
}

function userLogout ($http){
	$http.get('http://test.kluatr.ru/api/user/logout',{"withCredentials":true})
	  .then(function (response) {
	    console.log(response);
		window.location.href = '#!/'
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
}

app.config(function($locationProvider,$routeProvider) {
	
    $routeProvider
    .when("/", {
        templateUrl : "public/login.html"
    })
    .when("/orders", {
        templateUrl : "public/orders.html"
    })
    .when("/profile", {
        templateUrl : "public/profile.html"
    })
    .when("/profile-edit", {
        templateUrl : "public/profile-edit.html"
    });
});



