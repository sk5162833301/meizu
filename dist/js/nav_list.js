define(["jquery"], function($) {
    function download(){
        // console.log("我是下载");
        $.ajax({
            url:"../data/nav.json",
            success:function(arr){
                // alert(arr);
                for(let i = 0;i < arr.length;i++){
                    var node = $(`
                    <div class="nav_sub_box clear_fix:after">
                    <ul class="nav-sub-list">
                        
                    </ul></div>
                    `)
                    node.appendTo($(".nav_sub"));
                    var hots = arr[i].hots;
                    for(let j = 0;j < hots.length;j++){
                        // console.log(hots[j].title);
                        // console.log(hots[j].img);
                        // console.log(hots[j].price);
                        $(`<li>
                        <a href="#"><img src="${hots[j].img}" alt=""></a>
                        <span class="text_ellipsis">${hots[j].title}</span>
                        <p>￥${hots[j].price}</p>
                    </li>`).appendTo(node.find(".nav-sub-list"));
                        
                    }
                }
                function xuanxiangka(){
                    const aBtns = $(".nav_box").find("a");
                    const aDivs = $(".nav_sub").find("div");
                    // console.log(aBtns.length)
                    aBtns.mouseenter(function(){
                        // console.log(aBtns.index(this))
                        // $(".nav_box").eq(aBtns.index(this)).css("color","#008CFF")
                        aBtns.eq($(this).index()).css("color","#008CFF")
                        
                        aBtns.mouseleave(function(){
                            aBtns.eq($(this).index()).css("color","#333");
                        })
                        // if(aBtns.index(this) == 9){
                        //     console.log($("#nav_sub"));
                        //     $(".nav_sub").css("display","block");
                        //     $("#app_img").css("display","block");
                        // }
                        
                        
                        
                        if(aBtns.index(this) >= 4 || aBtns.index(this) == 9){
                            $(".nav_sub").css("display","none");
                        }else{
                            $(".nav_sub").css("display","block");
                            // console.log(aDivs);
                            aDivs.css("display","none");
                            // console.log(this)
                            aDivs.eq($(this).index()).css("display","block");
                        }
                        $(".nav_sub").mouseleave(function(){
                            $(".nav_sub").css("display","none");
                        })
                    })
                }
                xuanxiangka();
                

                        // 点击购物车logo跳转
        $(".cartBtn").on("click",function(){
            location.assign("order.html");
          })
                
                
            },
            error:function(msg){
                console.log(msg);
            }
        })

    }

    return {
        download:download,
    }

    
});


