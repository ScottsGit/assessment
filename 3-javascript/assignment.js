const { isArrayEqual, isArrayEqualJSON } = require("./helper.js");
/*
1. Write a JavaScript function that reverse a number. 
Example x = 32243;
Expected Output: 34223
*/
const reverseNum = (n) => {
  return Number(`${n}`.split("").reverse().join(""));
};

console.log("1. Test reverseNum: ", reverseNum(32243) === 34223);

/*
2. Write a JavaScript function that checks whether a passed string is palindrome or not?
A palindrome is word, phrase, or sequence that reads the same backward as forward, e.g.,
madam or nurses run.
*/
const isPalindrome = (s) => {
  let left = 0,
    right = s.length - 1;

  while (left <= right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }

  return true;
};

console.log("2. Test isPalindrome:", isPalindrome("madam") === true);
console.log("2. Test isPalindrome:", isPalindrome("nurses") === false);

/*
3. Write a JavaScript function that generates all combinations of a string. 
Example string: 'dog' 
Expected Output: d, do, dog, o, og, g
*/
const allCombinations = (s) => {
  const result = [];
  for (let i = 0; i < s.length; i++) {
    result.push(...recurExplore(s, i + 1, s[i]));
  }

  return result.sort();
};
const recurExplore = (s, idx, comb) => {
  if (idx >= s.length) return [comb];

  const result = [comb];
  result.push(...recurExplore(s, idx + 1, comb + s[idx]));

  return result;
};

console.log(
  "3. Test allCombinations:",
  isArrayEqual(
    allCombinations("dog").sort(),
    ["d", "do", "dog", "o", "og", "g"].sort()
  )
);

/*
4. Write a JavaScript function that returns a passed string with letters in alphabetical order.
Example string: 'webmaster' 
Expected Output: 'abeemrstw'
Assume punctuation and numbers symbols are not included in the passed string.
*/
const alphabeticalOrder = (str) => {
  return [...str].sort().join("");
};

String.prototype.alphabeticalOrder = function () {
  const buff = Array(57).fill(0);
  const A = "A".charCodeAt(0);
  for (const c of this) {
    const p = c.charCodeAt(0) - A;
    buff[p] += 1;
  }
  let s = "";
  for (let i = 0; i < buff.length; i++) {
    if (buff[i] > 0) {
      let count = buff[i];
      while (count > 0) {
        s += String.fromCharCode(i + A);
        count--;
      }
    }
  }
  return s;
};

console.log(
  "4. Test alphabeticalOrder: ",
  alphabeticalOrder("webmaster") === "abeemrstw"
);
console.log(
  "4. Test alphabeticalOrder: ",
  "webmaster".alphabeticalOrder() === "abeemrstw"
);

/*
5. Write a JavaScript function that accepts a string as a parameter and converts the first letter of
each word of the string in upper case. 
Example string: 'the quick brown fox' 
Expected Output: 'The Quick Brown Fox '
*/
const upperCaseFirstLetter = (str) => {
  return str
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
};

console.log(
  "5. Test upperCaseFirstLetter: ",
  upperCaseFirstLetter("the quick brown fox") === "The Quick Brown Fox"
);

/*
6. Write a JavaScript function that accepts a string as a parameter and find the longest word
within the string. 
Example string: 'Web Development Tutorial' 
Expected Output: 'Development'
*/
const findLongestWord = (str) => {
  return str.split(" ").reduce((longest, w) => {
    return w.length > longest.length ? w : longest;
  }, "");
};

console.log(
  "6. Test findLongestWord: ",
  findLongestWord("Web Development Tutorial") === "Development"
);

/*
7. Write a JavaScript function that accepts a string as a parameter and counts the number of
vowels within the string. 
Note: As the letter 'y' can be regarded as both a vowel and a consonant, we do not count 'y' as
vowel here. 
Example string: 'The quick brown fox' 
Expected Output: 5
*/
// aeiou
const countVowel = (str) => {
  const set = new Set(["a", "e", "i", "o", "u"]);
  let count = 0;
  for (const c of str) {
    if (set.has(c)) count++;
  }
  return count;
};
console.log("7. Test countVowel: ", countVowel("The quick brown fox") === 5);

/*
8. Write a JavaScript function that accepts a number as a parameter and check the number is
prime or not. 
Note: A prime number (or a prime) is a natural number greater than 1 that has no positive
divisors other than 1 and itself.
*/
Number.prototype.isPrime = function () {
  if (this <= 1) return false;
  if (this === 2) return true;

  for (let i = 2; i < this; i++) {
    if (this % i === 0) {
      return false;
    }
  }
  return true;
};
console.log("8. Test isPrimeNumber: ", Number(23).isPrime() === true);

