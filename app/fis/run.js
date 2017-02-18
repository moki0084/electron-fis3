var fis = require('fis3');
var argv = require('yargs').argv;
delete argv['$0'];
// delete argv['child-flag'];
// 开启 liveload之后会存在, childFlag 会自动添加 
//[ERROR] The option `childFlag` is unregconized, please run `fis3 release --help` 
//不排除更新可以解决

delete argv['childFlag'];
fis.cli.run(argv, {
  cwd: argv.r || __dirname,
  require: [],
  configNameSearch: ['fis-conf.js'],
  configPath: __dirname + '\\fis-conf.js',
  configBase: __dirname,
  modulePath: undefined,
  modulePackage: {}
});
