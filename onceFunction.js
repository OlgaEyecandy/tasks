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
var once = f => {
    var result;
    var isCalled = false;
    return function (...rest) {
        if (!isCalled) {
            isCalled = true;
            try {
                result = f.apply(this, rest);
            } catch (e) {
                result = new Error(`An error occured while executing the function: ${e.message}`);
            }
        }
        if (result instanceof Error) {
            throw result;
        }

        return result;

    }
}
var inc = a => a + 1;
var incOnce = once(inc);
var res1 = incOnce(42);
describe("Once", function () {
    describe("Тест на различные аргументы", function () {

        it("Функция once корректно принимает один аргумент", function () {
            incOnce = once(inc);
            assert.deepEqual(incOnce(42), 43);
            assert.deepEqual(incOnce(42), 43);
        });

        it("Функция once корректно принимает несколько аргументов", function () {
            var sum = (a, b) => a + b;
            var sumOnce = once(sum);
            assert.deepEqual(sumOnce(42, 53), 95);
            assert.deepEqual(sumOnce(7, 5), 95);
        });
        it("Функция once корректно работает с методами", function () {
            var obj = {
                i: 0,
                inc: function () {
                    this.i += 1;
                    return this.i;
                }
            };
            incOnce = once(obj.inc).bind(obj);
            assert.deepEqual(incOnce(1), 1);
            assert.deepEqual(incOnce(5), 1);
        });

    });

    describe("Тест на ошибки", function () {

        it("Функция once корректно отображает ошибку", function () {
            inc = a => a + 1;
            var newErr = () => {
                var called = false;
                return () => {
                    if (!called) {
                        called = true;
                        throw new Error(`test2`);
                    };
                    throw new Error('test1');
                }
            }

            incOnce = once(newErr());
            assert.throw(incOnce, Error, `test2`);
            assert.throw(incOnce, Error, `test2`);
        });

    });
});
