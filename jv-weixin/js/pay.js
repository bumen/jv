
var itimi={
		
		init: function() {
			console.log("update 1");
			msgContainer.addMsgListenerForever("GC_Response", this.response, this);
		},
		response: function(msg) {
			console.log(JSON.stringify(msg));
		}
}

itimi.init();

itimi.client = {
		payOrderId : 0,
		pay1: function() {
			msgContainer.addMsgListenerOnce("GC_ActivityNewPay", this.paycallback, this);
			var name = "CG_ActivityNewPay";
			var msg = new Msg(name);
			msg.setParam("applyId", 1);
			msg.send();
		},
		pay2: function() {
			msgContainer.addMsgListenerOnce("GC_ActivityNewPay", this.paycallback, this);
			var name = "CG_ActivityNewPay";
			var msg = new Msg(name);
			msg.setParam("applyId", 2);
			msg.send();
		},
		pay3: function() {
			msgContainer.addMsgListenerOnce("GC_ActivityNewPay", this.paycallback, this);
			var name = "CG_ActivityNewPay";
			var msg = new Msg(name);
			msg.setParam("applyId", 3);
			msg.send();
		},
		pay4: function() {
			msgContainer.addMsgListenerOnce("GC_ActivityNewPay", this.paycallback, this);
			var name = "CG_ActivityNewPay";
			var msg = new Msg(name);
			msg.setParam("applyId", 4);
			msg.send();
		},
		pay5: function() {
			msgContainer.addMsgListenerOnce("GC_ActivityNewPay", this.paycallback, this);
			var name = "CG_ActivityNewPay";
			var msg = new Msg(name);
			msg.setParam("applyId", 5);
			msg.send();
		},
		pay6: function() {
			msgContainer.addMsgListenerOnce("GC_ActivityNewPay", this.paycallback, this);
			var name = "CG_ActivityNewPay";
			var msg = new Msg(name);
			msg.setParam("applyId", 6);
			msg.send();
		},
		pay7: function() {
			msgContainer.addMsgListenerOnce("GC_ActivityNewPay", this.paycallback, this);
			var name = "CG_ActivityNewPay";
			var msg = new Msg(name);
			msg.setParam("applyId", 7);
			msg.send();
		},
		payQuery3: function() {
			msgContainer.addMsgListenerOnce("GC_UserPayQuery", this.paycallback, this);
			var name = "CG_UserPayQuery";
			var msg = new Msg(name);
			msg.setParam("orderId", this.orderId);
			msg.send();
		},
		payQuery4: function() {
			this.payQuery3();
		},
		orderId: "",
		payQueryBack: function(msg) {
			if(msg.responseCode >= 400) {
				alert("订单查询失败");
			}
			
			if(msg.responseCode < 400) {
				alert("订单查询成功：返回订单状态: "+ msg.responseCode);
			}
			
		},
		paycallback: function(msg) {
			console.log(JSON.stringify(msg))
			if(msg.responseCode == 0) {
				var param = msg.orderParam;
				
				this.orderId = param.orderId;
				
				weixin.pay(param, this.back, this);
			}
		},
		back: function(res) {
			console.log("客户端支付返回");
		}
}
