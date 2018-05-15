
define(function(require, exports, module) {
	var $ = require('jquery');
        module.exports = {
        		ele: $("#viewTip"),
		        tip: function(msg){
		        	this.ele.text(msg);
		        },
		        error: function(msg) {
		        	this.ele.text(msg);
		        }
		       
        }

    }
);