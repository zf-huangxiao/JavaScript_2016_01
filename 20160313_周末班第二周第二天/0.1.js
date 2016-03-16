var oTab=document.getElementById("tab");
var tHead=oTab.tHead;
var oThs=tHead.rows[0].cells;
var tBody=oTab.tBodies[0];
var oRows=tBody.rows;

var data=null;
var xhr=new XMLHttpRequest;
xhr.open("get","json/data.txt",false);
xhr.onreadystatechange=function(){
    if(xhr.readyState===4&&/^2\d{2}$/.test(xhr.status)){
        var val=xhr.responseText;
        data=utils.jsonParse(val);

    }
};
xhr.send(null);

function bindData(){
    var frg=document.createDocumentFragment();
    for(var i= 0;i<data.length;i++){
        var oTr=document.createElement("tr");
        var cur = data[i];
        for(var key in cur){
            var oTd=document.createElement("td");
            oTd.innerHTML=key==="sex"?(cur[key]===0?"男":"女"):cur[key];
            oTr.appendChild(oTd)
        }
        frg.appendChild(oTr);
    }
    tBody.appendChild(frg);
    frg=null;

}
bindData();

function changeBg(){
    for(var i=0;i<oRows.length;i++){
        oRows[i].className="bg"+i%2;
    }
}
changeBg();

function sort(n){
    var ary= utils.listToArray(oRows);
    var _this=this;
    for(var k=0;k<oThs.length;k++){
        if(k!==n){
            oThs[k].flag=-1;
        }
    }
    _this.flag*=-1;
    ary.sort(function(a,b){
        var curIn= a.cells[n].innerHTML,nexIn= b.cells[n].innerHTML;
        var curNum=parseFloat(curIn),nexNum= parseFloat(nexIn);
        if(isNaN(curNum)||isNaN(nexNum)){
            return curIn.localeCompare(nexIn)*_this.flag;
        }else{
            return (curNum-nexNum)*_this.flag;
        }
    });
    var frg=document.createDocumentFragment();

    for(var i=0;i<ary.length;i++){
        frg.appendChild(ary[i])
    }
    tBody.appendChild(frg);
    frg=null;
    changeBg();

}
for(var i=0;i<oThs.length;i++){
    oThs[i].flag=-1;
    oThs[i].index=i;
    oThs[i].onclick=function(){
        sort.call(this,this.index)
    }
}