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
      dist: '',
      root: '',
      mode: 'dist',
      processPid: 0
    }
  },
  methods: {
    openDirectory(data) {
      this[data] = tools.openDirectory();
    },
    run() {
      var dataArr = ['release', this.mode, '-d', this.dist, '-r', this.root];
      this.argvs.forEach((val) => {
        dataArr.push('-' + val)
      })
      var fisProcess = tools.createChildProcess(dataArr);
      if (this.argvs.length > 0) {
        this.processPid = fisProcess.pid;
      }
    },
    stop() {
      process.kill(this.processPid, 'SIGINT');
      this.processPid = 0;
    },
    changeLive() {
      this.$nextTick(function(){
      var n = this.argvs;
      for (var i = 0, l = n.length; i < l; i++) {
        if (n[i] == 'L') {
          this.argvs = ['L', 'w'];
          return false;
        }
      }
      })
      
    }
  }
}



window.vm = new Vue({
  el: '#app',
  components: {
    index: components.index
  }
});
