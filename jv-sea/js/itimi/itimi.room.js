
define(function(require, exports, module) {
        
        module.exports = {
        		players: {},
		        info: function(msg){
		        	console.log(msg);
		        },
		        error: function(msg) {
		        	console.error(msg);
		        }
		       
        }

    }
);