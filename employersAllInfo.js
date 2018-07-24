/* 
Отныне использование for(…) практически запрещено. Отработай использование forEach, map, filter, every/some, reduce где это возможно
Реализовать функцию. Новый объект.
Входной параметр - массив с данным по работникам за неделю.
Элементами массива являются объекты.Каждый объект имеет 3 свойства:
  -name 
  -oneHourPrice // ставка за час
  -hours // массив отработанных часов за неделю (пн, вт, ср, чт, пт) 
[{
  name: "Вася",
  oneHourPrice: 100,
  hours: [8, 8, 11, 9, 6]
}, {
  name: "Петя",
  oneHourPrice: 50,
  hours: [5, 5, 5, 5, 5]
}, {
  name: "Маша",
  oneHourPrice: 150,
  hours: [8, 8, 8, 9, 7]
}, ]

Возвращает объект: {
  sumForAllEmp: number // Сумма, которая должна быть выплачена всем работникам
  salary: [ // для каждого сотрудника
    {
      name: "Вася",
      salary: 4200,
      hours: 42
    },
    ...
  ],
  hours: number // сколько все работники отработали часов за неделю,
  isNormed: boolean // отработали ли все работники как минимум 40 часов вкаждый
  isOverworked: boolean // есть ли хоть один работник, отработавший более 40 часов
  lessThanNeed: [ //массив работников, отработавиших менее 40 часов
    {
      name: "Петя",
      salary: 1250,
      hours: 25
    }
  ],
  moreThanNeed: [ //массив работников, отработавших менее 40 часов
    {
      name: "Вася",
      salary: 4200,
      hours: 42
    }
  ],
  names: string // строка с именами всех работников "вася петя маша"
} */
var employers = [{
        name: "Вася",
        oneHourPrice: 100,
        hours: [8, 8, 11, 9, 6]
    },
    {
        name: "Петя",
        oneHourPrice: 50,
        hours: [5, 5, 5, 5, 5]
    },
    {
        name: "Маша",
        oneHourPrice: 150,
        hours: [8, 8, 8, 9, 7]
    }
];

function allInfo(arr) {
    var allInfoObj = {};
    var sumForAllEmp = 0;
    var hoursForAllEmp = 0;
    var hoursArr = [];
    var names = [];
    var lessThanNeed = [];
    var moreThanNeed = [];

    var salaryArr = arr.map(function (item) {
        var hours = item.hours;
        var hoursPerWeek = 0;
        if (item.hours !== undefined) {
            hoursPerWeek = calcHoursPerWeek(hours);
        }
        var oneHourPrice = 0;
        if (item.oneHourPrice !== undefined) {
            oneHourPrice = item.oneHourPrice;
        }
        var salary = calcSalary(hoursPerWeek, oneHourPrice);

        return {
            name: getName(item),
            hoursPerWeek: hoursPerWeek,
            salary: salary,
        };
    });

    salaryArr.forEach(function (item) {
        sumForAllEmp += item.salary;
        hoursForAllEmp += item.hoursPerWeek;
        hoursArr.push(item.hoursPerWeek);
        names.push(item.name);
    });
    var lessThanNeed = salaryArr.filter(function (salaryItem) {
        return salaryItem.hoursPerWeek < 40;
    }).map(getName);

    var moreThanNeed = salaryArr.filter(function (salaryItem) {
        return salaryItem.hoursPerWeek > 40;
    }).map(getName);
    var isNormed = false
    if (hoursArr.length > 0) {
        isNormed = hoursArr.every(isNorm);
    }
    var isOverWorked = hoursArr.some(isOverWork);
    allInfoObj.salaryArr = salaryArr;
    allInfoObj.sumForAllEmp = sumForAllEmp;
    allInfoObj.hoursForAllEmp = hoursForAllEmp;
    allInfoObj.isNormed = isNormed;
    allInfoObj.isOverWorked = isOverWorked;
    allInfoObj.lessThanNeed = lessThanNeed;
    allInfoObj.moreThanNeed = moreThanNeed;
    allInfoObj.names = names;
    return allInfoObj;
}

function getName(salaryItem) {
    return salaryItem.name || "Name is not set";
}

function calcHoursPerWeek(arr) {
    var result = arr.reduce(function (sum, current) {
        return sum + current;
    }, 0);
    return result
}

function calcSalary(num, n) {
    return num * n;
}

function isNorm(hour) {
    return +hour === 40;
}

function isOverWork(hour) {
    return +hour > 40;
}


