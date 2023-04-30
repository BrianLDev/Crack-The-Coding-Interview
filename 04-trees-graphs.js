// CHAPTER 4: TREES AND GRAPHS

// Link to LeetCode versions of these challenges:
// https://leetcode.com/discuss/general-discussion/1152824/cracking-the-coding-interview-6th-edition-in-leetcode


// 4.1 Route Between Nodes: Given a directed graph, design an algorithm to find out whether there is a route between two nodes.
function validPath (n, edges, source, destination) {
  // make an adjacency list
  const list = new Map();
  edges.forEach ((edge) => {
      const [left, right] = edge;
      if (!list.has(left)) {
          list.set(left, []);
      }
      if (!list.has(right)) {
          list.set(right, []);
      }
      list.get(left).push(right);
      list.get(right).push(left);
  })
  // create a visited set
  const visited = new Set();
  // create a queue
  const queue = [source];
  // traverse the adjacency list
  while (queue.length > 0) {
      const node = queue.shift();
      if (visited.has(node))
        continue;
      if (node === destination)
        return true;
      visited.add(node)
      list.get(node).forEach((neighbor) => {
          queue.push(neighbor);
      })
  }
  return false;
};

// 4.2 Minimal Tree: Given a sorted (increasing order) array with unique integer elements, write an algo­ rithm to create a binary search tree with minimal height.

// class for a binary tree node.
class TreeNode {
  constructor (val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
  }
}
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
  if(nums.length === 0)
      return null
  if(nums.length === 1)
      return new TreeNode(nums[0])

  const middleIndex = Math.ceil((nums.length - 1) / 2)
  const treeNode = new TreeNode(nums[middleIndex])
  treeNode.left = sortedArrayToBST(nums.slice(0, middleIndex))
  treeNode.right = sortedArrayToBST(nums.slice(middleIndex + 1))
  return treeNode
};

// 4.3 List of Depths: Given a binary tree, design an algorithm which creates a linked list of all the nodes at each depth (e.g., if you have a tree with depth D, you'll have D linked lists).
// LEETCODE VERSION DONE AS GROUP - https://leetcode.com/problems/binary-tree-level-order-traversal/ 
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  const result = [];

  if (!root) return result;
  const queue = [[root, 0]];

  while (queue.length > 0) {
      const [node, level] = queue.shift();

      if (!result[level])
          result[level] = [];

      result[level].push(node.val);

      if (node.left)
          queue.push([node.left, level + 1]);
      if (node.right)
          queue.push([node.right, level + 1]);
  }

  return result;
};


// 4.4 Check Balanced: Implement a function to check if a binary tree is balanced. For the purposes of this question, a balanced tree is defined to be a tree such that the heights of the two subtrees of any node never differ by more than one.

// LEETCODE VERSION - https://leetcode.com/problems/balanced-binary-tree/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */

var isBalanced = function(root) {
  // NOTE - all subtrees must also be balanced, so simply comparing heights l vs r won't work
  return getHeightIfBalanced(root) !== null;
};

var getHeightIfBalanced = function(node) {
  if (node === null)
    return 0;

  const l = getHeightIfBalanced(node.left);
  const r = getHeightIfBalanced(node.right);
  if (l === null || r === null || Math.abs(l-r) > 1)
    return null;
  else
    return 1 + Math.max(l,r);
}


// 4.5 Validate BST: Implement a function to check if a binary tree is a binary search tree.
// LEETCODE VERSION - https://leetcode.com/problems/validate-binary-search-tree/description/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
function isValidBST(root) {
  return checkBST(root);
}

function checkBST(parent, min=-Infinity, max=Infinity) {
  if (!parent) return true;
  if (parent.val <= min) return false;
  if (parent.val >= max) return false;
  return checkBST(parent.left, min, parent.val) && checkBST(parent.right, parent.val, max);
}

// 4.6 Successor: Write an algorithm to find the "next" node (i.e., in-order successor) of a given node in a binary search tree. You may assume that each node has a link to its parent.
// LEETCODE VERSION (REQUIRES PREMIUM) - https://leetcode.com/problems/inorder-successor-in-bst-ii/


// 4.7 Build Order: You are given a list of projects and a list of dependencies (which is a list of pairs of projects, where the second project is dependent on the first project). All of a project's dependencies must be built before the project is. Find a build order that will allow the projects to be built. If there is no valid build order, return an error.
// LEETCODE VERSION - https://leetcode.com/problems/course-schedule-ii/


