var fis3 = require('fis3');

console.log(fis3)

var components = {};
components.server = {
  template: '#server',
  methods: {
    cmd(valStr) {
      let valArr = valStr.split(' ');
      fis3.cli.run({
        _: valArr
      }, {
        cwd: 'C:\\',
        require: [],
        configNameSearch: ['fis-conf.js'],
        configPath: null,
        configBase: undefined,
        modulePath: undefined,
        modulePackage: {}
      })
    }
  }
}

components.index = {
  template: '#index',
  components: {
    server: components.server
  }
}



window.vm = new Vue({
  el: '#app',
  components: {
    index: components.index
  }
});
