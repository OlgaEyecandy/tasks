/*
Необходимо реализовать once – функцию, которая принимает другую функцию, в качестве аргумента, и возвращает новую версию этой функции. 
Новая версия должна возвращать то же, что и оригинальная функция, но все последующие вызовы должны возвращать результат самого первого вызова. 
См. пример:

function inc(a) {
    return a + 1;
}

//res1 is 43
var res2 = incOnce(77); //res2 is 43, NOT 78

Требования:

1. Не допустимы повторные вызовы функции-аргумента
2. Функция once должна корректно работать с функциями нескольких аргументов
3. Функция once должна корректно работать с методами
4. Функция once должна корректно работать с функциями, которые кидают исключения. 
В таких случаях, новая функция должна выбрасывать одно и то же ислючение при всех последующих вызовах.

*/

//нужно иметь возможность сделать так:
//используем bind, а потом



var once = f => {
    var result;
    var isCalled = false;
    return function (...rest) {
        if (!isCalled) {
            isCalled = true;
            try {
                result = f.apply(this, rest);
            } catch (e) {
                result = new Error(`Во время выполнения функции произошла ошибка: ${e.message}`);
            }
        } 
        if (result instanceof Error){
            throw result;
        } 
        return result;
    }
}
var inc = a => a + 1;
//var incOnce = once(inc);
var incOnce = once(undefined);
try {
   var res1 = incOnce(42); 

}
catch(e){
    console.log("text" + e)
}
try {
    var res1 = incOnce(46); 
 
 }
 catch(e){
     console.log("text" + e)
 }
/* console.log(incOnce(2))
var res1 = incOnce(42);
console.log(res1);
var res2 = incOnce(77);
console.log(res2);
var res3 = incOnce(79);
console.log(res3); */