;
! function() {

    let itemid = location.search.split('?')[1].split('=')[1]; //从地址栏获取（前端拼接在了地址栏上）数据库中每个商品对应的picid，
    const spicImg = document.querySelector('.spic img');
    const bfImg = document.querySelector('.bf img');
    const bpic = document.querySelector('.bpic');
    const imgTitle = document.querySelector('.details_right .title');
    const price = document.querySelector('.details_right .price');
    const itemnum = document.querySelector('.goodsnum input');
    const clickadd = document.querySelector('.goodsnum button');
    const quit = document.querySelector('.details .remind');
    const close = document.querySelector('.remind span');
    const movelist = document.querySelector('.movelist ul');
    const rightarrows = document.querySelector('#right');
    const leftarrows = document.querySelector('#left')

    //1.放大镜效果
    function Fangdajing() {
        this.picbox = document.querySelector('.details');
        this.oSpic = document.querySelector('.spic'); //小图片
        this.oSf = document.querySelector('.sf'); //小放大镜
        this.oBf = document.querySelector('.bf'); //大放大镜
        this.oBpic = document.querySelector('.bpic'); //大图片


    }
    Fangdajing.prototype.init = function() {
        let _this = this;
        //鼠标移入小图
        this.oSpic.onmouseover = function() {
                _this.show();
                _this.sfsize();
                _this.oSf.onmousemove = function(ev) {
                    let event = ev || window.event;
                    _this.sfposition(event);
                    _this.bpicposition();
                }

            }
            //鼠标移出小图
        this.oSpic.onmouseout = function() {
            _this.hide()
        }

    }

    //鼠标移入，sf和bf出现
    Fangdajing.prototype.show = function() {
            this.oSf.style.visibility = 'visible';
            this.oBf.style.visibility = 'visible';
        }
        //鼠标移出，sf消失,bf消失
    Fangdajing.prototype.hide = function() {
            this.oSf.style.visibility = 'hidden';
            this.oBf.style.visibility = 'hidden';
        }
        // 求小放大镜的尺寸大小和比例
    Fangdajing.prototype.sfsize = function() {
            this.oSf.style.width = this.oSpic.offsetWidth * this.oBf.offsetWidth / this.oBpic.offsetWidth + 'px';
            this.oSf.style.height = this.oSpic.offsetHeight * this.oBf.offsetHeight / this.oBpic.offsetHeight + 'px';
            this.rate = this.oBf.offsetWidth / this.oSf.offsetWidth;
        }
        //让sbox充当放大镜，让其跟着鼠标运动，将鼠标位置给sbox，在spic内部
    Fangdajing.prototype.sfposition = function(event) {
            l = event.clientX - this.picbox.offsetLeft - this.oSf.offsetWidth / 2;
            t = event.clientY - this.picbox.offsetTop - this.oSf.offsetHeight / 2;
            if (l <= 0) {
                l = 0
            } else if (l >= this.oSpic.offsetWidth - this.oSf.offsetWidth - 2) {
                l = this.oSpic.offsetWidth - this.oSf.offsetWidth - 2
            };
            if (t <= 0) {
                t = 0;
            } else if (t >= this.oSpic.offsetHeight - this.oSf.offsetHeight - 2) {
                t = this.oSpic.offsetHeight - this.oSf.offsetHeight - 2
            }
            this.oSf.style.left = l + 'px';
            this.oSf.style.top = t + 'px';
        }
        //让大图向相反方向移动位置
    Fangdajing.prototype.bpicposition = function() {
        this.oBpic.style.left = -this.rate * l + 'px';
        this.oBpic.style.top = -this.rate * t + 'px';
    }

    new Fangdajing().init();


    //2.利用ajax获取后端返回数据，并渲染到详情页
    ajax({
            url: 'http://localhost/js1905/case/shopping-cart/php/details.php',
            data: {
                itemid: itemid //将获取的picid传到后端details.php
            },
            success: function(detailitem) {
                let imgurlsarr = [];
                detailitem = JSON.parse(detailitem); //后端返回的是json格式的字符串，转成对象
                imgurlsarr = detailitem.imgurls.split(',');
                spicImg.src = detailitem.url; //通过获取返回的对象的属性值，渲染详情页数据
                bfImg.src = detailitem.url;
                imgTitle.innerHTML = detailitem.title;
                price.innerHTML = detailitem.price;
                let imgtabstr = '';
                for (let i = 0; i < imgurlsarr.length; i++) {
                    imgtabstr += `
                <li>
                <img src="${imgurlsarr[i]}">
                </li>
                `
                }
                movelist.innerHTML = imgtabstr;
            }
        })
        //放大镜下面的图片列表,事件委托
    movelist.onmouseover = function(ev) {
            var ev = ev || window.event;
            let target = ev.target || ev.srcElement;
            if (target.parentNode.nodeName == 'LI') {
                let imgurl = target.parentNode.querySelector('img').src;
                spicImg.src = imgurl;
                bpic.src = imgurl;
            }
        }
        //给图片列表的左右箭头加事件
    let num = 5;
    //右箭头  

    rightarrows.onclick = function() {
            const tablist = movelist.querySelectorAll('li');
            const liwidth = tablist[0].offsetWidth + 5;
            if (tablist.length >= num) {
                num++;
                rightarrows.style.visibility = 'visible';
                leftarrows.style.visibility = 'visible'

                if (tablist.length == num) {
                    rightarrows.style.visibility = 'hidden';
                }
                movelist.style.left = -(num - 5) * liwidth + 'px';
            }

        }
        //左箭头
    leftarrows.onclick = function() {
        const tablist = movelist.querySelectorAll('li');
        const liwidth = tablist[0].offsetWidth + 5;
        if (num > 5) {
            num--;
            leftarrows.style.visibility = 'visible';
            rightarrows.style.visibility = 'visible';
            if (num == 5) {

                leftarrows.style.visibility = 'hidden';
            }
            movelist.style.left = -(num - 5) * liwidth + 'px';

        }


    }


    //3.将对应的商品编号和数量写入cookie
    let idarr = [];
    let numarr = [];
    //定义一个函数，确定cookie内有没有存储商品的编号和数量
    function cookievalue() {
        if (getcookie('cookiesnum') && getcookie('cookiesid')) {
            idarr = getcookie('cookiesid').split(','); //将cookie中的字符串数据转换成数组
            numarr = getcookie('cookiesnum').split(',');
        }
    }
    clickadd.onclick = function() {

            //将对应的编号和数量放进数组里
            cookievalue(); //点击加入购物车按钮时，先判断cookie中是否已经存入
            if (idarr.indexOf(itemid) == -1) { //如果当前加入购物车的商品不存在于cookie中
                idarr.push(itemid); //将不存在的商品ID写入数组
                numarr.push(itemnum.value); //将不存在的商品对应的数量写入数组
                setcookie('cookiesid', idarr.join(','), 7); //写入cookie
                setcookie('cookiesnum', numarr.join(','), 7)
            } else { //如果添加的商品cookie中已经存在
                let index = idarr.indexOf(itemid); //通过对应的商品的ID找到索引
                let sum = parseInt(numarr[index]) + parseInt(itemnum.value); //将对应的商品ID的数量增加
                numarr[index] = sum; //重新将商品的数量写入数组
                setcookie('cookiesnum', numarr.join(','), 7) //重新添加到cookie
            }

            quit.style.display = 'block'; //出现弹框，进行选择
        }
        //4.点击选择框的X，选择框消失
    close.onclick = function() {
        quit.style.display = 'none';
    }

}()