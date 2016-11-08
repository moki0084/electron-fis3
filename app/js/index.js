var execFile = require('child_process').execFile,
  fisProcess;

var createChildProcess = function (arr) {
  var cmdArr = ['./app/fis/run'].concat(arr);
  fisProcess = execFile('node', cmdArr, (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
  });

  fisProcess.stdout.on('data', function (data) {
    data = data.replace('\[\d*m', '');
    console.log(data);
  });

  fisProcess.on('exit', function (code) {
    console.log('exit');
  });
}

var components = {};
components.server = {
  template: '#server',
  methods: {
    cmd(valStr) {
      createChildProcess(valStr.split(' '));
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
