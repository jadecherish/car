/**
 * Created by Administrator on 2016/7/12.
 */
window.onload=function(){
    //左侧栏滑动
    swipe();
    //右侧栏滑动
    //1.大盒子  2.方向  3.缓冲距离
    itcast.iScroll({
        swipeDom: document.querySelector(".jd_category_right"),
        swipeType: 'y',
        swipeDistance:100
    });
};

//滑动函数
function  swipe(){
    /*1.实现滑动效果，需要监听手势事件 touchstart   touchmove  touchend
    2.控制只是在一定的区间内进行滑动
        1.最小区间和最大区间值
        2.类似弹簧效果
    3.滑动后改变当前li标签的样式*/

    //1.获取需要进行滑动的盒子
    var parentBox=document.querySelector(".jd_category_left");
    var ulBox=parentBox.querySelector("ul");
    //获取高度
    var ulHeight=ulBox.offsetHeight; //需要进行滑动的盒子高度
    var parentHeight=parentBox.offsetHeight//在父容器的高度
    //2.设置最大的滑动区间，这个区间是指Y的坐标值，也就是意味着顶部的top属性值
    var maxPosition=0; //最大top值
    var minPosition=parentHeight-ulHeight; //最小top值
    //3.设置弹簧效果区间
    var bounce=100; //可拉伸的弹簧区间值
    var maxBounce=maxPosition+bounce;
    var minBounce=minPosition-bounce;

    //添加公共方法
    //添加过渡
    var addTransition=function(){
        ulBox.style.webkitTransition="all .2s";
        ulBox.style.transition="all .2s";
    }
    //删除过渡
    var removeTransition=function(){
        ulBox.style.webkitTransition="none";
        ulBox.style.transition="none";
    }
    //设置定位
    var setTransform=function(distance){
        ulBox.style.webkitTransform="translateY("+distance+"px)";
        ulBox.style.transform="translateY("+distance+"px)";
    }

    //4.添加滑动事件
    var startY=0;
    var moveY=0;
    var distanceY=0;
    var isMove=false;
    //设置变量，记录当前的实际位置
    var currentY=0;
    ulBox.addEventListener('touchstart',function(e){
        startY= e.touches[0].clientY;
    });
    ulBox.addEventListener('touchmove',function(e){
        moveY= e.touches[0].clientY;
        //计算距离
        distanceY=moveY-startY;
        //判断是否滑出指定的区间
        //如果超出了弹簧指定的范围，则不能再进行滑动
        if(distanceY+currentY < minBounce  || distanceY+currentY > maxBounce){
            return false;
        }
        //滑动的时候不需要过渡
        removeTransition();
        //定位
        setTransform(currentY+distanceY);
    });
    ulBox.addEventListener('touchend',function(e){
        //判断是否在弹簧区间内，如果是，则吸附
        //因为之前已经判断过如果小于弹簧范围，则不能再进行滑动，所以这里只需要判断是否是小于最小定位位置，如果是，则将其吸附回设置好的最小定位位置
        if(currentY+distanceY < minPosition){
            //回到最小区间的位置
            //开启过渡
            addTransition();
            //设置定位
            setTransform(minPosition);
            //重置当前位置
            currentY=minPosition;
        }
        //否则，吸附回最大定位位置
        else if(currentY+distanceY > maxPosition){
            //回到最大区间的位置
            //开启过渡
            addTransition();
            //设置定位
            setTransform(maxPosition);
            //重置当前位置
            currentY=maxPosition;
        }
        //否则，正常处理
        else{
            //记录当前位置,手于下一次滑动
            currentY+=distanceY;
        }
    });

    //添加ul标签的Tap事件
    var lis=ulBox.querySelectorAll("li");
    itcast.tap(ulBox,function(e){
        //遍历所有li标签，清除样式
        for(var i=0;i<lis.length;i++){
           /* lis[i].classList.remove("active");*/
            lis[i].className="";
            //将当前的索引值添加到标签中--临时添加
            lis[i].index=i;
        }
        var li= e.target.parentNode;
        //e.target是a标签，所以还需要找到它的父容器
        li.classList.add("active");
        //获取当前所点击的事件源的索引值
        var cindex=  li.index;
        //将当前索引位置的li标签移动到最顶部
        //判断是否超出之前设定的最小间距，如果是，则不再进行本次的点击滑动操作
        console.log(-(cindex * li.offsetHeight) +"  "+ minPosition);
        if(-(cindex * li.offsetHeight) < minPosition){
            console.log('不能再往上滑动了');
            //修改当前的位置
            currentY=minPosition;
            addTransition();
            //2.设置定位
            setTransform(minPosition);
            return false;
        }
        else{
            //1.添加过渡
            addTransition();
            //2.设置定位
            setTransform(-cindex*li.offsetHeight);
            //修改当前位置
            currentY=-cindex*li.offsetHeight;
        }
    });
}
