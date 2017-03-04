'use strict';

__inline('_mod.js');

// 引入hello模块:
var greet = require('module/hello.js');

var s = 'Michael';

greet(s); // Hello, Michael!
