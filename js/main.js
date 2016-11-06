var fis3 = require('fis3');

console.log(fis3)

var btn = document.querySelector('button');
btn.addEventListener('click', function () {
  fis3.cli.run({
    _: ['server', 'open']
  }, {
      cwd: 'C:\\',
      require: [],
      configNameSearch: ['fis-conf.js'],
      configPath: null,
      configBase: undefined,
      modulePath: undefined,
      modulePackage: {}
    }
  )
  // fis3.server
})
