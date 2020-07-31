define(["jquery"], function($) {
    function download_rim(){
        // console.log("我是下载");
        $.ajax({
            url:"../data/goods_rim.json",
            success:function(arr){
                for(let i = 0;i < arr.length;i++){
                    var line = arr[i].line;
                    for(let j = 0;j < line.length;j++){
                        if(j == 0 || ( j % 4 == 0 )){
                        // console.log(line[j]);
                          $(`<li class="bg_img">
                                <a href=""><img src="${line[j].img}" alt=""></a>
                                <div class="erji_info">
                                    <span>${line[j].title}</span>
                                    <p>${line[j].desc}</p>
                                    <em>￥${line[j].price}</em>
                                </div>
                                </li>`).appendTo($(".rim_box"));
                        }else{
                            // console.log(line[j].title);
                            $(`<li class="sm_box">
                            <a href=""><img src="${line[j].img}" alt=""></a>
                            <span>${line[j].title}</span>
                            <p>${line[j].desc}</p>
                            <em>￥${line[j].price}</em>
                            </li>`).appendTo($(".rim_box"));
                        }
                        
                    }
                }
                
            },
            error:function(msg){
                console.log(msg);
            }
        })

    }
    return {
        download_rim:download_rim
    }
});