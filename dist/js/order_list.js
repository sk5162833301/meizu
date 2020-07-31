define(["jquery", "jquery-cookie"], function($) {
    function download_order(){
        // console.log("我是下载");
        $.ajax({
            url:"../data/pro_phoneList.json",
            success:function(arr){
                var cookieStr = $.cookie("goods");
                if(cookieStr){
                    var cookieArr = JSON.parse(cookieStr);
                    var newArr = []; // 符合条件的数据
                    for(var i = 0;i < arr.length;i++){
                        for(var j = 0;j < cookieArr.length;j++){
                            if(arr[i].id == cookieArr[j].id){
                                arr[i].num = cookieArr[j].num;
                                newArr.push(arr[i]);
                                break;
                            }
                        }
                    }
                    // console.log(newArr); // 购物车显示的数据
                    var str = ``;
                    var num = 0;
                    for(var i = 0;i < newArr.length;i++){
                        str += `
                        <tr class="cart-product"id="${newArr[i].id}">
                            <td class="cart-col-select">
                                <div class="checked Schecked"></div>
                                <a href="javascript:;"><img src="${newArr[i].img}" alt=""></a>
                                <p class="cart-product-item-name">${newArr[i].title}</p>
                            </td>
                            <td class="cart-col-price">
                                <span>￥${newArr[i].price}</span>
                            </td>
                            <td class="cart-col-number">
                                <div class="num_box">
                                    <div class="minus">-</div>
                                    <input type="text" value="${newArr[i].num}">
                                    <div class="plus">+</div>
                                </div>
                            </td>
                            <td class="cart-col-ctrl">
                                <span class="cart-product-remove">×</span>
                            </td>
                        </tr>`
                        // console.log(newArr[i])
                        
                        // console.log(newArr[i].num);
                    }
                    $(".table_list").html(str);
                }
                // console.log(newArr);
                function sc_price(){
                    if(!newArr){
                        alert("购物车为空")
                    }else{
                        var num = 0;
                        for(var i = 0;i < newArr.length;i++){
                            num += newArr[i].num * newArr[i].price;
                            console.log(num);
                            $(".totalPrice").html(num);
                        }

                    }
                }
                sc_price();

                // 计算购物车中商品总数的 
                function sc_num(){
                    var cookieStr = $.cookie("goods");
                    if(!cookieStr){
                        $(".totalCount").html(0);  
                    }else{
                        var cookieArr = JSON.parse(cookieStr);
                        var sum = 0;
                        for(var i = 0;i < cookieArr.length;i++){
                            sum += cookieArr[i].num;
                        }
                        $(".totalCount").html(sum);
                    }
                }   
                sc_num();



                // 给右侧的按钮添加删除功能
                $(".table_list").on("click",".cart-product-remove",function(){
                    var id = $(this).parent().parent(".cart-product").remove().attr("id");
                    console.log(id);
                    console.log(this);
                    // 在cookie中删除这个数据
                    var cookieArr = JSON.parse($.cookie("goods"));
                    cookieArr = cookieArr.filter(item => item.id != id);
                    cookieArr.length ? $.cookie("goods",JSON.stringify(cookieArr),{expires:30}) : $.cookie("goods",null);
                    location.reload();
                    sc_num();
                })

                  //给右侧的+和-按钮添加点击
                // function rightGoodsAdd_subtract() {
                    $(".table_list").on("click", ".plus", function () {
                        var id = $(this).parent().parent().parent(".cart-product").attr("id");
                        //找到cookie中的商品
                        var cookieArr = JSON.parse($.cookie("goods"));
                        console.log(cookieArr);
                        console.log(id);
                        var res = cookieArr.find((item) => item.id == id);
                        console.log(res);
                        res.num++;
                        $(this).siblings("input").val(`${res.num}`);
                        
                        $.cookie("goods", JSON.stringify(cookieArr), {
                            expires: 30,
                        });
                        location.reload();
                        sc_num();

                    });

                    $(".table_list").on("click", ".minus", function () {
                        var id = $(this).parent().parent().parent(".cart-product").attr("id");
                        //找到cookie中的商品
                        var cookieArr = JSON.parse($.cookie("goods"));
                        console.log(cookieArr);
                        console.log(id);
                        var res = cookieArr.find((item) => item.id == id);
                        console.log(res);
                        res.num == 1 ? alert("数量为1，不能减少") : res.num--;

                        $(this).siblings("input").val(`${res.num}`);
    
                        $.cookie("goods", JSON.stringify(cookieArr), {
                            expires: 30,
                        
                        });
                        sc_num();
                        location.reload();
                    });
                    sc_num();
                    // sc_price();

                // }


                // rightGoodsAdd_subtract();

            },
            error:function(msg){
                console.log(msg);
            }
        })



    }
    return {
        download_order:download_order
    }
});

