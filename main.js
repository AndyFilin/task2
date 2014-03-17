var send_keys = require('./key_copier');
send_keys.copier.on('exit', function(code) {
    console.log('exited with code ' + code);
    var connector = require('./ssh_connector');
    connector1 = connector('./WebstormProjects/task2/command_list.txt');
    connector1.ssh_connector();
});