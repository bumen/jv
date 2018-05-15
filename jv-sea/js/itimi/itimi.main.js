
//加载模块
var itimiMain = function(module) {
	if(!isString(module) || module == "") {
		alert("选则需要加载的模块名称");
		return;
	}
	
	//初始化全局模块
	seajs.use(["itimi/msg.controller.js"], function(controller) {
		controller.init();
	});
	
	if(module == "login") {
		seajs.use(["itimi/view/view.login.js"], function(login) {
			login.init();
		});
	}
}