/*
9. Write a JavaScript function which accepts an argument and returns the type. 
Note: There are six possible values that typeof returns: object, boolean, function, number, string,
and undefined.
*/
const whatTypeOf = (x) => {
  return typeof x;
};
console.log("9. Test whatTypeOf: ", whatTypeOf([]) === "object");
console.log("9. Test whatTypeOf: ", whatTypeOf(true) === "boolean");
console.log("9. Test whatTypeOf: ", whatTypeOf(() => {}) === "function");
console.log("9. Test whatTypeOf: ", whatTypeOf(23) === "number");
console.log("9. Test whatTypeOf: ", whatTypeOf("test") === "string");
console.log("9. Test whatTypeOf: ", whatTypeOf(undefined) === "undefined");

/*
10. Write a JavaScript function which returns the n rows by n columns identity matrix.
Note: An identity matrix is a square matrix in which all the elements of principal diagonals are one, 
and all other elements are zeros.
*/
const identityMatrix = (n) => {
  const matrix = Array(n)
    .fill()
    .map(() => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    matrix[i][i] = 1;
  }
  return matrix;
};

console.log(
  "10. Test identityMatrix: ",
  isArrayEqualJSON(identityMatrix(3), [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ])
);

/*
11. Write a JavaScript function which will take an array of numbers stored and find the second
lowest and second greatest numbers, respectively. 
Sample array: [1,2,3,4,5]
Expected Output: 2,4
*/
const findSecondLowestAndGreatest = (nums) => {
  return [nums[1], nums[nums.length - 2]];
};

console.log(
  "11. Test findSecondLowestAndGreatest: ",
  isArrayEqual(findSecondLowestAndGreatest([1, 2, 3, 4, 5, 6]), [2, 5])
);
/*
12. Write a JavaScript function which says whether a number is perfect. 
According to Wikipedia: In number theory, a perfect number is a positive integer that is equal to
the sum of its proper positive divisors, that is, the sum of its positive divisors excluding the
number itself (also known as its aliquot sum). Equivalently, a perfect number is a number that is
half the sum of all of its positive divisors (including itself).
Example: The first perfect number is 6, because 1, 2, and 3 are its proper positive divisors, and 1
+ 2 + 3 = 6. Equivalently, the number 6 is equal to half the sum of all its positive divisors: ( 1 +
2 + 3 + 6 ) / 2 = 6. The next perfect number is 28 = 1 + 2 + 4 + 7 + 14. This is followed by the
perfect numbers 496 and 8128.
*/
const isPerfectNumber = (num) => {
  const positiveDivisors = [];
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) positiveDivisors.push(i);
  }
  return positiveDivisors.reduce((sum, n) => sum + n, 0) / 2 === num;
};

console.log("12. Test isPerfectNumber: ", isPerfectNumber(6) === true);
console.log("12. Test isPerfectNumber: ", isPerfectNumber(28) === true);
console.log("12. Test isPerfectNumber: ", isPerfectNumber(8128) === true);
console.log("12. Test isPerfectNumber: ", isPerfectNumber(158) === false);

/*
13. Write a JavaScript function to compute the factors of a positive integer. 
*/
const allFactors = (num) => {
  const factors = new Set();
  for (let i = 1; i <= num / 2; i++) {
    if (num % i === 0) {
      factors.add(i);
      factors.add(num / i);
    }
  }
  return Array.from(factors);
};

console.log(
  "13. Test allFactors: ",
  isArrayEqual(
    allFactors(48).sort((a, b) => a - b),
    [1, 2, 3, 4, 6, 8, 12, 16, 24, 48]
  )
);

/*
14. Write a JavaScript function to convert an amount to coins. 
Sample function: amountTocoins(46, [25, 10, 5, 2, 1])
Here 46 is the amount. and 25, 10, 5, 2, 1 are coins. 
Output: 25, 10, 10, 1
*/
const amountTocoins = (amount, coins) => {
  const wallet = [];
  for (const coin of coins) {
    let maxCount = Math.floor(amount / coin);
    while (maxCount > 0) {
      wallet.push(coin);
      maxCount--;
      amount -= coin;
    }
  }

  return wallet;
};

console.log(
  "14. Test amountTocoins: ",
  isArrayEqual(amountTocoins(46, [25, 10, 5, 2, 1]), [25, 10, 10, 1])
);

/*
15. Write a JavaScript function to compute the value of bn where n is the exponent and b is the
bases. Accept b and n from the user and display the result.
*/
const calculatePower = (b, n) => {
  return b ** n;
};

