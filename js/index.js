window.onload = function(){
    var wrap = document.getElementById('wrap');
    var oUl = document.getElementById('ul');
    var aOl = document.getElementById('ol');
    var oSpan =aOl.getElementsByTagName('span');
    var oImg = oUl.getElementsByTagName('img');
    var len = 8;
    var str = '';
    var arr = '';
    var index = 0;
    //添加Li和img
    for(var i = 0;i<len;i++){
        str += "<li><img src=''></li>";
        arr += "<span></span>"
    }
    oUl.innerHTML = str;
    aOl.innerHTML = arr;
    //成功时获取图片
    ajax('data/banner.txt',function (str){
        var arr = eval(str);
        for(var i = 0;i<arr.length;i++){
            var oLi = oUl.children;
            oLi[i].children[0].src = arr[i][0].src;
        }
        //样式初始化
        for(var i = 0;i<oSpan.length;i++){
            //让所有图片隐藏
            oSpan[i].className ='';
            oImg[i].className='hid';
        }
        oSpan[0].className = "active";
        oImg[0].className='';
        wrap.style.background = arr[0][0].background;
        //自动切换
        var index = 0;
        var time = setInterval(auto,2000);
        function auto(){
            index++;
            if(index == arr.length){
                index = 0;
            }
            for(var i = 0;i<oSpan.length;i++){
                oSpan[i].className='';
                oImg[i].className='hid';
            }
            oSpan[index].className='active';
            oImg[index].className='';
            wrap.style.background = arr[index][0].background;
        }
        //鼠标移入
        oUl.onmouseover = function(){
            clearInterval(time);
        };
        //鼠标移出
        oUl.onmouseout = function(){
            time = setInterval(auto,2000);      //必须要加time =
        };
        //点击时动
        for(var i = 0;i<oSpan.length;i++){
            oSpan[i].index = i;
            oSpan[i].onmouseover = function(){
                for(var i = 0;i<oSpan.length;i++){
                    oSpan[i].className ='';
                    oImg[i].className='hid';
                }
                this.className='active';
                oImg[this.index].className='';
                index = this.index;
            }
        }
    });
// ==========================搜索输入框=================================

    var sInput = document.getElementById("searchInput");
    var defaultLable = document.getElementsByClassName("input-default")[0];
    var arr = ["冰箱","空调","红米note5","电风扇","惠普游戏本4588元限量抢"];
    var defaultIndex = 0;
    //2.切换默认值
    defaultLable.innerHTML ='冰箱';
        setInterval(function () {
        defaultIndex++;
        if(defaultIndex==arr.length){defaultIndex = 0;}
        defaultLable.innerHTML = arr[defaultIndex];
    },3000);

    //3.默认值的显示和隐藏
    sInput.onclick = function () {
        defaultLable.style.display = "none";
    }
    sInput.onblur = function () {
        if(this.value == ""){
            defaultLable.style.display = "block";
        }
    }

// ==============================bannerLeftNav==========================================
    var oNav = document.getElementById('lisnav');
    var navLi = oNav.getElementsByTagName('li');
    var navDiv = oNav.getElementsByTagName('div');
        for (var i = 0;i<navLi.length;i++){
            navLi[i].index = i;
            navLi[i].onmouseover = function(){
                navDiv[this.index].style.display='block';
            }
            navLi[i].onmouseout = function(){
                navDiv[this.index].style.display='none';
            }
        }
// ============================topTitleImg===============================================
    var oTop = document.getElementById('top');
    var aBtn = oTop.getElementsByTagName('button')[0];
    var topDiv = oTop.getElementsByTagName('div')[0];
    aBtn.onclick = function(){
        topDiv.style.display='none';
    }

// ==========================time========================================================
        function addZero(n){
            return n<10 ?  '0' + n : '' + n;
        }
        var oTop = document.getElementsByClassName('every-day')[0];
        var aEm = oTop.getElementsByTagName('em');
        var date = new Date();
       /* date.setFullYear(2018,9,1);
        date.setHours(0,0,0,0);*/
       date.setTime(date.getTime()+30*60*1000);

        function time(){
            var ms = date.getTime() -  new Date().getTime();
            var s = parseInt(ms/1000);
            var day = parseInt(s/86400);
            s%=86400;
            var hour = parseInt(s/3600);
            s%=3600;
            var min = parseInt(s/60);
            s%=60;


            aEm[0].innerHTML = addZero(hour);
            aEm[1].innerHTML=addZero(min);
            aEm[2].innerHTML=addZero(s);
        }
        time();
        setInterval(time,1000);
        // 每日必抢
        var dailyMain = document.getElementsByClassName('daily-main')[0];
        var dailUl = dailyMain.getElementsByTagName('ul');
        // alert(dailUl.length);        //0
        var dailyList = dailyMain.getElementsByTagName('li');
        var dailyBtn = dailyMain.getElementsByTagName('p');
            // alert(dailyBtn.length);
        ajax('data/day.txt',function(str){
            //通过ajax获取请求的数据
            var dayArry = eval(str)[0].data.indexRushItem;
            console.log(dayArry[0].goods_name);
            // 通过循环生成li标签
            for(var i=0;i<dayArry.length;i++){
                if(i%4 == 0){//每4个一个ul
                    var oUl =document.createElement('ul');
                    oUl.className='daily-list clearfix';
                    dailyMain.appendChild(oUl);
                }
                oUl.innerHTML += "<li><a href='#'><img src='" + dayArry[i].goods_img + "' width='120' height='120'><p class='list-price'>¥" + dayArry[i].goods_tg_price + " <span>¥" + dayArry[i].goods_price + "</span></p> <p class='list-name'>" + dayArry[i].goods_name + "</p></a></li>";
            }
            //操作li
            dailyList[3].className = dailyList[7].className='list-last';
            dailUl[0].style.display='block';
            //点击切换
        var index =0;
        dailyBtn[0].onclick = function(){
            index++;
            if(index == dailUl.length){
                index = 0;
            }
            for(var i = 0;i<dailUl.length;i++){
                dailUl[i].style.display = 'none';
            }
            dailUl[index].style.display = 'block';
        }

        dailyBtn[1].onclick = function(){
            index--;
            if(index == -1){
                index = dailUl.length - 1;  //2-1=1 下标 0 1
            }
            for(var i = 0;i<dailUl.length;i++){
                dailUl[i].style.display = 'none';
            }
            dailUl[index].style.display = 'block';
        }

        })





    //----------------------------楼层------------------------------------------
    /*
        1.如果功能一样，结构一致的，用函数实现，函数中用父元素获取元素进行操作
        2.获取所有的楼层
        3.实现第一层
           3.1 封装一个函数 floor（第一层，第一层的下标）
           3.2 函数内部操作
                   3.2.1 获取第一层所有的需要添加元素的div
                   3.3.2 实现第一个div的数据创建
                         封装一个函数：
                            createElement(第一个div，第一个div的数据)

    */

    ajax("data/floor.txt",function (str) {
        var floorArr = eval(str)[0].floor;//9层所有的数据
        var gmFloor = document.getElementsByClassName("gm-floor");
        for(var i = 0;i<gmFloor.length;i++){
            floor(gmFloor[i],i);
            console.log(gmFloor[i],i);
        }
        /*
        floor(gmFloor[1],1);
        floor(gmFloor[2],2);
        floor(gmFloor[3],3);
        floor(gmFloor[4],4);
        floor(gmFloor[5],5);
        floor(gmFloor[6],6);
        floor(gmFloor[7],7);
        floor(gmFloor[8],8);*/
        console.log(floorArr[0][0][0]); //floorArr[0]：第一层  floorArr[0][0]第一层第一个
        function floor(obj,index) {
            var floorMin = obj.getElementsByClassName("floor-main");
            var floorA = obj.getElementsByClassName("floor-nav")[0].getElementsByTagName("a");
            //1.创建
            for(var i = 1;i<floorMin.length;i++){
                createElement(floorMin[i],floorArr[index][i-1]);
            }
            /*  createElement(floorMin[2],floorArr[0][1]);
                       createElement(floorMin[3],floorArr[0][2]);
                       createElement(floorMin[4],floorArr[0][3]);
                       createElement(floorMin[5],floorArr[0][4]);
                       createElement(floorMin[6],floorArr[0][5]);
                       */


            //2.划过li显示对应的div
            for(var i = 0;i<floorA.length;i++){
                floorA[i].index = i;
                floorA[i].onmouseover = function () {
                    for(var j = 0;j<floorA.length;j++){
                        floorMin[j].style.display = "none";
                        floorA[j].className = "";
                    }
                    floorMin[this.index].style.display = "block";
                    this.className = "active";
                }
            }
        }

            function createElement(floor,arr) {
                //先实现一组
                floor.innerHTML = "<ul class='floor-main-list'></ul>";
                var oUl = floor.getElementsByTagName("ul")[0];
                var str = "";
                for(var i = 0;i<floorArr[0][0].length;i++){
                    str += "<li><a href='#'><img src='"+arr[i].goods_img+"' alt=''><p class='p-name'>"+arr[i].goods_name+"</p><p class='p-price'>"+arr[i].goods_price+"</p></a></li>"
                }
                oUl.innerHTML = str;
            }
    })

        //左边轮播

        var gmFloor = document.getElementsByClassName("gm-floor");
        for(var i = 0;i<gmFloor.length;i++){
            lunbo(i);
        }
        function lunbo(floor){
        var fMf = document.getElementsByClassName('floor-main-fl')[floor];
        var fBtn = fMf.getElementsByTagName('span');
        var fLi = fMf.getElementsByTagName('li');
        // var fP =fMf.getElementsByClassName('phBrand-page');
      /*  var fNext =fMf.getElementsByClassName('next');
        var fPre =fMf.getElementsByClassName('pre');*/
        var num = 0;
        var timer = null;
            for(var i = 0;i<fBtn.length;i++){
                fBtn[i].index = i;
                fBtn[i].onmouseover = function(){
                    num=this.index;
                    auto();
                }
            }
            function auto(){
                for(var i = 0;i<fBtn.length;i++){
                    fBtn[i].className='';
                    fLi[i].className='';
                }
                fBtn[num].className='hover';
                fLi[num].className='show';

            }
           /* fPre.onclick = function (){
               num--;
               if(num==-1){num=2;}
               auto();
            }
            fNext.onclick =next;*/
            function next(){
                if(num==3){num=0;}
                auto();
                num++;
            };
            timer=setInterval(next,2000);
            fLi.onmouseover = function(){
                clearInterval(timer);
            };
            fLi.onmouseout = function(){
                timer=setInterval(next,2000);
            }

    }
    //楼层导航点击显示红色
    function floorL() {
        var fNav = document.getElementsByClassName('gm-floor-nav')[0];
        var floorSpan = fNav.getElementsByTagName("li");
        for(var i = 0;i<9;i++){     //floorSpan.length
            floorSpan[i].onclick = function () {
                for(var j = 0;j<9;j++){
                    floorSpan[j].className = "";
                }
                this.className = "active";
            }
        }9
    }
    floorL();
    //楼层滚动过显示红色
    function scroll(){
        document.onscroll = function () {
           var fNav = document.getElementsByClassName('gm-floor-nav')[0];
            var floorSpan = fNav.getElementsByTagName("li");
            var gmFloor = document.getElementsByClassName('gm-floor');
            var sTop = document.documentElement.scrollTop - document.documentElement.clientHeight - 200;
            var a = 0;
            for(var i = 0;i<gmFloor.length;i++){
                floorSpan[i].className='';
                var oTop = gmFloor[i].offsetTop;
                fNav.style.display='none';
                if(sTop>=gmFloor[0].offsetTop){
                    fNav.style.display='block';
                }else if(sTop>gmFloor[8].offsetTop){
                    fNav.style.display='none';
                }
                if(sTop>=oTop){a=i;}
            }
            floorSpan[a].className = 'active';
        }
    }
    scroll();
}

