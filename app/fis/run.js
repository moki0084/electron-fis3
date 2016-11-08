var fis = require('fis3');

var cmdArr = process.argv.slice(2);

fis.cli.run({
  _: cmdArr,
  p: 8080
}, {
  cwd: 'C:\\',
  require: [],
  configNameSearch: ['fis-conf.js'],
  configPath: null,
  configBase: undefined,
  modulePath: undefined,
  modulePackage: {}
});