console.log("15. Test calculatePower: ", calculatePower(2, 3) === 8);

/*
16. Write a JavaScript function to extract unique characters from a string. 
Example string: "thequickbrownfoxjumpsoverthelazydog"
Expected Output: "thequickbrownfxjmpsvlazydg"
*/
const extractUniqueCharacters = (str) => {
  return Array.from(new Set([...str])).join("");
};

console.log(
  "16. Test extractUniqueCharacters: ",
  extractUniqueCharacters("thequickbrownfoxjumpsoverthelazydog") ===
    "thequickbrownfxjmpsvlazydg"
);

/*
17. Write a JavaScript function to get the number of occurrences of each letter in specified string.
*/
const freqOfString = (str) => {
  const hash = new Map();
  for (const c of str) {
    hash.set(c, (hash.get(c) || 0) + 1);
  }

  return hash;
};
console.log(
  "17. Test freqOfString: ",
  isArrayEqualJSON(Object.fromEntries(freqOfString("aabbc")), {
    a: 2,
    b: 2,
    c: 1,
  })
);

/*
18. Write a function for searching JavaScript arrays with a binary search. 
Note: A binary search searches by splitting an array into smaller and smaller chunks until it finds
the desired value.
*/
const binarySearch = (nums, target) => {
  let left = 0,
    right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (target === nums[mid]) return mid;
    if (target < mid) {
      right = mid;
    } else {
      left = mid;
    }
  }
  return left;
};

console.log(
  "18. Test binarySearch: ",
  binarySearch([1, 2, 3, 4, 6, 8, 12, 16, 24, 48], 3) === 2
);

/*
19. Write a JavaScript function that returns array elements larger than a number.
*/
const numbersLargerThan = (nums, target) => {
  return nums.filter((n) => n > target);
};

console.log(
  "19. Test numbersLargerThan: ",
  isArrayEqualJSON(
    numbersLargerThan([1, 2, 3, 4, 6, 8, 12, 16, 48], 8),
    [12, 16, 48]
  )
);

/*
20. Write a JavaScript function that generates a string id (specified length) of random characters.
Sample   character   list:
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
*/
const randomID = (sample, length) => {
  let str = "";
  for (let i = 0; i < length; i++) {
    str += sample[Math.floor(Math.random() * length)];
  }
  return str;
};

const id = randomID(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  6
);
console.log("20. Test randomID: ", id, id.length === 6);

/*
21. Write a JavaScript function to get all possible subset with a fixed length (for example 2)
combinations in an array. 
Sample array: [1, 2, 3] and subset length is 2 
Expected output: [[2, 1], [3, 1], [3, 2]]
*/
const allSubsets = (nums, k) => {
  const l = nums.length;
  const result = [];

  const recurExplore = (nums, k, idx, comb) => {
    if (idx > l || k === 0) return [comb];

    const r = [];
    for (let i = idx; i < l; i++) {
      r.push(...recurExplore(nums, k - 1, i + 1, [nums[i], ...comb]));
    }
    return r;
  };

  for (let i = 0; i < l; i++) {
    result.push(...recurExplore(nums, k - 1, i + 1, [nums[i]]));
  }

  return result;
};

console.log(
  "21. Test allSubsets: ",
  isArrayEqualJSON(allSubsets([1, 2, 3], 2), [
    [2, 1],
    [3, 1],
    [3, 2],
  ])
);

/*
22. Write a JavaScript function that accepts two arguments, a string and a letter and the function
will count the number of occurrences of the specified letter within the string. 
Sample arguments: 'microsoft.com', 'o'
*/
String.prototype.findOccurrence = function (c) {
  let count = 0;
  for (const char of this) {
    if (char === c) count++;
  }
  return count;
};

console.log(
  "22. Test findOccurrence: ",
  "microsoft.com".findOccurrence("o") === 3
);

/*
23. Write a JavaScript function to find the first not repeated character. 
Sample arguments: 'abacddbec' 
Expected output: 'e'
*/
const firstNotRepeated = (str) => {
  // freqOfString is from question 17
  const hash = freqOfString(str);
  for (const c of str) {
    if (hash.get(c) === 1) return c;
  }
};

console.log(
  "23. Test firstNotRepeated: ",
  firstNotRepeated("abacddbec") === "e"
);

