console.log("加载成功");

//引入所有的模块
//配置路径
require.config({
    paths: {
      jquery: "jquery-1.11.3",
      download_register:"register_download",
    }
  }); 

  require (["download_register"],function(download_register){
    download_register.download_register();
  })

  