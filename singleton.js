var Singleton = (function() {
  var Singleton = {};

  Singleton.instance;

  Singleton.getInstance = function() {
    function Instance() {
      this.value = 10;
      this.set = function(value) {
        this.value = value;
      }

      this.get = function() {
        return this.value;
      }
    }

    if (this.instance) {
      return this.instance
    } else {
      this.instance = new Instance();
      return this.instance;
    }
  }

  return Singleton;
})();



var mySingleton = Singleton.getInstance();
var newSingleton = Singleton.getInstance();

newSingleton.set(5);

console.log(mySingleton.get());
