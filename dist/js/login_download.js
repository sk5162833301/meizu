define(["jquery"], function($) {
    function download_login(){
        console.log("我是下载");
        var aInputs = document.querySelectorAll("#mainForm input");
        var aAlert = document.querySelector(".alert")

        $(".fullBtnBlue").on("click",function(){
            $.ajax({
                url:"./php/login.php",
                type:"post",
                data:{
                    username:aInputs[0].value,
                    password:aInputs[1].value
                },
                success:function(result){
                    // console.log(aInputs[0].value);
                        console.log(result);
                        var obj = JSON.parse(result);
                        aAlert.style.display = "block";
                        if(obj.code){
                            // 错误
                            aAlert.className = "alert alert-danger";
                            aAlert.innerHTML = obj.msg;
                        }else{
                            aAlert.className = "alert alert-success";
                            aAlert.innerHTML = obj.msg;
                        }
                    },
                    error:function(msg){
                       console.log(msg);
                    }
            })
        })

    }
    return {
        download_login:download_login
    }
});