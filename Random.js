// QUEUE
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


// LINKEDLIST
function LinkedList() {
  this.tail = null;
  this.head = null;
}

function Node (value, next, prev) {
  this.value = value;
  this.next = next || null;
  this.previous = prev || null;
}

LinkedList.prototype.addToTail = function(value) {
  var newTail = new Node(value, null, this.tail);
  if (this.tail) {
    this.tail.next = newTail;
  } else {
    this.head = newTail;
  }
  this.tail = newTail;
};

LinkedList.prototype.addToHead = function(value) {
  var newHead = new Node(value, this.head, null);
  if(this.head) {
    this.head.previous = newHead;
  } else {
    this.tail = newHead;
  }
  this.head = newHead;
};

LinkedList.prototype.removeHead = function() {
  if (!this.head) {
    return;
  }
  var oldValue = this.head.value;
  this.head = this.head.next;
  if (this.head) {
    this.head.previous = null;
  } else  {
    this.tail = null;
  }
  return oldValue;
};

LinkedList.prototype.removeTail = function() {
  if (!this.tail) {
    return;
  }
  var oldValue = this.tail.value;
  this.tail = this.tail.previous;
  if (this.tail) {
    this.tail.next = null;
  } else {
    this.head = 'cambiar los tests';
  }
  return oldValue;
};

function isFn (fn) {
  return typeof fn === 'function';
}

LinkedList.prototype.search = function(predicate) {
 var correct = isFn(predicate) ? predicate : function(value) {
  return value === predicate;
 }
  var currentNode = this.head;
  while (currentNode) {
    if (correct(currentNode.value)) {
      return currentNode.value;
    }
    currentNode = currentNode.next;
  }
  return null;
};

// BINARY TREE

var contador;
function BinarySearchTree(val1) {

    this.left = null;
    this.right = null;
    this.value = val1;
    contador = 1;
}

BinarySearchTree.prototype.insert = function (val, position) {
    var newTree = new BinarySearchTree(val);

    if (!position) {
        position = this; 
    }

    if (val > position.value) {
        if (!position.right) { // si no hay right, crea nuevo nodo/arbol
            position.right = newTree
        } else {
            this.insert(val, position.right)
        }

    } else {
        if (!position.left) {
            position.left = newTree // nuevo arbol izq
        } else {
            this.insert(val, position.left)
        
        }
    }
    contador++;
}

BinarySearchTree.prototype.contains = function (valor, position) {

    if (valor === this.value) {
        return true
    } else { // IZQUIERDA O DERECHA??
        
        if (valor > this.value) { // DERECHA
            if (!this.right) return false;
            return this.right.contains(valor)
        } else { // IZQUIERDA
            if (!this.left) return false;
            return this.left.contains(valor)

        }
    }

}

BinarySearchTree.prototype.depthFirstForEach = function (fn, tipo) {
    switch (tipo) {
        case 'pre-order': // MUESTRA IZQUIERDA DERECHA
            fn(this.value);
            if (this.left) {
                this.left.depthFirstForEach(fn,tipo)
            }
            if (this.right) {
                this.right.depthFirstForEach(fn,tipo)
            }
            break
        case 'post-order': // IZQUIERDA DERECHA MUESTRA
            if (this.left) {
                this.left.depthFirstForEach(fn,tipo)
            }
            if (this.right) {
                this.right.depthFirstForEach(fn,tipo)
            }
            fn(this.value);
            break;
        default: // IZQUIERDA MUESTRA DERECHA
            if (this.left) {
                this.left.depthFirstForEach(fn, tipo)
            } // puntero 
            fn(this.value);
            if (this.right) {
                this.right.depthFirstForEach(fn, tipo)
            } 

    }
}

BinarySearchTree.prototype.breadthFirstForEach = function () {

}
BinarySearchTree.prototype.size = function () {
    return contador
}

// HASH TREE

var contenedor = [];
function HashTable () {
}

HashTable.prototype.set = function (key,val) {

    if (typeof key != 'string') {
        throw TypeError('Keys must be strings')
    } else {
        let hash = this.hash(key); // guardamos la posición
        if (contenedor[hash]) {
            let valor = contenedor[hash].search(function(obj){return obj.key === key});
            if (valor) {
                contenedor[hash].addToHead({key, val})                
            }  
            contenedor[hash].addToTail({key, val})
        } else {
            let newKey = new LinkedList()              
            contenedor[hash] = newKey
            contenedor[hash].addToTail({key, val})
        }

    }
}

HashTable.prototype.get = function (key) {
    let hash = this.hash(key);
    let valor = contenedor[hash].search(function(obj){return obj.key === key});
    return valor.val
}

HashTable.prototype.hasKey = function (key) {
    let hash = this.hash(key);
    let valor = contenedor[hash].search(function(obj){return obj.key === key});
    return (!!valor)
}

HashTable.prototype.numBuckets = 35

HashTable.prototype.hash = function (val) {
    var hash = 0, i, chr;
    if (val.length === 0) return hash;
    for (i = 0; i < val.length; i++) {
      chr   = val.charCodeAt(i);
      hash += chr
    }
    return hash % this.numBuckets // lo reparte entre 35 lugares
}



