// console.log("加载成功");

//引入所有的模块
//配置路径
require.config({
    paths: {
      jquery: "jquery-1.11.3",
      "jquery-cookie": "jquery.cookie",
      order_list:"order_list"
    },
    shim: {
      //设置依赖关系
      "jquery-cookie": ["jquery"],
    },
  }); 

  require (["order_list"],function(order_list){
    order_list.download_order();
  })