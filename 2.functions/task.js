"use strict";

function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

function isValidArray(arr) {
  if (arr.length == 0) {
    return false;
  }

  for (let i = 0; i < arr.length; i++) {
    if (!isNumber(arr[i])) {
      return false;
    }
  }

  return true;
}

function getArrayParams(...arr) {
  let min;
  let max;
  let avg;

  if (isValidArray(arr)) {
    min = Infinity;
    max = -Infinity;
    avg = 0;
    let sum = 0;
 
    arr.forEach(item => {
      min = Math.min(min, item);
      max = Math.max(max, item);
      sum = sum + item;
    });

    min = parseFloat(min.toFixed(2));
    max = parseFloat(max.toFixed(2));
    avg = parseFloat((sum / arr.length).toFixed(2));
  }
  
  return {min: min, max: max, avg: avg};
}

function summElementsWorker(...arr) {
  if (!isValidArray(arr)) {
    return 0;
  }

  return arr.reduce((previousValue, currentValue) => previousValue + currentValue);
}

function differenceMaxMinWorker(...arr) {
  if (!isValidArray(arr)) {
    return 0;
  }
 
  let min = Infinity;
  let max = -Infinity;

  arr.forEach(item => {
    min = Math.min(min, item);
    max = Math.max(max, item);
  });

  return max - min;
}

function differenceEvenOddWorker(...arr) {
  if (!isValidArray(arr)) {
    return 0;
  }

  let sumEvenElement = 0;
  let sumOddElement = 0;

  arr.forEach(item => {
    if (item % 2 == 0) {
      sumEvenElement += item;
    } else {
      sumOddElement += item;
    }
  });
  
  return sumEvenElement - sumOddElement;
}

function averageEvenElementsWorker(...arr) {
  if (!isValidArray(arr)) {
    return 0;
  }

  let sumEvenElement = 0;
  let countEvenElement = 0;
  let avr = 0;

  arr.forEach(item => {
    if (item % 2 == 0) {
      sumEvenElement += item;
      countEvenElement++;
    }
  });
  
  if (countEvenElement > 0) {
    avr = sumEvenElement / countEvenElement; 
  }

  return avr;
}

function makeWork(arrOfArr, func) {
  let maxWorkerResult = -Infinity;

  for (let i = 0; i < arrOfArr.length; i++) {
    const arr =  arrOfArr[i];
    maxWorkerResult = Math.max(maxWorkerResult, func(...arr));
  }

  return maxWorkerResult;
}

function testCase() {
  console.log(getArrayParams(-99, 99, 10));         //{ min: -99, max: 99, avg: 3.33 }
  console.log(getArrayParams(1, 2, 3, -100, 10));   //{ min: -100, max: 10, avg: -16.80 }
  console.log(getArrayParams(5));                   //{ min: 5, max: 5, avg: 5.00 }
  console.log(getArrayParams()); 
  console.log(getArrayParams("a","b", true)); 
  console.log("-------------");
  console.log(summElementsWorker());                    //0
  console.log(summElementsWorker(10, 10, 11, 20, 10));  //61
  console.log(summElementsWorker(0, 0, 0, -1, -100));   //-101
  console.log("-------------");
  console.log(differenceMaxMinWorker());                    //0
  console.log(differenceMaxMinWorker(10, 10, 11, 20, 10));  //10
  console.log(differenceMaxMinWorker(0, 0, 0, -1, -100));   //100
  console.log("-------------");
  console.log(differenceEvenOddWorker());                                       //0
  console.log(differenceEvenOddWorker(1, 2, 3, 4, 5, 6, 7, 8, 9));              //-5
  console.log(differenceEvenOddWorker(94, 51, 57, 41, 47, 66, 58, 10, 38, 17)); //53 (266 - 213)
  console.log(differenceEvenOddWorker(15, 97, 85, 64, 67, 10, 69, 40, 15, 35)); //-269 (114 - 383)
  console.log("-------------");
  console.log(averageEvenElementsWorker());                                       //0
  console.log(averageEvenElementsWorker(1, 2, 3, 4, 5, 6, 7, 8, 9));              //5
  console.log(averageEvenElementsWorker(15, 97, 85, 64, 67, 10, 69, 40, 15, 35)); //38          
  console.log("-------------");
  const arr = [[10, 10, 11, 20, 10], [67, 10, 2, 39, 88], [72, 75, 51, 87, 43], [30, 41, 55, 96, 62]];
  console.log(makeWork(arr, summElementsWorker));         //328
  console.log(makeWork(arr, differenceMaxMinWorker));     //86
  console.log(makeWork(arr, differenceEvenOddWorker));    //92
  console.log(makeWork(arr, averageEvenElementsWorker));  //72
}

testCase();
