var main = document.querySelector("#main");
var desW = 640;
var desH = 1008;
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
if (winW / winH < desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}
var bell = document.querySelector("#bell");
var say = document.querySelector("#say");
var music = document.querySelector("#music");


function fnLoad() {
    var arr = ['phoneBg.jpg', 'cubeBg.jpg', 'cubeImg1.png', 'cubeImg2.png', 'cubeImg3.png', 'cubeImg4.png', 'cubeImg5.png', 'cubeImg6.png', 'phoneBtn.png', 'phoneKey.png', 'messageHead1.png', 'messageHead2.png', 'messageText.png', 'phoneHeadName.png'];
    var loading = document.querySelector("#loading");
    var process = document.querySelector(".process");
    var n = 0;
    //����arr�������ÿ��ͼƬ�Ƿ���سɹ�
    arr.forEach(function () {
        var oImg = new Image();
        oImg.src = "images/" + arguments[0];
        oImg.onload = function () {
            //������سɹ���һ��ͼƬ,����n++;
            n++;
            //����һ��ͼƬ,�͵������½������Ŀ��
            //�����˶�����ͼƬ(n)/arr.length = ���õĽ������Ŀ��/�����������Ŀ��
            process.style.width = n / arr.length * 100 + "%";
            process.addEventListener("webkitTransitionEnd", function () {
                this.style.webkitTransition = "";
            }, false);
            if (n == arr.length && loading) {
                window.setTimeout(function () {
                    main.removeChild(loading);
                    bell.play();
                    fnPhone.init();/*phone���ַ���ִ��*/
                }, 1000)
            }
        }
    })
}
fnLoad()

var phone = document.querySelector("#phone");
var speak = document.querySelector(".speak");
var fnPhone = {
    init: function () {
        phone.addEventListener("click", this.touch, false);
        //fastClick ���click�¼�300ms
    },
    touch: function (e) {
        var target = e.target;
        if (target.className == "listenTouch") {/*���뵽����ҳ��*/
            bell.pause();/*ֹͣ����*/
            say.play();/*��ʼ����*/
            target.parentNode.style.display = "none";
            /*�ý���ҳ������*/
            speak.style.webkitTransform = "translate(0,0)";
            /*��˵��ҳ����ʾ*/
        } else if (target.className == "refuse") {
            say.pause();
            //phone��������phone�ĸ߶�(desH)
            phone.style.webkitTransform = "translate(0," + desH + "px)";
            phone.style.webkitTransition = "1s";
            window.setTimeout(function () {
                main.removeChild(phone);
                music.play();
                fnMessage();
            }, 1000)
        }
    }
}

/*
 * 1.ǰ����liÿ��1�������ƶ�20px,�ص�ԭʼλ��
 * 2.���ֵ�li����3��֮��,ul���������ƶ��Ѿ����ֵ�li��֮��
 * */
var msg = document.querySelector("#message");
var oLis = document.querySelectorAll("#message>ul>li");
var oUl = document.querySelector("#message>ul");
function fnMessage() {
    var n = 0;
    /*li������*/
    var h = null;
    /*�����Ѿ����ֵ�li�ĸ߶�֮��*/
    var timer = window.setInterval(function () {
        oLis[n].style.opacity = "1";
        oLis[n].style.webkitTransform = "translate(0,0)";
        /*�ص�ԭʼλ��*/
        h += oLis[n].offsetHeight - 30;
        /*�ۼ��Ѿ����ֵ�li�ĸ߶�*/
        n++;
        if (n >= 3) {
            //����Ӹ���ʱ����Ϊ��ͣ����
            window.setTimeout(function () {
                oUl.style.webkitTransform = "translate(0," + (-h) + "px)";
                oUl.style.webkitTransition = "1s";
            }, 1000);
            if (n == oLis.length) {
                window.clearInterval(timer);
                window.setTimeout(function () {
                    main.removeChild(msg);
                    music.pause();
                     fnCube()
                }, 1000)
            }
        }
    }, 1000)

}
var cubeBox = document.querySelector("#cubeBox");
function fnCube() {
    //һ��ʼ�и��Ŵ����ת��Ч��
    cubeBox.style.webkitTransform = "scale(0.7) rotateX(-135deg) rotateY(-45deg)";
    var startX = -135;
    /*��ʼת���ĽǶ�*/
    var startY = -45;
    var x = null;
    /*�����ľ���*/
    var y = null;
    document.addEventListener("touchstart", start, false);
    document.addEventListener("touchmove", move, false);
    document.addEventListener("touchend", end, false);
    //�����ľ������ת���ĽǶ�
    function start(e) {
        this.startTouch = {x: e.touches[0].pageX, y: e.touches[0].pageY}
    }

    function move(e) {
        this.flag = true;
        var moveTouch = {x: e.touches[0].pageX, y: e.touches[0].pageY}
        x = moveTouch.x - this.startTouch.x;
        y = moveTouch.y - this.startTouch.y;
        //startX+y(�����ƶ��ľ���) = rotateX(�µ�ת���ĽǶ�)
        cubeBox.style.webkitTransform = "scale(0.7) rotateX(" + (-(startX + y)) + "deg) rotateY(" + (-(startY+x)) + "deg)";

    }

    function end() {
        if(this.flag){
            /*������ʼֵ*/
            startX += y;
            startY += x;
            this.flag = false;
        }

    }


}


