// let arr1 = [1, 2, 3, 4, 5];
// let arr2 = [3, 4, 5, 6, 7, 8, 6, 1];

// function sym(arr1, arr2) {
//   let args = [];
//   let elementMatch = false;
//   let elementInArgs = false;

//   let arr1Length = arr1.length;
//   let arr2Length = arr2.length;

//   if (arr1Length > arr2Length || arr1Length === arr2Length) {
//     for (let i = 0; i < arr1.length; i++) {
//       for (let j = 0; j < arr2.length; j++) {
//         if (arr1[i] === arr2[j]) {
//           elementMatch = true;
//         }
//       }
//       if (elementMatch === false) {
//         for (let k = 0; k < args.length; k++) {
//           if (arr1[i] === args[k]) {
//             elementInArgs = true;
//           }
//         }
//         if (elementInArgs === false) {
//           args.push(arr1[i]);
//         }
//         elementInArgs = false;
//       }
//       elementMatch = false;
//     }
//   } else {
//     for (let i = 0; i < arr2.length; i++) {
//       for (let j = 0; j < arr1.length; j++) {
//         if (arr2[i] === arr1[j]) {
//           elementMatch = true;
//         }
//       }
//       if (elementMatch === false) {
//         for (let k = 0; k < args.length; k++) {
//           if (arr2[i] === args[k]) {
//             elementInArgs = true;
//           }
//         }
//         if (elementInArgs === false) {
//           args.push(arr2[i]);
//         }
//         elementInArgs = false;
//       }
//       elementMatch = false;
//     }
//   }
//   return args;
// }
// console.log(sym(arr1, arr2));

function symmetrical(...args) {
  let unmatchElements = [];
  let arrays = args;

  for (let i = 0; i < arrays.length; i++) {
    arrays[i].filter((element1) => {
      let matchElements = arrays[i+1].filter((element2) => {
        console.log("element1", element1, "element2", element2);
        return element1 === element2;
      });
      if (matchElements.length === 0) {
        let unmatchElementFind = unmatchElements.filter((element3) => {
          return element1 === element3;
        });
        if (unmatchElementFind.length === 0) {
          unmatchElements.push(element1);
        }
      }
    });
  }
  return unmatchElements;
}
console.log(symmetrical([1, 2, 3, 4, 5], [2, 3, 4, 5, 5], [3, 5, 6, 3, 6]));

// let arr2 = [1, 2, 4, 5, 6, 3, 5];
// let arr1 = [1, 2, 4, 6, 7];
// let unmatchElements = [];

// arr1.filter((element1) => {
//   let matchElements = arr2.filter((element2) => {
//     console.log("element1", element1, "element2", element2);
//     return element1 === element2;
//   });
//   if (matchElements.length === 0) {
//     let unmatchElementFind = unmatchElements.filter((element3) => {
//       return element1 === element3;
//     });
//     if (unmatchElementFind.length === 0) {
//       unmatchElements.push(element1);
//     }
//   }
// });

// console.log("unmatchElements", unmatchElements);
