Function.prototype.method = function (name, func) {
  this.prototype[name] = func;

  return this;
};

Function.method('inherits', function (type) {
  this.prototype = new type();
  this.prototype.constructor = type;

  return this;
});