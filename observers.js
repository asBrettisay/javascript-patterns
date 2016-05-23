var Subject = (function() {
	function Subject() {
		this._list = [];
	}

	Subject.prototype.observe = function(obj) {
		this._list.push(obj);
	};

	Subject.prototype.unobserve = function(obj) {
		if (this._list.indexof(obj) > 0) {
			this._list.splice(this._list.indexof(obj), 1);
			return true;
		} else {
			return false;
		}
	};

	Subject.prototype.notify = function() {
		var args = Array.from(arguments);
		this._list.forEach(function(obs) {
			obs.update(...args);
		});
	};

	return Subject;
})();


function SendUser() {

	var subject = new Subject();

	this.addObserver = function(obs) {
		subject.observe(obs);
	};

	this.removeObserver = function(obs) {
		subject.unobserve(obs);
	};

	this.sendUser = function(message) {
		var user = {
			name: 'Brett',
			email: 'brett@brett.com'
		};

		subject.notify(user, message);
	};


}



var showUser = {
	update: function(user, msg) {
		console.log(msg);
		console.log(user.name);
	}
};

var showEmail = {
	update: function(user) {
		console.log(user.email);
	}
};


var userInfo = new SendUser();

userInfo.addObserver(showUser);
userInfo.addObserver(showEmail);

userInfo.sendUser('Hello');
