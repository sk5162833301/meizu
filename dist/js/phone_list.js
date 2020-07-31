define(["jquery"], function($) {
    function download_phone(){
        // console.log("我是下载");
        $.ajax({
            url:"../data/phone1.json",
            success:function(arr){
                // alert(arr);
                for(let i = 0;i < arr.length;i++){
                    // console.log(arr);
                    if(i < 2){
                        $(`<li class="big_box">
                        <span>${arr[i].title}</span>
                        <p>${arr[i].desc}</p>
                        <em>￥${arr[i].price}</em>
                        <i>分期</i>
                        <a href=""><img src="${arr[i].img}" alt=""></a>
                        </li>`).appendTo($(".phone_box"));
                    }else{
                        $(`<li class="sm_box">
                        <a href=""><img src="${arr[i].img}" alt=""></a>
                        <span>${arr[i].title}</span>
                        <p>${arr[i].desc}</p>
                        <em>￥${arr[i].price}</em>
                    </li>`).appendTo($(".phone_box"));
                    }
                    // if(i = 2 && i )
                }
                
            },
            error:function(msg){
                console.log(msg);
            }
        })

    }
    return {
        download_phone:download_phone
    }
});