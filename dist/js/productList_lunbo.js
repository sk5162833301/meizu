define(["jquery"], function($) {
    function download_pro_lunbo(){
        // console.log("我是下载");
        $.ajax({
            url:"../data/productList_lunbo.json",
            success:function(arr){
                // 添加数据
                for(let i = 0;i < arr.length;i++){
                    // console.log(arr[i]);
                    $(`<li>
                    <a href=""><img src="${arr[i].img}" alt=""></a>
                    <span>${arr[i].title}</span>
                    <em>￥${arr[i].price}</em>
                </li>`).appendTo(".recommend-slider-wrap");
                }
               
                function huadonglunbo(){
                    var aLis = document.querySelectorAll(".flex-control-paging li");
                    var oUl = document.querySelector(".recommend-slider-wrap");
                    // console.log(aLis)
                    $(aLis[0]).click(function(){
                        $(this).addClass('active').siblings().removeClass('active')
                        $(oUl).animate({
                            left : "0px",
                        }, 1000)
                    })
                    $(aLis[1]).click(function(){
                        $(this).addClass('active').siblings().removeClass('active')
                        $(oUl).animate({
                            left : "-46.5%",
                        }, 1000)
                    })
                    $(aLis[2]).click(function(){
                        $(this).addClass('active').siblings().removeClass('active')
                        $(oUl).animate({
                            left : "-77.5%",
                        }, 1000)
                    })
                }
                huadonglunbo();

            },
            error:function(msg){
                console.log(msg);
            }
        })

    }
    return {
        download_pro_lunbo:download_pro_lunbo
    }
});