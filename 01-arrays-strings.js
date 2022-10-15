// Link to LeetCode versions of these challenges:
// https://leetcode.com/discuss/general-discussion/1152824/cracking-the-coding-interview-6th-edition-in-leetcode

// 1.1 Is Unique: Implement an algorithm to determine if a string has all unique characters. What if you cannot use additional data structures?
/// SCENARIO A: WITH ADDITIONAL DATA STRUCTURES
// note - experimented with Objects, Arrays, Sets, and Map.  Set & Map were tied for fastest by far.
function IsUniqueA(string) {
  let set = new Set();
  for (let c of string) {
    if (set.has(c))
      return false;
    else
      set.add(c);
  }
  return true;  // if we reach this point in the code, there are no dup characters, and we can return true
}
console.log ("1.1A TESTS");
console.log(IsUniqueA("True") === true);
console.log(IsUniqueA("Faaaaaaaaalse") === false);

/// SCENARIO B: WITHOUT ADDITIONAL DATA STRUCTURES
function IsUniqueB(str) {
  str = [...str]; // convert input into Array in place (no add'l data structures allowed)
  str.sort();
  for (let i=1; i<str.length; i++) {
    if (str[i] === str[i-1])
      return false;
  }
  return true;  // if we reach this point in the code, there are no dup characters, and we can return true
}
console.log ("1.1B TESTS");
console.log(IsUniqueB("True") === true);
console.log(IsUniqueB("Faaaaaaaaalse") === false);


// 1.2 Check Permutation: Given two strings, write a method to decide if one is a permutation of the other.
function IsPermutation(str1, str2) {
  // first perform simple check that they are same length, and both strings contain at least 1 char
  if (str1.length != str2.length || str1.length === 0 || str2.length === 0) {
    return false;
  }
  s1 = [...str1].sort();
  s2 = [...str2].sort();
  for (let i=0; i<s1.length; i++) {
    if (s1[i] !== s2[i])
      return false;
  }
  // if we reach this part of the code, then we have a permutation match, so return true
  return true;
}
console.log("1.2 TESTS");
console.log(IsPermutation("bat", "tabs") === false);
console.log(IsPermutation("bat", "tab") === true);


// 1.3 URL-ify: Write a method to replace all spaces in a string with '%20'. You may assume that the string has sufficient space at the end to hold the additional characters, and that you are given the "true" length of the string. (Note: If implementing in Java, please use a character array so that you can perform this operation in place.)
function Urlify(string) {
  const newStr = [];
  for (let i=0; i<string.length; i++) {
    let c = string[i];
    if (c !== ' ')
      newStr.push(c);
    else
      newStr.push('%','2','0');
  }
  return newStr.join(''); // join('') converts the array to a string but without commas that come with toString()
}
console.log ("1.3 TESTS");
console.log(Urlify("space out") === "space%20out");


// 1.4 Palindrome Permutation: Given a string, write a function to check if it is a permutation of a palin­drome. A palindrome is a word or phrase that is the same forwards and backwards. A permutation is a rearrangement of letters. The palindrome does not need to be limited to just dictionary words.
function IsPalindrome(string) {
  const last = string.length-1;
  const mid = Math.floor(string.length / 2)-1;
  for (let i=0; i<=mid; i++) {
    if (string[i] !== string[last-i])
      return false;
  }
  return true;
}
console.log ("1.4 TESTS");
console.log(IsPalindrome("monkey") === false);
console.log(IsPalindrome("tacocat") === true);


// 1.5 One Away: There are three types of edits that can be performed on strings: insert a character, remove a character, or replace a character. Given two strings, write a function to check if they are one edit (or zero edits) away.
function OneAway(s, t) {
  if(Math.abs(s.length - t.length) > 1) return false
  let diff = 0
  if(s.length === t.length){
      for(let i = 0; i < s.length; i++){
          if(s[i] !== t[i]) diff++
          if(diff > 1) return false
      }
      return true
  }
  if(t.length > s.length){
      [s,t] = [t,s];
  }
  for(let i = 0; i < s.length; i++){
      if(s[i+diff] !== t[i]) {
          diff++
          i--
      }
      if(diff > 1) return false;
  }
  return true;
}
console.log ("1.5 TESTS");
console.log(OneAway('ring', 'bring') === true); // insert test
console.log(OneAway('ring', 'rings') === true); // insert test 2
console.log(OneAway('bring', 'ring') === true); // remove test
console.log(OneAway('rings', 'ring') === true); // remove test 2
console.log(OneAway('grave', 'gravy') === true); // replace test
console.log(OneAway('treant', 'treats') === false); // mismatch test


