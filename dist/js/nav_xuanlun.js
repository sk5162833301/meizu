define(["jquery"], function ($) {
    function banner() {
        const utils = {
                /**
     * 
     * @param  obj  <对象>   要获取属性的对象
     * @param  attr <string> 样式名称
     * @return      <string> 返回到的样式值
     */
    getStyle : function(obj,attr){
        if (obj.currentStyle) {
            // 判断Obj有currentStyle这个属性，说明使用的是IE浏览器
            return obj.currentStyle[attr]
          } else {
            // obj没有currentStyle这个属性，说明用的不是IE
            return getComputedStyle(obj, false)[attr]
        }
    },
    
    /**
     * 
     * @param  ele       <DOMObject>  要运动的元素对象
     * @param  attr     <string>     运动的属性名
     * @param  end      <number>     运动的终点，单位是px
     * @param  duration <number>     运动的总时长，单位是ms
     * @param  fn       <function>   回调函数，在运动结束以后执行的函数,把一个函数作为参数去传递
     * start 起点
     * distance 运动总距离
     * steps 运动的总步数
     * speed 运动的速度
     */
    move : function(ele,attr,end,duration,fn){
        //获取起点位置
        var start = parseInt(this.getStyle(ele,attr))
        //获取运动的总距离
        var distance = end - start
        //获取运动的总步数
        var steps = Math.floor(duration / 30)
        //获取运动的速度
        var speed = distance / steps

        var n = 0 // 记录当前是第几步
        // 在开启一个新的定时器之前先把上一次的清除掉
        clearInterval(ele.timer)
        ele.timer = setInterval(function () {
          n++
          ele.style[attr] = start + n * speed + 'px'
          // 用步数判断终点
          if (n === steps) {
            clearInterval(ele.timer)
            // 固定在终点位置
            ele.style[attr] = end + 'px'
            // 运动结束以后调用传过来的这个函数
    
            // 逻辑短路，这里如果fn无效，会隐式转换为false，逻辑短路，不会执行fn()
            // 一般回调函数都会这么写
            fn && fn()
          }
        }, 30)
    },

    /**
    * 封装一个缓冲运动,这里缓冲运动速度跟时间是没有关系的，所以不需要传时间，时间内是根据距离改变的
    * @param  ele       <DOMObject>  要运动的元素对象
    * @param  attr     <string>     运动的属性名
    * @param  end      <number>     运动的终点，单位是px
    * @param  fn       <function>   回调函数，在运动结束以后执行的函数,把一个函数作为参数去传递
   */
  move1:function(ele,attr,end,fn){
    //定时器开启之前先清除一次
    clearInterval(ele.timer)
    //获取起点位置
    var start = parseInt(this.getStyle(ele,attr))
    ele.timer = setInterval(function(){
      //获取运动的总距离
      var distance = end - start
      //获取运动的速度，每一步要走的距离，总距离的十分之一向上取整
      var speed = distance > 0 ? Math.ceil(distance / 10) : Math.floor(distance / 10)
      //起点位置加上当前这一步要走的距离
      start += speed
      ele.style[attr] = start + 'px'
      if(start === end){
        clearInterval(ele.timer)
        fn && fn()
      }
    },30)
  }
        }
            var banner_warp = document.querySelector('#banner_warp'),
                   imgs = document.querySelectorAll('#banner_warp ul li'),
                   ul = document.querySelector('#banner_warp ul'),
                   goPrev = document.querySelector('#goPrev'),
                   goNext = document.querySelector('#goNext'),
                   ol = document.querySelector('#banner_warp ol'),
                   len = imgs.length,
                   width = imgs[0].offsetWidth,
                   btns = [],
                   index = 0,
                   lastindex = 0,
                   ismove = false
       
               //根据图片张数创建小按钮
               for(var i = 0; i < len; i ++){
                   var li = document.createElement('li')
                   if(i === 0) li.className = 'ac'
                   ol.appendChild(li)
                   btns.push(li)
               }
       
               //小按钮
               btns.forEach(function(btn,i){
                   btn.onclick = function(){
                       if(ismove === false){
                           ismove = true
                           lastindex = index
                           index = i
                           btns[lastindex].classList.remove('ac')
                           btns[index].classList.add('ac')
                           utils.move1(ul,'left',-index * width,() => {
                               ismove = false
                           })
                       }                
                   }
               })
       
               //克隆第一张图片
               ul.appendChild(imgs[0].cloneNode(true))
               ul.style.width = (len + 1) * width + 'px'
       
               //向右按钮
               goNext.onclick = function(){
                   if(ismove === false){
                       ismove = true
                       lastindex = index
                       index++
                   if(index === len){
                       index = 0
                       utils.move1(ul,'left',-len * width,() => {
                           ul.style.left = '0px'
                           ismove = false
                       })                              
                   } else{                
                       utils.move1(ul,'left',-index * width,() => {
                           ismove = false
                       })
                   }
                   btns[lastindex].classList.remove('ac')
                   btns[index].classList.add('ac') 
                   }        
               }
       
               //向左按钮
               goPrev.onclick = function(){
                   if(ismove === false){
                       ismove = true
                       lastindex = index
                       index--
                   if(index < 0){
                       ul.style.left = -len * width + 'px'
                       index = len - 1
                   }
                   utils.move1(ul,'left',-index * width,() => {
                       ismove = false
                   })
                   btns[lastindex].classList.remove('ac')
                   btns[index].classList.add('ac') 
                   }            
               }
       
               //自动轮播
               var timer = setInterval(goNext.onclick,2000)
               banner_warp.onmouseenter = function(){
                   clearInterval(timer)
               }
               banner_warp.onmouseleave = function(){
                   timer = setInterval(goNext.onclick,2000)
               }
           
        
    
    }
    return {
      banner: banner,
    };
  });
  