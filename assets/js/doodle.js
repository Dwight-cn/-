/**
 * Created by d on 2016/10/13.
 */
define(['jquery','window'],function($,w){
    function Doodle(){
    }
    Doodle.prototype = {
        drawPath : function(attr){
            attr.context.beginPath();
            attr.context.moveTo(this.startX,this.startY);
            attr.context.lineTo(attr.x,attr.y);
            attr.context.strokeStyle = attr.color;
            attr.context.lineWidth = attr.w;
            attr.context.lineCap = 'round';
            attr.context.stroke();
            this.startX = attr.x;
            this.startY = attr.y;
        },
        onMove  : function(){
            this.attr.x = this.mx;
            this.attr.y = this.my;
            this.drawPath(this.attr);
        },

        init: function(canvas,panel,attr){
            this.canvas = canvas;

            var width = panel.width();      //设置canvas宽高
            var height = panel.height();
            this.canvas.attr({
                width : width,
                height : height
            });

            this.context = this.canvas[0].getContext('2d');

            this.canvas.mousedown(function(e){
                var beginX = e.offsetX;
                var beginY = e.offsetY;
                this.startX = beginX;
                this.startY = beginY;
                this.attr = attr;
                this.attr.context = this.context;
                this.attr.x = beginX;
                this.attr.y = beginY;
                this.drawPath(this.attr);
                this.moving = setInterval(this.onMove.bind(this),10);
            }.bind(this));

            this.canvas[0].addEventListener('mousemove',function(e){
                this.mx = e.offsetX;                  //获取移动时鼠标位置坐标
                this.my = e.offsetY;
            }.bind(this),false);

            this.canvas.mouseup(function(){
                clearInterval(this.moving);
                var canvansUrl = this.canvas[0].toDataURL('image/png');
                var canvansImg = $('<img class="doodleimg" src="'+canvansUrl+'" alt="" style="position: absolute; top:0; left: 0; z-index:0; width:'+ width +'px; height:'+ height+'px;"/>');
                canvansImg.appendTo(panel);
                this.canvas[0].width = width;
            }.bind(this));
        }
    };

    return{
        Doodle : Doodle
    }
});
