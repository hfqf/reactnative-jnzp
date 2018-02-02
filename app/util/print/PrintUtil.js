

var PrintUtil = function () {

    this.obj2string = _obj2string;

};

 var _obj2string= function(arr){
     console.log(arr);
     var str = '\n';
    for(var key in arr){
        str+= JSON.stringify(arr[key]);
        str+='\n';
    }
    return str;
}

module.exports = new PrintUtil();


