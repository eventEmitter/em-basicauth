!function(){

	var   Class 		= require('ee-class')
		, type 			= require('ee-types')
		, crypto 		= require('crypto')
		, log 			= require('ee-log');



	module.exports = new Class({

		init: function(options) {
			Class.define(this, '_users', Class({}));

			if (options) {
				if (type.object(options.users)){
					Object.keys(options.users).forEach(function(user){
						this._users[user] = this._hash(options.users[user]);
					}.bind(this));
				}
			}
		}



		, request: function(request, response, next) {
			var parts;

			parts = new Buffer((request.getHeader('authorization') || '' ).split(/\s+/).pop(), 'base64').toString().split(/:/);
			
			if (parts && parts.length === 2) {
				if (this._users[parts[0]] && this._hash(parts[1]) === this._users[parts[0]] ) {
					next();
					return;
				}
			}
			
			response.send(401, null, {'WWW-Authenticate': 'basic'});
		}



		, _hash: function(password) {
			return crypto.createHash('sha512').update(password).digest('hex');
		}
	});
}();
