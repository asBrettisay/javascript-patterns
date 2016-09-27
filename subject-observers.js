var Subject = function() {
  var observers = [];

  return {
    subscribe(observer) {
      console.log(this);
      observers.push(observer);
    },
    unsubscribe(observer) {
      var index = observers.indexOf(observer);
      if (index > -1) {
        observers.splice(index, 1);
        return true;
      } else {
        return false;
      }
    },
    notify(observer) {
      var index = observers.indexOf(observer);
      if (index > -1) {
        observers[index].notify(index);
      }
    },
    notifyAllObservers(observer) {
      for (var i = 0; i < observers.length; i++) {
        observers[i].notify()
      }
    }
  }
};

var Observer = function() {
  return {
    notify() {
      console.log('Notified!');
    }
  }
};


var subject = new Subject();

var observer1 = new Observer();

subject.subscribe(observer1);

subject.notifyAllObservers();
