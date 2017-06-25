// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  // your code here
  // use document.body, element.childNodes, element.classList
  var arr = [];
  var doc;
  if (arguments.length === 1){
    doc = document.body;
  } else {
    doc = arguments[1];
  }
  if (doc.classList.contains(className)){
    arr.push(doc);
  }
  if (doc.hasChildNodes()){
    var children = doc.childNodes;
    for (var i = 0; i<children.length; i++){
      if (children[i].hasChildNodes()){
        arr = arr.concat(getElementsByClassName(className, children[i]));
      } else
      if (children[i].classList){
        if (children[i].classList.contains(className)){
          arr.push(children[i]);
        }
      }
    }
  }
  arr = Array.prototype.slice.apply(arr);
  return arr;
};
