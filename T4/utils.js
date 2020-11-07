exports.myDateTime = function (){
    var d = new Date()
    return d.toISOString().substring(0,16);
} 