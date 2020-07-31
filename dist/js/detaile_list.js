define(["jquery", "jquery-cookie"], function($) {
    function download_detaile(){
        // console.log("我是下载");
        $.ajax({
            url:"../data/pro_phoneList.json",
            success:function(arr){
              console.log($.cookie("establish"));
                for(var i = 0;i < arr.length;i++){
                    // console.log(arr[i].id);
                    var cookieStr = $.cookie("establish");
                    $(".btn-empty").attr("id",cookieStr);


                    if(arr[i].id == $.cookie("establish")){
                        $(`<img src="${arr[i].img}" alt="">`).appendTo($(".s_box"));
                        $(`<img src="${arr[i].img}" alt="">`).appendTo($(".b_box"));
                        $(`<h2>${arr[i].title}</h2>`).appendTo($(".property-hd_box"));
                        $(`<p class="mod-info">${arr[i].desc}</p>`).appendTo($(".property-hd_box"));
                        $(`<div class="mod_price">
                        <i>￥</i><span>${arr[i].price}.00</span>
                    </div>`).appendTo($(".property-hd_box"));
                    }
                }
                
            },
            error:function(msg){
                console.log(msg);
            }
        })
        function fangdajing(){
            // console.log("我是下载");
            // class Magnifier {
            //     constructor() {
            //         // 选择元素
            //         this.Sbox = document.querySelector(".s_box");
            //         this.span = document.querySelector(".s_box span");
            //         this.Bbox = document.querySelector(".b_box");
            //         this.Bimg = document.querySelector(".b_box img");
        
            //         // 绑定事件
            //         this.addEvent();
            //     }
            //     addEvent() {
            //         var that = this;
            //         this.Sbox.onmouseover = function () {
            //             that.over();
            //         }
            //         this.Sbox.onmouseout = function () {
            //             that.out();
            //         }
            //         this.Sbox.onmousemove = function (eve) {
            //             var e = eve || window.event;
            //             that.move(e);
            //         }
            //     }
            //     over() {
            //         this.span.style.display = "block";
            //         this.Bbox.style.display = "block";
        
            //         // span宽高比例：根据右侧大图和显示区域计算得来
            //         var spanW = 4;
            //         var spanH = 4;
            //         // console.log(spanW)
            //         // 根据宽高比例，设置span的真正宽高
            //         this.span.style.width = this.Sbox.offsetWidth / spanW + "px";
            //         this.span.style.height = this.Sbox.offsetHeight / spanH + "px";
            //     }
            //     out() {
            //         this.span.style.display = "none";
            //         this.Bbox.style.display = "none";
            //     }
            //     move(e) {
            //         // console.log(e);
            //         // this.span.style.left = e.offsetX + "px";
            //         // this.span.style.top = e.offsetY + "px";
        
            //         // 鼠标相对于页面的坐标 - sBox左边的位置 - span宽度的一半
            //         var l = e.pageX - this.Sbox.offsetLeft - this.span.offsetWidth / 2;
            //         var t = e.pageY - this.Sbox.offsetTop - this.span.offsetHeight / 2;
            //         // console.log(l);
            //         // console.log(this.Sbox.offsetLeft);
    
        
            //         // 边界限定
            //         if (l < 0) l = 0;    // left
            //         if (t < 0) t = 0;    // top
            //         // right
            //         if (l > this.Sbox.offsetWidth - this.span.offsetWidth) {
            //             l = this.Sbox.offsetWidth - this.span.offsetWidth
            //         }
            //         // bottom
            //         if (t > this.Sbox.offsetHeight - this.span.offsetHeight) {
            //             t = this.Sbox.offsetHeight - this.span.offsetHeight
            //         }
        
            //         // 设置span的位置
            //         this.span.style.left = l + "px";
            //         this.span.style.top = t + "px";
        
            //         // 计算span在sBox中的移动比例
            //         var x = l / (this.Sbox.offsetWidth - this.span.offsetWidth);
            //         var y = t / (this.Sbox.offsetHeight - this.span.offsetHeight);
            //         // console.log(x, y);
        
            //         // 根据比例设置右侧大图的移动位置
            //         this.Bimg.style.left = x * (this.Bbox.offsetWidth - this.Bimg.offsetWidth) + "px";
            //         this.Bimg.style.top = y * (this.Bbox.offsetHeight - this.Bimg.offsetHeight) + "px";
            //     }
            // }
            // new Magnifier;
            $(".s_box").mouseenter(function(){
                $(".zoom").show()
                $(".b_box").show()
              }).mouseleave(function(){
                $(".zoom").hide()
                $(".b_box").hide()
              }).mousemove(function(ev){
                let x = $(".s_box").width()-$(".zoom").width();
                let y = $(".s_box").height()-$(".zoom").height();
                let offsetX = ev.clientX-$(this).offset().left-$(".zoom").width()/2;
                let offsetY = ev.clientY-$(this).offset().top-$(".zoom").height()/2+$(window).scrollTop();
                if (offsetX <= 0) {
                  offsetX = 0;
                }
                if (offsetX >= x) {
                  offsetX = x;
                }
                if (offsetY <= 0) {
                  offsetY = 0;
                }
                if (offsetY >= y) {
                  offsetY = y;
                }
                $(".zoom").css({
                  left:offsetX,
                  top:offsetY
                });
                $(".b_box img").css({
                  left:-2*offsetX,
                  top:-2*offsetY
                })
              })
        
    
    
        }
        fangdajing();

        // 点击购物车按钮
        $(".btn-empty").on("click",function(){
          // location.replace("order.html");
          var id = this.id;
          // 1.判断是否是第一次添加   
          var first = $.cookie("goods") == null ? true : false;
          if(first){
              var arr = [{id:id,num:1}];
              $.cookie("goods",JSON.stringify(arr),{
                  expires:30,
                  raw:false
              })
          }else{
              // 判断之前是否添加过
              var cookieArr = JSON.parse($.cookie("goods"));
              var index = cookieArr.findIndex(item => item.id == id);
              if(index >= 0){
                  cookieArr[index].num++;
              }else{
                  cookieArr.push({id:id,num:1});
              }
              $.cookie("goods",JSON.stringify(cookieArr),{
                  expires:30,
                  raw:false
              })
          }
          alert("加入成功");
        })
        // 点击购物车logo跳转
        $(".cartBtn").on("click",function(){
          location.assign("order.html");
        })

    }
    return {
        download_detaile:download_detaile
    }
});