// 1.1 Is Unique: Implement an algorithm to determine if a string has all unique characters. What if you cannot use additional data structures?
/// SCENARIO A: WITH ADDITIONAL DATA STRUCTURES
// note - experimented with arrays, sets, and map.  map was fastest by far.
function isUniqueA(string) {
  let map = new Map();
  for (let c of string) {
    if (map.has(c))
      return false;
    else
      map.set(c);
  }
  return true;  // if we reach this point in the code, there are no dup characters, and we can return true
}
console.log ("1.1A TESTS");
console.log(isUniqueA("True") === true);
console.log(isUniqueA("Faaaaaaaaalse") === false);

/// SCENARIO B: WITHOUT ADDITIONAL DATA STRUCTURES
function isUniqueB(str) {
  str = [...str]; // convert input into Array in place (no add'l data structures allowed)
  str.sort();
  for (let i=1; i<str.length; i++) {
    if (str[i] === str[i-1])
      return false;
  }
  return true;  // if we reach this point in the code, there are no dup characters, and we can return true
}
console.log ("1.1B TESTS");
console.log(isUniqueB("True") === true);
console.log(isUniqueB("Faaaaaaaaalse") === false);


// 1.2 Check Permutation: Given two strings, write a method to decide if one is a permutation of the other.
function isPermutation(str1, str2) {
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
console.log(isPermutation("bat", "tabs") === false);
console.log(isPermutation("bat", "tab") === true);


// 1.3 URL-ify: Write a method to replace all spaces in a string with '%20'. You may assume that the string has sufficient space at the end to hold the additional characters, and that you are given the "true" length of the string. (Note: If implementing in Java, please use a character array so that you can perform this operation in place.)
function urlify(string) {
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
console.log(urlify("space out") === "space%20out");


// 1.4 Palindrome Permutation: Given a string, write a function to check if it is a permutation of a palin­drome. A palindrome is a word or phrase that is the same forwards and backwards. A permutation is a rearrangement of letters. The palindrome does not need to be limited to just dictionary words.
function isPalindrome(string) {
  const last = string.length-1;
  const mid = Math.floor(string.length / 2)-1;
  for (let i=0; i<=mid; i++) {
    if (string[i] !== string[last-i])
      return false;
  }
  return true;
}
console.log ("1.4 TESTS");
console.log(isPalindrome("monkey") === false);
console.log(isPalindrome("tacocat") === true);


// 1.5 One Away: There are three types of edits that can be performed on strings: insert a character, remove a character, or replace a character. Given two strings, write a function to check if they are one edit (or zero edits) away.
function oneAway(str1, str2) {
  let count = 0;  // keep track of discrepancies, no more than 1 max
  const len = str1.length < str2.length ? str1.length : str2.length;
  for (let i=0; i<len; i++) {
    let a = str1[i];
    let b = str2[i];
    if (a !== b) {
      count += 1; // increment discrepancy count
      // check if an insert would fix it

    }
  }
}


// 1.6 String Compression: Implement a method to perform basic string compression using the counts of repeated characters. For example, the string aabcccccaaa would become a2blc5a3. If the "compressed" string would not become smaller than the original string, your method should return the original string. You can assume the string has only uppercase and lowercase letters (a - z).


// 1.7 Rotate Matrix: Given an image represented by an NxN matrix, where each pixel in the image is 4 bytes, write a method to rotate the image by 90 degrees. Can you do this in place?


// 1.8 Zero Matrix: Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column are set to 0.


// 1.9 String Rotation:Assume you have a method isSubstring which checks if one word is a substring of another. Given two strings, s1 and s2, write code to check if s2 is a rotation of s1 using only one call to isSubstring (e.g.,"waterbottle" is a rotation of "erbottlewat").