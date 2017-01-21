var fis = require('fis3');
var argv = require('yargs').argv;

delete argv['$0'];
console.log(argv)

fis.cli.run(argv, {
  cwd: __dirname,
  require: [],
  configNameSearch: ['fis-conf.js'],
  configPath: __dirname + '\\fis-conf.js',
  configBase: __dirname,
  modulePath: undefined,
  modulePackage: {}
});
/**
fis3 release dev
{ _: [ 'release', 'dev' ] }
{ cwd: 'E:\\workspace\\record\\record\\record-wap\\src',
  require: [],
  configNameSearch: [ 'fis-conf.js' ],
  configPath: 'E:\\workspace\\record\\record\\record-wap\\src\\fis-conf.js',
  configBase: 'E:\\workspace\\record\\record\\record-wap\\src',
  modulePath: undefined,
  modulePackage: {} }
 */
