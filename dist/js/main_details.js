console.log("加载成功");

//引入所有的模块
//配置路径
require.config({
    paths: {
      jquery: "jquery-1.11.3",
      "jquery-cookie": "jquery.cookie",
      nav_list:"nav_list",
      fangdajing:"fangdajing",
      download_detaile:"detaile_list",
    },
    shim: {
      //设置依赖关系
      "jquery-cookie": ["jquery"],
    },
  }); 

  require (["nav_list","fangdajing","download_detaile"],function(nav_list,fangdajing,download_detaile){
    nav_list.download();
    // fangdajing.fangdajing();
    download_detaile.download_detaile();
  })