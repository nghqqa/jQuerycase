 ;
 ! function($) {
     class Lunbotu {
         //属性
         constructor() {
                 this.banner = $('.banner');
                 this.piclis = $('.pic li');
                 this.btnlis = $('.circle li');
                 this.right = $('.right');
                 this.left = $('.left');
                 this.arrows = $('.left,.right');
                 this.index = null;
                 this.timer = null;

             }
             //初始化方法
         init() {
                 this.clickswitch();
                 this.mouseover();
                 this.rightclick();
                 this.leftclick();
                 this.autoplay();
             }
             //实现的效果的方法
             //图片运动效果
         picmove() {
                 this.piclis.eq(this.index).show().siblings().hide(); //对应索引的图片显示，其他图片隐藏
                 this.btnlis.eq(this.index).addClass('active').siblings().removeClass('active'); //给对应的索引加类
             }
             //鼠标点击图片底部列表，对应的按钮发生改变,并且点击按钮对应索引的图片发生切换
         clickswitch() {
                 let _this = this;
                 this.btnlis.on('click', function() {
                     _this.index = $(this).index(); //获取当前点击的按钮的索引
                     _this.picmove()
                 })

             }
             //鼠标经过图片，图片隐藏的左右箭头出现
         mouseover() {
                 let _this = this
                     //鼠标移入移出显示隐藏箭头
                 this.banner.hover(function() {
                         _this.arrows.show()
                     }, function() {
                         _this.arrows.hide()
                     })
                     //鼠标移入移出箭头区域，改变样式
                 _this.arrows.hover(function() {
                     $(this).css({
                         opacity: 0.8,
                         color: 'red'
                     })
                 }, function() {
                     $(this).css({
                         opacity: 0.5,
                         color: '#aaa'
                     })
                 })

             }
             //给右箭头添加点击事件
         rightclick() {
                 let _this = this;
                 this.right.on('click', function() {
                     _this.index++; //点击右箭头，索引依次增加
                     if (_this.index > _this.piclis.size() - 1) {
                         _this.index = 0
                     }
                     _this.picmove()

                 })
             }
             //给左头添加点击事件
         leftclick() {
                 let _this = this;
                 this.left.on('click', function() {
                     _this.index--; //点击右箭头，索引依次增加
                     if (_this.index < 0) {
                         _this.index = _this.btnlis.size() - 1
                     }
                     _this.picmove()

                 })
             }
             //自动轮播
         autoplay() {
             this.timer = setInterval(function() {

             })
         }



     }
     new Lunbotu().init()
 }(jQuery);