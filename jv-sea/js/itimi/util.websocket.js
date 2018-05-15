/**
 * Created by Administrator on 2017/8/2.
 * webSocket.readyState实例对象的当前状态，共有四种
 * CONNECTING：值为0，表示正在连接。
OPEN：值为1，表示连接成功，可以通信了。
CLOSING：值为2，表示连接正在关闭。
CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
 */
define(function(require, exports, module) {
		var $ = require('jquery');
        
        module.exports = {
		        options: function(){
			        	return {
			        		"onopen": function(event){
			        		
			        	},
			        	"onmessage": function(event){
			        		 var data = event.data;
			        	},
			        	"onclose": function(event){
			        		 var code = event.code;
			        		 var reason = event.reason;
			        		 var wasClean = event.wasClean;
			        	},
			        	"onerror": function(event){
			        		
			        	}}
		        },
		        createConnection : function(url, opt) {
		        	var options = $.extend(this.options(), opt);
		        	
		        	if(!isString(url) || url == "") {
		        		return;
		        	} 
		        	
		        	var socket = new WebSocket(url);
		        	socket.onopen = options.onopen;
		        	socket.onmessage = options.onmessage;
		        	socket.onclose = options.onclose;
		        	socket.onerror = options.onerror;
		        	
		        	return socket;
		        }
        }

    }
);