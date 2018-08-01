/*
НА ПРОТОТИПАХ, классы заменить на адекватные названия)
Реализовать класс "Базовое устройство для готовки". Класс при создании получает свойство name.
Также у него есть метод cook, который выводит "вызван метод cook для класса "Базовое устройство для готовки", name =..."

Его наследниками являются классы "Кастрюля" и "Сковородка".
"Кастрюля" имеет метод boil, который внутри себя вызывает родительский метод cook, а так же выводит надпись "вызван метод boil для класса "Кастрюля", name =..."
"Сковородка" переопределяет метод cook, который выводит "вызван переопределенный метод cook для класса "Сковородка", name =..."
*/
//вариант прототипного наследования
function BaseDeviseForCook(name) {
    this.name = name;
};
BaseDeviseForCook.prototype.cook = function () {
    alert("вызван метод cook для класса \"baseDeviseForCook\", name = " + this.name);
};

function Pot(name) {
    this.name = name;
}
Pot.prototype = Object.create(BaseDeviseForCook.prototype);
Pot.prototype.constructor = Pot;
Pot.prototype.boil = function () {
   this.cook();
    alert("вызван метод boil для класса \"Pot\", name = " + this.name)
};
var pot = new Pot("Кастрюля");
pot.boil();

function Pan(name) {
    this.name = name;
};
Pan.prototype = Object.create(BaseDeviseForCook.prototype);
Pan.prototype.constructor = Pot;
Pan.prototype.cook = function () {
    alert("вызван переопределенный метод cook для класса \"Pan\", name = " + this.name)
};
var pan = new Pan("Сковорода");
pan.cook();

//вариант наследования с классами
/* 
class baseDeviseForCook {
    constructor(name) {
        this.name = name;
    }
    cook() {
        alert("вызван метод cook для класса \"baseDeviseForCook\", name = " + this.name);
    }
}
class Pot extends baseDeviseForCook {
    boil() {
        super.cook();
        alert("вызван метод boil для класса \"Pot\", name = " + this.name)
    }
}
class Pan extends baseDeviseForCook {
    cook() {
        alert("вызван переопределенный метод cook для класса \"Pan\", name = " + this.name)
    }
}

new Pot("Кастрюля").boil();
new Pan("Сковорода").cook();  
 */
//вариант функционального наследования
/*  function BaseDeviseForCook(name) {
    this.name = name;
    this.cook = function () {
        alert("вызван метод cook для класса \"baseDeviseForCook\", name = " + this.name);
    };
}

function Pot() {
    BaseDeviseForCook.apply(this, arguments);
    this.boil = function () {
        this.cook();
        alert("вызван метод boil для класса \"Pot\", name = " + this.name)
    };
}
var pot = new Pot("Кастрюля");
pot.boil();

function Pan() {
    BaseDeviseForCook.apply(this, arguments);
    this.cook = function () {
        alert("вызван переопределенный метод cook для класса \"Pan\", name = " + this.name)
    }
};
var pan = new Pan("Сковорода"); 
pan.cook(); 
 */