// 1.6 String Compression: Implement a method to perform basic string compression using the counts of repeated characters. For example, the string aabcccccaaa would become a2b1c5a3. If the "compressed" string would not become smaller than the original string, your method should return the original string. You can assume the string has only uppercase and lowercase letters (a - z).
function Compress(chars) {
  let comp = [[]];            // two dimensional array to store letters and count
  let idx = 0;                // current index of comp
  comp[idx] = [chars[0], 1];  // initialize first char before looping through all chars
  for (let i=1; i<chars.length; i++) {
    if (comp[idx][0] !== chars[i]) {
      idx += 1;
      comp[idx] = [chars[i], 1];
    } else {
      comp[idx][1] += 1;
    }
  }
  const str = comp.flat().join('');  // flat() converts 2D array to 1D, then join() converts the array into a string without comma separations
  return str;
}
console.log ("1.6 TESTS");
console.log(Compress('aabcccccaaa') === 'a2b1c5a3');
console.log(Compress('bookkeeper') === 'b1o2k2e2p1e1r1');


// 1.7 Rotate Matrix: Given an image represented by an NxN matrix, where each pixel in the image is 4 bytes, write a method to rotate the image by 90 degrees. Can you do this in place?
// NOTE - THE LEETCODE VERSION OF THIS JUST CHALLENGE SAYS EACH PIXEL/ELEMENT IS AN INTEGER, SO I'M IGNORING THE 4 BYTE NOTE.
function Rotate(matrix) {
  for(let i = 0; i < matrix.length; i++) {
    for(let j = i; j < matrix[i].length; j++){
        let temp = matrix[i][j]
        matrix[i][j] = matrix[j][i]
        matrix[j][i] = temp
    }
  }
  for(let i = 0; i < matrix.length; i++){
      matrix[i].reverse()
  }
  return matrix;
}
// note - this IsEqual sub-function makes a simple brute force equality check for objects/arrays, since JS doesn't have a built-in equality check
function IsEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b) ? true : false;
}
console.log("1.7 TESTS");
console.log(IsEqual(Rotate([[1,2,3],[4,5,6],[7,8,9]]), [[7,4,1],[8,5,2],[9,6,3]]) === true);


// 1.8 Zero Matrix: Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column are set to 0.
// Note - the intent is to only make changes at the end after all zeros found, not update along the way.
function SetZeros(matrix) {
  const rows = new Set();     // track rows to zero out
  const cols = new Set();     // track cols to zero out
  const m = matrix.length;    // matrix row count
  const n = matrix[0].length; // matrix col count
  
  // first, find all the zeros and fill the set of rows, cols to zero out
  for(let i = 0; i < m; i++){
    for(let j = 0; j < n; j++){
      if(matrix[i][j] === 0){
        rows.add(i);
        cols.add(j);
      }
    }
  }
  // zero out any rows
  rows.forEach(row => {
      matrix[row] = new Array(n).fill(0)
  });
  // zero out any cols
  cols.forEach(col => {
    for(let i = 0; i < m; i++){
      matrix[i][col] = 0;
    }
  });
  return matrix;
}

console.log("1.8 TESTS");
console.log(IsEqual(SetZeros([[1,2,3],[4,5,6],[7,8,9]]),  [[1,2,3],[4,5,6],[7,8,9]]) === true);
console.log(IsEqual(SetZeros([[0,2,3],[4,5,6],[7,8,9]]),  [[0,0,0],[0,5,6],[0,8,9]]) === true);
console.log(IsEqual(SetZeros([[0,2,3],[4,0,6],[7,8,0]]),  [[0,0,0],[0,0,0],[0,0,0]]) === true);


// 1.9 String Rotation: Assume you have a method isSubstring which checks if one word is a substring of another. Given two strings, s1 and s2, write code to check if s2 is a rotation of s1 using only one call to isSubstring (e.g.,"waterbottle" is a rotation of "erbottlewat").
function IsSubstring(s1, s2) {
  if (s1.length !== s2.length)
    return false;
  let rot = [...s1];
  // iterate through each possible rotation until either a match found or search completed
  for (let i=0; i<rot.length; i++) {
    let rotStr = rot.join('');
    if (rotStr === s2)
      return true;
    else
      rot.push(rot.shift());
  }
  return false; // if we reach the end and no match found, return false
}
console.log("1.9 TESTS");
console.log(IsSubstring('test', 'ttes') === true);
console.log(IsSubstring('waterbottle', 'erbottlewat') === true);