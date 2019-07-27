;
! function($) {
    class Hdp {
        //属性
        constructor() {
                this.banner = $('.banner');
                this.picul = $('.pic ul');
                this.piclis = $('.pic ul li');
                this.btnlis = $('.button ul li');
                this.arrows = $('.left,.right');
                this.right = $('.right');
                this.left = $('.left');
                this.liwidth = this.piclis.width();
                this.index = null;
                this.timer = null;
            }
            //方法
            //初始化方法
        init() {
                let _this = this;
                //克隆图片
                this.clonepic();
                //鼠标点击图片下面的按钮，发生改变
                this.btnlis.on('click', function() {
                        _this.index = $(this).index();
                        _this.piculmove(_this.index);
                    })
                    //鼠标经过banner出现左右箭头
                this.banner.hover(function() {
                        _this.arrows.show();
                        clearInterval(_this.timer);
                    }, function() {
                        _this.arrows.hide();
                        _this.autoplay();
                    })
                    //点击右边的箭头，图片切换
                this.right.on('click', function() {
                        _this.index++;
                        if (_this.index > _this.btnlis.length - 1) {
                            _this.index = 0;
                            _this.picul.css({ left: 0 })
                        }
                        console.log(_this.index)
                        _this.piculmove(_this.index);
                    })
                    //点击左边的箭头，图片切换
                this.left.on('click', function() {
                        _this.index--;
                        if (_this.index < 0) {
                            _this.index = _this.btnlis.length - 1;
                            _this.picul.css({ left: -(_this.btnlis.length + 1) * _this.liwidth })
                        }
                        console.log(_this.index)
                        _this.piculmove(_this.index)
                    })
                    //自动播放
                this.autoplay();
            }
            //部分效果的方法
            //1.克隆图片，并让所有图片水平
        clonepic() {
                let $firstpic = this.piclis.first().clone(); //克隆第一张图片
                let $lastpic = this.piclis.last().clone(); //克隆最后一张图片
                this.picul.append($firstpic); //将克隆的第一张图片追加到所在ul的最后
                this.picul.prepend($lastpic); //将克隆的最后一张图片追加到所在ul的最前面
                this.picul.width(this.liwidth * $('.pic ul li').size()).css({ left: -this.liwidth }); //重新设置ul宽度
            }
            //2.点击图片按钮，图片运动
        piculmove(index) {
                let $leftposition = (-index - 1) * this.liwidth;
                this.btnlis.eq(index).addClass('active').siblings().removeClass('active');
                this.picul.stop(true).animate({ left: $leftposition })
            }
            //3.自动播放
        autoplay() {
            let _this = this;
            this.timer = setInterval(function() {
                _this.right.click();
            }, 2000)
        }
    }
    new Hdp().init()
}(jQuery);