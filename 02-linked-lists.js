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

// 2.1A Remove Dups! Write code to remove duplicates from an unsorted linked list.  FOLLOW UP:  How would you solve this problem if a temporary buffer is not allowed? Hints: #9, #40
// Note - this version from the CTCI book is different from the LeetCode problem, and doesn't require you to also delete the original when a dup is found.
LinkedList.prototype.removeDupsA = function () {
  let tracker = new Set();  // set to track all first occurrances of data
  let node = this.head;
  // iterate through all nodes except head
  while (node.next) {
    // check if data already in set, delete if it is
    if (tracker.has(node.next.data)) {
      node.next = node.next.next;
      this.size -= 1;
    }
    else {
      tracker.add(node.next.data);
      node = node.next;
    }
  }
  // lastly, check head
  if (tracker.has(this.head.data)) {
    this.head = this.head.next;
    this.size -= 1;
  }
}

console.log("*** 2.1A TESTS ***");
let ll = new LinkedList();
ll.append(1); ll.append(1);
ll.append(2); ll.append(2);
ll.append(3); ll.append(3);
ll.removeDupsA();
ll.print();

// 2.1B - LeetCode version where you delete any dups including the original
// https://leetcode.com/problems/remove-duplicates-from-an-unsorted-linked-list/
LinkedList.prototype.removeDupsB = function () {
  let tracker = new Map();  // map to count all occurrances of data
  let node = this.head;
  // first get counts of all items
  while (node) {
    let data = node.data;
    if (tracker.has(data)) {
      tracker.set(data, tracker.get(data) + 1);
    }
    else {
      tracker.set(data, 1);
    }
    node = node.next;
  }
  // next, iterate through all nodes (except head) and delete any that have a count > 1
  node = this.head;
  while (node.next) {
    let data = node.next.data;
    if (tracker.get(data) > 1) {
      node.next = node.next.next;
      this.size -= 1;
    }
    else {
      node = node.next;
    }
  }
  // lastly, check head
  if (tracker.get(this.head.data) > 1) {
    this.head = this.head.next;
    this.size -= 1;
  }
}

console.log("*** 2.1B TESTS ***");
ll = new LinkedList();
ll.append(1);
ll.append(2);
ll.append(3);
ll.append(2);
ll.removeDupsB();
ll.print();


// 2.2A Return Kth to Last: Implement an algorithm to find the kth to last element of a singly linked list.
// this version uses a size parameter of the linked list
// note: k is 1-indexed, so a value of 1 indicates the last node
LinkedList.prototype.returnKthToLastA = function (k) {
  if (k > this.size || k < 1)
    return null;
  const target = this.size - k + 1;
  let node = this.head;
  for (let i = 1; i < target; i++) {
    node = node.next;
  }
  return node.data;
}

console.log("*** 2.2A TESTS ***");
ll = new LinkedList();
ll.append(1);
ll.append(2);
ll.append(3);
console.log(ll.returnKthToLastA(5) === null);
console.log(ll.returnKthToLastA(4) === null);
console.log(ll.returnKthToLastA(3) === 1);
console.log(ll.returnKthToLastA(2) === 2);
console.log(ll.returnKthToLastA(1) === 3);

// 2.2B Return Kth to Last: Implement an algorithm to find the kth to last element of a singly linked list.
// this version doesn't use the size parameter
// note: k is 1-indexed, so a value of 1 indicates the last node
LinkedList.prototype.returnKthToLastB = function (k) {
  // first, loop through all nodes to get the size of the linked list
  let size = 0;
  let node = this.head;
  while (node) {
    size += 1;
    node = node.next;
  }
  let target = size - k + 1;
  // catch any targets out of range
  if (k > size || k < 1)
    return null;
  else {
    // loop through and reach the kth from last node
    let count = 1;
    node = this.head;
    while (count < target) {
      count += 1;
      node = node.next;
    }
    // finally, return that node
    return node.data;
  }
}

console.log("*** 2.2B TESTS ***");
ll = new LinkedList();
ll.append(1);
ll.append(2);
ll.append(3);
console.log(ll.returnKthToLastB(5) === null);
console.log(ll.returnKthToLastB(4) === null);
console.log(ll.returnKthToLastB(3) === 1);
console.log(ll.returnKthToLastB(2) === 2);
console.log(ll.returnKthToLastB(1) === 3);


// 2.3 Delete Middle Node: Implement an algorithm to delete a node in the middle (i.e., any node but the first and last node, not necessarily the exact middle) of a singly linked list, given only access to that node.  EXAMPLE:  Input:the node c from the linked list a->b->c->d->e->f.  Result: nothing is returned, but the new linked list looks like a->b->d->e->f.
LinkedList.prototype.deleteMiddle = function () {
  let mid = Math.floor(this.size / 2);
  let node = this.head;
  for (let i = 1; i < mid; i++) {
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
LinkedList.prototype.partition = function (x) {

}


// 2.5 Sum Lists: You have two numbers represented by a linked list, where each node contains a single digit.The digits are stored in reverse order, such that the 1 's digit is at the head of the list. Write a function that adds the two numbers and returns the sum as a linked list.  EXAMPLE: Input:(7-> 1 -> 6) + (5 -> 9 -> 2).Thatis,617 + 295. Output:2 -> 1 -> 9. That is: 912.  FOLLOW UP: Suppose the digits are stored in forward order. Repeat the above problem. EXAMPLE: Input:(6 -> 1 -> 7) + (2 -> 9 -> 5).That is,617 + 295. Output:9 -> 1 -> 2. That is: 912.


// 2.6 Palindrome: Implement a function to check if a linked list is a palindrome. Hints:#5, #13, #29, #61, #101
let isPalindrome = function (head) {
  let LHead = head;
  let slow = head;
  let fast = head;
  while (fast?.next) {
    slow = slow.next;
    fast = fast.next?.next;
  }

  let reverseInPlace = function (head) {
    let runner = head.next;
    let reversed = head;
    head.next = null;

    while (runner) {
      const next = runner.next;
      runner.next = reversed;
      reversed = runner;
      runner = next;
    }
    return reversed;
  }

  slow = reverseInPlace(slow)

  let runner = head;
  while (slow && runner) {
    if (slow.val !== runner.val) 
      return false;
    slow = slow.next;
    runner = runner.next;
  }
  return true;
};


// 2.7 Intersection: Given two (singly) linked lists, determine if the two lists intersect. Return the inter­ secting node. Note that the intersection is defined based on reference, not value.That is, if the kth node of the first linked list is the exact same node (by reference) as the jth node of the second linked list, then they are intersecting.  Hints:#20, #45, #55, #65, #76, #93, #111, #120, #129



// 2.8 Loop Detection: Given a circular linked list, implement an algorithm that returns the node at the beginning of the loop.  DEFINITION:  Circular linked list: A (corrupt) linked list in which a node's next pointer points to an earlier node, so as to make a loop in the linked list.  EXAMPLE:  Input: A -> B -> C -> D -> E -> C[thesameCasearlier].  Output: C

