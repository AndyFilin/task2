module.exports = function(command_path) {
return {
ssh_connector: function() {
    var fs = require('fs');
    var spawn = require('child_process').spawn;
    //var input = fs.createReadStream('./WebstormProjects/task2/command_list.txt', {encoding: 'utf8'});
    var input = fs.createReadStream(command_path, {encoding: 'utf8'});
    var ssh_err = fs.openSync('./WebstormProjects/task2/ssh_err.log', 'a');
    var remaining = '';
    input.on('data', function(data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        function read_next_line(remaining, index) {
            var line = remaining.substring(0, index);
            console.log('connecting and passing the command: ' + line);
            remaining = remaining.substring(index + 1);
            index = remaining.indexOf('\n');
            console.log('index ' + index);
            if (index > -1) {
                var ssh_proc = spawn('ssh', ['-tt', 'andreyfilin@192.168.0.192', line], {
                    detached: false,
                    stdio: ['ignore', 'pipe', ssh_err]
                });
                ssh_proc.stdout.on('data', function(data) {
                    console.log('ssh_out: ' + data);
                });
                ssh_proc.on('close', function() {
                    console.log('command passed');
                    read_next_line(remaining, index);
                });
            }
            else {console.log('all commands passed')}
        }
        read_next_line(remaining, index)
    });
    }
}
};