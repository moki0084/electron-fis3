; + function () {

  var execFile = require('child_process').execFile,
    fisProcess,
    _module = {};

  _module.createChildProcess = function (arr) {
    var cmdArr = ['./app/fis/run'].concat(arr);
    fisProcess = execFile('node', cmdArr, (error, stdout, stderr) => {
      if (error) {
        throw error;
      }
    });

    fisProcess.stdout.on('data', function (data) {
      data = data.replace(/\[\d*m/g, '');
      consoleData.push(data);
      var jsConsole = document.querySelector('#jsConsole');
      jsConsole.scrollTop = jsConsole.scrollHeight;
    });

    fisProcess.on('exit', function (code) {});
  };

  _module.openDirectory = function () {
    var dialog = require('electron').remote.dialog;
    var pathArr = dialog.showOpenDialog({
      properties: ['openDirectory']
    });
    var path = '';
    if(pathArr.length>0 && pathArr[0]){
        path = pathArr[0]
    }
    return path
  }

  window.tools = _module;
}();