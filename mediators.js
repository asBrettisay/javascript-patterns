var Mediator = (function() {

	function Mediator() {
		this._topics = {};
	}

	Mediator.prototype.subscribe = function(topic, cb) {
		if (!this._topics.hasOwnProperty(topic)) {
			this._topics[topic] = [];
		}

		this._topics[topic].push(cb);
		return true;
	};

	Mediator.prototype.unsubscribe = function(topic, cb) {
		if (!this._topics.hasOwnProperty(topic)) {
			return false;
		}

		for (var i = 0; i < this._topics[topic].length; i++) {
			if (this._topics[topic][i] === callback) {
				this._topics[topic].splice(i, 1);
				return true;
			}
		}
	}

	Mediator.prototype.publish = function() {
		var args = Array.from(arguments);
		var topic = args.shift();

		if (!this._topics.hasOwnProperty(topic)) {
			return false;
		}

		for (var i = 0; i < this._topics[topic].length; i++) {
			this._topics[topic][i](...args);
		}
		return true;
	};


	return Mediator;

})();


var Subscriber = function(myVar) {
	console.log(myVar)
};

var myMediator = new Mediator();

myMediator.subscribe('foo', Subscriber);
myMediator.publish('foo', 'chicken');
