/**
 * Created by Administrator on 2017/8/2.
 */
define(function(require, exports, module) {
		var $ = require('jquery');
		var viewTip = require('itimi/view/view.tip.js');
		var player = require('itimi/itimi.player.js');
        
        module.exports = {
		        ele: $("#loginSdkBtn"),
		        gameEle: $("#loginGameBtn"),
		        data:{},
        		init : function(){
        			this.ele.bind('click', function() {
        				module.exports.loginSdk();
        			});
        			
        			this.gameEle.bind('click', function() {
        				module.exports.loginGame();
        			});
        		},
        		checkAccount: function(name) {
        			if(!isString(name) || name == "") {
        				viewTip.tip("用户名不能为空");
    					return false;
    				}
        			return true;
        		},
        		checkPasswd: function(passwd) {
        			if(!isString(passwd) || passwd == "") {
        				viewTip.tip("密码不能为空");
    					return false;
    				}
        			return true;
        		},
        		loginSdk: function() {
        			var name = $("#accountName").val();
    				if(!this.checkAccount(name)) {
    					return;
    				}
    				
    				player.login(name);
    				
    				viewTip.tip(name + " 请耐心等待，自动登录中...");
        		},
        		loginGame : function() {
        			var name = $("#accountName").val();
    				if(!this.checkAccount(name)) {
    					return;
    				}
    				
    				var passwd = $("#passwd").val();
    				if(!this.checkPasswd(passwd)) {
    					return;
    				}
    				
    				var method = $('input[name="loginMethod"]:checked').val();
    				
    				player.loginGame(name, passwd, method);
    				
    				viewTip.tip(name + " 请耐心等待，密码登录中...");
        		}
        }

    }
);