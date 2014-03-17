var divider = function(a,b,callback) {
    if (b == 0) {err = 1;
        callback(err)}
    else {result = a/b;
    err = 0;
    callback(err,result);
    }
};

divider(1, 0, function(err,result){
    if (err) {console.log('there\'s an error')}
    else {console.log('result is ' + result)}
})