// author:TinaGao  date:2017/12/06

//切换调用方法：bftabs($('点击元素'),$('对应的内容元素'),['0%','100%']);//['0%','100%']移动的距离=几个选项卡,$('.js-tab-active'):移动的线

var bftabs=function(tab,con,arr,linediv){
    tab.click(function(){
        var indx=tab.index(this);
        tab.removeClass('item-on');
        $(this).addClass('item-on');
        if(!navi()){
            $(".js-tab-active").hide();
            $(tab).css('border-bottom','solid 2px #26262C');
            $(this).css('border-bottom','solid 2px #EE5050');
        }
        for(var i=0;i<arr.length;i++){
        	if($(this).index()==i){
    			$('.js-tab-active').css('transform','translateX('+arr[i]+')');
    		}
        }
        con.hide();
        con.eq(indx).show();
    })
};

(function($){
    var timer;
    $('.j-i-gz').hover(function(){
        $('.gzdiv').toggle();
    });
    if($('.j-i-gz i').hasClass('i-gz-on')==true){
        $('.gzdiv p').html('您已收藏');
    }
    else{
        $('.gzdiv p').html('点击可收藏');
    }
    $('.sharediv,.i-share').mouseover(function(){
        clearTimeout(timer);
        timer=setTimeout(function(){
            $(this).css('color','#ee5050');
            $('.sharediv').show();
        },200)
        
    });
    $('.sharediv,.i-share').mouseout(function(){
        timer=setTimeout(function(){
            $(this).css('color','#666');
            $('.sharediv').hide();
        },200)
    });
   
    $('.bf-zj').on('click',function(){
        if($(this).hasClass('bf-zj-on')==true){
            return;
        }
        var oUl=$(this).parents('.bf-zj-box').siblings().find('ul');
        var otit=$(this).parents('.bf-zj-box').siblings().find('.bf-zj');
        oUl.hide();
        otit.removeClass('bf-zj-on');
        otit.find('i').removeClass('icon-xiangshangjiantou').addClass('icon-xiangxiajiantou-copy');

        $(this).addClass('bf-zj-on');
        $(this).find('.i-xjt').removeClass('icon-xiangxiajiantou-copy').addClass('icon-xiangshangjiantou');
        $(this).next().toggle();
        
    }) 

    $('.js-yhgg').on('click',function(){
        showBox('yhtc');
    })
    $('.js-c-ggTc').on('click',function(){
        closeBox('yhtc')
    })
        
    $('.i-wx').mouseover(function(){
        $(this).addClass('i-wx-on');
        $('.ewmdiv').removeClass('hide');
    }).mouseout(function(){
        $(this).removeClass('i-wx-on');
        $('.ewmdiv').addClass('hide');
    })
   
})(jQuery)

//倒计时
function jisuandaojishi(id , closeTime)
{
    

    //var closeTime = endtime - currenttime;
    var displayTime;
    function showTime(){
        var nowtime = new Date().getTime();
        var time = closeTime - nowtime;
        var day = parseInt(time / 1000 / 60 / 60 / 24);
        var hour = parseInt(time / 1000 / 60 / 60 % 24);
        var minute = parseInt(time / 1000 / 60 % 60);
        var seconds = parseInt(time / 1000 % 60);
        //console.log(hour+'/'+minute+'/'+seconds);

        if(time<0)
        {
            clearInterval(displayTime);
            
            return false;
        }
        hour=bu0(hour);
        minute=bu0(minute);
        seconds=bu0(seconds);

        var html ='<span>'+getTimeNum(hour).c+'</span><span>'+getTimeNum(hour).d+'</span><label>:</label><span>'+getTimeNum(minute).c+'</span><span>'+getTimeNum(minute).d+'</span><label>:</label><span>'+getTimeNum(seconds).c+'</span><span>'+getTimeNum(seconds).d+'</span>';
        jQuery('#'+id).html(html);
        
    }
    showTime();
    displayTime = setInterval(function(){
        showTime();
    }, 1000)
}
//补零
function bu0(a){
    a=(a<10)?"0"+a:a;
    return a;
}
//取位
function getTimeNum(a){
    a=String(a);
    var c=a.substring(0,1);
    var d=a.substring(1);
    //console.log(c+"/"+d)
    return {c:c,d:d}
}
// 判断浏览器是否小于ie9
function navi(){
    var DEFAULT_VERSION="8.0";
    var ua=navigator.userAgent.toLowerCase();
    var isIE=ua.indexOf('msie')>-1;
    var safariVersion;
    if(isIE){
        safariVersion=ua.match(/msie ([\d.]+)/)[1];
        if(safariVersion<=DEFAULT_VERSION){
            return false;
        }
    }
    return true;
}



