define(function(require, exports, module) {
		var logger = require("itimi/itimi.log.js");
		var viewTip = require('itimi/view/view.tip.js');
		
		var websocket = require("itimi/util.websocket.js");
		
		var controller = require("itimi/msg.controller.js");
		var encoder = require("itimi/websocket.encoder.js");
		var decoder = require("itimi/websocket.decoder.js");
		
        module.exports = {
        		socket: {},
		        create : function(id, url) {
		        	if(!isString(url) || url == "") {
		        		return;
		        	} 
		        	
		        	var options = {
		        			"onopen": this.onopen,
		        			"onclose" : this.onclose,
		        			"onerror" : this.onerror,
		        			"onmessage": this.onmessage
		        	}
		        	
		        	var socket = websocket.createConnection(url, options);
		        	this.socket[id] = socket;
		        },
		        send: function(id, msg){
		        	var socket = this.socket[id];
		        	if(socket == null) {
		        		return;
		        	}
		        	
		        	msg = encoder.encode(msg);
		        	socket.send(msg);
		        },
		        onopen: function(event) {
		        	viewTip.tip("连接成功");
		        },
		        onclose: function(event) {
		        	
		        },
		        onmessage: function(event) {
		        	var data = event.data;
		        	
		        	var msgs = decoder.decode(data);
		        	
		        	for(i = 0, l = msgs.length; i < l; i++) {
			        	controller.handle(msgs[i]);
		        	}
		        },
		        onerror: function(event) {
		        	logger.info("connection error");
		        }
        }

    }
);