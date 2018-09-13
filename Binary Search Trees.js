function BinarySearchTree(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}


BinarySearchTree.prototype.insert = function(value) {
 var direction = value > this.value ? 'right' : 'left';
 if (this[direction]) this[direction].insert(value);
 else this[direction] = new BinarySearchTree(value);
};

BinarySearchTree.prototype.contains = function(value) {
  if (this.value === value) return true;
  var direction = value > this.value ? 'right' : 'left';
  return this[direction] ? this[direction].contains(value) : false;
};

BinarySearchTree.prototype.depthFirstForEach = function(fn, option = 'in-order') {
  if (option === 'in-order') {
    this.left && this.left.depthFirstForEach(fn, option);
    fn(this.value);
    this.right && this.right.depthFirstForEach(fn, option);
  } else if (option === 'pre-order') {
    fn(this.value);
    this.left && this.left.depthFirstForEach(fn, option);
    this.right && this.right.depthFirstForEach(fn, option);
  } else if (option === 'post-order') {
    this.left && this.left.depthFirstForEach(fn, option);
    this.right && this.right.depthFirstForEach(fn, option);
    fn(this.value);
  }
};

BinarySearchTree.prototype.breadthFirstForEach = function(fn, queue = []) {
  fn(this.value);
  this.left && queue.push(this.left);
  this.right && queue.push(this.right);
  if (queue.length) queue.shift().breadthFirstForEach(fn, queue);
};

BinarySearchTree.prototype.size = function() {
  var size = 1;
  if (this.right) size += this.right.size();
  if (this.left) size += this.left.size();
  return size;
};

