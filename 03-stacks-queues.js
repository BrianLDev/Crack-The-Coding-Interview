// CHAPTER 3: STACKS AND QUEUES

// Link to LeetCode versions of these challenges:
// https://leetcode.com/discuss/general-discussion/1152824/cracking-the-coding-interview-6th-edition-in-leetcode

// CLASSES FOR CH 3 EXAMPLES
// NODE (used in both Stack and Queue)
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
// STACK
class Stack {
  constructor(node)


}

// QUEUE



// INTERVIEW QUESTION PROBLEMS

// 3.1 Three in One: Describe how you could use a single array to implement three stacks. Hints: #2, #72, #38, #58


// 3.2 Stack Min: How would you design a stack which, in addition to push and pop, has a function min which returns the minimum element? Push, pop and min should all operate in 0(1) time.  Hints:#27, #59, #78


// 3.3 Stack of Plates: Imagine a (literal) stack of plates. If the stack gets too high, it might topple. Therefore, in real life, we would likely start a new stack when the previous stack exceeds some threshold. Implement a data structure SetOfStacks that mimics this. SetO-fStacks should be composed of several stacks and should create a new stack once the previous one exceeds capacity. SetOfStacks. push() and SetOfStacks. pop() should behave identically to a single stack (that is, pop() should return the same values as it would if there were just a single stack).  FOLLOW UP: Implement a function popAt(int index) which performs a pop operation on a specific sub-stack.  Hints:#64, #87

class DinnerPlates {
  constructor(capacity) {
    this.capacity = capacity > 0 ? capacity : 1;
    this.stacks = [[]];
    this.leftmostOpen = 0;
    this.rightmost = 0;
  }
};

DinnerPlates.prototype.push = function(val) {
    // starting at leftmostOpen, check if at capacity and find the leftmost stack that's not at capacity
    console.log(this.stacks[this.leftmostOpen].length + " vs " + this.capacity)
    while (this.stacks[this.leftmostOpen].length >= this.capacity) {
      this.leftmostOpen += 1;
    }
    // make sure rightmost >= leftmostOpen
    if (this.rightmost < this.leftmostOpen)
      this.rightmost = this.leftmostOpen;
    console.log("pushing " + val + " to stack " + this.leftmostOpen);
    // create a new stack if needed
    if (this.stacks[this.leftmostOpen] === undefined)
      this.stacks[this.leftmostOpen].push(val);
    // else push to the top of leftmostOpen stack
    else
      this.stacks[this.leftmostOpen].push(val);
};

DinnerPlates.prototype.pop = function() {
  // return -1 if all stacks are empty
  if (this.stacks.length === 0)
    return -1;
  // else pop from rightmost stack
  let val = this.stacks[this.rightmost].pop();
  if (this.stacks[this.rightmost].length === 0) {
    this.rightmost -= 1;
  // make sure leftmostOpen <= rightmost
  if (this.leftmostOpen > this.rightmost)
    this.leftmostOpen = this.rightmost;
  }
  return val;
};

DinnerPlates.prototype.popAtStack = function(index) {
  if (this.stacks[index].length === 0)
    return -1;
  let val = this.stacks[index].pop();
  if (index < this.leftmostOpen)
    this.leftmostOpen = index;
  return val;
};


// 3.4 Queue via Stacks: Implement a MyQueue class which implements a queue using two stacks.  Hints: #98, #7 74


// 3.5 Sort Stack: Write a program to sort a stack such that the smallest items are on the top. You can use an additional temporary stack, but you may not copy the elements into any other data structure (such as an array). The stack supports the following operations: push, pop, peek, and isEmpty.  Hints:# 15, #32, #43


// 3.6 Animal Shelter: An animal shelter, which holds only dogs and cats, operates on a strictly"first in, first out" basis. People must adopt either the"oldest" (based on arrival time) of all animals at the shelter, or they can select whether they would prefer a dog or a cat (and will receive the oldest animal of that type). They cannot select which specific animal they would like. Create the data structures to maintain this system and implement operations such as enqueue, dequeueAny, dequeueDog, and dequeueCat. You may use the built-in Linked list data structure.  Hints:#22, #56, #63