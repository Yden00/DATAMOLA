const Node = require('./node');

class LinkedList {
  constructor(value) {
    this.head = value;
    this.length = 0;
  }

  addNode(value, i) {
    const newNode = new Node(value);
    if (i === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let current = this.head;
      for (let j = 0; j < i; j++) {
        current = current.next;
      }
      newNode.next = current;
      return true;
    }
    return false;
  }

  removeNode(i) {
    let prev = null;
    let index = 0;
    let current = this.head;
    while (index < i) {
      prev = current;
      current = current.next;
      index++;
    }
    prev.next = current.next;
    this.length--;
    return true;
  }

  print() {
    let current = this.head;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }
}

const list = new LinkedList();
list.addNode(1, 0);
list.addNode(120, 1);
list.addNode(121, 2);
console.log(list.print());
