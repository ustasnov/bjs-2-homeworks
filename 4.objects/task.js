"use strict";

function Student(name, gender, age) {
  this.name = name;
  this.gender = gender;
  this.age = age;
  this.marks = [];
}

Student.prototype.setSubject = function (subjectName) {
  this.subject = subjectName;
}

Student.prototype.addMarks = function (...marks) {
  if (this.hasOwnProperty("marks")) {
    this.marks.push(...marks);
  }
}

Student.prototype.getAverage = function () {
  if (!this.hasOwnProperty("marks") || this.marks.length == 0) {
    return 0;
  }
  let result = this.marks.reduce((acc, item, index, arr) => {
    acc += item;
    if (index === arr.length - 1) {
      return acc / arr.length;
    }
    return acc;
  }, 0);
  return Math.round(result);
}

Student.prototype.exclude = function (reason) {
  delete this.subject;
  delete this.marks;
  this.excluded = reason;
}

let student = new Student("Василиса", "женский", 19);
console.log(student);
student.setSubject("Algebra");
console.log(student);
student.setSubject("Geometry");
console.log(student);
student.addMarks(5, 4, 5);
console.log(student.marks);
student.addMarks(5, 4, 5);
console.log(student.marks);
console.log(student.getAverage());
student.marks = [3, 4, 5];
console.log(student.marks);
console.log(student.getAverage());
console.log(student);
student.exclude('прогулы');
console.log(student);
student.addMarks(5, 5, 5);
console.log(student);
console.log(student.getAverage());
