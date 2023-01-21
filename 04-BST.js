// CHAPTER 4: TREES AND GRAPHS
// CLASSES FOR TREES, BINARY SEARCH TREES

// Node - used in generic trees
class Node {
  constructor(key) {
    this.key = key;
    this.parent = null;
    this.children = [];
  }
}

// NodeBT - used for Binary trees, BST, etc
class NodeBT {
  constructor(key, data=null) {
    // BSTs can optionally use keys instead of data to determine insert order
    this.key = key;
    this.data = data;
    this.parent = null;
    this.left = null;
    this.right = null;
  }
}

// BST - Binary Search Tree
class BST {
  constructor(root=null) {
    this.root = root;
  }

  search(key, parent=this.root) {
    if (parent === null || parent.key === key)
      return parent;
    else if (key < parent.key)
      return this.search(key, parent.left);
    else
      return this.search(key, parent.right);
  }

  insert(key, parent=this.root) {
    let node = new NodeBT(key);
    console.log("Inserting: " + node.key);
    // first check root
    if (parent === null) {
      this.root = node;
      console.log("Root node created: " + node.key);
    }
    // check left side
    else if (node.key < parent.key) {
      if (parent.left === null) {
        parent.left = node;
        node.parent = parent;
        console.log("Inserted " + node.key + " to the left of " + parent.key);
      }
      else
        this.insert(node.key, parent.left);
    }
    // check right side
    else {
      if (parent.right === null) {
        parent.right = node;
        node.parent = parent;
        console.log("Inserted " + node.key + " to the right of " + parent.key);
      }
      else
        this.insert(node.key, parent.right);
    }
  }

  // transplant replaces one node with another, and can also be used to delete a node by replacing a node with null
  // note that transplant does not alter the children, that is the responsibility of the function that calls transplant
  // i.e. make sure prev's children (if any) are taken care of before replacing it.
  transplant(prev, repl) {
    if (prev === this.root)
      this.root = repl;
    else if (prev === prev.parent.left)
      prev.parent.left = repl;
    else
      prev.parent.right = repl;
    if (repl !== null)
      repl.parent = prev.parent;
  }

  delete(key, parent = this.root) {
    let toDelete = this.search(key);
    if (toDelete !== null) {
      // no children OR only 1 left child
      if (toDelete.right === null)
        this.transplant(toDelete, toDelete.left);
      // only 1 right child
      else if (toDelete.left === null)
        this.transplant(toDelete, toDelete.right);
      // two children: promote the successor (leftmost node in right subtree)
      else {
        let succ = this.minimum(toDelete.right);
        // console.log("successor of " + toDelete.key + " is " + succ.key);
        // is successor further down the tree?
        if (succ !== toDelete.right) {
          // replace successor with its right child (if any).  succ can't have left children since it is the min (leftmost)
          this.transplant(succ, succ.right);
          // succ takes over toDelete's right child
          succ.right = toDelete.right;
          succ.right.parent = succ;
        }
        // replace toDelete with successor and give toDelete's left child to succ
        this.transplant(toDelete, succ);
        succ.left = toDelete.left;
        succ.left.parent = succ;
      }
    }
    else {
      console.log("Cannot delete " + key + ", node not found.");
    }
  }

  // visit merely prints the key in the node, but could be used to do other things
  visit(node) {
    console.log(node.key);
  }

  traverseInOrder(node = this.root) {
    if (node !== null) {
      this.traverseInOrder(node.left);
      this.visit(node);
      this.traverseInOrder(node.right);
    }
  }

  traversePreOrder(node = this.root) {
    if (node !== null) {
      this.visit(node);
      this.traversePreOrder(node.left);
      this.traversePreOrder(node.right);
    }
  }

  traversePostOrder(node = this.root) {
    if (node !== null) {
      this.traversePostOrder(node.left);
      this.traversePostOrder(node.right);
      this.visit(node);
    }
  }

  minimum(node = this.root) {
    while (node.left !== null)
      node = node.left;
    return node;
  }

  maximum(node = this.root) {
    while (node.right !== null)
      node = node.right;
    return node;
  }

}

////////////////////////////////////////// TESTS //////////////////////////////////////////
let bst = new BST();
bst.insert(5);
bst.insert(1);
bst.insert(8);
bst.insert(2);
bst.insert(7);
bst.insert(13);
bst.insert(21);
bst.insert(9);
bst.insert(10);
bst.insert(12);
console.log("--- In-order traversal ---");
bst.traverseInOrder();
console.log("--- Pre-order traversal ---");
bst.traversePreOrder();
console.log("--- Post-order traversal ---");
bst.traversePostOrder();
console.log("--- Minimum ---");
console.log(bst.minimum().key);
console.log("--- Maximum ---");
console.log(bst.maximum().key);
console.log("--- Search ---");
let k = 13; s = bst.search(k);  if(s !== null) { console.log(s.key)} else { console.log(k + " not found.") }
k = 17; s = bst.search(k);  if(s !== null) { console.log(s.key)} else { console.log(k + " not found.") }
k = 5; s = bst.search(k);  if(s !== null) { console.log(s.key)} else { console.log(k + " not found.") }
k = 9; s = bst.search(k);  if(s !== null) { console.log(s.key)} else { console.log(k + " not found.") }
k = 999; s = bst.search(k);  if(s !== null) { console.log(s.key)} else { console.log(k + " not found.") }
console.log("--- Delete ---");
bst.delete(8);
bst.traverseInOrder();