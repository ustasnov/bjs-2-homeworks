"use strict"

function solveEquation(a, b, c) {
  let arr = [];
  let d = Math.pow(b, 2) - 4 * a * c;

  if (d === 0) {
    arr[0] = -b / (2 * a);
  } else if (d > 0) {
    arr[0] = (-b + Math.sqrt(d)) / (2 * a);
    arr[1] = (-b - Math.sqrt(d)) / (2 * a);
  }
  
  return arr;
}

function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  if (!isNumber(percent) || !isNumber(contribution) || !isNumber(amount) || !isNumber(countMonths)) {
    return false;
  }

  let P = percent / (100 * 12);
  let S = amount - contribution;
  let monthlyPayment = S * (P + (P / (Math.pow(1 + P, countMonths) - 1)));

  return parseFloat((monthlyPayment * countMonths).toFixed(2));
}

