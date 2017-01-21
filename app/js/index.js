var consoleData = [];
var components = {};

components.server = {
  template: '#server',
  data: function () {
    return {
      port: 8080
    }
  },
  methods: {
    cmd(valStr) {
      var arr = valStr.split(' ');
      if (valStr.indexOf('start') != -1) {
        arr = arr.concat(['-p', this.port]);
      }
      tools.createChildProcess(arr);
    }
  }
}

components.console = {
  template: '#console',
  data: function () {
    return {
      consoleData: consoleData
    }
  },
  methods: {
    clear: function () {
      consoleData = [];
      this.consoleData = consoleData;
    }
  }
}

components.index = {
  template: '#index',
  components: {
    server: components.server,
    console: components.console
  },
  data: function () {
    return {
      argvs: [],
      path: '',
      root: '',
      mode: 'dist'
    }
  },
  methods: {
    openDirectory(data) {
      this[data] = tools.openDirectory();
    },
    run() {
      var dataArr = ['release', this.mode, '-d', this.path, '-r', this.root];
      this.argvs.forEach((val) => {
        dataArr.push('-' + val)
      })
      tools.createChildProcess(dataArr);
    }
  }
}



window.vm = new Vue({
  el: '#app',
  components: {
    index: components.index
  }
});
