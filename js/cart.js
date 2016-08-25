/**
 * Created by Administrator on 2016/7/14.
 */
window.onload=function(){
    showDelete();
};

/*删除*/
function  showDelete(){
    /*1.点击删除按钮的时候动画弹出删除框，同时垃圾桶盖子打开
    2.点击确定或者取消的时候，弹出框隐藏，同时盖上垃圾桶盖子*/
    //获取整体提示框
    var win=document.querySelector(".jd_win");
    //获取提示框
    var winbox=document.querySelector(".jd_win_box");
    //获取所有删除按钮
    var dbox=document.querySelectorAll(".f_right");

    //全局的当前被点击的垃圾桶盖子
    var cap=null;
    //绑定事件
    for(var i=0;i<dbox.length;i++){
        dbox[i].onclick=function(){
            //显示整体的弹出层
            win.style.display="block";
            //为提示框添加动画
            winbox.className="jd_win_box bounceInDown";
            //为垃圾桶盖子添加动画
            cap=this.querySelector(".up");
            //添加过渡
            cap.style.webkitTransition="all .3s";
            cap.style.transition="all .3s";
            //设置 旋转
            cap.style.webkitTransform="rotate(-30deg)";
            cap.style.transform="rotate(-30deg)";
            //设置 旋转原点
            cap.style.transformOrigin="0px";
            cap.style.webkitTransformOrigin="0px";
        }
    }

    //为取消按钮绑定点击事件
    document.querySelector(".jd_win_btnBox").querySelector(".cancel").onclick=function(){
        //1.获取整个提示框
        win.style.display="none";
        //2.为盖子添加动画
        cap.style.webkitTransition="all .9s";
        cap.style.transition="all .9s";
        //设置 旋转：去掉transform就是还原到原始状态
        cap.style.webkitTransform="none";
        cap.style.transform="none)";
        //设置 旋转原点
        cap.style.transformOrigin="0px";
        cap.style.webkitTransformOrigin="0px";
    }
}