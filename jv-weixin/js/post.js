
var itimi={
		
		init: function() {
			
			msgContainer.addMsgListenerForever("GC_Response", this.response, this);
		},
		response: function(msg) {
			console.log(JSON.stringify(msg));
		}
}

itimi.init();

itimi.client = {
	
		post: function() {
			
			msgContainer.addMsgListenerOnce("GC_LoginReport", this.loginSuccess, this);
			
			var name = "CG_VodPlayCoverExport";
			var msg = new Msg(name);
			msg.setParam("timeQuery", {"beginTime":1525881600000, "endTime":1525988605000});
			//msg.setParam("pageQuery", {"page":1, "rows":10});
			msg.sendByBaseUrl();
			
			var r = this.toStringTime(34797263);
			console.log(r);
		},
		loginSuccess: function(msg) {
			console.log(JSON.stringify(msg))
		},
		toStringTime : function(longNum){
	            var millis= parseInt(Number(longNum)/1000);
			
				var sb = "";
				
				 var h = 0;
			     if (millis >= 3600) {
			    	 h = parseInt(millis / 3600);
			         millis = millis % 3600;
			     }
			     
			     if(h < 10) {
		    		 sb += "0";
		    	 }
		         sb += h;
		         sb += "小时"
			
		        var m = 0;
			     if (millis >= 60) {
			    	 m = parseInt(millis / 60);
			         millis = millis % 60;
			     }
			     
			     if(m < 10) {
		    		 sb += "0";
		    	 }
		         sb += m;
		         sb += "分钟"
			
			     if(millis < 10) {
		    		 sb += "0";
		    	 }
		         sb += parseInt(millis);
		         sb += "秒"
		        	 
			     return sb;
				
		},
		payTest1: function() {
			msgContainer.addMsgListenerOnce("GC_ActivityNewPayMsg", this.paycallback, this);
			var name = "CG_ActivityNewPayMsg";
			var msg = new Msg(name);
			msg.setParam("applyId", 1);
			msg.sendByBaseUrl();
		},
		payTest2: function() {
			msgContainer.addMsgListenerOnce("GC_ActivityNewPayMsg", this.paycallback, this);
			var name = "CG_ActivityNewPayMsg";
			var msg = new Msg(name);
			msg.setParam("applyId", 2);
			msg.sendByBaseUrl();
		},
		payTest3: function() {
			msgContainer.addMsgListenerOnce("GC_ActivityNewPayMsg", this.paycallback, this);
			var name = "CG_ActivityNewPayMsg";
			var msg = new Msg(name);
			msg.setParam("applyId", 3);
			msg.sendByBaseUrl();
		},
		payTest4: function() {
			msgContainer.addMsgListenerOnce("GC_ActivityNewPayMsg", this.paycallback, this);
			var name = "CG_ActivityNewPayMsg";
			var msg = new Msg(name);
			msg.setParam("applyId", 4);
			msg.sendByBaseUrl();
		},
		payTest5: function() {
			msgContainer.addMsgListenerOnce("GC_ActivityNewPayMsg", this.paycallback, this);
			var name = "CG_ActivityNewPayMsg";
			var msg = new Msg(name);
			msg.setParam("applyId", 5);
			msg.sendByBaseUrl();
		},
		payTest6: function() {
			msgContainer.addMsgListenerOnce("GC_ActivityNewPayMsg", this.paycallback, this);
			var name = "CG_ActivityNewPayMsg";
			var msg = new Msg(name);
			msg.setParam("applyId", 6);
			msg.sendByBaseUrl();
		},
		payTest7: function() {
			msgContainer.addMsgListenerOnce("GC_ActivityNewPayMsg", this.paycallback, this);
			var name = "CG_ActivityNewPayMsg";
			var msg = new Msg(name);
			msg.setParam("applyId", 7);
			msg.sendByBaseUrl();
		},
		paycallback: function(msg) {
			console.log(JSON.stringify(msg))
		}
}
