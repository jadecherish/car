/**
 * Created by Administrator on 2016/7/12.
 */
window.onload=function(){
    headerAffect();
    bannerAnimation();
    timeBack();
};

/*当页面往上滚动的时候，header块的背景慢慢显示，直到页面完全的将banner移除出视口，就会保持某种固定色
反过来，如果body页面将banner移进视口，颜色慢慢变换为透明*/
function  headerAffect(){
    //1.获取header块
    var header=document.querySelector(".jd_header");
    //2.获取banner
    var banner=document.querySelector(".jd_banner");
    //3.获取banner的高度，我们要以此做为判断的依剧
    var bHeight=banner.offsetHeight;
    //4.监听页面滚动
    var opacity=0;
    window.onscroll=function(){
        //5.获取body移除出页面的设计
        var wHeight=document.body.scrollTop;
        //6.判断
        if(wHeight < bHeight){
            opacity=wHeight/bHeight;
        }
        else{
            opacity=1;
        }
        //7.重新设置样式
        header.style.background="rgba(201,21,35,"+opacity+")";
    }
}

//轮播图
function  bannerAnimation(){
    /*1.获取到dom元素
    2.自动滚动
    3.图片滑动
        a.默认下一张
        b.判断是否到最后一张，如果是，关闭过渡效果将图片移动到我们想要的位置
        c.以后添加手势之后，还需要判断是否是第0张，如果是，则移动到想要的位置
    4.当滑动距离超过一定距离的时候，滚到到下一张或者上一张
    5.当滚动距离不超过一定距离的时候，吸附回去*/

    //1.获取到banner元素
    var banner=document.querySelector(".jd_banner");
    //2.获取banner元素的宽度
    var width=banner.offsetWidth;
    //3.获取图片盒子
    var imgBox=banner.querySelector("ul:first-child");
    /*var imgBox=banner.firstElementChild;*/
    //4.获取图片索引标识
    var indicator=banner.querySelector("ul:last-child");
    //5.获取索引标识中所有li标签
    var lis=indicator.querySelectorAll("li");
    //6图片 的默认索引 ，因为之前有默认偏移，所以索引默认为1
    var index=1;

    //封装方法 ，添加过渡
    var addTransition=function(){
        imgBox.style.webkitTransition="all .2s"; //兼容处理
        imgBox.style.transition="all .2s";
    }
    //删除过渡
    var removeTransition=function(){
        imgBox.style.webkitTransition="none"; //兼容处理
        imgBox.style.transition="none";
    }
    //设置偏移
    var setTransform=function(distance){
        imgBox.style.webkitTransform="translateX("+distance+"px)";
        imgBox.style.transform="translateX("+distance+"px)";
    }
    //设置页码点的切换
    var setIndicator=function(){
        //1.先清除所有点的样式
        for(var i=0;i<lis.length;i++){
            /*lis[i].className="";*/
            lis[i].classList.remove("active");
        }
        //2.为当前点添加样式
        if(index>0) {
            lis[index - 1].classList.add("active");
        }
    }

    //7.定时器
    var timerId=setInterval(function(){
        //8.自动播放，索引自增
        index++;
        //9.添加过渡效果
        addTransition();
        //10.设置偏移
       setTransform(-index*width);
    },2000);

    //10.监听当前过渡结束事件
    var loopAnimation=function(){
        if(index==9){
            index=1;
            //10.1.设置点的切换
            setIndicator();
            //10.2 关闭过渡
            removeTransition();
            //10.3 设置偏移
            setTransform(-index*width);
        }
        else if(index==0){
            index=8;
            //10.1.设置点的切换
            setIndicator();
            //10.2 关闭过渡
            removeTransition();
            //10.3 设置偏移
            setTransform(-index*width);
        }
    }
    /*imgBox.addEventListener("webkitTransitionEnd",function(){
        //10.1判断当前的索引值，做相应的修改
        if(index==9){
            index=1;
        }
        else if(index==0){
            index=8;
        }
        //10.2 关闭过渡
        imgBox.style.webkitTransition="none"; //兼容处理
        imgBox.style.transition="none";
        //10.3 设置偏移
        imgBox.style.webkitTransform="translateX("+(-index*width)+"px)";
        imgBox.style.transform="translateX("+(-index*width)+"px)";
    });
    imgBox.addEventListener("transitionEnd",function(){
        //10.1判断当前的索引值，做相应的修改
        if(index==9){
            index=1;
        }
        else if(index==0){
            index=8;
        }
        //10.2 关闭过渡
        imgBox.style.webkitTransition="none"; //兼容处理
        imgBox.style.transition="none";
        //10.3 设置偏移
        imgBox.style.webkitTransform="translateX("+(-index*width)+"px)";
        imgBox.style.transform="translateX("+(-index*width)+"px)";
    });*/
    itcast.addTransitionEnd(imgBox,loopAnimation);


    //11.添加手势监听事件，实现通过手势滑动的效果
    var startX=0;
    var moveX=0;
    var distanceX=0;
    var isMove=false;
    //11.1监听手势开始
    imgBox.addEventListener('touchstart',function(e){
        //记录手势触摸的起始位置
        startX= e.touches[0].clientX;
        //停止时钟
        clearInterval(timerId);
    });
    //11.2监听拖动滑动
    imgBox.addEventListener('touchmove',function(e){
        //修改是否移动状态
        isMove=true;
        //记录手势移动的当前位置
        moveX= e.touches[0].clientX;
        //计算移动的距离
        distanceX=moveX-startX;
        //计算实际偏移去的距离
        var currentX=-index*width +distanceX;
        //关闭过渡效果,过渡会有延迟效果
        removeTransition();
        //实现偏移
        setTransform(currentX);
    });
    //11.3监听拖动结束，判断拖动的距离，实现是翻页滑动还是吸附
    imgBox.addEventListener('touchend',function(e){
        //判断滑动的距离是否大于宽度的1/3
        if(isMove && Math.abs(distanceX) >= width/3){
            //滑动有两种方向
            if(distanceX >0){ //手势向右滑动，图片向左滑动
                index--;
            }
            else { //手势向左滑动，图片向右滑动
                index++;
            }
            addTransition();
            setTransform(-index*width);
            setIndicator();
        }
        else {
            addTransition();
            setTransform(-index*width);
        }
        //重新开启时钟
        timerId=setInterval(function(){
            //8.自动播放，索引自增
            index++;
            //9.添加过渡效果
            addTransition();
            //10.设置偏移
            setTransform(-index*width);
        },2000);
    });
}

//倒计时
function timeBack(){
    //1.设置倒计时初始时长
    var time=10;
    //2.获取需要展示倒计时的dom元素
    var spans=document.querySelector(".jd_sk_time").querySelectorAll("span");
    //3.开启时钟
    var timerId=setInterval(function(){
        //判断时间是否已经完结
        if(time <=0){
            clearInterval(timerId);
            return false;
        }
        //时间自减
        time--;
        //获取时分秒
        var hour=Math.floor(time/(60*60));
        var minute=Math.floor(time%3600/60);
        var second=time%60;

        //赋值dom元素
        spans[0].innerHTML=Math.floor(hour/10);
        spans[1].innerHTML=Math.floor(hour%10);
        spans[3].innerHTML=Math.floor(minute/10);
        spans[4].innerHTML=Math.floor(minute%10);
        spans[6].innerHTML=Math.floor(second/10);
        spans[7].innerHTML=Math.floor(second%10);
    },1000);
}