describe("Функция для администрирования персонала", function () {
    it("Если данные не пришли, то функция выдает пустые расчетные значения, логические равны false", function () {
        assert.deepEqual(
            allInfo([
            ]), {
            salaryArr: [],
            sumForAllEmp: 0,
            hoursForAllEmp: 0,
            isNormed: false,
            isOverWorked: false,
            lessThanNeed: [],
            moreThanNeed: [],
            names: []
        })
    })

    it("Если не заполнены параметры name, то функция выдаcт массивы с именами Name is not set и расчеты произведет корректно", function () {
        assert.deepEqual(
            allInfo(
            [{
                    oneHourPrice: 100,
                    hours: [8, 8, 11, 9, 6]
                },
                {
                    oneHourPrice: 50,
                    hours: [5, 5, 5, 5, 5]
                },
                {
                    oneHourPrice: 150,
                    hours: [8, 8, 8, 9, 7]
                }
            ]), {
            salaryArr: [{
                name: "Name is not set",
                hoursPerWeek: 42,
                salary: 4200
            }, {
                name: "Name is not set",
                hoursPerWeek: 25,
                salary: 1250
            }, {
                name: "Name is not set",
                hoursPerWeek: 40,
                salary: 6000
            }],
            sumForAllEmp: 11450,
            hoursForAllEmp: 107,
            isNormed: false,
            isOverWorked: true,
            lessThanNeed: ["Name is not set", ],
            moreThanNeed: ["Name is not set", ],
            names: ["Name is not set", "Name is not set", "Name is not set", ]
        })
    })

    it("Если не заполнены параметры oneHourPrice, то функция при расчете salary и sumForAllEmp выдаст 0", function () {
        assert.deepEqual(
            allInfo(
            [{
                    name: "Вася",
                    hours: [8, 8, 11, 9, 6]
                },
                {
                    name: "Петя",
                    hours: [5, 5, 5, 5, 5]
                },
                {
                    name: "Маша",
                    hours: [8, 8, 8, 9, 7]
                }
            ]), {
            salaryArr: [{
                name: "Вася",
                hoursPerWeek: 42,
                salary: 0
            }, {
                name: "Петя",
                hoursPerWeek: 25,
                salary: 0
            }, {
                name: "Маша",
                hoursPerWeek: 40,
                salary: 0
            }],
            sumForAllEmp: 0,
            hoursForAllEmp: 107,
            isNormed: false,
            isOverWorked: true,
            lessThanNeed: ["Петя"],
            moreThanNeed: ["Вася"],
            names: ["Вася", "Петя", "Маша"]
        })
    })

    it("Если не заполнен массив hours, то функция при расчете salary, вернет 0", function () {
        assert.deepEqual(
            allInfo(
            [{
                    name: "Вася",
                    oneHourPrice: 100,
                },
                {
                    name: "Петя",
                    oneHourPrice: 50,
                },
                {
                    name: "Маша",
                    oneHourPrice: 150,
                }
            ]), {
            salaryArr: [{
                name: "Вася",
                hoursPerWeek: 0,
                salary: 0
            }, {
                name: "Петя",
                hoursPerWeek: 0,
                salary: 0
            }, {
                name: "Маша",
                hoursPerWeek: 0,
                salary: 0
            }],
            sumForAllEmp: 0,
            hoursForAllEmp: 0,
            isNormed: false,
            isOverWorked: false,
            lessThanNeed: ["Вася", "Петя", "Маша"],
            moreThanNeed: [],
            names: ["Вася", "Петя", "Маша"]
        })
    })

    it("Если не заполнен массив hours у одного работника, то функция при расчете его salary, вернет 0, остальные расчеты произойдут учитывая это значение", function () {
        assert.deepEqual(
            allInfo(
            [{
                    name: "Вася",
                    oneHourPrice: 100,
                },
                {
                    name: "Петя",
                    oneHourPrice: 50,
                    hours: [5, 5, 5, 5, 5]
                },
                {
                    name: "Маша",
                    oneHourPrice: 150,
                    hours: [8, 8, 8, 9, 7]
                }
            ]), {
            salaryArr: [{
                name: "Вася",
                hoursPerWeek: 0,
                salary: 0
            }, {
                name: "Петя",
                hoursPerWeek: 25,
                salary: 1250
            }, {
                name: "Маша",
                hoursPerWeek: 40,
                salary: 6000
            }],
            sumForAllEmp: 7250,
            hoursForAllEmp: 65,
            isNormed: false,
            isOverWorked: false,
            lessThanNeed: ["Вася", "Петя"],
            moreThanNeed: [],
            names: ["Вася", "Петя", "Маша"]
        })
    })
})