define('js/module/hello', function(require, exports, module) {

  'use strict';
  
  var s = 'Hello';
  
  function greet(name) {
    console.log(s + ', ' + name + '!');
  }
  
  module.exports = greet;

});
