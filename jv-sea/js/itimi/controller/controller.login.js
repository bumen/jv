define(function(require, exports, module) {
		var config = require('itimi/itimi.config.js');
		var player = require("itimi/itimi.player.js");
		var viewTip = require('itimi/view/view.tip.js');
		var connection = require("itimi/websocket.connection.js");
		
        module.exports = {
		        handle : function(msg) {
		        	
		        	 if(msg.responseCode == 1) {
		        		 viewTip.tip("自动登录成功，请求websocket连接...");
	                } else {
	                	viewTip.tip("SDK登录失败：" + GC_Login.responseCode  + ". 需要账号重新登录");
	                }
	                
	                var host = msg.ip_port;
    				var sessionId = msg.param;
    				
    				player.setSessionId(sessionId);
    				
    				//创建socket连接
    				var url = String.format(config.wsLoginUrl, host, sessionId);
    				connection.create(sessionId, url);
		        }
		        
        };

});