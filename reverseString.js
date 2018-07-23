
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
    if (str.length >= 2) {
      return fRecursive(str.slice(1)) + str[0];
    } 
    return str;
  };
var inputStr = 'olleh';
var outputStr = fRecursive(inputStr);
console.log(outputStr)
