var main = document.getElementById("main");
var oLis = document.querySelectorAll("#main>ul>li");
var desW = 640;
/*��Ƹ�Ŀ�*/
var desH = 960;
/*��Ƹ�ĸ�*/
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
if (winW / winH < desW / desH) {
    //���ŵ�ʱ��,Ҫô����winW/desW����,Ҫô����winH/desH������
    //�豸��߱���<��Ƹ�Ŀ�߱���,�Ͱ���winH/desH ������
    //�豸��߱���>��Ƹ�Ŀ�߱���,�Ͱ���winW/desW ������
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}

//��ÿ��li�󶨴����¼�(touchstart,touchmove,touchend)
[].forEach.call(oLis, function () {
    var oLi = arguments[0];
    oLi.index = arguments[1];
    oLi.addEventListener("touchstart", start, false);
    oLi.addEventListener("touchmove", move, false);
    oLi.addEventListener("touchend", end, false);
})

window.setTimeout(function(){
    oLis[0].firstElementChild.id="a0";
},1000);
function start(e) {
    //��ó�ʼ����������
    this.startY = e.touches[0].pageY;
    this.startX = e.touches[0].pageX;
}
function move(e) {
    e.preventDefault();/*��ֹĬ�ϵĹ�����Ϊ*/
    this.flag = true;/*��ʾ���������ǵ��*/
    //��¼���ƶ���ʱ��Ĵ����������
    var moveY = e.touches[0].pageY;
    var moveX = e.touches[0].pageX;
    //��¼�ƶ��ľ��� ����֪�������ķ���
    var movePos = moveY - this.startY;
    if(Math.abs(moveX-this.startX)>Math.abs(movePos)){
        this.flag = false;
        return;

    }

    var index = this.index;
    var lastItem = oLis.length - 1;
    [].forEach.call(oLis,function(){
        //�����Լ��������е�������(ͨ���������жϵ�ǰ�����ǲ����Լ�)
        if(index != arguments[1]){
            arguments[0].style.display = "none";
        }
        arguments[0].className = "";
        arguments[0].firstElementChild.id = "";
    })
    if (movePos > 0) {//�»���
        //�����һ�ŵ�����(ͨ����ǰ���ŵ�����֪����һ�ŵ�����)
        this.prevsIndex = index == 0 ? lastItem : index - 1;
        //���»���������߼�
        //1.�����»���ʱ��,��һ����������(��һ����������zIndex),����ֻ�е�ǰ���ź���һ����ʾ,�����Ķ�����
        //2.һ��ʼ������ʵ��,��һ�����ȵ�Ԫ�ظ߶ȵ�һ�������(�����ƶ���һ��),Ȼ�������������»�������ͼҲ�����ƶ�(����ͼ�ƶ��ľ��� = �����ľ���)

        var duration = -480+movePos;
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,"+duration+"px)";


    } else if (movePos < 0) {//�ϻ���
        //�����һ�ŵ�����(ͨ����ǰ���ŵ�����֪����һ�ŵ�����)
        this.prevsIndex = index == lastItem?0:index+1;
        //��һ�������ƶ�Ԫ�ص�һ��
        var duration = 480+movePos;
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,"+duration+"px)";
    }

    oLis[this.prevsIndex].className ="zIndex";
    oLis[this.prevsIndex].style.display = "block";
    //����ǰ���ŵ�Ч��
    //1.����ֵ = �ƶ��ľ���/�豸�ĸ߶� 2.�ƶ��ľ��� = �����ľ���
    //���ϻ���ʱ����ֵ,�պ��������ƶ�
    //���»���ʱ������ֵ,�պ��������ƶ�
    //scale��0-1֮�����
    this.style.webkitTransform = "scale("+(1-Math.abs(movePos/winH)*1/2)+") translate(0,"+movePos+"px)";

}
function end(e) {
    if(this.flag){
        //����һ�Ż�����һ�Ŷ��ص�0,0��λ��
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevsIndex].style.webkitTransition = "0.5s";
        oLis[this.prevsIndex].addEventListener("webkitTransitionEnd",function(){
            this.style.webkitTransition = "";
            //����ִ�ж�����id��
            this.firstElementChild.id = "a"+this.index

        },false)
        this.flag = false;
    }
}
//�����õ�
document.addEventListener("touchmove",function(e){

})