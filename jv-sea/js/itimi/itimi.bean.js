define(function(require, exports, module) {
	
	module.exports = {
			Msg : function(msgName) {
				this._params = {};
			    this._name = msgName;

			    this.getName = function () {
			        return this._name;
			    };

			    this.setParam = function (key, value) {
			        this._params[key] = value;
			    };

			    this.getData = function () {
			        return JSON.stringify(this._params);
			    };
			},
			PlayerInfo : function(uid) {
				this.uid = uid;
				this.name = name;
				
				this.setName = function(name) {
					this.name = name;
				}
			}
			
	}
	
});