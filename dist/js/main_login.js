console.log("加载成功");

//引入所有的模块
//配置路径
require.config({
    paths: {
      jquery: "jquery-1.11.3",
      download_login:"login_download",
    }
  }); 

  require (["download_login"],function(download_login){
    download_login.download_login();
  })

  