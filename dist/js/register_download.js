define(["jquery"], function($) {
    function download_register(){
        console.log("我是下载");
        var aInputs = document.querySelectorAll("#mainForm input");
        var aAlert = document.querySelector(".alert")
        
        $("#registerBtn").on("click",function(){
            $.ajax({
                url:"./php/register.php",
                type:"post",
                data:{
                    username:aInputs[0].value,
                    password:aInputs[1].value,
                    repassword:aInputs[2].value,
                    createtime: (new Date().getTime())
                },
                success:function(result){
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
                        setTimeout(() => {
                            // location.assign("login.html");
                            // 产生历史记录的
                            location.assign("login.html");
                        },500)
                    }
                },
                error:function(msg){
                   console.log(msg);
                }
            })
        })

    }
    return {
        download_register:download_register
    }
});