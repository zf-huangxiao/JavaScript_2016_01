var utils={
    listToArray:function(likeAry){
        var ary=[];
        try{
            ary=Array.prototype.slice.call(likeAry,0);
        }catch(e){
            for(var i=0;i<likeAry.length;i++){
                ary.push(likeAry[i])
            }

        }
        return ary;
    },
    jsonParse:function(str){
        return "JSON"in window ?JSON.parse(str):eval("("+ str +")")
    }

};
