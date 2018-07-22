
/* Реализовать функцию, которая принимает строку и разворачивает ее, используя рекурсию
*/
//без рекурсии
 function f(str) {
  var strArr =  str.split("");
  strReverse = strArr.reverse();
  var strJoin= strReverse.join("");
  return strJoin;
};
var inputStr = 'abcd';
var outputStr = f(inputStr);
console.log(outputStr) 

//с рекурсией
function fRecursive(str) {
    var result = '';
    for (var i = str.length - 1; i >= 0; i--)
        result += str[i];
    return result;
};
var inputStr = 'olleh';
var outputStr = fRecursive(inputStr);
console.log(outputStr)