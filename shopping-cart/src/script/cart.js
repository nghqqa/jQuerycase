;
! function() {
    const cartlist = document.querySelector('.goods-item-sele');
    const priceSum = document.querySelector('.totalprice');
    const itemSum = document.querySelector('.amount-sum em');

    let itemNum = null; //计算加入购物车的数量
    let priceAll = null; //计算所有加入购物车的商品总价
    //创建一个函数，将商品的ID和数量作为参数传入，利用ajax获取后端返回数据，在购物车页面渲染，加入购物车的商品的相关信息
    function showItem(id, num) {
        ajax({
            type: 'post',
            url: 'http://localhost/js1905/case/shopping-cart/php/cart.php',
            dataType: 'json',
            data: {
                itemid: id
            },
            success: function(cartitem) { //ajax将存储在cookie中的商品ID，传输到后端，后端经过比对，返回对应ID商品的具体数据
                //console.log(cartitem)
                let itemListstr = '';
                itemListstr = `
            <div class="goods-info">
                <div class="cell b-checkbox">
                    <div class="cart-checkbox">
                        <input type="checkbox" checked="" name="" id="" value="" />
                        <span class="line-circle"></span>
                    </div>
                </div>
                <div class="cell b-goods">
                    <div class="goods-name">
                        <div class="goods-pic">
                            <a href=""><img src="${cartitem.url}" alt="" /></a>
                        </div>
                        <div class="goods-msg">
                            <div class="goods-d-info">
                                <a href="">${cartitem.title}</a>
                            </div>
                            <div class="goods-ex">
                                <span class="promise"></span>
                                <span class="promise">
                                        <i></i><a href="">购买京东服务</a>
                                    </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cell b-props">
                </div>
                <div class="cell b-price">
                    <strong>${cartitem.price}</strong>
                    <a class="sales-promotion" href="">
                            促销优惠
                            <b></b>
                        </a>
                    <div class="sales-promotion-dropdown">
                    </div>
                </div>
                <div class="cell b-quantity">
                    <div class="quantity-form">
                        <a class="quantity-down" href="javascript:void(0)">-</a>
                        <input type="text" value="${num}" />
                        <a class="quantity-add" href="javascript:void(0)">+</a>
                    </div>
                    <div class="quantity-text">有货</div>
                </div>
                <div class="cell b-sum">
                    <strong>${num*cartitem.price}</strong>
                </div>
                <div class="cell b-action">
                    <a class="delete" href="javascript:void(0)">删除</a><a href="javascript:void(0)">移到我的关注</a>
                </div>
            </div>
                `; //渲染数据 

                cartlist.innerHTML += itemListstr;
                priceAll += num * cartitem.price;
                priceSum.innerHTML = '￥' + priceAll
                const remove = document.querySelector('.delete');
                //点击删除按钮， 删除当前商品
                remove.onclick = function() {
                    //this.parentNode.parentNode.outerHTML = '';
                    alert(cartitem.picid)
                }

            }

        });
    }

    //判断cookie中是否有数据
    if (getcookie('cookiesid') && getcookie('cookiesnum')) {
        let itemid = getcookie('cookiesid').split(','); //cookie中的数据是以字符串存储的，将其转换成数组
        let itemnum = getcookie('cookiesnum').split(',');
        for (let i = 0; i < itemid.length; i++) { //遍历存放商品ID的数组
            showItem(itemid[i], itemnum[i]) //调用函数，将商品的ID和对应的数量传入

        }
        for (let i = 0; i < itemnum.length; i++) { //遍历存放商品数量的数组，计算总数
            itemNum += Number(itemnum[i]);

        }
        itemSum.innerHTML = itemNum; //将总数写入购物车页面
    }


}();