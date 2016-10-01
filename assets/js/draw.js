/**
 * Created by d on 2016/9/17.
 */
define(['jquery'],function($){
    function Draw(){
        this.cfg = {

        }
    }

    Draw.prototype ={
        getSomeAttribute : function(ele){
            var attrs = {};
            attrs.x = parseInt($(ele.parentNode).css('left'));
            attrs.y = parseInt($(ele.parentNode).css('top'));
            attrs.width = parseInt($(ele.parentNode).width());
            attrs.height = parseInt($(ele.parentNode).height());
            attrs.angle = Number(ele.parentElement.style.transform.slice(7,-4))*Math.PI/180;

            return attrs
        },

        drawText : function(attrs){
            attrs.context.save();
            attrs.context.fillStyle = attrs.color;
            attrs.context.font = attrs.font;
            attrs.context.textAlign = 'left';
            attrs.context.textBaseline = 'top';
            attrs.context.translate(attrs.x+attrs.width/2,attrs.y+attrs.height/2);
            attrs.context.rotate(attrs.angle);
            attrs.context.fillText(attrs.ele, -attrs.width/2,-attrs.height/2);
            attrs.context.restore();
        },

        drawImg : function(attrs){
            attrs.context.save();
            attrs.context.translate(attrs.x+attrs.width/2,attrs.y+attrs.height/2);
            attrs.context.rotate(attrs.angle);
            attrs.context.drawImage(attrs.ele,-attrs.width/2,-attrs.height/2,attrs.width,attrs.height);
            attrs.context.restore();
        },



        init : function(div, canvas){
            this.div = $(div);
            this.canvas = $(canvas);
            this.canvasWidth = this.div.width();
            this.canvasHeight = this.div.height();
            this.canvas.attr({width:this.canvasWidth,height:this.canvasHeight});

            this.img = this.div.find('img');
            this.text = this.div.find('span');

            if(this.canvas[0].getContext) {
                this.context = this.canvas[0].getContext('2d');
                this.context.fillStyle = '#ffffff';
                this.context.fillRect(0,0,this.canvasWidth,this.canvasHeight);

                var that  =this;
                this.img.each(function(){
                    var attrs = that.getSomeAttribute(this);
                    attrs.ele = this;
                    attrs.context = that.context;
                    if((attrs.x+attrs.width>=0) || (attrs.y+attrs.height>=0)){
                        that.drawImg(attrs);
                    }
                });
                this.text.each(function(){
                    var attrs = that.getSomeAttribute(this);
                    attrs.ele = this.innerHTML;
                    attrs.color = this.style.color;
                    attrs.font = this.style.font;
                    attrs.context = that.context;
                    that.drawText(attrs);
                });

            }
        }
    };

    

    return{
        Draw : Draw
    }
});