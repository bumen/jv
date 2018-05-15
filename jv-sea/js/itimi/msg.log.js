define(function(require, exports, module) {
		var $ = require('jquery');
        
        module.exports = {
		        send: function(msg){
		        	
		        },
		        createConnection : function(options) {
		        	$.extend(options, this.newOptions());
		        	
		        	if(!isString(options.url) || options.url == "") {
		        		return;
		        	} 
		        	
		        	var socket = new WebScoket(options.url);
		        	socket.onopen = options.onopen;
		        	socket.onmessage = options.onmessage;
		        	socket.onclose = options.onclose;
		        	socket.onerror = options.onerror;
		        	
		        	return socket;
		        }
        }

    }
);