// 4.8 First Common Ancestor: Design an algorithm and write code to find the first common ancestor of two nodes in a binary tree. Avoid storing additional nodes in a data structure. NOTE: This is not necessarily a binary search tree.
// LEETCODE VERSION - https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  const parents = [];
  const queue = [root];
  parents[root.val] = null;

  while (queue.length > 0) {
      const node = queue.shift();
      if (node.left) {
          parents[node.left.val] = node;
          queue.push(node.left);
      }
      if (node.right) {
          parents[node.right.val] = node;
          queue.push(node.right);
      }
  }

  let ancestorP = [];
  let ancestorQ = [];
  let node = p;
  while (node != null) {
      ancestorP.push(node);
      node = parents[node.val];
  }
  node = q;
  while (node != null) {
      ancestorQ.push(node);
      node = parents[node.val];
  }

  if (ancestorP.length > ancestorQ.length) {
      [ancestorP, ancestorQ] = [ancestorQ, ancestorP];
  }

  for (let i = 1; i <= ancestorP.length; i++) {
      const pNode = ancestorP[ancestorP.length - i];
      const qNode = ancestorQ[ancestorQ.length - i];
      console.log(pNode.val, qNode.val);
      if (pNode.val != qNode.val) {
          return ancestorP[ancestorP.length - i + 1]
      }
  }

  return ancestorP[0];
};

// Alternative, super efficient version of Lowest Common Ancestor found on LeetCode discussion.
// Study and understand it for future reference
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  var resL = lowestCommonAncestor(root.left, p, q);
  var resR = lowestCommonAncestor(root.right, p, q);
  return (resL && resR) ? root : (resL || resR);
}


// 4.9 BST Sequences: A binary search tree was created by traversing through an array from left to right and inserting each element. Given a binary search tree with distinct elements, print all possible arrays that could have led to this tree.
// LEETCODE VERSION - https://leetcode.com/problems/number-of-ways-to-reorder-array-to-get-same-bst/ 
/**
 * @param {number[]} nums
 * @return {number}
 */
function factorial (n) {
  if (n==0 || n==1)
    return 1n;
  let subtotal = 1n
  for (let i = 1n; i<=n; i++) {
    subtotal *= i;
  }
  return subtotal;
}

function combination(n, r) {
  num = factorial(n);
  denom = factorial(r) * factorial(n-r);
  return num/denom;
}

function numOfWays(nums) {
  function f(nums) {
    if (nums.length <= 2)
      return 1n;
    const left = nums.filter(n => n < nums[0]);
    const right = nums.filter(n => n > nums[0]);
    const n = left.length + right.length;
    const r = right.length; // could also to left.length
    return combination(n, r) * f(left) * f(right);
  }
  return (f(nums)-1n) % ((10n**9n)+7n)
}

// 4.10 Check Subtree: T1 and T2 are two very large binary trees, with T1 much bigger than T2. Create an algorithm to determine if T2 is a subtree of T1.  A tree T2 is a subtree of T1 if there exists a node n in T1 such that the subtree of n is identical to T2. That is, if you cut off the tree at node n, the two trees would be identical.
// LEETCODE VERSION - https://leetcode.com/problems/subtree-of-another-tree/ 
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
function isSubtree(root, subRoot) {
  if (root === null || root === undefined || subRoot === null || subRoot === undefined)
      return false;
  if (inOrderTraversal(root, subRoot) === true)
      return true;
  else
      return false;
};

function inOrderTraversal(node, subRoot) {
  if (node !== null) {
      const left = inOrderTraversal(node.left, subRoot);
      if (node.val === subRoot.val)
          if (compareTrees(node, subRoot) === true)
              return true;
      const right = inOrderTraversal(node.right, subRoot);
      return (left || right);
  }
}

function compareTrees(rootA, rootB) {
  let queue = [rootA, rootB]
  while (queue.length > 0) {
      const nodeA = queue.shift();
      const nodeB = queue.shift();
      if (nodeA === null || nodeB === null) { return false; }
      if (nodeA.val !== nodeB.val) { return false; }
      if (nodeA.left || nodeB.left) {
          queue.push(nodeA.left);
          queue.push(nodeB.left);
      }
      if (nodeA.right || nodeB.right) {
          queue.push(nodeA.right);
          queue.push(nodeB.right);
      }
  }
  // reached end and all nodes matched, return true
  return true;
}


// 4.11 You are implementing a binary tree class from scratch which, in addition to insert, find, and delete, has a method getRandomNode() which returns a random node from the tree. All nodes should be equally likely to be chosen. Design and implement an algorithm for getRandomNode, and explain how you would implement the rest of the methods.
// LEETCODE VERSION - NOT AVAILABLE


// 4.12 You are given a binary tree in which each node contains an integer value (which might be positive or negative). Design an algorithm to count the number of paths that sum to a given value. The path does not need to start or end at the root or a leaf, but it must go downwards (traveling only from parent nodes to child nodes).
// LEETCODE VERSION - https://leetcode.com/problems/path-sum-iii/description/ 
