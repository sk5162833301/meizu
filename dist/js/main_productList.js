console.log("加载成功");

//引入所有的模块
//配置路径
require.config({
    paths: {
      jquery: "jquery-1.11.3",
      "jquery-cookie": "jquery.cookie",
      nav_list:"nav_list",
      pro_phoneList:"pro_phoneList",
      productList_lunbo:"productList_lunbo",
    },
    shim: {
      //设置依赖关系
      "jquery-cookie": ["jquery"],
    },
  }); 

require (["nav_list","pro_phoneList","productList_lunbo"],function(nav_list,pro_phoneList,productList_lunbo){
  nav_list.download();
  pro_phoneList.download_pro_phone();
  productList_lunbo.download_pro_lunbo();
});