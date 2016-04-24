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

function start(e) {
    //��ó�ʼ����������
    this.startY = e.touches[0].pageY;

}
function move(e) {
    //��¼���ƶ���ʱ��Ĵ����������
    var moveY = e.touches[0].pageY;
    //��¼�ƶ��ľ��� ����֪�������ķ���
    var movePos = moveY - this.startY;
    var index = this.index;
    /*��ǰ���ŵ�����*/
    var lastItem = oLis.length - 1;
    /*���һ�ŵ�����*/
    if (movePos > 0) {//�»���
        //�����һ�ŵ�����(ͨ����ǰ���ŵ�����֪����һ�ŵ�����)
        this.prevsIndex = index == 0 ? lastItem : index - 1;
        //���»���������߼�
        //1.�����»���ʱ��,��һ����������(��һ����������zIndex),����ֻ�е�ǰ���ź���һ����ʾ,�����Ķ�����
        //2.һ��ʼ������ʵ��,��һ�����ȵ�Ԫ�ظ߶ȵ�һ�������(�����ƶ���һ��),Ȼ�������������»�������ͼҲ�����ƶ�(����ͼ�ƶ��ľ��� = �����ľ���)
        [].forEach.call(oLis,function(){
            //�����Լ��������е�������(ͨ���������жϵ�ǰ�����ǲ����Լ�)
            if(index != arguments[1]){
                arguments[0].style.display = "none";
            }
        })
        var duration = -480+movePos;
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,"+duration+"px)";
        oLis[this.prevsIndex].className ="zIndex";
        oLis[this.prevsIndex].style.display = "block";


    } else if (movePos < 0) {//�ϻ���
        //�����һ�ŵ�����(ͨ����ǰ���ŵ�����֪����һ�ŵ�����)
        this.prevsIndex = index == lastItem?0:index+1;


    }



}
function end(e) {

}