/*
24. Write a JavaScript function to apply Bubble Sort algorithm. 
Note: According to wikipedia "Bubble sort, sometimes referred to as sinking sort, is a simple
sorting algorithm that works by repeatedly stepping through the list to be sorted, comparing
each pair of adjacent items and swapping them if they are in the wrong order". 
Sample array: [12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213]
Expected output: [3223, 546, 455, 345, 234, 213, 122, 98, 84, 64, 23, 12, 9, 4, 1]
*/
const bubbleSort = (nums) => {
  for (let i = 0; i < nums.length; i++) {
    let noSwap = true;
    for (let j = 0; j < nums.length - i; j++) {
      if (nums[j] < nums[j + 1]) {
        const temp = nums[j + 1];
        nums[j + 1] = nums[j];
        nums[j] = temp;
        noSwap = false;
      }
    }
    if (noSwap) break;
  }
  return nums;
};

console.log(
  "24. Test bubbleSort: ",
  isArrayEqual(
    bubbleSort([
      12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213,
    ]),
    [3223, 546, 455, 345, 234, 213, 122, 98, 84, 64, 23, 12, 9, 4, 1]
  )
);
/*
25. Write a JavaScript function that accept a list of country names as input and returns the
longest country name as output. 
Sample function: Longest_Country_Name(["Australia", "Germany", "United States of America"])
Expected output: "United States of America"
*/
const findLongestCountryName = (arr) => {
  return arr.reduce((longest, w) => {
    return w.length > longest.length ? w : longest;
  }, "");
};

console.log(
  "25. Test findLongestCountryName: ",
  findLongestCountryName([
    "Australia",
    "Germany",
    "United States of America",
  ]) === "United States of America"
);

/*
26. Write a JavaScript function to find longest substring in a given a string without repeating
characters.
*/
const longestSubString = (str) => {
  const set = new Set();
  let shrink = 0;
  let longest = [0, 0];

  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (!set.has(c)) {
      set.add(c);
      if (i - shrink + 1 >= longest[1] - longest[0]) {
        longest = [shrink, i + 1];
      }
    } else {
      while (set.has(c)) {
        set.delete(str[shrink]);
        shrink++;
      }
    }
  }
  return str.slice(longest[0], longest[1]);
};

console.log(
  "26. Test longestSubString: ",
  longestSubString("occurrence") === "renc"
);
/*
27. Write a JavaScript function that returns the longest palindrome in a given string.
Note: According to Wikipedia "In computer science, the longest palindromic substring or longest
symmetric factor problem is the problem of finding a maximum-length contiguous substring of a
given string that is also a palindrome. For example, the longest palindromic substring of
"bananas" is "anana". The longest palindromic substring is not guaranteed to be unique; for
example, in the string "abracadabra", there is no palindromic substring with length greater than
three, but there are two palindromic substrings with length three, namely, "aca" and "ada".
In some applications it may be necessary to return all maximal palindromic substrings (that is, all
substrings that are themselves palindromes and cannot be extended to larger palindromic
substrings) rather than returning only one substring or returning the maximum length of a
palindromic substring.
*/
const longestPalindrome = (str) => {
  let result = [];
  let longest = 0;
  for (let i = 1; i < str.length - 1; i++) {
    const palindrome1 = explore(str, i - 1, i + 1);
    const palindrome2 = explore(str, i, i + 1);

    if (palindrome1.length > longest) {
      result = [palindrome1];
      longest = palindrome1.length;
    } else if (palindrome1.length === longest) {
      result.push(palindrome1);
    }

    if (palindrome2.length > longest) {
      result = [palindrome2];
      longest = palindrome2.length;
    } else if (palindrome2.length === longest) {
      result.push(palindrome2);
    }
  }

  return result;
};
const explore = (str, idx1, idx2) => {
  while (idx1 >= 0 && idx2 < str.length && str[idx1] === str[idx2]) {
    idx1--;
    idx2++;
  }
  return str.slice(idx1 + 1, idx2);
};

console.log(
  "27. Test longestPalindrome: ",
  isArrayEqual(longestPalindrome("abracadabra"), ["aca", "ada"])
);

/*
28. Write a JavaScript program to pass a 'JavaScript function' as parameter.
*/
Array.prototype.myReduce = function (cb, initialVal) {
  if (initialVal === undefined || initialVal === null) {
    throw new EvalError("initialVal is undefined or null");
  }
  let accumulator = initialVal;
  for (const e of this) {
    accumulator = cb(accumulator, e);
  }
  return accumulator;
};
const sum = [1, 2, 3].myReduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);
console.log("28. Test myReduce: ", sum === 6);

/*
29. Write a JavaScript function to get the function name.
*/
const myFunction = () => {};
console.log("28. Test myFunction: ", myFunction.name === "myFunction");
function getFuncName() {
  console.log(getFuncName.arguments.callee.name);
  console.log(getFuncName.name);
}
getFuncName();
