const isArrayEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};
const isArrayEqualJSON = (arr1, arr2) => {
  const json1 = JSON.stringify(arr1);
  const json2 = JSON.stringify(arr2);

  return json1 === json2;
};
module.exports = { isArrayEqual, isArrayEqualJSON };
