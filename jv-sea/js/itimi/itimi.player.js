define(function(require, exports, module) {
		var config = require('itimi/itimi.config.js');
		var bean = require('itimi/itimi.bean.js');
		var httpClient = require("itimi/http.connection.js");
		var connection = require("itimi/websocket.connection.js");
        
		var player = {
        		sessionid: "",
        		serverTime: 0,
        		init: function() {
        			//发送心跳
        			window.setInterval(service.heartbeat,1000);
        		},
		        login : function(name) {
		        	var url = String.format(config.sdkUrl, Math.random());
					var data = {
						"c": "test",
		                "s": name
					}
					httpClient.sendGet(url, data);
		        },
		        loginGame: function(name, passwd, method) {
		        	var msg = new bean.Msg("CG_LoginSubmit");
		        	msg.account = name;
		        	msg.passwd = passwd,
		        	msg.method = method;
		        	
		        	//this.sendMsg(msg);
		        },
		        heartbeat: function() {
		        	var msg = new bean.Msg("CG_Heartbeat");
		        	sendMsg(msg);
		        },
		        sendMsg: function(msg) {
		        	if(!isString(this.sessionId) || this.sessionId == "") {
		        		return;
		        	}
		        	connection.send(this.sessionId, msg);
		        },
		        setSessionId: function(id) {
		        	this.sessionId = id;
		        },
		        setServerTime: function(time) {
		        	this.serverTime = time;
		        },
		        logout: function() {
		        	
		        }
        };

		 module.exports = player;
    }
);