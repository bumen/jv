define(function(require, exports, module) {
		var logger = require("itimi/itimi.log.js");
		var ajax = require("itimi/util.ajax.js");
		
		var controller = require("itimi/msg.controller.js");
		var encoder = require("itimi/http.encoder.js");
		var decoder = require("itimi/http.decoder.js");
        
        var connection = {
		        send: function(url, msg){
		        	var data = encoder.encode(msg);
		        	
		        	var options = {
		        			data: data,
		        			success: connection.onsuccess
		        	}
		        	
		        	ajax.sendPost(url, options);
		        },
		        sendGet: function(url, msg){
		        	var data = encoder.encode(msg);
		        	
		        	var options = {
		        			data: data,
		        			success: connection.onsuccess
		        	}
		        	
		        	ajax.sendGet(url, options);
		        },
		        onsuccess: function(msg) {
		        	var msgs = decoder.decode(msg);
		        	
		        	for(i = 0, l = msgs.length; i < l; i++) {
			        	controller.handle(msgs[i]);
		        	}
		        },
		        onerror: function(event) {
		        	logger.info("connection error");
		        }
        };
		
		module.exports = connection;
		
});