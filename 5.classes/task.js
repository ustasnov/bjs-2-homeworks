"use strict";

function printObjectProperties(obj) {
    Object.entries(obj).forEach(entry => {
        console.log(`${entry[0]}: ${entry[1]}`);
    });
}

/* Task 1 */

class PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this.state = 100;
        this.type = null;
    }

    set state(value) {
        this._state = value;
        if (value < 0) {
            this._state = 0;
        } else if (value > 100) {
            this._state = 100;
        } else {
            this._state = value;
        }
    }

    get state() {
        return this._state;
    }

    fix() {
        this.state *= 1.5;
    }
}

class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.type = "magazine";
    }
}

class Book extends PrintEditionItem {
    constructor(author, name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.author = author;
        this.type = "book";
    }
}

class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "novel";
    }
}

class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "fantastic";
    }
}

class DetectiveBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "detective";
    }
}

function testTask1() {
    const ped = new PrintEditionItem("Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе", "2019", 1008);
    ped.state = 70;
    console.log(ped.state);
    ped.fix();
    console.log(ped.state);
    printObjectProperties(ped);

    const mag = new Magazine("Журнал", "2012", 20);
    mag.state = 60;
    console.log(mag.state);
    mag.fix();
    console.log(mag.state);
    printObjectProperties(mag);

    const book = new Book("Известный автор", "Книга", "2021", 150, "Неизвестный автор");
    book.state = -10;
    console.log(book.state);
    book.fix();
    console.log(book.state);
    printObjectProperties(book);

    const picknick = new FantasticBook(
        "Аркадий и Борис Стругацкие",
        "Пикник на обочине",
        1972,
        168
    );

    picknick.state = 10;
    console.log(picknick.state);
    picknick.fix();
    console.log(picknick.state);
    printObjectProperties(picknick);
}

/* Task 2 */

class Library {
    constructor(name) {
        this.name = name;
        this.books = [];
    }

    addBook(book) {
        if (book.state > 30) {
            this.books.push(book);
        }
    }

    findBookBy(type, value) {
        if (this.books.length === 0) {
            return null;
        }
        let book = this.books.find(element => element[type] === value);
        return book ? book : null;
    }

    giveBookByName(bookName) {
        let book = this.findBookBy("name", bookName);
        if (book != null) {
            this.books = this.books.filter(element => element !== book);
        }
        return book;
    }
}

function testTask2() {
    const library = new Library("Библиотека имени Ленина");

    library.addBook(
        new DetectiveBook(
            "Артур Конан Дойл",
            "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
            2019,
            1008
        )
    );
    library.addBook(
        new FantasticBook(
            "Аркадий и Борис Стругацкие",
            "Пикник на обочине",
            1972,
            168
        )
    );
    library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
    library.addBook(new Magazine("Мурзилка", 1924, 60));

    console.log(library.findBookBy("name", "Властелин колец")); //null
    console.log(library.findBookBy("releaseDate", 1924).name); //"Мурзилка"

    console.log("Количество книг до выдачи: " + library.books.length); //Количество книг до выдачи: 4
    let book = library.giveBookByName("Машина времени");
    console.log("Количество книг после выдачи: " + library.books.length); //Количество книг после выдачи: 3

    book.state = 25;
    library.addBook(book);
    console.log("Количество книг после возврата поврежденной книги: " + library.books.length); //Количество книг после возврата: 3
    book.fix();
    library.addBook(book);
    console.log("Количество книг после возврата восстановленной книги: " + library.books.length); //Количество книг после возврата: 4
}

/* Task 3 */
class Student {
    constructor(name) {
        this.name = name;
    }

    addMark(mark, subject) {
        if (mark < 2 || mark > 5) {
            return;
        }
        if (!this.hasOwnProperty(subject)) {
            this[subject] = [];
        }
        this[subject].push(mark);
    }

    getAverageBySubject(subject) {
        if (!this.hasOwnProperty(subject) || this[subject].length == 0) {
            return 0;
        }
        let result = this[subject].reduce((acc, item, index, arr) => {
            acc += item;
            if (index === arr.length - 1) {
                return acc / arr.length;
            }
            return acc;
        }, 0);
        return result;
    }


    getAverage() {
        let result = Object.keys(this).filter(value => value !== "name").reduce((acc, item, index, arr) => {
            acc += this.getAverageBySubject(item);
            if (index === arr.length - 1) {
                return acc / arr.length;
            }
            return acc;
        }, 0);
        return result;
    }
}

function testTask3() {
    const student = new Student("Олег Никифоров");
    student.addMark(5, "химия");
    student.addMark(5, "химия");
    student.addMark(5, "физика");
    student.addMark(4, "физика");
    student.addMark(6, "физика"); // Оценка не добавится, так как больше 5
    console.log(student.getAverageBySubject("физика")); // Средний балл по предмету физика 4.5
    console.log(student.getAverageBySubject("биология")); // Вернёт 0, так как по такому предмету нет никаких оценок.
    console.log(student.getAverage()); // Средний балл по всем предметам 4.75
}

testTask1();
testTask2();
testTask3();



