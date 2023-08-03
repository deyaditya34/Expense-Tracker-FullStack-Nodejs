/**
 * Gets overall unique items.
 * 1. Ignores duplicates in individual lists
 * 2. Checks duplicates overall
 */

function getUniqueItems(...args) {
  const uniqueItemLists = args.map((list) => getUniqueSetFromList(list));
  let uniqueItems = [];

  uniqueItemLists.forEach(
    (list) =>
      (uniqueItems = [
        ...difference(uniqueItems, list),
        ...difference(list, uniqueItems),
      ])
  );

  return uniqueItems;
}

/**
 * Difference between two lists
 * @param {any[]} a the first list
 * @param {any[]} b the second list
 *
 * @returns {any[]} the difference of b from a
 */
function difference(a, b) {
  return a.filter((el) => !doesElementExistInList(b, el));
}

function getUniqueSetFromList(arr = []) {
  const uniqueItems = [];

  arr.forEach((item) => {
    if (!doesElementExistInList(uniqueItems, item)) {
      uniqueItems.push(item);
    }
  });

  return uniqueItems;
}

function doesElementExistInList(arr, elem) {
  return arr.find((el) => el === elem);
}

console.log(
  getUniqueItems(
    [1, 4, 3, 1, 5, 34, 3],
    [25, 63, 254, 98, 63, 98],
    [34, 12, 25, 12, 1, 4, 3]
  )
);