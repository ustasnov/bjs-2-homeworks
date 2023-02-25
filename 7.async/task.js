"use strict";

class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.intervalId = null;
  }

  addClock(time, addClockCallback) {
    if (!(time && addClockCallback)) {
      throw new Error("Отсутствуют обязательные аргументы");
    }
    if (this.alarmCollection.find(item => item.time === time)) {
      console.warn('Уже присутствует звонок на это же время');
    }
    this.alarmCollection.push({ callback: addClockCallback, time: time, canCall: true });
  }

  removeClock(time) {
    this.alarmCollection = this.alarmCollection.filter(item => item.time !== time);
  }

  getCurrentFormattedTime() {
    return new Date().toLocaleTimeString("ru-Ru", { hour: "2-digit", minute: "2-digit" });
  }

  start() {
    if (this.intervalId !== null) {
      return;
    }
    this.intervalId = setInterval(() => {
      this.alarmCollection.forEach(item => {
        if (item.canCall && this.getCurrentFormattedTime() === item.time) {
          item.canCall = false;
          item.callback(item);
        }
      });
    }, 1000);
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  resetAllCalls() {
    this.alarmCollection.forEach(item => item.canCall = true);
  }

  clearAlarms() {
    this.stop();
    this.alarmCollection = [];
  }
}

function generateFormatedTime(addMinutes) {
  let newDate = new Date();
  newDate.setMinutes(newDate.getMinutes() + addMinutes);
  return newDate.toLocaleTimeString("ru-Ru", { hour: "2-digit", minute: "2-digit" });
}

function testTask() {
  let alarmClock = new AlarmClock();
  let callback = function (item) {
    console.log(`Сработал будильник на ${item.time}`);
  }
  alarmClock.addClock(generateFormatedTime(1), callback);
  alarmClock.addClock(generateFormatedTime(2), callback);

  console.log(`Включили будильник в ${alarmClock.getCurrentFormattedTime()}`);
  alarmClock.start();
  setTimeout(() => {
    alarmClock.stop();
    console.log(`Выключили будильник в ${alarmClock.getCurrentFormattedTime()}`);
  }, 180000);
}

testTask();