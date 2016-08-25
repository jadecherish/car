/**
 * Created by Administrator on 2016/7/12.
 */
window.itcast={};

//添加函数
itcast.addTransitionEnd=function(dom,callback){
    //传入的对象不为null
    if (dom && typeof dom==="object"){
        dom.addEventListener("webkitTransitionEnd",function(){
            callback && callback();
        });
        dom.addEventListener("transitionEnd",function(){
            callback && callback();
        });
    }
};

//封装tap事件
itcast.tap=function(dom,callback){
    //判断当前dom是否是一个对象
    if(dom && typeof  dom =='object'){
        var ismove=false;
        var st=0; //开始响应的时间
        dom.addEventListener("touchstart",function(e){
            st=Date.now();
        });
        dom.addEventListener("touchmove",function(e){
            ismove=true;
        });
        dom.addEventListener("touchend",function(e){
            //满足两个条件：1.不能滑动过  2.必须比click的响应时间要小，一般是150
            if(ismove ==false && Date.now()-st < 150){
                //如果传入的回调函数非空，则进行调用
                callback && callback(e);
            }
            ismove=false;
        });
    }
};