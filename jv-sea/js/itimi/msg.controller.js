define(function(require, exports, module) {
        
        module.exports = {
        		mapping: {},
        		socket: {},
        		start : false,
        		init: function() {
        			this.mapping['GC_LoginSubmit'] = this.mappingInfo("loginSubmit");
        			this.mapping['GC_Login'] = this.mappingInfo("login");
        			this.mapping['GC_ServerTime'] = this.mappingInfo("serverTime");
        		},
        		mappingInfo: function(name) {
        			var path = "itimi/controller/controller."+name+".js";
        			return {"controller": path};
        		},
		        handle : function(msg) {
		        	var handlerInfo = this.mapping[msg.__classname];
		        	if(handlerInfo == null) {
		        		return;
		        	}
		        	
		        	var controllerPath = handlerInfo.controller;
		        	require.async(controllerPath, function(controller){
		        		if(controller != null) {
			        		controller.handle(msg);
			        	}
		        	});
		        	
		        }
		        
        }

    }
);