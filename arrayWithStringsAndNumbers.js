/*
Описание:
Написать функцию, принимающую массив на вход. Значения массива - строки и числа.
Функция возвращает массив из двух чисел:
первый элемент - сумма чисел из переданного массива (перед суммированием числа округляются в меньшую сторону), 
второй элемент - строка из всех строк из переданного массива, последний символ каждой строки перевести в верхний регистр.
Покрыть тестами
*/



function superFunction(arr) {
    var sumNum = 0;
    var sumStr = '';
    for (i = 0; i < arr.length; i++) {
        if (typeof arr[i] === 'number') {
            var num = Math.floor(arr[i]);
            sumNum += num;
        } 
        else if (typeof arr[i] === 'string') {
            sumStr += (lastUpper(arr[i]) + ' ');
        } 
        else {
            console.log('hi i m mistake');
        }
    }
    var superArr = [sumNum, sumStr];
    console.log(superArr);
    return superArr;
}

function lastUpper(str) {
    var index = str.length - 1;
    var strUpper = str.slice(0, index) + str[index].toUpperCase();
    return strUpper;
}
describe("Минимальные значения в массиве", function () {

    it("Если в массиве не только числа и буквы", function () {
        assert.deepEqual(superFunction(['ab', 2.8, true, "cd", "EF", [], 3, 4.9]), [9, "aB cD EF "]);
    });

    it("Если в массиве отрицательные числа и буквы", function () {
        assert.deepEqual(superFunction([-1.1, "sN", -3.6, "gh"]), [-6, "sN gH "]);
    });
    it("Если в массиве числа и больше 2х букв", function () {
        assert.deepEqual(superFunction([1.5, "abc", 3, "d", "Sv", "hello"]), [4, "abC D SV hellO "]);
    });

});