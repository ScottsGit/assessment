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

console.log(
  "4. Test alphabeticalOrder: ",
  alphabeticalOrder("webmaster") === "abeemrstw"
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
const findLongestWord1 = (str) => {
  let longest = "";
  for (const w of str.split(" ")) {
    if (w.length > longest.length) longest = w;
  }
  return longest;
};
const findLongestWord2 = (str) => {
  return str.split(" ").reduce((longest, w) => {
    return w.length > longest.length ? w : longest;
  }, "");
};
console.log(
  "6. Test findLongestWord1: ",
  findLongestWord1("Web Development Tutorial") === "Development"
);
console.log(
  "6. Test findLongestWord2: ",
  findLongestWord2("Web Development Tutorial") === "Development"
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
const isPrimeNumber = (num) => {
  if (num <= 1) return false;
  if (num === 2) return true;

  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};
console.log("8. Test isPrimeNumber: ", isPrimeNumber(23) === true);

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
