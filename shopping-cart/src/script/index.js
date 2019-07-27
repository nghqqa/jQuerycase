//1.利用ajax获取数据库中的商品列表数据，在首页渲染数据
! function() {
    //取元素
    const goodsul = document.querySelector('.itemlist ul');
    //利用ajax，获取后端传送的数据
    ajax({
        url: 'http://localhost/js1905/case/shopping-cart/php/index.php', //后端接口
        dataType: 'json', //设置后端从数据库的返回值为json格式
        success: function(objdata) {
            let listr = '';
            for (let i = 0; i < objdata.length; i++) {

                listr += `
                    <li>
                        <a href="details.html?itemid=${objdata[i].picid}"> 
                        <img src="${objdata[i].url}">
                        <p>${objdata[i].title}</p>
                        <p>￥${objdata[i].price}</p>
                        </a>
                       
                    </li>
                `
            }
            goodsul.innerHTML = listr;
        }
    })
}()