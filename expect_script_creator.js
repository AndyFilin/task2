module.exports = function(host, password, port) {
    if (port != undefined) {port = "-P "+port}
    var fs = require('fs');
    fs.open('./WebstormProjects/task2/auto_key_copier.sh', 'a', function(err, file_handle) {
        if (err) {
            console.log('problems opening the file')
        } else {
            fs.write(file_handle, '#!/usr/bin/expect -f\nspawn scp ' + port +
                '/Users/andrejfilin/.ssh/id_rsa.pub "' + host + ':"\n' +
                'expect {\n                "yes/no" {\n                    send "yes\\r"\n                    ' + '' +
                'expect "assword:" {\n                        send "' + password +'\\r"\n' +
                'spawn ssh ' + host + '\n                        expect "assword:"\n' +
                        'send "' + password + '\\r"\n' +
                        'expect ":~?"\n' +
                        'send "cat ~/id_rsa.pub >> ~/.ssh/authorized_keys\\r"\n' +
                        'expect ":~?"\n' +
                        'send "rm ~/id_rsa.pub\\r"\n' +
                        'expect ":~?"\n' +
                        'exit 0}}\n' +
                '"assword:" {\n' +
                 '   send "' + password + '\\r"\n' +
                    'spawn ssh ' + host + '\n'+
                    'expect "assword:"\n'+
                    'send "' + password + '\\r"\n'+
                    'expect ":~?"\n'+
                    'send "cat ~/id_rsa.pub >> ~/.ssh/authorized_keys\\r"\n'+
                    'expect ":~?"\n'+
                    'send "rm ~/id_rsa.pub\\r"\n'+
                    'expect ":~?"\n'+
                    'exit 0}\n'+
                '"id_rsa" {\n'+
                    'spawn ssh ' + host + '\n' +
                    'expect ":~?"\n'+
                    'send "rm ~/id_rsa.pub\\r"\n'+
                    'expect ":~?"\n'+
                    'exit 1}}\n'
                , null, 'utf8', function(err, written) {
                if (err) {console.log('problems writing to file')}
                else {console.log('file created, '+written+' bytes written')}
            })
        }
    });

}