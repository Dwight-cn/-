/**
 * Created by d on 2016/9/17.
 */
define(['jquery'],function($){
    function Draw(){

    }

    Draw.prototype ={
        drawText : function(context,con,x,y,font,color){
            context.fillStyle = color;
            context.font = font;
            context.textAlign = 'left';
            context.textBaseline = 'top';
            context.fillText(con, x, y);
        },

        drawImg : function(context,img,x,y,widht,height){
            context.drawImage(img,x,y,widht,height);
        },



        init : function(div, canvas){
            this.div = $(div);
            //alert(this.div.width());
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
                this.img.each(function(i){
                    //alert(this.id);
                    var x = parseInt($(this.parentNode).css('left'));
                    var y = parseInt($(this.parentNode).css('top'));
                    var width = parseInt($(this.parentNode).width());
                    var height = parseInt($(this.parentNode).height());
                    if((x+width>=0) || (y+height>=0)){
                        that.drawImg(that.context,this,x,y,width,height);
                    }

                });
                this.text.each(function(){
                    var con = this.innerHTML;
                    var color = this.style.color;
                    var font = this.style.font;
                    var x = parseInt($(this.parentNode).css('left'));
                    var y = parseInt($(this.parentNode).css('top'));
                    that.drawText(that.context,con,x,y,font,color);
                });

            }
        }
    };

    

    return{
        Draw : Draw
    }
});