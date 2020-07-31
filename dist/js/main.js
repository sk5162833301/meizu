console.log("加载成功");

//引入所有的模块
//配置路径
require.config({
    paths: {
      jquery: "jquery-1.11.3",
      nav_list:"nav_list",
      phone_list:"phone_list",
      erji_list:"erji_list",
      parts_list:"parts_list",
      rim_list:"rim_list",
      nav_xuanlun:"nav_xuanlun",
    }
  }); 

  require (["nav_list","phone_list","erji_list","parts_list","rim_list","nav_xuanlun"],function(nav_list,phone_list,erji_list,parts_list,rim_list,nav_xuanlun){
    nav_list.download();
    phone_list.download_phone();
    erji_list.download_erji();
    parts_list.download_parts();
    rim_list.download_rim();
    nav_xuanlun.banner();
  })

  