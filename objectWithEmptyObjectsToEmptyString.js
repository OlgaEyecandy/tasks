/*
Описание:
Реализовать функцию, которая принимает на вход объект и заменяет пустые вложенные объекты на пустые строки
*/

function yourFunction(obj) {
    console.log(obj, "yourFunction", ++counter);
    for (var name in obj) {
        if (isObject(obj[name])) {
            if (isObjectEmpty(obj[name])) {
                obj[name] = "";
            } 
            else {
                yourFunction(obj[name])
            }
        }
    }
    return obj;
}

function isObjectEmpty(n) {
    for (var key in n) {
        return false;
    }
    return true;
}

function isObject(n) {
    return typeof n === "object";
}

var inputObject = {
    a: 1,
    b: {},
    c: {
        a: 'b',
        b: {},
    },
    d: {
        e: {
            f: {
                a: 1,
                b: {}
            },
            x: {},
            y: {
                a: 1,
                b: {
                    c: {
                        d: {}
                    }
                }
            }
        }
    }
};
var counter = 0;
var outputObject = yourFunction(inputObject);
console.log(JSON.stringify(outputObject));