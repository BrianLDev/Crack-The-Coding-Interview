// CHAPTER 2: LINKED LISTS

// Link to LeetCode versions of these challenges:
// https://leetcode.com/discuss/general-discussion/1152824/cracking-the-coding-interview-6th-edition-in-leetcode

// CLASSES FOR CH 2 EXAMPLES - SINGLY LINKED LIST
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  append(data) {
    const newNode = new Node(data);
    // if list is empty, create head
    if (this.head === null) {
      this.head = newNode;
    }
    // otherwise push new Node to end of list
    else {
      let node = this.head;
      while (node.next != null) { node = node.next; } // iterate to last node
      node.next = newNode;
    }
    this.size += 1;
  }

  delete(data) {
    // first check head
    if (this.head.data === data) {
      this.head = this.head.next; // move head
      this.size -= 1;
    }
    // check remaining nodes
    else {
      let node = this.head;
      while (node.next != null) {
        if (node.next.data === data) {
          node.next = node.next.next;
          this.size -= 1;
        }
        node = node.next;
      }
    }
  }

  print() {
    let node = this.head;
    while (node !== null) {
      console.log(node.data);
      node = node.next;
    }
  }
}


// INTERVIEW QUESTION PROBLEMS

// 2.1 Remove Dups! Write code to remove duplicates from an unsorted linked list.  FOLLOW UP:  How would you solve this problem if a temporary buffer is not allowed? Hints: #9, #40
// Note - this version from the CTCI book is different from the LeetCode problem, and doesn't require you to also delete the original when a dup is found.
LinkedList.prototype.removeDups = function() {
  let tracker = new Set();  // set to track all first occurrances of data
  let node = this.head;
  // iterate through all nodes except head
  while (node.next) {
    // check if data already in set, delete if it is
    if (tracker.has(node.next.data)) {
      node.next = node.next.next;
    }
    else {
      tracker.add(node.next.data);
      node = node.next;
    }
  }
  // lastly, check head
  if (tracker.has(this.head.data)) {
    this.head = this.head.next;
  }
}

console.log("*** 2.1 TESTS ***");
let ll = new LinkedList();
ll.append(1); ll.append(1);
ll.append(2); ll.append(2);
ll.append(3); ll.append(3);
ll.removeDups();
ll.print();


// 2.2 Return Kth to Last: Implement an algorithm to find the kth to last element of a singly linked list.
LinkedList.prototype.returnKthToLast = function(k) {
  if (k >= this.size || k < 0)
    return null;
  const target = this.size - k;
  let node = this.head;
  for (let i=1; i<target; i++) {
    node = node.next;
  }
  return node.data;
}

console.log("*** 2.2 TESTS ***");
ll = new LinkedList();
ll.append(1);
ll.append(2);
ll.append(3);
console.log(ll.returnKthToLast(4) === null);
console.log(ll.returnKthToLast(3) === null);
console.log(ll.returnKthToLast(2) === 1);
console.log(ll.returnKthToLast(1) === 2);
console.log(ll.returnKthToLast(0) === 3);

// 2.3 Delete Middle Node: Implement an algorithm to delete a node in the middle (i.e., any node but the first and last node, not necessarily the exact middle) of a singly linked list, given only access to that node.  EXAMPLE:  Input:the node c from the linked list a->b->c->d->e->f.  Result: nothing is returned, but the new linked list looks like a->b->d->e->f.
LinkedList.prototype.deleteMiddle = function() {
  let mid = Math.floor(this.size / 2);
  let node = this.head;
  for (let i=1; i<mid; i++) {
    node = node.next;
  }
  node.next = node.next.next;
  this.size -= 1;
}

console.log("*** 2.3 TESTS ***");
ll = new LinkedList();
ll.append(1);
ll.append(2);
ll.append(3);
ll.append(4);
ll.append(5);
ll.append(6);
ll.deleteMiddle();
ll.print();
console.log('...');
ll.deleteMiddle();
ll.print();


// 2.4 Partition: Write code to partition a linked list around a value x, such that all nodes less than x come before all nodes greater than or equal to x. If x is contained within the list, the values of x only need to be after the elements less than x (see below). The partition element x can appear anywhere in the "right partition"; it does not need to appear between the left and right partitions.


// 2.5 Sum Lists: You have two numbers represented by a linked list, where each node contains a single digit.The digits are stored in reverse order, such that the 1 's digit is at the head of the list. Write a function that adds the two numbers and returns the sum as a linked list.  EXAMPLE: Input:(7-> 1 -> 6) + (5 -> 9 -> 2).Thatis,617 + 295. Output:2 -> 1 -> 9. That is: 912.  FOLLOW UP: Suppose the digits are stored in forward order. Repeat the above problem. EXAMPLE: Input:(6 -> 1 -> 7) + (2 -> 9 -> 5).That is,617 + 295. Output:9 -> 1 -> 2. That is: 912.


// 2.6 Palindrome: Implement a function to check if a linked list is a palindrome. Hints:#5, #13, #29, #61, #101


// 2.7 Intersection: Given two (singly) linked lists, determine if the two lists intersect. Return the inter­ secting node. Note that the intersection is defined based on reference, not value.That is, if the kth node of the first linked list is the exact same node (by reference) as the jth node of the second linked list, then they are intersecting.  Hints:#20, #45, #55, #65, #76, #93, #111, #120, #129


// 2.8 Loop Detection: Given a circular linked list, implement an algorithm that returns the node at the beginning of the loop.  DEFINITION:  Circular linked list: A (corrupt) linked list in which a node's next pointer points to an earlier node, so as to make a loop in the linked list.  EXAMPLE:  Input: A -> B -> C -> D -> E -> C[thesameCasearlier].  Output: C

