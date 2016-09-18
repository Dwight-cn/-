/**
 * Created by dwt on 2016/5/14 0014.
 */
require.config({
   paths :{
       jquery : '../plugins/jquery-1.12.3.min',
       jqueryUI: 'http://code.jquery.com/ui/1.10.4/jquery-ui'
   }
});
var imgid = 0,
    textid = 0;
require(['jquery','window','jqueryUI','draw'], function($,w,$UI,d){
    $('#img-list').delegate('.img-container', 'click', function(e){
        $('.img-box').removeClass('active-box');
        var target = e.target;
        if(target.nodeName.toLowerCase() == 'img'){
            var img = '<img src="'+ target.src +'" alt="" id="img-'+imgid+'"/>';
            var imgBox = new w.Window();
            imgBox.init('.panel',img);
        }
        imgid++;
    });
    $('#addfont-btn').click(function(){
        $('.img-box').removeClass('active-box');
        var fontContent = document.getElementById('font-content').value ||"没有输入内容";
        var fontSize = document.getElementById('font-size').value ||36;
        var fontColor = document.getElementById('font-color').value;
        var fontFamily = document.getElementById('font-family').value;
        //alert(fontContent+fontSize+fontColor+fontFamily);

        var text = new w.Window();
        text.init('.panel','<span class="text" style = "font:'+fontSize+'px'+' '+fontFamily+'; color:'+fontColor+'"; id="text-'+textid+'">'+fontContent+'</span>')
    });
    $('.panel').click(function(e){
        var target = e.target;
        $('.img-box').removeClass('active-box');
        if(target.nodeName.toLowerCase() == 'img' || target.nodeName.toLowerCase() == 'span'){
            target.parentNode.className = 'img-box active-box';
        }
    }).resizable({containment:'.center'});

    $('#drawing-btn').click(function(){
        $('#msk').toggleClass('show');
        var canvas = new d.Draw();
        canvas.init('.panel','#picture');
    });

    $('#msk').click(function(){
        $(this).toggleClass('show');
    });
});