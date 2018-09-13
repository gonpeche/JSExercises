function HashTable() {
  this.buckets = [];
  this.numBuckets = 35;
}

HashTable.prototype.set = function(key, value) {
  if (typeof key !== 'string') throw new TypeError('Keys must be strings');
  var hashedKey = this.hash(key);
  this.buckets[hashedKey] = this.buckets[hashedKey] || new LinkedList();
  this.buckets[hashedKey].addToHead({ key, value });
};

HashTable.prototype.get = function(key) {
  var hashedKey = this.hash(key);
  var found = this.buckets[hashedKey] && this.buckets[hashedKey].search(function(obj) {
    return key === obj.key;
  });
  return found && found.value;
};

HashTable.prototype.hasKey = function(key) {
  return !!this.get(key);
};

HashTable.prototype.hash = function(value) {
  var total = 0;
  for (var i = 0; i < value.length; i++) {
    total += value[i].charCodeAt();
  }
  return total % this.numBuckets;
};

