function getStyle(obj,attr) {
    //获取元素
    //getComputedStyle(元素).属性
    //元素.currentStyle.属性

    if(obj.currentStyle){ //ie
        return obj.currentStyle[attr];
    }else { //标准
        return getComputedStyle(obj)[attr];
    }
}

function move(obj,json,fun){ //运动元素obj,属性attr，目标target
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var tag = true;  //假设：所有属性都到达目标点
        for(var attr in json){
            //1.获取当前值
            if(attr == "opacity"){
                var cur = parseInt(getStyle(obj, attr)*100);
            }else {
                var cur = parseInt(getStyle(obj, attr));
            }

            //2.计算处理速度
            var speed = (json[attr] - cur) / 10;
            speed = speed > 0 ?Math.ceil(speed) : Math.floor(speed);

            //4.停止定时器
            if(cur != json[attr]){
                tag = false;
            }

            //3.设置处理好的属性到元素
            if(attr == "opacity"){
                obj.style[attr] = (cur + speed)/100;
            }else {
                obj.style[attr] = cur + speed +"px";
            }
        }


        if(tag == true){
            clearInterval(obj.timer);
            if(fun){
                fun();
            }

        }

    }, 30);   //30
}





//1.存储cookie的函数 + 过期时间   +  天
function setCookie(key,value,day) {  //key  value  day
    var oDate = new Date();
    oDate.setDate(oDate.getDate()+day);
    document.cookie = key+"="+value+";expires="+oDate;
}

//2.获取cookie    传入key，返回value    传入1213  返回faskflas
function getCookie(key) {
    /* var cookies = document.cookie.split("; "); //passWord=ujiuye123; 1213=faskflas
      //["passWord=ujiuye123", "1213=faskflas"]
     for(var i = 0;i<cookies.length;i++){
        var arr = cookies[i].split("=");  //[passWord,ujiuye]
        if(arr[0] == key){
            return arr[1];
        }
     }*/


    var json = {};
    var cookie = document.cookie.split("; ");
    //["passWord=ujiuye123", "1213=faskflas"]
    for(var i = 0;i<cookie.length;i++){
        var arr = cookie[i].split("=");  //[passWord,ujiuye123]
        json[arr[0]] = arr[1];
    }
    return json[key];
}

//3.删除
function  removeCookie(key) { //passWord
    var oDate = new Date();
    oDate.setDate(oDate.getDate()-1);
    document.cookie = key+"=123;expires="+oDate;

}



//封装的ajax
function ajax(url,sFun,fFun) {
    //1.创建ajax
    var ajax = new XMLHttpRequest();

    //2.建立连接
    ajax.open("GET",url,true);

    //3.发送请求
    ajax.send();

    //4.监听反馈
    ajax.onreadystatechange = function () {
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                // if(sFun){
                //     sFun(ajax.response)
                // }
                sFun && sFun(ajax.response);  //&&  两个条件为真才为真
            }else {
                fFun &&  fFun(ajax.status);
            }
        }
    }
}

