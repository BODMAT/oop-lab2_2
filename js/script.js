"use strict";
class MyTime {
    hour;
    minute;
    second;
    constructor(h, m, s) {
        this.hour = h;
        this.minute = m;
        this.second = s;
    }
    toString() {
        return `${this.hour.toString().padStart(2, '0')}:${this.minute.toString().padStart(2, '0')}:${this.second.toString().padStart(2, '0')}`;
    }
}
function toSecSinceMidnight(t) {
    return t.hour * 3600 + t.minute * 60 + t.second;
}
function fromSecSinceMidnight(t) {
    const secPerDay = 60 * 60 * 24;
    t %= secPerDay;
    if (t < 0)
        t += secPerDay;
    const h = Math.floor(t / 3600);
    const m = Math.floor((t / 60) % 60);
    const s = t % 60;
    return new MyTime(h, m, s);
}
function addOneSecond(t) {
    return fromSecSinceMidnight(toSecSinceMidnight(t) + 1);
}
function addOneMinute(t) {
    return fromSecSinceMidnight(toSecSinceMidnight(t) + 60);
}
function addOneHour(t) {
    return fromSecSinceMidnight(toSecSinceMidnight(t) + 3600);
}
function addSeconds(t, s) {
    return fromSecSinceMidnight(toSecSinceMidnight(t) + s);
}
function difference(mt1, mt2) {
    return toSecSinceMidnight(mt1) - toSecSinceMidnight(mt2);
}
function isInRange(start, finish, t) {
    const startSec = toSecSinceMidnight(start);
    const finishSec = toSecSinceMidnight(finish);
    const tSec = toSecSinceMidnight(t);
    if (startSec <= finishSec) {
        return tSec >= startSec && tSec <= finishSec;
    }
    else {
        return tSec >= startSec || tSec <= finishSec;
    }
}
function whatLesson(mt) {
    const time = toSecSinceMidnight(mt);
    const startLessons = 8 * 60 * 60;
    const endLessons = (17 * 60 + 40) * 60;
    const lessonTime = 80 * 60;
    const breakTime = 20 * 60;
    if (time < startLessons) {
        return 'Пари ще не розпочалися';
    }
    else if (time >= endLessons) {
        return 'Пари вже закінчилися';
    }
    else {
        for (let i = 0; i < 6; i++) {
            const lessonStart = startLessons + (lessonTime + breakTime) * i;
            const lessonEnd = lessonStart + lessonTime;
            const breakStart = lessonEnd + 1;
            const breakEnd = breakStart + breakTime;
            if (time >= lessonStart && time <= lessonEnd) {
                return `Зараз ${i + 1}-а пара`;
            }
            else if (time >= breakStart && time < breakEnd) {
                return `Зараз перерва між ${i + 1}-ю та ${i + 2}-ю парою`;
            }
        }
    }
    return 'Невідомо';
}
const t1 = new MyTime(8, 30, 0);
const t2 = new MyTime(12, 15, 0);
console.log('t1: ' + t1.toString());
console.log('t2: ' + t2.toString());
console.log('');
console.log('toSecSinceMidnight(t1): ' + toSecSinceMidnight(t1));
console.log('fromSecSinceMidnight(3661): ' + fromSecSinceMidnight(3661).toString());
console.log('addOneSecond(new MyTime(23, 59, 59)): ' + addOneSecond(new MyTime(23, 59, 59)).toString());
console.log('addOneMinute(t1): ' + addOneMinute(t1).toString());
console.log('addOneHour(t1): ' + addOneHour(t1).toString());
console.log('addSeconds(t1, 120): ' + addSeconds(t1, 120).toString());
console.log('difference(t1, t2): ' + difference(t1, t2));
console.log('isInRange(t1, t2, new MyTime(11, 0, 0)): ' + isInRange(t1, t2, new MyTime(11, 0, 0)));
console.log('isInRange(new MyTime(22, 0, 0), new MyTime(6, 0, 0), new MyTime(12, 34, 0)): ' + isInRange(new MyTime(22, 0, 0), new MyTime(6, 0, 0), new MyTime(12, 34, 0)));
console.log('whatLesson(new MyTime(7, 59, 59)): ' + whatLesson(new MyTime(7, 59, 59)));
console.log('whatLesson(new MyTime(8, 0, 0)): ' + whatLesson(new MyTime(8, 0, 0)));
console.log('whatLesson(new MyTime(10, 59, 59)): ' + whatLesson(new MyTime(10, 59, 59)));
console.log('whatLesson(new MyTime(11, 0, 1)): ' + whatLesson(new MyTime(11, 0, 1)));
console.log('whatLesson(new MyTime(14, 35, 1)): ' + whatLesson(new MyTime(14, 35, 1)));
console.log('whatLesson(new MyTime(17, 39, 59)): ' + whatLesson(new MyTime(17, 39, 59)));
console.log('whatLesson(new MyTime(17, 40, 1)): ' + whatLesson(new MyTime(17, 40, 1)));
//# sourceMappingURL=script.js.map