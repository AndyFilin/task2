#!/usr/bin/expect -f
spawn scp -P 2233 /Users/andrejfilin/.ssh/id_rsa.pub "andrejfilin@192.168.0.4:"
expect {
"yes/no" {
    send "yes\r"
    expect "assword:" {
               send "transport2013\r"
               spawn ssh -p2233 andrejfilin@192.168.0.4
               expect "assword:"
               send "transport2013\r"
               expect ":~?"
               send "cat ~/id_rsa.pub >> ~/.ssh/authorized_keys\r"
               expect ":~?"
               send "rm ~/id_rsa.pub\r"
               expect ":~?"
               exit 0}}
"assword:" {
    send "transport2013\r"
    spawn ssh -p2233 andrejfilin@192.168.0.4
    expect "assword:"
    send "transport2013\r"
    expect ":~?"
    send "cat ~/id_rsa.pub >> ~/.ssh/authorized_keys\r"
    expect ":~?"
    send "rm ~/id_rsa.pub\r"
    expect ":~?"
    exit 0}
"id_rsa" {
    spawn ssh -p2233 andrejfilin@192.168.0.4
    expect ":~?"
    send "rm ~/id_rsa.pub\r"
    expect ":~?"
    exit 1}}