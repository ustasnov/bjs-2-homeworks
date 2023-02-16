"use strict";

function parseCount(value) {
  let result = Number.parseFloat(value);
  if (isNaN(result)) {
    throw new Error("Невалидное значение");
  }
  return result;
}

function validateCount(value) {
  try {
    let result = parseCount(value);
    return result;
  }
  catch (error) {
    return error;
  }
}

function testTask1() {
  console.log(validateCount("123"));
  console.log(validateCount("012"));
  console.log(validateCount("56.65"));
  console.log(validateCount("ыфва"));
}


class Triangle {
  constructor(a, b, c) {
    if ((a + b) < c || (a + c) < b || (b + c) < a) {
      throw new Error("Треугольник с такими сторонами не существует");
    }
    this.a = a;
    this.b = b;
    this.c = c;
  }

  get perimeter() {
    return this.a + this.b + this.c;
  }

  set perimeter(value) {
  }

  get area() {
    let p = 0.5 * this.perimeter;
    return parseFloat(Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c)).toFixed(3));
  }

  set area(value) {
  }
}

function getTriangle(a, b, c) {
  try {
    let result = new Triangle(a, b, c);
    return result;
  }
  catch (error) {
    return {
      get perimeter() {
        return "Ошибка! Треугольник не существует";
      },
      set perimeter(value) {
      },
      get area() {
        return "Ошибка! Треугольник не существует";
      },
      set area(value) {
      }
    }
  }
}

function testTask2() {
  console.log(new Triangle(1, 3, 3).perimeter);
  console.log(new Triangle(2, 5, 5).area);   //perimeter=12, area=4.899
  let tr1 = new Triangle(6, 10, 15);
  console.log(tr1.perimeter);                    //perimeter=31, area=20.123
  console.log(tr1.area);

  tr1.perimeter = "неправильное значение";
  tr1.area = "неправильное значение";
  console.log(tr1.perimeter);                    //perimeter=31, area=20.123
  console.log(tr1.area);

  try {
    tr1 = new Triangle(1, 3, 100);
  }
  catch (error) {
    console.log(error);
  }
  try {
    tr1 = new Triangle(100, 3, 10);
  }
  catch (error) {
    console.log(error);
  }
  try {
    tr1 = new Triangle(1, 300, 10);
  }
  catch (error) {
    console.log(error);
  }
  tr1 = getTriangle(2, 5, 5);
  console.log(tr1.perimeter);
  console.log(tr1.area);

  tr1 = getTriangle(1, 3, 100);
  console.log(tr1.perimeter);
  console.log(tr1.area);

  tr1.perimeter = "неправильное значение";
  tr1.area = "неправильное значение";
  console.log(tr1.perimeter);
  console.log(tr1.area);
}

testTask1();
testTask2();
