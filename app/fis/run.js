var fis = require('fis3');
var argv = require('yargs').argv;
delete argv['$0'];

fis.cli.run(argv, {
  cwd: argv.r,
  require: [],
  configNameSearch: ['fis-conf.js'],
  configPath: __dirname + '\\fis-conf.js',
  configBase: __dirname,
  modulePath: undefined,
  modulePackage: {}
});
