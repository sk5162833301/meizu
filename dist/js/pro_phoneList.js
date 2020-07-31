define(["jquery", "jquery-cookie"], function($) {
    function download_pro_phone(){
        // console.log("我是下载");
        $.ajax({
            url:"../data/pro_phoneList.json",
            success:function(arr){
                // alert(arr);
                for(let i = 0;i < arr.length;i++){
                    // console.log(arr[i]);
                    $(`<li class="skip" id="${arr[i].id}"><img src="${arr[i].img}" alt="">
                    <h3>${arr[i].title}</h3>
                    <p>${arr[i].desc}</p>
                    <span>￥${arr[i].price}</span>
                    </li>`).appendTo(".goods-list-wrap");
                }
                $(".skip").on("click",function(){
                    // alert($(this).attr("id"));
                    $.cookie("establish",$(this).attr("id"),{
                        expires:30,
                        raw:false
                    })
                    location.assign("details.html");
                })
                
            },
            error:function(msg){
                console.log(msg);
            }
        })

    }


    

    return {
        download_pro_phone:download_pro_phone,
    }


});
