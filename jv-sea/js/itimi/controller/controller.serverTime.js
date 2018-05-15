define(function(require, exports, module) {
		var player = require("itimi/itimi.player.js");
        module.exports = {
		        handle : function(msg) {
		        	var serverTime = msg.serverTime;
		        	
		        	player.setServerTime(serverTime);
		        }
		        
        };

});