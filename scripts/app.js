/*
app.js是整个angularjs应用程序的入口
*/

'use strict';
//创建应用模块
var yike = angular.module("yike",["ngRoute","Controllers","directives"]);
//定义toggle方法
//$(function(){})
yike.run(["$rootScope",function($rootScope){
	$rootScope.collapsed = false;
	//往$scope上绑定toggle方法
	$rootScope.toggle = function(){
		//找到navs 节点 将left属性改变 (添加预先设定好的collapse)
		$rootScope.collapsed = !$rootScope.collapsed;
		//找到dd 节点  将transform值改变
		var navs = document.querySelectorAll(".navs dd");
		//根据$rootScope.collapsed的值判断是收起还是打开
		if($rootScope.collapsed){
		//遍历所有的dds,将其中的每一个dd的transform属性
			//改成 translate(0)
			for(var i = 0;i<navs.length;i++){
				var dd = navs[i];
				dd.style.transform="translate(0)";
				//设置每个dd一次入场(动画过渡效果)
				dd.style.transitionDuration = (i+1)*0.15+"s";
			};
		}else{
			//折起的时候动画
			for (var i = 0; i < navs.length; i++) {
				var dd = navs[i];
				dd.style.transform="translate(-100%)";
				dd.style.transitionDuration = (navs.length-i)*0.15+"s";
			};
		}
	}
}])
//解决锚点乱码bug
yike.config(function($locationProvider){
	$locationProvider.hashPrefix("");
});

//配置路由
yike.config(["$routeProvider",function($routeProvider){
	//配置路由具体内容
	$routeProvider.when("/",{
		templateUrl:"./views/today.html",
		controller:"todayController"
	}).when("/today",{
		templateUrl:"./views/today.html",
		controller:"todayController"
	}).when("/older",{
		templateUrl:"./views/older.html",
		controller:"olderController"
	}).when("/author",{
		templateUrl:"./views/author.html",
		controller:"authorController"
	}).when("/category",{
		templateUrl:"./views/category.html",
		controller:"categoryController"
	}).when("/settings",{
		templateUrl:"./views/settings.html",
		controller:"settingsController"
	})
}])