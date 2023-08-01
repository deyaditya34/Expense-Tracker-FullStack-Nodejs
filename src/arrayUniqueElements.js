let arr1 = [1, 2, 3, 4, 5, 6];
let arr2 = [3, 4, 5, 6, 7];

function sym(arr1, arr2) {
  let args = [];
  let valueInArgs = false;
  let arr1Length = arr1.length;
  let arr2Length = arr2.length;
  let elementMatch = false;

  console.log("arr1Length", arr1Length);
  console.log("arr2Length", arr2Length);

  if (arr1Length > arr2Length) {
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        console.log("Inside j", arr1[i], arr2[j])
        if (arr1[i] = arr2[j]) {
          elementMatch === true;
        }
      }

      // if (elementMatch === false) {
      //   args.push(arr1[i]);
      // }
    }
  }

  // if (arr1Length > arr2Length) {
  //   for (let i = 0; i < arr1.length; i++) {
  //     for (let j = 0; j < arr2.length; j++) {
  //       if (arr1[i] === arr2[j]) {
  //         argsPresent === true;
  //       }
  //       console.log(arr1[i], arr2[j], argsPresent);
  //     }
  //     if (argsPresent === false) {
  //       args.push(arr1[i]);
  //       console.log(arr1[i])
  //       for (let k = 0; k < args.length; k++) {
  //         if (arr1[i] === args[k]) {
  //           valueInArgs === true;
  //         }
  //       }
  //       if (valueInArgs === false) {
  //         args.push(arr1[i]);
  //       }
  //     }
  //   }
  // }

  // if (arr2Length > arr1Length) {
  //   for (let i = 0; i < arr2.length; i++) {
  //     for (let j = 0; j < arr2.length; j++) {
  //       if (arr2[i] !== arr1[i]) {
  //         for (let k = 0; k < args.length; k++) {
  //           if (args[k] === arr2[i]) {
  //             valueInArgs === true;
  //           }
  //           k++;
  //         }
  //         if (!valueInArgs) {
  //           args.push(arr2[i]);
  //         }
  //       }
  //       j++;
  //     }
  //     i++;
  //   }
  // }

  return args;
}

console.log(sym(arr1, arr2));
