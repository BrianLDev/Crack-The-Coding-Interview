// TESTING OUT CONVERSION FROM SLL TO DLL, WHICH CAME UP AS A QUESTION FROM ONE OF THE OTHER PEOPLE IN THE GROUP

class SLListNode {
  constructor(data, next = null) {
      this.data = data;
      this.next = next;
  }
}

class DLListNode extends SLListNode {
  constructor(data, next = null, prev = null) {
      super(data, next);
      this.prev = prev;
  }
}

// NOTE - SKIPPING HIS CONVERSION FUNCTION AND USING A DLL CLASS INSTEAD
// function convertSLLtoDLL(head) {
//   let DLLhead = new DLListNode(head.data);
//   let currentSLL = head.next
//   let currentDLL;
//   let prev = DLLhead;

//   while (currentSLL) {
//       currentDLL = new DLListNode(current.data);
//       currentDLL.prev = prev;
//       prev = current;
//       current = current.next;
//   }
//   return DLLhead;
// }

class DLL {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(data) {
    const newNode = new DLListNode(data);
    // if list is empty, create head and tail
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    }
    // otherwise push new Node to end of list
    else {
      let node = this.tail;
      node.next = newNode;
      newNode.prev = node;
      this.tail = newNode;
    }
  }
}

// TESTS
const head = new SLListNode(0);
let current = head;
for (let i=1; i<=3; i++) {
  current.next = new SLListNode(i);
  current = current.next;
}

// print out SLL (head to tail)
console.log("SLL PRINTOUT");
current = head;
while (current) {
  console.log(current.data);
  current = current.next;
}

// convert to DLL
current = head;
const dll = new DLL();
while (current) {
  dll.append(current.data);
  current = current.next;
}

// print out DLL (tail to head)
console.log("DLL PRINTOUT");
current = dll.tail;
while (current) {
  console.log(current.data);
  current = current.prev;
}

