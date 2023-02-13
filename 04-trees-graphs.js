// CHAPTER 4: TREES AND GRAPHS

// Link to LeetCode versions of these challenges:
// https://leetcode.com/discuss/general-discussion/1152824/cracking-the-coding-interview-6th-edition-in-leetcode


// 4.1 Route Between Nodes: Given a directed graph, design an algorithm to find out whether there is a route between two nodes.


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


// 4.6 Successor: Write an algorithm to find the "next" node (i.e., in-order successor) of a given node in a binary search tree. You may assume that each node has a link to its parent.


// 4.7 Build Order: You are given a list of projects and a list of dependencies (which is a list of pairs of projects, where the second project is dependent on the first project). All of a project's dependencies must be built before the project is. Find a build order that will allow the projects to be built. If there is no valid build order, return an error.


// 4.8 First Common Ancestor: Design an algorithm and write code to find the first common ancestor of two nodes in a binary tree. Avoid storing additional nodes in a data structure. NOTE: This is not necessarily a binary search tree.


// 4.9 BST Sequences: A binary search tree was created by traversing through an array from left to right and inserting each element. Given a binary search tree with distinct elements, print all possible arrays that could have led to this tree.


// 4.10 Check Subtree: T1 and T2 are two very large binary trees, with T1 much bigger than T2. Create an algorithm to determine if T2 is a subtree of T1.  A tree T2 is a subtree of T1 if there exists a node n in T1 such that the subtree of n is identical to T2. That is, if you cut off the tree at node n, the two trees would be identical.


// 4.11 You are implementing a binary tree class from scratch which, in addition to insert, find, and delete, has a method getRandomNode() which returns a random node from the tree. All nodes should be equally likely to be chosen. Design and implement an algorithm for getRandomNode, and explain how you would implement the rest of the methods.


// 4.12 You are given a binary tree in which each node contains an integer value (which might be positive or negative). Design an algorithm to count the number of paths that sum to a given value. The path does not need to start or end at the root or a leaf, but it must go downwards (traveling only from parent nodes to child nodes).
