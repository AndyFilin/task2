#!/usr/bin/expect -f
spawn scp undefined/Users/andrejfilin/.ssh/id_rsa.pub "andreyfilin@192.168.0.192:"expect {
                "yes/no" {
                    send "yes\r"
                    expect "assword:" {
                        send "eltech2014\r"
spawn ssh andreyfilin@192.168.0.192
                        expect "assword:"
send "eltech2014\r"
expect ":~?"
send "cat ~/id_rsa.pub >> ~/.ssh/authorized_keys\r"
expect ":~?"
send "rm ~/id_rsa.pub\r"
expect ":~?"
exit 0}}
"assword:" {
   send "eltech2014\r"
spawn ssh andreyfilin@192.168.0.192
expect "assword:"
send "eltech2014\r"
expect ":~?"
send "cat ~/id_rsa.pub >> ~/.ssh/authorized_keys\r"
expect ":~?"
send "rm ~/id_rsa.pub\r"
expect ":~?"
exit 0}
"id_rsa" {
spawn ssh andreyfilin@192.168.0.192
expect ":~?"
send "rm ~/id_rsa.pub\r"
expect ":~?"
exit 1}}
