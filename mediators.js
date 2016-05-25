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



// Example where mediator can be installed to a new object.


var mediator = (function(){
    var subscribe = function(channel, fn){
        if (!mediator.channels[channel]) mediator.channels[channel] = [];
        mediator.channels[channel].push({ context: this, callback: fn });
        return this;
    },

    publish = function(channel){
        if (!mediator.channels[channel]) return false;
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = mediator.channels[channel].length; i < l; i++) {
            var subscription = mediator.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }
        return this;
    };

    return {
        channels: {},
        publish: publish,
        subscribe: subscribe,
        installTo: function(obj){
            obj.subscribe = subscribe;
            obj.publish = publish;
        }
    };



mediator.name = "tim";
mediator.subscribe('nameChange', function(arg){
        console.log(this.name);
        this.name = arg;
        console.log(this.name);
});

mediator.publish('nameChange', 'david'); //tim, david


var obj = { name: 'sam' };
mediator.installTo(obj);
obj.subscribe('nameChange', function(arg){
        console.log(this.name);
        this.name = arg;
        console.log(this.name);
});

obj.publish('nameChange', 'john'); //sam, john
