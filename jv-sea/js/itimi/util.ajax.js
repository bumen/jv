define(function(require, exports, module){
	var $ = require('jquery');

	 module.exports = {
			 sendGet: function(url, options) {
				 this.sendRequest(url, options);
			 },
			 sendPost: function(url, options) {
				 options.type = "post";
				 this.sendRequest(url, options);
			 },
			 sendRequest: function(url, opt) {
				 var options = {
						 type: "get",
						 data: {},
						 dataType : "text",
						 success: function(result, status){},
						 error: function(result) {}
						 };
				 $.extend(options, opt);
				 $.ajax({
 		            type: options.type,
 		            url: url,
 		            contentType: "text/plain; charset=utf-8",
 		            cache: false,
 		            data: options.data,
 		            dataType: options.dataType,
 		            success: options.success
 		        });
			 }
	 };
});