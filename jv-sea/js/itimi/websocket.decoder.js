define(function(require, exports, module) {
        module.exports = {
        		decode: function(msg) {
        			 var end = dataStr.indexOf(']');
         	        if (end == -1) {
         	            log.error("Illegal msg:" + dataStr);
         	            return;
         	        }

         	        var length = parseInt(dataStr.substr(1, end));

         	        dataStr = dataStr.substr(end + 1);

         	        var oneMsgData = null;
         	        var oneMsgLength = 0;

         	        var msgs = [];
         	        for (var i = 0; i < length; i++) {
         	            end = dataStr.indexOf(":");
         	            if (end == -1) {
         	                log.error("Illegal msg:" + dataStr);
         	                return;
         	            }

         	            // 获取该消息的长度
         	            oneMsgLength = parseInt(dataStr.substr(0, end));
         	            dataStr = dataStr.substr(end + 1);

         	            // 获取该消息体
         	            oneMsgData = dataStr.substr(0, oneMsgLength);

         	            // 跳过此消息的消息体
         	            dataStr = dataStr.substr(oneMsgLength);

         	            // 执行消息
         	           msgs.push(this._decodeOne(oneMsgData));
         	        }
         	        
         	        return msgs;
        		},
        	    // 解析一个消息
        	    _decodeOne: function (data) {

        	        var start = data.indexOf(':');

        	        if (start == -1) {
        	            log.error("Illegal msg:" + data);
        	            return;
        	        }

        	        // 取消息名
        	        var name = data.substring(0, start);
        	        // 取到最终数据
        	        data = data.substring(start + 1);

        	        // 获取数据
        	        var msg = JSON.parse(data);
        	        msg.__classname = name;
        	        return msg;
        	    }
        }

    }
);