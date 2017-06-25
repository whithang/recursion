// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  var arr;
  var str;
  if (typeof obj === 'string'){
    arr = ['"', obj, '"'];
    str = arr.join('');
    return str;
  } else if (obj === null){
    return 'null';
  } else if (typeof obj === 'number' || typeof obj === 'boolean'){
    return obj.toString();
  } else if (Array.isArray(obj)){
    //loop thru array, recursion to create array, join as a string
    if (obj.length === 0){
      return '[]';
    }
    for (var i = 0; i<obj.length; i++){
      if (obj.length === 1){
        str = '[' + stringifyJSON(obj[i]) + ']';
      } else if (i === 0){
        str = '[' + stringifyJSON(obj[i]) + ',';
      } else if (i === obj.length - 1){
        str += stringifyJSON(obj[i]) + ']';
      } else {
        str += stringifyJSON(obj[i]) + ',';
      }
    }
    return str;
  } else { //assumes only objects remaining
    var propsObj = Object.values(obj);
    var keysObj = Object.keys(obj);
    if (keysObj.length === 0){
      return '{}';
    } else {
      for (var j = 0; j<keysObj.length; j++){
        if (j===0){
          str = '{';
        }
        if (propsObj[j] === undefined || typeof propsObj[j] === 'function'){
          //no action
        } else {
          str += stringifyJSON(keysObj[j]) + ':' + stringifyJSON(propsObj[j]);
          if (j === keysObj.length - 1 || keysObj.length === 0){
            //no action
          } else {
            str += ',';
          }
        }
      }
      return str + '}';
    }
  }
};
