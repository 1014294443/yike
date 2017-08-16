//这里放所有的控制器 - 专门用于管理控制器
//将所有控制器整体定义成一个控制器模块
angular.module("Controllers",[])
.controller("navController",["$scope",function($scope){
	//模拟模型层数据
	$scope.navs = [
		{link:"#today",icon:"icon-home",text:"今日一刻"},
		{link:"#older",icon:"icon-file-empty",text:"往期内容"},
		{link:"#author",icon:"icon-pencil",text:"热门作者"},
		{link:"#category",icon:"icon-menu",text:"栏目浏览"},
		{link:"#favourite",icon:"icon-heart",text:"我的喜欢"},
		{link:"#settings",icon:"icon-cog",text:"设置"},
	];
}])
.controller("todayController",["$scope","$http","$filter","$rootScope",function($scope,$http,$filter,$rootScope){
	var today = $filter("date")(new Date,"yyyy-MM-dd");
	$rootScope.loaded = false;
	$rootScope.title = "今日一刻"
	$http({
		url:"./api/today.php",
		method:"get",
		params:{today:today}
	}).then(function(result){
		$rootScope.loaded = true;
		//console.log("返回",result);
		$scope.time = result.data.date;
		$scope.posts = result.data.posts;
	})
}])
.controller("olderController",["$scope","$http","$rootScope",function($scope,$http,$rootScope){
	$rootScope.loaded = false;
	$rootScope.title = "往期内容"
	$http({
		url:"./api/older.php",
		method:"get"
	}).then(function(result){
		$rootScope.loaded = true;
		//console.log("返回",result);
		$scope.time = result.data.date;
		$scope.posts = result.data.posts;
	})
}])
.controller("authorController",["$scope","$http","$rootScope",function($scope,$http,$rootScope){
	$rootScope.loaded = false;
	$rootScope.title = "作者推荐";
	$http({
		url:"./api/author.php",
		method:"get"
	}).then(function(result){
		$rootScope.loaded = true;
		$scope.authors = result.data.authors;
	})
	$http({
		url:"./api/author2.php",
		method:"get"
	}).then(function(result){
		$rootScope.loaded = true;
		$scope.authors2 = result.data.authors;
	})
}])
.controller("categoryController",["$scope","$http","$rootScope",function($scope,$http,$rootScope){
	$rootScope.loaded = false;
	$rootScope.title = "栏目浏览";
	$http({
		url:"./api/category.php",
		method:"get"
	}).then(function(result){
		$rootScope.loaded = true;
		$scope.columns = result.data.columns
	})
}])
.controller("settingsController",["$scope","$rootScope",function($scope,$rootScope){
	$rootScope.loaded = true;
	$rootScope.title = "设置";
}])