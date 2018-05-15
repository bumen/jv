define(function(require, exports, module) {
		var bean = require('itimi/itimi.bean.js');
		
        module.exports = {
        		encode: function(msg) {
        			if(msg instanceof bean.Msg) {
        				var data = msg.getData();
        				
        				return msg.getName() + ":" + data;
        			}
        			return msg;
        		}
        }

    }
);