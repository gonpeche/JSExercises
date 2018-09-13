function Queue() {
  this.ll = new LinkedList();
  this.length = 0;
}

Queue.prototype.enqueue = function(value) {
  this.ll.addToTail(value);
  this.length += 1;
};

Queue.prototype.dequeue = function() {
  if(this.length) {
    this.length -= 1;
  }
  return this.ll.removeHead();
};

Queue.prototype.size = function() {
  return this.length;
};
