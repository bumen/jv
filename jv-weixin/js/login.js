
var itimi={
		
		init: function() {
			weixin.login();
			msgContainer.addMsgListenerForever("GC_Response", this.response, this);
		},
		response: function(msg) {
			console.log(JSON.stringify(msg));
		}
}

itimi.init();

itimi.client = {
		
}
