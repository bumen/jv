define(function(require, exports, module) {
		var bean = require('itimi/itimi.bean.js');
	
        module.exports = {
        		encode: function(msg) {
        			if(msg instanceof bean.Msg) {
        				var data = msg.getData();
        				
        				data = msg.getName() + ":" + data;
            			data = data.length + ":" + data;
            			
            			return data;
        			}
        			return msg;
        		}
        }

    }
);