/**
 * Created by d on 2016/9/17.
 */
define(['jquery','jqueryUI'],function($, $UI){
   function Window(){

   }

    Window.prototype = {

        createWindow : function(pNode, img){
            this.imgBox = $(
                '<div class="img-box active-box" id="img-box-'+imgid+'">'+
                    img+
                    '<div class="box-btn close-btn" id="close-btn-'+imgid+'">╳</div>'+
                    '<div class="box-btn rotate-btn" id="rotate-btn-'+imgid+'"></div>'+
                    //'<div class="box-btn scale-btn" id="scale-btn-'+imgid+'">◢</div>'+
                '</div>'
            );
            this.imgBox.appendTo(pNode);
            this.closeBtn = $('#close-btn-'+imgid);
            //this.img = $('#img-'+imgid);
            //this.text = $('#text-'+textid);
            this.firstChildName = this.imgBox[0].firstChild.tagName.toLowerCase();
        },

        syncUI : function(){
            if(this.firstChildName == 'img'){
                this.img = this.imgBox.children('img');
            }else if(this.firstChildName == 'span'){
                this.img = this.imgBox.children('span');
            }

            this.imgWidth = this.img.width();
            this.imgHeight = this.img.height();

            this.imgBox.css({
                width : this.imgWidth + 'px',
                height : this.imgHeight + 'px'
            });
        },
        binUI : function(){
            if(this.closeBtn){
                this.closeBtn.click(function(){
                    this.parentNode.remove();
                });
            }
            this.imgBox.draggable();
            if(this.firstChildName == 'img'){
                this.imgBox.resizable({alsoResize:this.img,containment:'.panel'});
            }
            },

        init : function(pNode,img){
            this.pNode = $(pNode);
            this.createWindow(this.pNode, img);
            this.syncUI();
            this.binUI();
        }
    };

    return {
        Window : Window
    }
});