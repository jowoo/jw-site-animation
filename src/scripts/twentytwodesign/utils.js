Function.prototype.bind = Function.prototype.bind || function(b) {
  if (typeof this !== "function") {
    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
  }
  var a = Array.prototype.slice,
    f = a.call(arguments, 1),
    e = this,
    c = function() {},
    d = function() {
      return e.apply(this instanceof c ? this : b || window, f.concat(a.call(arguments)));
    };
  c.prototype = this.prototype;
  d.prototype = new c();
  return d;
};

if (typeof Object.create != 'function') {
    (function () {
        var F = function () {};
        Object.create = function (o) {
            if (arguments.length > 1) { 
              throw Error('Second argument not supported');
            }
            if (o === null) { 
              throw Error('Cannot set a null [[Prototype]]');
            }
            if (typeof o != 'object') { 
              throw TypeError('Argument must be an object');
            }
            F.prototype = o;
            return new F();
        };
    })();
}